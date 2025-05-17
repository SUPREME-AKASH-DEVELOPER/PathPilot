
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";
import { 
  Briefcase, Star, Clock, GraduationCap, Calendar as CalendarIcon,
  Clock1, MapPin, ChevronLeft, CheckCircle
} from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  title: string;
  organization: string;
  specialties: string[];
  rating: number;
  imageUrl: string;
  availability?: string;
  experience: number;
  location?: string;
  education?: string[];
  about?: string;
}

// This would come from an API in a real app
const getMentorData = (id: string): Mentor | undefined => {
  // Create a comprehensive list of mentors
  const allMentors: Mentor[] = [
    {
      id: "m1",
      name: "Dr. Rajesh Kumar",
      title: "Lead Software Engineer",
      organization: "Google India",
      specialties: ["AI", "Machine Learning", "Software Engineering"],
      rating: 4.9,
      imageUrl: "/lovable-uploads/86b25da1-c456-4f88-a7b1-bce2d68eb9fb.png",
      availability: "Next available: Tomorrow",
      experience: 12,
      location: "Bangalore, India",
      education: [
        "Ph.D. in Computer Science, IIT Delhi",
        "B.Tech in Computer Science, IIT Bombay"
      ],
      about: "Dr. Rajesh Kumar is a seasoned software engineer with expertise in AI and machine learning. With over 12 years of experience at Google India, he has led multiple teams developing cutting-edge technologies. He is passionate about mentoring young tech enthusiasts and helping them navigate their career paths in the rapidly evolving tech landscape."
    },
    {
      id: "m2",
      name: "Priya Sharma",
      title: "Senior Data Scientist",
      organization: "Microsoft India",
      specialties: ["Data Science", "Python", "Big Data"],
      rating: 4.8,
      imageUrl: "/placeholder.svg",
      availability: "Next available: This week",
      experience: 8,
      location: "Hyderabad, India",
      education: [
        "M.Tech in Data Science, IISc Bangalore",
        "B.E. in Computer Engineering, Delhi University"
      ],
      about: "Priya Sharma is a dedicated data scientist with extensive experience in big data analytics and machine learning models. At Microsoft India, she works on developing predictive algorithms and data visualization tools. She enjoys helping students understand the practical applications of data science and guiding them toward successful careers in the field."
    },
    // Add more mentors as needed
  ];

  return allMentors.find(mentor => mentor.id === id);
};

export default function MentorDetailPage() {
  const { mentorId } = useParams<{ mentorId: string }>();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mentorId) {
      navigate("/mentors");
      return;
    }

    // In a real app, this would be an API call
    const mentorData = getMentorData(mentorId);
    
    if (mentorData) {
      setMentor(mentorData);
    } else {
      toast({
        title: "Mentor not found",
        description: "The mentor you're looking for doesn't exist.",
        variant: "destructive"
      });
      navigate("/mentors");
    }
    
    setLoading(false);
  }, [mentorId, navigate]);

  // Sample available time slots (would come from an API in a real app)
  const availableTimeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const handleBookSession = () => {
    if (!selectedDate || !selectedTimeSlot) {
      toast({
        title: "Incomplete booking",
        description: "Please select both a date and time slot for your session.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would be an API call to book the session
    setTimeout(() => {
      setBookingComplete(true);
      toast({
        title: "Session booked successfully!",
        description: `Your session with ${mentor?.name} is confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTimeSlot}.`,
        variant: "default"
      });
    }, 1000);
  };

  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold">Mentor not found</h2>
        <p className="mt-2 text-muted-foreground">The mentor you're looking for doesn't exist.</p>
        <Button className="mt-4" onClick={() => navigate("/mentors")}>
          View All Mentors
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 flex items-center gap-1"
        onClick={() => navigate("/mentors")}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to all mentors
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mentor Profile Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={mentor.imageUrl} alt={mentor.name} />
                  <AvatarFallback className="text-xl">{mentor.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{mentor.name}</CardTitle>
                  <p className="text-lg text-muted-foreground">{mentor.title}</p>
                  <p className="text-sm text-muted-foreground">{mentor.organization}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="ml-1 font-medium">{mentor.rating}</span>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {mentor.location || "India"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="about">
                <TabsList className="mb-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="experience">Experience & Education</TabsTrigger>
                  <TabsTrigger value="specialties">Specialties</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">About {mentor.name}</h3>
                    <p className="text-muted-foreground">
                      {mentor.about || `${mentor.name} is an experienced professional in ${mentor.specialties.join(", ")}. With ${mentor.experience} years of experience, they provide valuable mentorship and guidance to students and young professionals.`}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="experience" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Professional Experience
                    </h3>
                    <div className="ml-7">
                      <p className="font-medium">{mentor.title}</p>
                      <p className="text-sm text-muted-foreground">{mentor.organization}</p>
                      <p className="text-sm text-muted-foreground">{mentor.experience} years</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Education
                    </h3>
                    <ul className="ml-7 space-y-2">
                      {mentor.education ? (
                        mentor.education.map((edu, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            {edu}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground">
                          Advanced degree in relevant field
                        </li>
                      )}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="specialties">
                  <h3 className="text-lg font-medium mb-3">Areas of Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Booking Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Book a Session</CardTitle>
            </CardHeader>
            <CardContent>
              {bookingComplete ? (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Booking Confirmed!</h3>
                  <p>
                    Your session with {mentor.name} is scheduled for{" "}
                    {selectedDate?.toLocaleDateString()} at {selectedTimeSlot}.
                  </p>
                  <Button 
                    className="w-full mt-4 bg-pp-purple hover:bg-pp-bright-purple"
                    onClick={() => navigate("/profile")}
                  >
                    View My Sessions
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Select Date
                    </h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      disabled={(date) => 
                        date < new Date() || 
                        date > new Date(new Date().setDate(new Date().getDate() + 30))
                      }
                    />
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Clock1 className="h-4 w-4" />
                      Select Time Slot
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimeSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedTimeSlot === slot ? "default" : "outline"}
                          className={`${selectedTimeSlot === slot ? "bg-pp-purple hover:bg-pp-bright-purple" : ""}`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-pp-purple hover:bg-pp-bright-purple"
                    onClick={handleBookSession}
                    disabled={!selectedDate || !selectedTimeSlot}
                  >
                    Confirm Booking
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
