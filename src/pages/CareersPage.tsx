
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerFilter from "@/components/career-library/CareerFilter";
import CareerCard, { Career } from "@/components/career-library/CareerCard";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Search, 
  X, 
  Save, 
  Star, 
  TrendingUp, 
  GraduationCap, 
  PieChart, 
  Palette, 
  Plane, 
  Microscope, 
  Leaf, 
  BookOpen, 
  Info 
} from "lucide-react";
import careerPaths from "@/data/careers";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CareersPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCareers, setFilteredCareers] = useState<Career[]>(careerPaths);
  const [savedCareers, setSavedCareers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const careersPerPage = 12;
  
  // Load saved careers from localStorage on component mount
  useEffect(() => {
    const savedCareerIds = localStorage.getItem('savedCareers');
    if (savedCareerIds) {
      setSavedCareers(JSON.parse(savedCareerIds));
    }
  }, []);

  // Save careers to localStorage whenever savedCareers changes
  useEffect(() => {
    localStorage.setItem('savedCareers', JSON.stringify(savedCareers));
  }, [savedCareers]);
  
  // Extract all unique categories
  const categories = Array.from(new Set(careerPaths.map(career => career.category)));
  
  // Handle search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  // Handle filter changes
  const handleFilterChange = (filters: string[]) => {
    setSelectedCategories(filters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page on tab change
  };
  
  // Filter careers based on search query, selected categories, and active tab
  useEffect(() => {
    let filtered = careerPaths;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(career => 
        career.title.toLowerCase().includes(query) || 
        career.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(career => selectedCategories.includes(career.category));
    }
    
    // Apply saved filter if active tab is "saved"
    if (activeTab === "saved") {
      filtered = filtered.filter(career => savedCareers.includes(career.id));
    }
    
    setFilteredCareers(filtered);
  }, [searchQuery, selectedCategories, savedCareers, activeTab]);
  
  // Calculate current careers to display
  const indexOfLastCareer = currentPage * careersPerPage;
  const indexOfFirstCareer = indexOfLastCareer - careersPerPage;
  const currentCareers = filteredCareers.slice(indexOfFirstCareer, indexOfLastCareer);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Handle save career
  const handleSaveCareer = (career: Career) => {
    setSavedCareers(prev => {
      if (prev.includes(career.id)) {
        toast({
          title: "Career removed from saved list",
          description: "You can always save it again later.",
        });
        return prev.filter(id => id !== career.id);
      } else {
        toast({
          title: "Career saved successfully",
          description: "You can find it in your saved careers tab.",
        });
        return [...prev, career.id];
      }
    });
  };
  
  // View career details
  const handleViewDetails = (career: Career) => {
    setSelectedCareer(career);
    setShowDetailsDialog(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-gradient-to-r from-pp-purple to-purple-600 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t("careerLibraryTitle")}
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
                {t("exploreCareerPaths")} - {filteredCareers.length} {t("careerPaths")}
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Filters and search */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <CareerFilter 
              onSearch={handleSearch} 
              onFilterChange={handleFilterChange}
              categories={categories}
            />
            
            {/* Career tabs */}
            <div className="mb-6">
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Careers</TabsTrigger>
                  <TabsTrigger value="saved">Saved Careers ({savedCareers.length})</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Career cards */}
            <div className="mb-8">
              {currentCareers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCareers.map((career) => (
                    <motion.div
                      key={career.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CareerCard 
                        career={career}
                        onSave={handleSaveCareer}
                        onViewDetails={handleViewDetails}
                        isSaved={savedCareers.includes(career.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {activeTab === "saved" ? "No saved careers yet" : t("noResults")}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {activeTab === "saved" 
                      ? "Start saving careers that interest you!" 
                      : t("tryAdjusting")}
                  </p>
                  <Button 
                    className="mt-4 bg-pp-purple hover:bg-pp-bright-purple"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategories([]);
                      if (activeTab === "saved") {
                        setActiveTab("all");
                      }
                    }}
                  >
                    {activeTab === "saved" ? "View All Careers" : t("resetFilters")}
                  </Button>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {filteredCareers.length > careersPerPage && (
              <div className="flex justify-center mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredCareers.length / careersPerPage)}
                  onPageChange={paginate}
                />
              </div>
            )}
            
            <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
              <p>Showing {indexOfFirstCareer + 1} - {Math.min(indexOfLastCareer, filteredCareers.length)} of {filteredCareers.length} careers</p>
            </div>
          </div>
        </section>
        
        {/* Career facts section */}
        <section className="bg-gray-50 dark:bg-gray-800 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block p-3 rounded-full bg-pp-purple/10 mb-3">
                <Briefcase className="h-6 w-6 text-pp-purple" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Why explore various career options?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Make informed choices
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Exploring various careers helps you understand your options and make decisions aligned with your strengths and interests.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Discover emerging fields
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Many exciting career paths didn't exist a decade ago. Stay updated with emerging opportunities for better future prospects.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Plan your education efficiently
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Understanding career requirements helps you choose the right courses, exams, and institutions for your desired profession.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Career Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl md:text-2xl">{selectedCareer?.title}</DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
            <div className="flex items-center mt-1">
              <div className="flex items-center px-2 py-1 rounded-full bg-pp-purple/10 text-pp-purple">
                {selectedCareer && getCategoryIcon(selectedCareer.category)}
                <span className="text-xs ml-1">{selectedCareer?.category}</span>
              </div>
              {selectedCareer?.matchScore && (
                <span className="ml-2 text-sm text-gray-500">
                  {selectedCareer.matchScore}% match with your profile
                </span>
              )}
            </div>
          </DialogHeader>
          
          {selectedCareer && (
            <div className="mt-4 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedCareer.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Salary Range</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedCareer.salary}
                </p>
              </div>
              
              {selectedCareer.entranceExams.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Entrance Exams</h3>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                    {selectedCareer.entranceExams.map((exam, index) => (
                      <li key={index}>{exam}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedCareer.colleges.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Recommended Colleges</h3>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                    {selectedCareer.colleges.map((college, index) => (
                      <li key={index}>{college}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedCareer.recruiters.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Top Recruiters</h3>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                    {selectedCareer.recruiters.map((recruiter, index) => (
                      <li key={index}>{recruiter}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="pt-4 flex justify-end gap-3 border-t">
                <Button 
                  variant={savedCareers.includes(selectedCareer.id) ? "default" : "outline"}
                  className={savedCareers.includes(selectedCareer.id) ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => handleSaveCareer(selectedCareer)}
                >
                  <Save className="h-4 w-4 mr-1" />
                  {savedCareers.includes(selectedCareer.id) ? "Saved" : "Save"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );

  function getCategoryIcon(category: string) {
    switch (category.toLowerCase()) {
      case 'technical':
        return <Briefcase className="h-5 w-5" />;
      case 'medical':
        return <Star className="h-5 w-5" />;
      case 'government':
        return <TrendingUp className="h-5 w-5" />;
      case 'education':
        return <GraduationCap className="h-5 w-5" />;
      case 'finance':
        return <PieChart className="h-5 w-5" />;
      case 'creative':
        return <Palette className="h-5 w-5" />;
      case 'marketing':
        return <TrendingUp className="h-5 w-5" />;
      case 'aviation':
        return <Plane className="h-5 w-5" />;
      case 'science':
        return <Microscope className="h-5 w-5" />;
      case 'engineering':
        return <Leaf className="h-5 w-5" />;
      case 'hospitality':
        return <BookOpen className="h-5 w-5" />; 
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  }
}
