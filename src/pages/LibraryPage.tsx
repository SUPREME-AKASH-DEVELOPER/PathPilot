
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerCard, { Career } from "@/components/career-library/CareerCard";
import CareerFilter from "@/components/career-library/CareerFilter";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { BarChart4, Search, Filter, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LibraryPage() {
  const { language, translations } = useLanguage();
  const navigate = useNavigate();
  
  // Enhanced career data with more options
  const [careers, setCareers] = useState<Career[]>([
    {
      id: "1",
      title: "Software Engineer",
      category: "Technical",
      description: "Design, develop and maintain software systems and applications using programming languages and development tools.",
      salary: "₹5L - ₹40L per annum",
      entranceExams: ["GATE", "Company Specific Tests"],
      colleges: ["IITs", "NITs", "BITS", "IIIT"],
      recruiters: ["TCS", "Infosys", "Google", "Microsoft"]
    },
    {
      id: "2",
      title: "Medical Doctor",
      category: "Medical",
      description: "Diagnose and treat injuries and illnesses, prescribe medications, and counsel patients on diet, hygiene, and preventive healthcare.",
      salary: "₹8L - ₹50L per annum",
      entranceExams: ["NEET-PG", "AIIMS PG", "JIPMER"],
      colleges: ["AIIMS", "CMC Vellore", "JIPMER", "MAMC"],
      recruiters: ["Apollo Hospitals", "Fortis", "Max Healthcare"]
    },
    {
      id: "3",
      title: "Civil Services Officer",
      category: "Government",
      description: "Work in various government departments and ministries to formulate and implement policies and ensure proper governance.",
      salary: "₹6L - ₹25L per annum",
      entranceExams: ["UPSC CSE", "State PSC"],
      colleges: ["LBSNAA Mussoorie", "State Administrative Training Institutes"],
      recruiters: ["Central Government", "State Governments"]
    },
    {
      id: "4",
      title: "Data Scientist",
      category: "Technical",
      description: "Analyze complex data sets to find patterns and insights that help organizations make better decisions.",
      salary: "₹6L - ₹30L per annum",
      entranceExams: ["Company Specific Tests"],
      colleges: ["IITs", "IIITs", "ISI Kolkata", "CMI"],
      recruiters: ["Amazon", "IBM", "Mu Sigma", "Flipkart"]
    },
    {
      id: "5",
      title: "Professor",
      category: "Education",
      description: "Teach students at colleges and universities, conduct research, and publish scholarly papers in their field of expertise.",
      salary: "₹7L - ₹20L per annum",
      entranceExams: ["UGC-NET", "CSIR-NET", "GATE"],
      colleges: ["Central Universities", "State Universities", "Private Universities"],
      recruiters: ["Universities", "Research Institutions", "Think Tanks"]
    },
    {
      id: "6",
      title: "Chartered Accountant",
      category: "Finance",
      description: "Provide financial advice, audit accounts, and prepare tax returns for businesses and individuals.",
      salary: "₹6L - ₹30L per annum",
      entranceExams: ["CA Foundation", "CA Intermediate", "CA Final"],
      colleges: ["ICAI Registered Colleges"],
      recruiters: ["Big 4 Accounting Firms", "Banks", "Corporate Finance Departments"]
    },
    {
      id: "7",
      title: "Fashion Designer",
      category: "Creative",
      description: "Create original clothing, accessories, and footwear designs for fashion brands or individual clients.",
      salary: "₹3L - ₹25L per annum",
      entranceExams: ["NIFT Entrance", "NID Entrance", "UCEED"],
      colleges: ["NIFT", "NID", "Pearl Academy", "Symbiosis"],
      recruiters: ["Fashion Houses", "Retail Brands", "Export Houses"]
    },
    {
      id: "8",
      title: "Digital Marketing Specialist",
      category: "Marketing",
      description: "Plan and execute online marketing campaigns to promote products and services using various digital channels.",
      salary: "₹4L - ₹20L per annum",
      entranceExams: ["CAT", "XAT", "MAT (for MBA)"],
      colleges: ["IIMs", "MICA", "Symbiosis", "SPJIMR"],
      recruiters: ["Ad Agencies", "E-commerce Companies", "Startups", "MNCs"]
    },
    {
      id: "9",
      title: "Airline Pilot",
      category: "Aviation",
      description: "Operate aircraft for passenger and cargo transport, ensuring safety and following aviation regulations.",
      salary: "₹12L - ₹60L per annum",
      entranceExams: ["DGCA CPL Exam", "Airline Specific Tests"],
      colleges: ["Indira Gandhi Rashtriya Uran Akademi", "Bombay Flying Club", "Flying Training Schools"],
      recruiters: ["Air India", "IndiGo", "SpiceJet", "Vistara"]
    },
    {
      id: "10",
      title: "Biotechnologist",
      category: "Science",
      description: "Apply biological processes to develop new products in fields like medicine, agriculture, and environmental conservation.",
      salary: "₹4L - ₹20L per annum",
      entranceExams: ["GATE (BT)", "JAM", "CSIR-NET"],
      colleges: ["IITs", "IISc", "TIFR", "NCBS"],
      recruiters: ["Pharmaceutical Companies", "Research Labs", "Biotech Startups"]
    },
    {
      id: "11",
      title: "Clinical Psychologist",
      category: "Medical",
      description: "Diagnose and treat mental, emotional, and behavioral disorders using therapeutic approaches.",
      salary: "₹5L - ₹15L per annum",
      entranceExams: ["UGC-NET", "M.Phil Entrance Tests"],
      colleges: ["NIMHANS", "TISS", "Delhi University", "Christ University"],
      recruiters: ["Hospitals", "Mental Health Centers", "Educational Institutions"]
    },
    {
      id: "12",
      title: "Environmental Engineer",
      category: "Engineering",
      description: "Develop solutions to environmental problems using engineering principles to improve air, water and soil quality.",
      salary: "₹4L - ₹15L per annum",
      entranceExams: ["GATE", "JEE Advanced"],
      colleges: ["IITs", "NITs", "BITS", "VIT"],
      recruiters: ["Government Agencies", "Consulting Firms", "Industries"]
    },
    // Adding 10 more careers below
    {
      id: "13",
      title: "Artificial Intelligence Specialist",
      category: "Technical",
      description: "Develop and implement AI systems and applications like machine learning models, neural networks, and natural language processing.",
      salary: "₹8L - ₹45L per annum",
      entranceExams: ["GATE (CS)", "GRE"],
      colleges: ["IITs", "IIITs", "IISc", "BITS"],
      recruiters: ["Google", "Microsoft", "Amazon", "AI Startups"]
    },
    {
      id: "14",
      title: "Architect",
      category: "Creative",
      description: "Design buildings and structures, combining artistic vision with technical knowledge for functionality and aesthetics.",
      salary: "₹4L - ₹25L per annum",
      entranceExams: ["NATA", "JEE (B.Arch)", "GATE (AR)"],
      colleges: ["SPA", "CEPT", "IITs", "NIT"],
      recruiters: ["Architectural Firms", "Construction Companies", "Government"]
    },
    {
      id: "15",
      title: "Investment Banker",
      category: "Finance",
      description: "Help companies and governments raise capital, provide financial advice, and facilitate mergers and acquisitions.",
      salary: "₹10L - ₹50L per annum",
      entranceExams: ["CAT", "XAT", "GMAT"],
      colleges: ["IIMs", "FMS Delhi", "XLRI", "ISB"],
      recruiters: ["JP Morgan", "Goldman Sachs", "Morgan Stanley", "HSBC"]
    },
    {
      id: "16",
      title: "Pharmacist",
      category: "Medical",
      description: "Dispense medications, advise patients on drug interactions, and ensure proper usage of prescription medicines.",
      salary: "₹3L - ₹12L per annum",
      entranceExams: ["GPAT", "NIPER JEE"],
      colleges: ["NIPER", "Jamia Hamdard", "BHU", "BITS"],
      recruiters: ["Hospitals", "Pharmacy Chains", "Pharmaceutical Companies"]
    },
    {
      id: "17",
      title: "Content Creator",
      category: "Creative",
      description: "Produce engaging digital content including videos, blogs, podcasts and social media posts for various platforms.",
      salary: "₹3L - ₹30L per annum",
      entranceExams: ["Portfolio-based Selection"],
      colleges: ["MICA", "Symbiosis", "XIC", "FTII"],
      recruiters: ["Media Houses", "Digital Agencies", "Freelance"]
    },
    {
      id: "18",
      title: "Aerospace Engineer",
      category: "Engineering",
      description: "Design, develop and test aircraft, spacecraft, satellites, and missiles using principles of physics and engineering.",
      salary: "₹6L - ₹35L per annum",
      entranceExams: ["GATE (AE)", "JEE Advanced"],
      colleges: ["IITs", "IIST", "MIT Manipal", "PEC"],
      recruiters: ["ISRO", "HAL", "DRDO", "Boeing India"]
    },
    {
      id: "19",
      title: "Cyber Security Expert",
      category: "Technical",
      description: "Protect computer systems, networks, and data from cyber threats, unauthorized access, and security breaches.",
      salary: "₹6L - ₹40L per annum",
      entranceExams: ["GATE (CS)", "CEH Certification"],
      colleges: ["IITs", "NITs", "IIIT Hyderabad", "DIAT"],
      recruiters: ["Banks", "IT Companies", "Government Agencies", "Consultancies"]
    },
    {
      id: "20",
      title: "Hotel Management Professional",
      category: "Hospitality",
      description: "Oversee operations of hotels, resorts, and other accommodation establishments to ensure excellent guest experiences.",
      salary: "₹3L - ₹20L per annum",
      entranceExams: ["NCHMCT JEE"],
      colleges: ["IHMs", "Welcomgroup", "Christ University", "Manipal"],
      recruiters: ["Taj Group", "Oberoi", "ITC Hotels", "International Chains"]
    },
    {
      id: "21",
      title: "Nutritionist",
      category: "Medical",
      description: "Provide advice on diet and food choices to help people achieve specific health-related goals and manage medical conditions.",
      salary: "₹3L - ₹15L per annum",
      entranceExams: ["AIIMS PG", "PG Entrance Tests"],
      colleges: ["Lady Irwin College", "SNDT Women's University", "Institute of Home Economics"],
      recruiters: ["Hospitals", "Fitness Centers", "Schools", "Private Practice"]
    },
    {
      id: "22",
      title: "Urban Planner",
      category: "Government",
      description: "Develop comprehensive plans and programs for land use and growth of urban and rural communities.",
      salary: "₹5L - ₹20L per annum",
      entranceExams: ["GATE (AR/PL)", "CEPT Entrance"],
      colleges: ["SPA", "CEPT", "IIT Kharagpur", "JMI"],
      recruiters: ["Municipal Corporations", "Development Authorities", "Consulting Firms"]
    }
  ]);

  const [filteredCareers, setFilteredCareers] = useState<Career[]>(careers);
  const [savedCareers, setSavedCareers] = useState<string[]>([]);
  const [educationStage, setEducationStage] = useState<string | null>(null);
  const [hasQuizResults, setHasQuizResults] = useState(false);
  const categories = Array.from(new Set(careers.map(career => career.category)));

  // Load matched careers from quiz if available
  useEffect(() => {
    // Get education stage
    const stageData = localStorage.getItem('educationStage');
    const currentStage = stageData || null;
    setEducationStage(currentStage);
    
    const matchedCareersData = localStorage.getItem('matchedCareers');
    if (matchedCareersData) {
      try {
        const matchedCareers = JSON.parse(matchedCareersData);
        setHasQuizResults(true);
        
        // Update career list with match scores from quiz results
        const updatedCareers = careers.map(career => {
          const match = matchedCareers.find((c: Career) => c.id === career.id);
          return match ? { ...career, matchScore: match.matchScore } : career;
        });
        
        // Sort by match score if available
        const sortedCareers = [...updatedCareers].sort((a, b) => 
          (b.matchScore || 0) - (a.matchScore || 0)
        );
        
        setCareers(sortedCareers);
        
        // Filter careers by match score - only show those above 40% match
        const matchedFiltered = sortedCareers.filter(career => 
          (career.matchScore || 0) >= 40
        );
        
        setFilteredCareers(matchedFiltered.length > 0 ? matchedFiltered : sortedCareers);
        
        // Show a toast notification
        toast({
          title: "Quiz results loaded",
          description: "Showing careers that match your profile.",
        });
        
        // Clear localStorage after using it
        localStorage.removeItem('matchedCareers');
      } catch (error) {
        console.error("Error parsing matched careers:", error);
      }
    }
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      // If search is cleared, apply education filter again
      if (hasQuizResults) {
        const matchingCareers = careers.filter(career => (career.matchScore || 0) >= 40);
        setFilteredCareers(matchingCareers.length > 0 ? matchingCareers : careers);
      } else {
        setFilteredCareers(careers);
      }
      return;
    }
    
    const searchResults = careers.filter((career) => 
      career.title.toLowerCase().includes(query.toLowerCase()) ||
      career.description.toLowerCase().includes(query.toLowerCase()) ||
      career.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredCareers(searchResults);
  };

  const handleFilterChange = (selectedCategories: string[]) => {
    let results = careers;
    
    // Apply category filter if categories are selected
    if (selectedCategories.length > 0) {
      results = results.filter((career) => 
        selectedCategories.includes(career.category)
      );
    }
    
    // Apply match score filter if coming from quiz
    if (hasQuizResults) {
      results = results.filter(career => (career.matchScore || 0) >= 40);
      if (results.length === 0) {
        // If no high matches, just use the category filter
        results = careers.filter((career) => 
          selectedCategories.length === 0 || selectedCategories.includes(career.category)
        );
      }
    }
    
    setFilteredCareers(results);
  };

  const handleSaveCareer = (careerId: string) => {
    // Toggle saved state
    setSavedCareers(prev => {
      if (prev.includes(careerId)) {
        // If already saved, remove it
        toast({
          title: "Career removed",
          description: "This career has been removed from your saved list.",
        });
        return prev.filter(id => id !== careerId);
      } else {
        // If not saved, add it
        toast({
          title: "Career saved",
          description: "This career has been saved to your profile.",
        });
        return [...prev, careerId];
      }
    });
  };

  const handleViewDetails = (careerId: string) => {
    // Get the career details
    const career = careers.find(c => c.id === careerId);
    if (career) {
      toast({
        title: `${career.title} details`,
        description: `Showing detailed information for ${career.title}.`,
      });
      
      // In a real app, this would navigate to a detail page
      // navigate(`/library/${careerId}`);
      
      // For now, just show more details in a toast
      toast({
        title: "Top Colleges",
        description: career.colleges.join(", "),
      });
      
      setTimeout(() => {
        toast({
          title: "Top Recruiters",
          description: career.recruiters.join(", "),
        });
      }, 500);
    }
  };

  const handleTakeQuiz = () => {
    navigate('/quiz');
  };

  const getStageLabel = () => {
    switch (educationStage) {
      case 'after10th':
        return "10th Grade";
      case 'after12th':
        return "12th Grade";
      case 'afterGraduation':
        return "Graduation";
      default:
        return "All Levels";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            {language === 'english' ? 'Career Library' : translations.hindi.careerLibraryTitle}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
            {language === 'english' 
              ? 'Explore career paths tailored for Indian students, complete with entrance exams, top colleges, and salary information.'
              : translations.hindi.exploreCareerPaths}
          </p>
          
          {hasQuizResults && (
            <div className="mb-6 max-w-2xl mx-auto">
              <Alert className="bg-pp-purple/10 border-pp-purple">
                <BarChart4 className="h-4 w-4 text-pp-purple" />
                <AlertTitle className="text-pp-purple">
                  Personalized Career Recommendations
                </AlertTitle>
                <AlertDescription className="text-gray-700 dark:text-gray-300">
                  Showing careers matched to your {getStageLabel()} profile. 
                  These recommendations are based on your quiz responses.
                </AlertDescription>
              </Alert>
            </div>
          )}
          
          {!hasQuizResults && (
            <div className="mb-6 flex justify-center">
              <Button 
                onClick={handleTakeQuiz}
                className="bg-pp-purple hover:bg-pp-bright-purple flex items-center gap-2"
              >
                <Percent className="h-4 w-4" />
                Take Career Match Quiz
              </Button>
            </div>
          )}
          
          <CareerFilter 
            onSearch={handleSearch} 
            onFilterChange={handleFilterChange}
            categories={categories}
          />
          
          {hasQuizResults && filteredCareers.length > 0 && (
            <Card className="mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-4 w-4 text-pp-purple" />
                  Showing {filteredCareers.length} careers matched to {getStageLabel()} students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  These careers are filtered based on your education level and quiz responses. 
                  The match percentage indicates how well each career aligns with your interests and aptitudes.
                </p>
              </CardContent>
            </Card>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.length > 0 ? (
              filteredCareers.map((career) => (
                <CareerCard 
                  key={career.id} 
                  career={career} 
                  onSave={() => handleSaveCareer(career.id)}
                  onViewDetails={() => handleViewDetails(career.id)}
                  isSaved={savedCareers.includes(career.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No careers found matching your criteria.
                </p>
                {hasQuizResults && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFilteredCareers(careers);
                      setHasQuizResults(false);
                    }}
                  >
                    View All Careers Instead
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
