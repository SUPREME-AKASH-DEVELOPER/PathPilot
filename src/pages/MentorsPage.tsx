import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Briefcase, MapPin, Clock, Calendar, ChevronLeft, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface Mentor {
  id: string;
  name: string;
  title: string;
  organization: string;
  expertise: string[];
  experience: number;
  rating: number;
  sessions: number;
  bio: string;
  price: string;
  availability: string;
  image: string;
  email?: string;
  phone?: string;
  location?: string;
  education?: string[];
  achievements?: string[];
  languages?: string[];
  category: string;
}

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  
  const mentors: Mentor[] = [
    // Technical & Engineering
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      title: "Senior Professor",
      organization: "IIT Delhi",
      expertise: ["Engineering", "Computer Science", "AI"],
      experience: 15,
      rating: 4.9,
      sessions: 230,
      bio: "Former HOD at IIT Delhi with extensive experience in guiding engineering aspirants and professionals in technical career paths.",
      price: "₹1500/session",
      availability: "Weekends",
      image: "/placeholder.svg",
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 43210",
      location: "Delhi, India",
      education: ["PhD in Computer Science, IIT Delhi", "B.Tech in Electrical Engineering, IIT Bombay"],
      achievements: ["Published 45+ research papers", "Recipient of National Award for Excellence in Teaching"],
      languages: ["English", "Hindi"],
      category: "Technical"
    },
    {
      id: "2",
      name: "Priya Sharma",
      title: "Career Counselor",
      organization: "Career Guide India",
      expertise: ["Career Planning", "Psychology", "Student Counseling"],
      experience: 8,
      rating: 4.7,
      sessions: 450,
      bio: "Certified career counselor specializing in helping high school students make informed decisions about their academic and career paths.",
      price: "₹1000/session",
      availability: "Mon-Fri",
      image: "/placeholder.svg",
      email: "priya.sharma@example.com",
      phone: "+91 87654 32109",
      location: "Mumbai, India",
      category: "Education"
    },
    // Creative & Artistic Fields
    {
      id: "3",
      name: "Aditya Mehta",
      title: "Senior Animator",
      organization: "Dreamworks Animation",
      expertise: ["Character Animation", "3D Modeling", "Visual Effects"],
      experience: 12,
      rating: 4.8,
      sessions: 175,
      bio: "Award-winning animator with experience at major studios, specializing in character animation and storytelling through movement.",
      price: "₹2000/session",
      availability: "Weekends",
      image: "/placeholder.svg",
      email: "aditya.mehta@example.com",
      phone: "+91 76543 21098",
      location: "Bangalore, India",
      education: ["Bachelor of Fine Arts in Animation, NID", "Character Animation Program, Gobelins"],
      achievements: ["Worked on 3 award-winning animated films", "Animation Director for 'The Forest Tale'"],
      category: "Creative"
    },
    {
      id: "4",
      name: "Neha Verma",
      title: "Design Lead",
      organization: "Designscape Studios",
      expertise: ["UI/UX Design", "Creative Arts", "Design Education"],
      experience: 10,
      rating: 4.8,
      sessions: 190,
      bio: "NID graduate and design professional helping students explore creative career paths in design, animation, and digital arts.",
      price: "₹1200/session",
      availability: "Flexible",
      image: "/placeholder.svg",
      category: "Creative"
    },
    {
      id: "5",
      name: "Sanjay Kapoor",
      title: "Content Creator",
      organization: "Digital Narratives",
      expertise: ["Content Strategy", "Social Media", "Digital Marketing"],
      experience: 7,
      rating: 4.6,
      sessions: 120,
      bio: "Award-winning content creator with millions of followers across platforms. Specializes in teaching content creation strategies and building online presence.",
      price: "₹1800/session",
      availability: "Evenings",
      image: "/placeholder.svg",
      email: "sanjay.kapoor@example.com",
      location: "Mumbai, India",
      category: "Creative"
    },
    // Tech & Emerging Fields
    {
      id: "6",
      name: "Deepa Krishnan",
      title: "Data Science Lead",
      organization: "Microsoft India",
      expertise: ["Data Science", "Machine Learning", "Python"],
      experience: 9,
      rating: 4.9,
      sessions: 210,
      bio: "Expert in applying data science to solve business problems, having worked with Fortune 500 companies. Passionate about mentoring next-gen data scientists.",
      price: "₹2200/session",
      availability: "Weekends",
      image: "/placeholder.svg",
      email: "deepa.krishnan@example.com",
      location: "Hyderabad, India",
      education: ["MS in Computer Science, Stanford", "B.Tech in Computer Science, IIT Madras"],
      category: "Technical"
    },
    {
      id: "7",
      name: "Rohan Shah",
      title: "AI Research Scientist",
      organization: "Google Research",
      expertise: ["AI", "Machine Learning", "Deep Learning"],
      experience: 8,
      rating: 5.0,
      sessions: 150,
      bio: "AI researcher focused on cutting-edge applications of machine learning. Published in top conferences and passionate about democratizing AI education.",
      price: "₹2500/session",
      availability: "Saturday",
      image: "/placeholder.svg",
      email: "rohan.shah@example.com",
      category: "Technical"
    },
    {
      id: "8",
      name: "Karan Malik",
      title: "Game Developer",
      organization: "Ubisoft India",
      expertise: ["Game Development", "Unity", "Unreal Engine"],
      experience: 11,
      rating: 4.7,
      sessions: 130,
      bio: "Game developer with experience in AAA titles, indie games, and mobile gaming. Helps students transition from gaming passion to professional roles in the industry.",
      price: "₹1700/session",
      availability: "Evenings & Weekends",
      image: "/placeholder.svg",
      category: "Technical"
    },
    // Sports & Outdoors
    {
      id: "9",
      name: "Anjali Bhagat",
      title: "Sports Management Consultant",
      organization: "Premier Sports Group",
      expertise: ["Sports Management", "Team Building", "Sports Marketing"],
      experience: 14,
      rating: 4.8,
      sessions: 185,
      bio: "Former national athlete turned sports management expert. Has managed Olympic athletes and national teams throughout her career.",
      price: "₹1600/session",
      availability: "Weekends",
      image: "/placeholder.svg",
      category: "Sports"
    },
    {
      id: "10",
      name: "Ravi Chandran",
      title: "Adventure Guide Trainer",
      organization: "Himalayan Expeditions",
      expertise: ["Outdoor Leadership", "Adventure Tourism", "Wilderness Skills"],
      experience: 16,
      rating: 4.9,
      sessions: 220,
      bio: "Professional mountaineer and wilderness expert who has led expeditions across the Himalayas. Trains future adventure guides and outdoor leaders.",
      price: "₹1900/session",
      availability: "Seasonal",
      image: "/placeholder.svg",
      category: "Sports"
    },
    // Government & Public Service
    {
      id: "11",
      name: "Arjun Singh",
      title: "Civil Services Officer",
      organization: "Indian Administrative Service",
      expertise: ["Civil Services", "UPSC", "Public Policy"],
      experience: 7,
      rating: 4.9,
      sessions: 280,
      bio: "IAS officer sharing insights into civil service preparation, interview techniques, and career growth in government sector.",
      price: "₹1500/session",
      availability: "Sat-Sun",
      image: "/placeholder.svg",
      category: "Government"
    },
    // Medical & Healthcare
    {
      id: "12",
      name: "Dr. Meena Gupta",
      title: "Medical Professional",
      organization: "AIIMS Delhi",
      expertise: ["Medicine", "Healthcare", "NEET Guidance"],
      experience: 20,
      rating: 5.0,
      sessions: 320,
      bio: "Senior doctor at AIIMS with passion for guiding medical aspirants through their journey from preparation to residency.",
      price: "₹1800/session",
      availability: "Weekends",
      image: "/placeholder.svg",
      category: "Medical"
    },
    // Social Impact & Community
    {
      id: "13",
      name: "Lakshmi Narayan",
      title: "Social Development Specialist",
      organization: "World Vision India",
      expertise: ["Social Work", "Community Development", "NGO Management"],
      experience: 15,
      rating: 4.9,
      sessions: 260,
      bio: "Dedicated social development professional with experience in grassroots initiatives and policy advocacy. Mentors students interested in social impact careers.",
      price: "₹1100/session",
      availability: "Flexible",
      image: "/placeholder.svg",
      category: "Social Impact"
    },
    {
      id: "14",
      name: "Vikram Malhotra",
      title: "Product Manager",
      organization: "Amazon India",
      expertise: ["Product Management", "Tech Industry", "MBA Guidance"],
      experience: 12,
      rating: 4.8,
      sessions: 175,
      bio: "IIM graduate with experience at top tech companies, helping students navigate the tech industry and prepare for MBA admissions.",
      price: "₹2000/session",
      availability: "Evenings",
      image: "/placeholder.svg",
      category: "Business"
    },
    // Other Interesting Options
    {
      id: "15",
      name: "Nina Reddy",
      title: "Wedding & Event Planner",
      organization: "Elegant Affairs",
      expertise: ["Event Planning", "Wedding Management", "Client Relations"],
      experience: 9,
      rating: 4.7,
      sessions: 140,
      bio: "Premier wedding planner who has orchestrated events for celebrities and high-profile clients. Mentors aspiring event planners on business and creativity.",
      price: "₹1600/session",
      availability: "Weekdays",
      image: "/placeholder.svg",
      category: "Other"
    },
    {
      id: "16",
      name: "Dr. Prakash Iyer",
      title: "Archaeologist",
      organization: "Archaeological Survey of India",
      expertise: ["Archaeology", "History", "Research Methodology"],
      experience: 22,
      rating: 4.8,
      sessions: 130,
      bio: "Veteran archaeologist who has led excavations across South Asia. Guides students interested in archaeology, anthropology and historical research.",
      price: "₹1400/session",
      availability: "By Appointment",
      image: "/placeholder.svg",
      category: "Other"
    }
  ];

  const categories = Array.from(new Set(mentors.map(mentor => mentor.category)));

  const handleBookSession = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowBookingForm(true);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Session Booked!",
      description: `Your session with ${selectedMentor?.name} has been booked successfully. You will receive confirmation details shortly.`,
    });
    setShowBookingForm(false);
  };

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = searchQuery 
      ? mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.organization.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesCategory = selectedCategory 
      ? mentor.category === selectedCategory 
      : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            Connect with Mentors
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Get personalized guidance from industry experts, educators, and professionals across diverse career paths.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-10">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search by name, expertise, or organization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 border-2 border-pp-purple">
                          <AvatarImage src={mentor.image} alt={mentor.name} />
                          <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{mentor.name}</CardTitle>
                          <p className="text-sm text-gray-500">{mentor.title} at {mentor.organization}</p>
                        </div>
                      </div>
                      <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        ★ {mentor.rating}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3 flex flex-wrap gap-1">
                      {mentor.expertise.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100 hover:bg-gray-200 text-gray-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {mentor.bio}
                    </p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Experience:</span>
                        <span>{mentor.experience} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sessions completed:</span>
                        <span>{mentor.sessions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pricing:</span>
                        <span className="font-medium">{mentor.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Availability:</span>
                        <span>{mentor.availability}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-800">
                    <div className="w-full flex gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" className="flex-1">View Profile</Button>
                        </SheetTrigger>
                        <SheetContent className="overflow-y-auto">
                          <SheetHeader className="mb-4">
                            <SheetTitle className="text-2xl font-bold">{mentor.name}</SheetTitle>
                            <SheetDescription className="text-gray-500">{mentor.title} at {mentor.organization}</SheetDescription>
                          </SheetHeader>
                          
                          <div className="flex items-center space-x-4 mb-6">
                            <Avatar className="h-16 w-16 border-2 border-pp-purple">
                              <AvatarImage src={mentor.image} alt={mentor.name} />
                              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-yellow-500">★</span>
                                <span className="font-medium">{mentor.rating}</span>
                                <span className="text-gray-500">({mentor.sessions} sessions)</span>
                              </div>
                              {mentor.location && (
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <MapPin className="h-3.5 w-3.5 mr-1" />
                                  <span>{mentor.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2 flex items-center">
                                <Briefcase className="h-4 w-4 mr-2 text-pp-purple" />
                                About
                              </h3>
                              <p className="text-sm text-gray-600">{mentor.bio}</p>
                            </div>
                            
                            {mentor.education && mentor.education.length > 0 && (
                              <div>
                                <h3 className="font-medium mb-2">Education</h3>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                  {mentor.education.map((edu, i) => (
                                    <li key={i}>{edu}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {mentor.achievements && mentor.achievements.length > 0 && (
                              <div>
                                <h3 className="font-medium mb-2">Achievements</h3>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                  {mentor.achievements.map((achievement, i) => (
                                    <li key={i}>{achievement}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            <div>
                              <h3 className="font-medium mb-2">Expertise</h3>
                              <div className="flex flex-wrap gap-2">
                                {mentor.expertise.map((skill, index) => (
                                  <Badge key={index} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <h3 className="font-medium mb-2">Session Information</h3>
                              <div className="text-sm space-y-2">
                                <div className="flex justify-between">
                                  <span>Price:</span>
                                  <span className="font-medium">{mentor.price}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Availability:</span>
                                  <span>{mentor.availability}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Languages:</span>
                                  <span>
                                    {mentor.languages ? mentor.languages.join(", ") : "English"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <Separator className="my-6" />
                          
                          <div className="space-y-4">
                            <h3 className="font-medium">Contact Information</h3>
                            
                            {mentor.email && (
                              <Button variant="outline" className="w-full justify-start" asChild>
                                <a href={`mailto:${mentor.email}`}>
                                  <Mail className="h-4 w-4 mr-2" />
                                  {mentor.email}
                                </a>
                              </Button>
                            )}
                            
                            {mentor.phone && (
                              <Button variant="outline" className="w-full justify-start" asChild>
                                <a href={`tel:${mentor.phone}`}>
                                  <Phone className="h-4 w-4 mr-2" />
                                  {mentor.phone}
                                </a>
                              </Button>
                            )}
                          </div>
                          
                          <SheetFooter className="mt-6">
                            <Button 
                              className="w-full bg-pp-purple hover:bg-pp-bright-purple"
                              onClick={() => handleBookSession(mentor)}
                            >
                              Book a Session
                            </Button>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                      
                      <Dialog open={showBookingForm && selectedMentor?.id === mentor.id} onOpenChange={setShowBookingForm}>
                        <DialogTrigger asChild>
                          <Button className="flex-1 bg-pp-purple hover:bg-pp-bright-purple" onClick={() => handleBookSession(mentor)}>
                            Book Session
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Book a Session with {selectedMentor?.name}</DialogTitle>
                            <DialogDescription>
                              Fill in the details below to schedule your mentoring session.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleSubmitBooking}>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <label htmlFor="date" className="text-sm font-medium">
                                  Preferred Date
                                </label>
                                <Input 
                                  id="date" 
                                  type="date" 
                                  required 
                                  min={new Date().toISOString().split('T')[0]} 
                                />
                              </div>
                              <div className="grid gap-2">
                                <label htmlFor="time" className="text-sm font-medium">
                                  Preferred Time
                                </label>
                                <Input id="time" type="time" required />
                              </div>
                              <div className="grid gap-2">
                                <label htmlFor="duration" className="text-sm font-medium">
                                  Duration
                                </label>
                                <Select defaultValue="60">
                                  <SelectTrigger id="duration">
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="30">30 minutes</SelectItem>
                                    <SelectItem value="60">60 minutes</SelectItem>
                                    <SelectItem value="90">90 minutes</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <label htmlFor="topic" className="text-sm font-medium">
                                  Session Topic
                                </label>
                                <Input id="topic" placeholder="What would you like to discuss?" required />
                              </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md mb-4">
                              <h4 className="text-sm font-medium mb-2">Session Details</h4>
                              <p className="text-sm flex items-center text-gray-700">
                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                {selectedMentor?.availability}
                              </p>
                              <p className="text-sm flex items-center text-gray-700 mt-1">
                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                60 minutes
                              </p>
                              <p className="text-sm flex items-center font-medium text-gray-900 mt-1">
                                <span className="h-4 w-4 mr-2" />
                                {selectedMentor?.price}
                              </p>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" type="button" onClick={() => setShowBookingForm(false)}>
                                Cancel
                              </Button>
                              <Button type="submit" className="bg-pp-purple hover:bg-pp-bright-purple">
                                Confirm Booking
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">No mentors found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
