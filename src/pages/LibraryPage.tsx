
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerCard, { Career } from "@/components/career-library/CareerCard";
import CareerFilter from "@/components/career-library/CareerFilter";

export default function LibraryPage() {
  // Sample career data
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
  ]);

  const [filteredCareers, setFilteredCareers] = useState<Career[]>(careers);
  const categories = ["Technical", "Medical", "Government", "Education"];

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredCareers(careers);
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
    if (selectedCategories.length === 0) {
      setFilteredCareers(careers);
      return;
    }
    
    const filteredResults = careers.filter((career) => 
      selectedCategories.includes(career.category)
    );
    
    setFilteredCareers(filteredResults);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            Career Library
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Explore 100+ career paths tailored for Indian students, complete with entrance exams, top colleges, and salary information.
          </p>
          
          <CareerFilter 
            onSearch={handleSearch} 
            onFilterChange={handleFilterChange}
            categories={categories}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.length > 0 ? (
              filteredCareers.map((career) => (
                <CareerCard key={career.id} career={career} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">No careers found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
