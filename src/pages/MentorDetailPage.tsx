
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

// Expanded mentors dataset with updated images
const allMentors: Mentor[] = [
  {
    id: "m1",
    name: "Dr. Rajesh Kumar",
    title: "Lead Software Engineer",
    organization: "Google India",
    specialties: ["AI", "Machine Learning", "Software Engineering"],
    rating: 4.9,
    imageUrl: "/lovable-uploads/a6630385-9451-4df1-bc1d-12056584b9ff.png",
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
    imageUrl: "/lovable-uploads/2349adf1-c21c-46b1-9619-c83a0e04ca6e.png",
    availability: "Next available: This week",
    experience: 8,
    location: "Hyderabad, India",
    education: [
      "M.Tech in Data Science, IISc Bangalore",
      "B.E. in Computer Engineering, Delhi University"
    ],
    about: "Priya Sharma is a dedicated data scientist with extensive experience in big data analytics and machine learning models. At Microsoft India, she works on developing predictive algorithms and data visualization tools. She enjoys helping students understand the practical applications of data science and guiding them toward successful careers in the field."
  },
  {
    id: "m3",
    name: "Vikram Malhotra",
    title: "CTO",
    organization: "TechNext Innovations",
    specialties: ["System Architecture", "Cloud Computing", "Leadership"],
    rating: 4.7,
    imageUrl: "/lovable-uploads/a6630385-9451-4df1-bc1d-12056584b9ff.png",
    availability: "Next available: Next week",
    experience: 15,
    location: "Mumbai, India",
    education: [
      "MBA in Technology Management, IIM Ahmedabad",
      "B.Tech in Computer Engineering, BITS Pilani"
    ],
    about: "Vikram Malhotra is a technology leader with extensive experience in building scalable systems and managing tech teams. At TechNext Innovations, he oversees all technical aspects and strategic direction. He is passionate about helping young professionals develop technical leadership skills."
  },
  {
    id: "m4",
    name: "Aisha Kapoor",
    title: "Creative Director",
    organization: "Design Mantra Studio",
    specialties: ["UX/UI Design", "Brand Identity", "Visual Design"],
    rating: 4.9,
    imageUrl: "/lovable-uploads/2349adf1-c21c-46b1-9619-c83a0e04ca6e.png",
    availability: "Next available: Tomorrow",
    experience: 10,
    location: "Delhi, India",
    education: [
      "Master's in Design, National Institute of Design",
      "Bachelor's in Fine Arts, Delhi University"
    ],
    about: "Aisha Kapoor is a renowned creative director specializing in user experience design and brand identity. With 10 years in the design industry, she has helped numerous startups and established companies create compelling visual narratives and intuitive interfaces."
  },
  {
    id: "m5",
    name: "Karan Mehra",
    title: "Senior Content Strategist",
    organization: "Pixel Media House",
    specialties: ["Content Creation", "Digital Marketing", "SEO"],
    rating: 4.7,
    imageUrl: "/lovable-uploads/a6630385-9451-4df1-bc1d-12056584b9ff.png",
    availability: "Next available: This week",
    experience: 7,
    location: "Pune, India",
    education: [
      "MBA in Marketing, Symbiosis Institute",
      "Bachelor's in Mass Communication, Pune University"
    ],
    about: "Karan Mehra is an experienced content strategist with a background in digital marketing and SEO. At Pixel Media House, he develops comprehensive content strategies that drive engagement and conversions for clients across various industries."
  },
  {
    id: "m6",
    name: "Sunil Chopra",
    title: "Investment Banker",
    organization: "Global Finance India",
    specialties: ["Finance", "Economics", "Investment Strategy"],
    rating: 4.8,
    imageUrl: "/lovable-uploads/a6630385-9451-4df1-bc1d-12056584b9ff.png",
    availability: "Next available: Next week",
    experience: 14,
    location: "Mumbai, India",
    education: [
      "MBA in Finance, IIM Calcutta",
      "Bachelor's in Economics, St. Xavier's College"
    ],
    about: "Sunil Chopra is a senior investment banker with expertise in financial markets and investment strategies. With 14 years at Global Finance India, he has advised numerous corporations and high-net-worth individuals on wealth management and investment opportunities."
  },
  {
    id: "m7",
    name: "Neha Reddy",
    title: "Marketing Head",
    organization: "Unilever India",
    specialties: ["Marketing", "Brand Management", "Consumer Behavior"],
    rating: 4.6,
    imageUrl: "/lovable-uploads/2349adf1-c21c-46b1-9619-c83a0e04ca6e.png",
    availability: "Next available: Tomorrow",
    experience: 9,
    location: "Bangalore, India",
    education: [
      "MBA in Marketing, XLRI Jamshedpur",
      "Bachelor's in Business Administration, Christ University"
    ],
    about: "Neha Reddy is a strategic marketing professional with experience in brand management and consumer insights. At Unilever India, she leads marketing campaigns for several major brands and mentors junior marketing professionals."
  },
  {
    id: "m8",
    name: "Dr. Anand Patel",
    title: "Medical Director",
    organization: "Apollo Hospitals",
    specialties: ["Medicine", "Healthcare Management", "Research"],
    rating: 4.9,
    imageUrl: "/lovable-uploads/a6630385-9451-4df1-bc1d-12056584b9ff.png",
    availability: "Next available: This week",
    experience: 18,
    location: "Chennai, India",
    education: [
      "MD in Internal Medicine, AIIMS Delhi",
      "MBBS, Madras Medical College"
    ],
    about: "Dr. Anand Patel is a distinguished physician and healthcare administrator with extensive experience in medical research and healthcare management. As Medical Director at Apollo Hospitals, he oversees clinical operations while continuing to mentor medical students and residents."
  },
  {
    id: "m9",
    name: "Dr. Meera Joshi",
    title: "Biotechnology Researcher",
    organization: "Indian Institute of Science",
    specialties: ["Biotechnology", "Research", "Pharmaceuticals"],
    rating: 4.8,
    imageUrl: "/lovable-uploads/2349adf1-c21c-46b1-9619-c83a0e04ca6e.png",
    availability: "Next available: Next week",
    experience: 11,
    location: "Bangalore, India",
    education: [
      "Ph.D. in Biotechnology, IISc Bangalore",
      "M.Sc in Biochemistry, Delhi University"
    ],
    about: "Dr. Meera Joshi is a leading researcher in biotechnology with a focus on pharmaceutical applications. Her work at the Indian Institute of Science has been published in several international journals, and she actively mentors graduate students in research methodologies."
  },
  {
    id: "m10",
    name: "Arjun Singh",
    title: "Career Counselor",
    organization: "Career Guidance Institute",
    specialties: ["Career Planning", "Student Counseling", "Skill Development"],
    rating: 4.9,
    imageUrl: "/lovable-uploads/a6630385-9451-4df1-bc1d-12056584b9ff.png",
    availability: "Next available: Tomorrow",
    experience: 15,
    location: "Delhi, India",
    education: [
      "Master's in Psychology, Delhi University",
      "Bachelor's in Education, Jamia Millia Islamia"
    ],
    about: "Arjun Singh is an experienced career counselor specializing in helping students identify and pursue their ideal career paths. With 15 years at the Career Guidance Institute, he has helped thousands of students make informed decisions about their educational and professional journeys."
  },
  {
    id: "m11",
    name: "Ritu Desai",
    title: "Education Consultant",
    organization: "Global Education Services India",
    specialties: ["Higher Education", "Study Abroad", "Admissions"],
    rating: 4.7,
    imageUrl: "/lovable-uploads/2349adf1-c21c-46b1-9619-c83a0e04ca6e.png",
    availability: "Next available: This week",
    experience: 12,
    location: "Mumbai, India",
    education: [
      "Master's in Education, Harvard University",
      "Bachelor's in International Relations, Mumbai University"
    ],
    about: "Ritu Desai is an education consultant specializing in international higher education opportunities. Having studied abroad herself, she provides comprehensive guidance to students seeking admissions to universities worldwide, with a focus on application strategies and scholarship opportunities."
  }
];

// This would come from an API in a real app
const getMentorData = (id: string): Mentor | undefined => {
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
      console.log("Mentor data loaded:", mentorData);
    } else {
      console.error("Mentor not found with ID:", mentorId);
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
