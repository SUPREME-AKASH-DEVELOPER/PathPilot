
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
}

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const mentors: Mentor[] = [
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
    },
    {
      id: "3",
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
      image: "/placeholder.svg"
    },
    {
      id: "4",
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
      image: "/placeholder.svg"
    },
    {
      id: "5",
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
      image: "/placeholder.svg"
    },
    {
      id: "6",
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
      image: "/placeholder.svg"
    },
  ];

  const filteredMentors = searchQuery 
    ? mentors.filter(mentor => 
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.organization.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mentors;

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
          
          <div className="relative max-w-md mx-auto mb-10">
            <Input
              type="text"
              placeholder="Search by name, expertise, or organization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                      <Button variant="outline" className="flex-1">View Profile</Button>
                      <Button className="flex-1 bg-pp-purple hover:bg-pp-bright-purple">
                        Book Session
                      </Button>
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
