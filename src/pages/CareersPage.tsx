
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerFilter from "@/components/career-library/CareerFilter";
import CareerCard, { Career } from "@/components/career-library/CareerCard";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Briefcase, Search } from "lucide-react";
import careerPaths from "@/data/careers";
import { toast } from "@/components/ui/use-toast";

export default function CareersPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCareers, setFilteredCareers] = useState<Career[]>(careerPaths);
  const [savedCareers, setSavedCareers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const careersPerPage = 12;
  
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
  
  // Filter careers based on search query and selected categories
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
    
    setFilteredCareers(filtered);
  }, [searchQuery, selectedCategories]);
  
  // Calculate current careers to display
  const indexOfLastCareer = currentPage * careersPerPage;
  const indexOfFirstCareer = indexOfLastCareer - careersPerPage;
  const currentCareers = filteredCareers.slice(indexOfFirstCareer, indexOfLastCareer);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Handle save career
  const handleSaveCareer = (careerId: string) => {
    setSavedCareers(prev => {
      if (prev.includes(careerId)) {
        toast({
          title: "Career removed from saved list",
          description: "You can always save it again later.",
        });
        return prev.filter(id => id !== careerId);
      } else {
        toast({
          title: "Career saved successfully",
          description: "You can find it in your saved careers.",
        });
        return [...prev, careerId];
      }
    });
  };
  
  // View career details
  const handleViewDetails = (careerId: string) => {
    // In a future implementation, this would navigate to a detailed view
    toast({
      title: "Career Details",
      description: "This feature will be implemented in the next update.",
    });
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
                        onSave={() => handleSaveCareer(career.id)}
                        onViewDetails={() => handleViewDetails(career.id)}
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
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{t("noResults")}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {t("tryAdjusting")}
                  </p>
                  <Button 
                    className="mt-4 bg-pp-purple hover:bg-pp-bright-purple"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategories([]);
                    }}
                  >
                    {t("resetFilters")}
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
      
      <Footer />
    </div>
  );
}
