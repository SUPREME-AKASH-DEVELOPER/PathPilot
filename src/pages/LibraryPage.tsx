import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import CareerFilter from "@/components/career-library/CareerFilter";
import CareerCard, { Career } from "@/components/career-library/CareerCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Bookmark, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

const careerData: Career[] = [
  {
    id: "1",
    title: "Software Engineer",
    category: "Technical",
    description: "Design, develop, and maintain software systems and applications using programming languages and development tools.",
    salary: "₹5,00,000 - ₹25,00,000 per annum",
    entranceExams: ["GATE", "Company-specific tests"],
    colleges: ["IITs", "NITs", "BITS", "Regional Engineering Colleges"],
    recruiters: ["TCS", "Infosys", "Google", "Microsoft", "Amazon"],
    matchScore: 92,
  },
  {
    id: "2",
    title: "Data Scientist",
    category: "Technical",
    description: "Analyze complex data sets to find patterns and insights that help organizations make better decisions.",
    salary: "₹6,00,000 - ₹20,00,000 per annum",
    entranceExams: ["GATE", "Company-specific tests", "Analytics certifications"],
    colleges: ["IITs", "IIMs", "ISI Kolkata", "BITS"],
    recruiters: ["Amazon", "Flipkart", "MuSigma", "IBM"],
    matchScore: 88,
  },
  {
    id: "3",
    title: "Doctor (MBBS)",
    category: "Medical",
    description: "Diagnose and treat illnesses, prescribe medications, and provide preventive care to patients.",
    salary: "₹8,00,000 - ₹30,00,000+ per annum",
    entranceExams: ["NEET-UG", "AIIMS MBBS"],
    colleges: ["AIIMS", "CMC Vellore", "JIPMER", "Government Medical Colleges"],
    recruiters: ["Government Hospitals", "Private Hospitals", "Research Institutions"],
    matchScore: 75,
  },
  {
    id: "4",
    title: "Chartered Accountant",
    category: "Finance",
    description: "Provide financial advice, audit accounts, and prepare financial reports for individuals and businesses.",
    salary: "₹6,00,000 - ₹20,00,000+ per annum",
    entranceExams: ["CA Foundation", "CA Intermediate", "CA Final"],
    colleges: ["ICAI (Institute of Chartered Accountants of India)"],
    recruiters: ["Big 4 (Deloitte, EY, KPMG, PwC)", "Banks", "Financial Institutions"],
    matchScore: 82,
  },
  {
    id: "5",
    title: "Civil Services Officer (IAS/IPS)",
    category: "Government",
    description: "Administer government policies, maintain law and order, and implement development programs.",
    salary: "₹56,100 - ₹2,50,000 per month + perks",
    entranceExams: ["UPSC Civil Services Examination"],
    colleges: ["LBSNAA Mussoorie (for IAS)", "SVP NPA Hyderabad (for IPS)"],
    recruiters: ["Government of India"],
    matchScore: 79,
  },
  {
    id: "6",
    title: "UI/UX Designer",
    category: "Creative",
    description: "Design user interfaces and experiences for websites, mobile apps, and other digital products.",
    salary: "₹4,00,000 - ₹18,00,000 per annum",
    entranceExams: ["College-specific entrance exams", "Portfolio-based admissions"],
    colleges: ["NID", "NIFT", "IIT Bombay (IDC)", "Srishti Institute"],
    recruiters: ["Tech Companies", "Design Agencies", "Product Companies"],
    matchScore: 90,
  },
  {
    id: "7",
    title: "Digital Marketing Specialist",
    category: "Marketing",
    description: "Develop and implement marketing strategies across digital channels to promote products and services.",
    salary: "₹3,50,000 - ₹15,00,000 per annum",
    entranceExams: ["CAT/XAT (for MBA)", "Company-specific tests"],
    colleges: ["IIMs", "XLRI", "SPJIMR", "FMS Delhi"],
    recruiters: ["Advertising Agencies", "E-commerce Companies", "Digital Marketing Firms"],
    matchScore: 85,
  },
  {
    id: "8",
    title: "Commercial Pilot",
    category: "Aviation",
    description: "Fly and navigate aircraft for airlines, carrying passengers and cargo to various destinations.",
    salary: "₹15,00,000 - ₹40,00,000+ per annum",
    entranceExams: ["DGCA CPL Examination", "Airline-specific tests"],
    colleges: ["Indira Gandhi Rashtriya Uran Akademi", "Bombay Flying Club", "Rajiv Gandhi Aviation Academy"],
    recruiters: ["Air India", "IndiGo", "SpiceJet", "Vistara"],
    matchScore: 70,
  },
  {
    id: "9",
    title: "Biotechnologist",
    category: "Science",
    description: "Apply biological systems and organisms to develop products and processes for various industries.",
    salary: "₹4,00,000 - ₹15,00,000 per annum",
    entranceExams: ["GATE", "JNU Entrance", "IIT JAM"],
    colleges: ["IITs", "JNU", "University of Delhi", "TIFR"],
    recruiters: ["Pharmaceutical Companies", "Research Institutions", "Biotech Firms"],
    matchScore: 76,
  },
  {
    id: "10",
    title: "Architecture",
    category: "Engineering",
    description: "Design buildings and structures, considering aesthetics, functionality, safety, and sustainability.",
    salary: "₹4,50,000 - ₹20,00,000+ per annum",
    entranceExams: ["NATA", "JEE Main Paper 2"],
    colleges: ["SPA Delhi", "IIT Kharagpur", "CEPT University", "Sir JJ College of Architecture"],
    recruiters: ["Architecture Firms", "Construction Companies", "Government Agencies"],
    matchScore: 83,
  },
  {
    id: "11",
    title: "Hotel Management",
    category: "Hospitality",
    description: "Manage operations of hotels, resorts, and other accommodation establishments to ensure guest satisfaction.",
    salary: "₹3,00,000 - ₹15,00,000+ per annum",
    entranceExams: ["NCHMCT JEE", "Institution-specific tests"],
    colleges: ["IHM Mumbai", "IHM Bangalore", "IHM Chennai", "IHM Delhi"],
    recruiters: ["Taj Group", "Oberoi Hotels", "Marriott", "International Hotel Chains"],
    matchScore: 78,
  },
  {
    id: "12",
    title: "Teacher/Professor",
    category: "Education",
    description: "Educate students at various academic levels, develop curriculum, and assess student progress.",
    salary: "₹3,00,000 - ₹18,00,000+ per annum",
    entranceExams: ["NET/SET/SLET", "CTET/STET (for school teachers)"],
    colleges: ["Central Universities", "State Universities", "B.Ed Colleges"],
    recruiters: ["Schools", "Colleges", "Universities", "EdTech Companies"],
    matchScore: 87,
  },
];

export default function LibraryPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>(careerData);
  const [savedCareers, setSavedCareers] = useState<Career[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [personalRecommendations, setPersonalRecommendations] = useState<Career[]>([]);
  
  // Get all available categories from the career data
  const categories = Array.from(new Set(careerData.map(career => career.category)));
  
  useEffect(() => {
    // Load saved careers from localStorage
    const savedCareerIds = JSON.parse(localStorage.getItem("savedCareers") || "[]");
    const loadedSavedCareers = careerData.filter(career => 
      savedCareerIds.includes(career.id)
    );
    setSavedCareers(loadedSavedCareers);
    
    // Load personalized recommendations with better handling
    loadRecommendations();
    
    filterCareers(searchQuery, selectedCategories);
  }, []);
  
  // Improved recommendation loading with better fallbacks
  const loadRecommendations = () => {
    try {
      // Check for direct quiz results from local storage
      const storedMatchedCareers = localStorage.getItem('matchedCareers');
      
      if (storedMatchedCareers) {
        // Parse stored careers
        const parsedRecommendations = JSON.parse(storedMatchedCareers);
        
        // Verify we got valid career data with match scores
        if (Array.isArray(parsedRecommendations) && 
            parsedRecommendations.length > 0 && 
            parsedRecommendations[0].title && 
            parsedRecommendations[0].matchScore) {
          
          console.log("Using quiz recommendations:", parsedRecommendations);
          // Create a deep copy to avoid reference issues
          const recommendationsWithFullData = parsedRecommendations.map(rec => {
            // Find the full career data if possible
            const fullCareerData = careerData.find(c => c.id === rec.id) || 
                                  careerData.find(c => c.title === rec.title);
            
            if (fullCareerData) {
              // Combine data, preferring the stored match score
              return {
                ...fullCareerData,
                matchScore: rec.matchScore
              };
            }
            return rec; // Use stored data if full data not found
          });
          
          setPersonalRecommendations(recommendationsWithFullData);
          return;
        }
      }
      
      // If we didn't return yet, generate fallback recommendations
      console.log("Generating fallback recommendations");
      generateRecommendations();
      
    } catch (error) {
      console.error("Error loading recommendations:", error);
      generateRecommendations();
    }
  };
  
  // Generate recommendations based on career match score or random selection
  const generateRecommendations = () => {
    // Create a copy of career data to avoid modifying original
    let recommendedCareers = [...careerData];
    
    // Add random match scores (60-95) if none exists
    recommendedCareers = recommendedCareers.map(career => ({
      ...career,
      matchScore: career.matchScore || Math.floor(Math.random() * 36) + 60
    }));
    
    // Sort by match score 
    recommendedCareers = recommendedCareers.sort((a, b) => 
      ((b.matchScore || 0) - (a.matchScore || 0))
    );
    
    // Select top 5-6 careers from diverse categories
    const finalRecommendations: Career[] = [];
    const selectedCategories = new Set<string>();
    
    // First try to get unique categories
    for (const career of recommendedCareers) {
      if (finalRecommendations.length >= 6) break;
      
      // If we haven't selected from this category yet, add it
      if (!selectedCategories.has(career.category)) {
        finalRecommendations.push(career);
        selectedCategories.add(career.category);
      }
    }
    
    // If we didn't get enough, add more from top scores
    if (finalRecommendations.length < 5) {
      for (const career of recommendedCareers) {
        if (finalRecommendations.length >= 6) break;
        if (!finalRecommendations.some(c => c.id === career.id)) {
          finalRecommendations.push(career);
        }
      }
    }
    
    // Final sort by match score
    finalRecommendations.sort((a, b) => ((b.matchScore || 0) - (a.matchScore || 0)));
    
    // Store these recommendations in localStorage as a fallback
    localStorage.setItem('fallbackRecommendations', JSON.stringify(finalRecommendations));
    
    setPersonalRecommendations(finalRecommendations);
  };

  useEffect(() => {
    filterCareers(searchQuery, selectedCategories);
  }, [searchQuery, selectedCategories]);

  const filterCareers = (query: string, categories: string[]) => {
    let results = [...careerData];

    // Filter by search query
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      results = results.filter(
        career => 
          career.title.toLowerCase().includes(lowerCaseQuery) || 
          career.description.toLowerCase().includes(lowerCaseQuery) ||
          career.category.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Filter by categories
    if (categories.length > 0) {
      results = results.filter(career => categories.includes(career.category));
    }

    setFilteredCareers(results);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleSaveCareer = (career: Career) => {
    if (isCareerSaved(career.id)) {
      const updatedSavedCareers = savedCareers.filter(saved => saved.id !== career.id);
      setSavedCareers(updatedSavedCareers);
      localStorage.setItem("savedCareers", JSON.stringify(updatedSavedCareers.map(c => c.id)));
      
      toast({
        title: t("removedFromSaved"),
        description: `${career.title} ${t("hasBeenRemoved")}`,
        duration: 3000,
      });
    } else {
      const updatedSavedCareers = [...savedCareers, career];
      setSavedCareers(updatedSavedCareers);
      localStorage.setItem("savedCareers", JSON.stringify(updatedSavedCareers.map(c => c.id)));
      
      toast({
        title: t("savedSuccessfully"),
        description: `${career.title} ${t("hasBeenSaved")}`,
        duration: 3000,
      });
    }
  };

  const handleViewDetails = (career: Career) => {
    setSelectedCareer(career);
    setIsDetailsOpen(true);
  };

  const isCareerSaved = (id: string) => {
    return savedCareers.some(career => career.id === id);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="bg-gradient-to-r from-pp-purple to-pp-bright-purple py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("careerLibraryTitle")}</h1>
            <p className="text-xl">{t("exploreCareerPaths")}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                {t("yourRecommendations")}
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                {t("exploreCareers")}
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                {t("saved")}
              </TabsTrigger>
            </TabsList>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold mb-3 text-pp-purple dark:text-pp-bright-purple">
                  {t("personalizedForYou")}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t("basedOnQuizResults")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {personalRecommendations.length > 0 ? (
                    personalRecommendations.map(career => (
                      <motion.div
                        key={career.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <CareerCard
                          career={career}
                          onSave={handleSaveCareer}
                          onViewDetails={handleViewDetails}
                          isSaved={isCareerSaved(career.id)}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">
                        {t("takeQuizForPersonalized")}
                      </p>
                      <Button 
                        className="mt-4 bg-pp-purple hover:bg-pp-bright-purple"
                        onClick={() => window.location.href = '/quiz'}
                      >
                        {t("takeCareerQuiz")}
                      </Button>
                    </div>
                  )}
                </div>
                <div className="text-center mt-6">
                  <Button 
                    variant="outline" 
                    className="border-pp-purple text-pp-purple hover:bg-pp-purple/10"
                    onClick={() => setActiveTab('all')}
                  >
                    {t("exploreAllCareers")}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* All Careers Tab */}
            <TabsContent value="all">
              <CareerFilter
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                categories={categories}
              />

              {filteredCareers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCareers.map(career => (
                    <motion.div
                      key={career.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CareerCard
                        career={career}
                        onSave={handleSaveCareer}
                        onViewDetails={handleViewDetails}
                        isSaved={isCareerSaved(career.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">{t("noResults")}</h3>
                  <p className="text-gray-500">{t("tryAdjusting")}</p>
                </div>
              )}
            </TabsContent>

            {/* Saved Careers Tab */}
            <TabsContent value="saved">
              {savedCareers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedCareers.map(career => (
                    <motion.div
                      key={career.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CareerCard
                        career={career}
                        onSave={handleSaveCareer}
                        onViewDetails={handleViewDetails}
                        isSaved={true}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">{t("noSavedCareers")}</h3>
                  <p className="text-gray-500">{t("browseCareersToSave")}</p>
                  <Button 
                    className="mt-4 bg-pp-purple hover:bg-pp-bright-purple"
                    onClick={() => setActiveTab('all')}
                  >
                    {t("browseCareers")}
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Career Details Dialog */}
        {selectedCareer && (
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="max-w-3xl overflow-y-auto max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedCareer.title}
                </DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-pp-purple/10 text-pp-purple rounded-full text-xs">
                      {selectedCareer.category}
                    </span>
                    {selectedCareer.matchScore && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">
                        {selectedCareer.matchScore}% {t("match")}
                      </span>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">{t("description")}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {selectedCareer.description}
                </p>

                <h3 className="font-semibold text-lg mb-2">{t("salaryRange")}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {selectedCareer.salary}
                </p>

                <h3 className="font-semibold text-lg mb-2">{t("entranceExams")}</h3>
                <ul className="list-disc pl-5 mb-4">
                  {selectedCareer.entranceExams.map((exam, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{exam}</li>
                  ))}
                </ul>

                <h3 className="font-semibold text-lg mb-2">{t("topColleges")}</h3>
                <ul className="list-disc pl-5 mb-4">
                  {selectedCareer.colleges.map((college, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{college}</li>
                  ))}
                </ul>

                <h3 className="font-semibold text-lg mb-2">{t("topRecruiters")}</h3>
                <ul className="list-disc pl-5 mb-6">
                  {selectedCareer.recruiters.map((recruiter, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{recruiter}</li>
                  ))}
                </ul>

                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    variant={isCareerSaved(selectedCareer.id) ? "default" : "outline"}
                    className={isCareerSaved(selectedCareer.id) ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => handleSaveCareer(selectedCareer)}
                  >
                    {isCareerSaved(selectedCareer.id) ? t("saved") : t("save")}
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline">{t("close")}</Button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
      <Footer />
    </>
  );
}
