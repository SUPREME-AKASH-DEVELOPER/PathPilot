
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, GraduationCap, Clock, Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
}

interface RecommendedMentorsProps {
  careerCategory: string;
}

// Expanded mentor data with consistent images
const mentors: Record<string, Mentor[]> = {
  technical: [
    {
      id: "m1",
      name: "Dr. Rajesh Kumar",
      title: "Lead Software Engineer",
      organization: "Google India",
      specialties: ["AI", "Machine Learning", "Software Engineering"],
      rating: 4.9,
      imageUrl: "/lovable-uploads/a6630385-9451-4df1-bc1d-12056584b9ff.png",
      availability: "Next available: Tomorrow",
      experience: 12
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
      experience: 8
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
      experience: 15
    }
  ],
  creative: [
    {
      id: "m4",
      name: "Aisha Kapoor",
      title: "Creative Director",
      organization: "Design Mantra Studio",
      specialties: ["UX/UI Design", "Brand Identity", "Visual Design"],
      rating: 4.9,
      imageUrl: "/lovable-uploads/2349adf1-c21c-46b1-9619-c83a0e04ca6e.png",
      availability: "Next available: Tomorrow",
      experience: 10
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
      experience: 7
    }
  ],
  business: [
    {
      id: "m6",
      name: "Sunil Chopra",
      title: "Investment Banker",
      organization: "Global Finance India",
      specialties: ["Finance", "Economics", "Investment Strategy"],
      rating: 4.8,
      imageUrl: "/lovable-uploads/a6630385-9451-4df1-bc1d-12056584b9ff.png",
      availability: "Next available: Next week",
      experience: 14
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
      experience: 9
    }
  ],
  healthcare: [
    {
      id: "m8",
      name: "Dr. Anand Patel",
      title: "Medical Director",
      organization: "Apollo Hospitals",
      specialties: ["Medicine", "Healthcare Management", "Research"],
      rating: 4.9,
      imageUrl: "/lovable-uploads/a6630385-9451-4df1-bc1d-12056584b9ff.png",
      availability: "Next available: This week",
      experience: 18
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
      experience: 11
    }
  ],
  general: [
    {
      id: "m10",
      name: "Arjun Singh",
      title: "Career Counselor",
      organization: "Career Guidance Institute",
      specialties: ["Career Planning", "Student Counseling", "Skill Development"],
      rating: 4.9,
      imageUrl: "/lovable-uploads/a6630385-9451-4df1-bc1d-12056584b9ff.png",
      availability: "Next available: Tomorrow",
      experience: 15
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
      experience: 12
    }
  ]
};

// Helper function to determine mentor category based on career interest
const getMentorCategory = (careerCategory: string): string => {
  const categoryMap: Record<string, string> = {
    "Software Engineering": "technical",
    "Data Science": "technical",
    "Computer Science": "technical",
    "IT": "technical",
    "Engineering": "technical",
    "Design": "creative",
    "Arts": "creative",
    "Media": "creative",
    "Content": "creative",
    "Business": "business",
    "Finance": "business",
    "Marketing": "business",
    "Management": "business",
    "Economics": "business",
    "Medicine": "healthcare",
    "Healthcare": "healthcare",
    "Pharmacy": "healthcare",
    "Nursing": "healthcare"
  };

  // Look for matches in the career category
  for (const [keyword, category] of Object.entries(categoryMap)) {
    if (careerCategory.toLowerCase().includes(keyword.toLowerCase())) {
      return category;
    }
  }

  // Default to general if no match found
  return "general";
};

export default function RecommendedMentors({ careerCategory }: RecommendedMentorsProps) {
  const [recommendedMentors, setRecommendedMentors] = useState<Mentor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Determine mentor category based on career interest
    const mentorCategory = getMentorCategory(careerCategory);
    console.log(`Career category: ${careerCategory}, Mentor category: ${mentorCategory}`);
    
    // Get mentors for this category, or fall back to general if none found
    const categoryMentors = mentors[mentorCategory] || [];
    const generalMentors = mentors.general || [];
    
    // Combine mentors if needed to ensure we have enough recommendations
    let relevantMentors = [...categoryMentors];
    if (relevantMentors.length < 3) {
      // Add mentors from general category to ensure we have at least 3
      const neededFromGeneral = 3 - relevantMentors.length;
      relevantMentors = [...relevantMentors, ...generalMentors.slice(0, neededFromGeneral)];
    }
    
    console.log(`Found ${relevantMentors.length} mentors for category ${mentorCategory}`);
    setRecommendedMentors(relevantMentors.slice(0, 3)); // Show top 3 mentors
  }, [careerCategory]);

  const handleViewAllMentors = () => {
    // Save the career interest to use in the mentors page
    localStorage.setItem('careerInterest', careerCategory);
    navigate('/mentors');
  };
  
  const handleBookSession = (mentorId: string) => {
    // Store selected mentor ID in localStorage
    localStorage.setItem('selectedMentorId', mentorId);
    
    // Show success toast
    toast({
      title: "Success",
      description: `Booking session with mentor ${mentorId}`,
    });
    
    // Navigate to the mentor detail page
    navigate(`/mentors/${mentorId}`);
  };

  if (recommendedMentors.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Recommended Mentors for {careerCategory}</h3>
        <Button variant="link" className="flex items-center gap-1 text-pp-purple" onClick={handleViewAllMentors}>
          View all mentors <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendedMentors.map((mentor) => (
          <Card key={mentor.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mentor.imageUrl} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{mentor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{mentor.title}, {mentor.organization}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                <Star className="fill-amber-500 h-4 w-4" />
                <span className="text-sm font-medium">{mentor.rating}</span>
                <span className="text-xs text-muted-foreground ml-1">rating</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {mentor.specialties.slice(0, 3).map((specialty, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{specialty}</Badge>
                ))}
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>{mentor.experience} years experience</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{mentor.availability}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                className="w-full bg-pp-purple hover:bg-pp-bright-purple text-sm h-9" 
                onClick={() => handleBookSession(mentor.id)}
              >
                Book a Session
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
