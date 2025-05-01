
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerFilter from "@/components/career-library/CareerFilter";
import CareerCard, { Career } from "@/components/career-library/CareerCard";

const sampleCareers: Career[] = [
  {
    id: "1",
    title: "Data Scientist",
    category: "Technical",
    description: "Analyze complex data to help businesses make better decisions. Combine statistics, programming, and domain expertise to extract insights from data.",
    salary: "₹8,00,000 - ₹25,00,000 per annum",
    entranceExams: ["GATE", "GRE"],
    colleges: ["IITs", "NITs", "IIITs", "BITS"],
    recruiters: ["Amazon", "Microsoft", "Google", "IBM"],
    matchScore: 92
  },
  {
    id: "2",
    title: "Medical Officer",
    category: "Medical",
    description: "Provide healthcare services in hospitals, clinics, or government health centers. Diagnose and treat illnesses, prescribe medications, and educate patients.",
    salary: "₹6,00,000 - ₹12,00,000 per annum (Government), ₹8,00,000 - ₹20,00,000 (Private)",
    entranceExams: ["NEET-PG", "AIIMS PG"],
    colleges: ["AIIMS", "JIPMER", "CMC Vellore", "AFMC"],
    recruiters: ["Government Hospitals", "Apollo", "Fortis", "Max Healthcare"],
    matchScore: 78
  },
  {
    id: "3",
    title: "Civil Services Officer",
    category: "Government",
    description: "Work in administrative positions within the Indian government. Shape and implement policies, oversee public services, and work towards national development.",
    salary: "₹56,100 - ₹2,50,000 per month (depends on position and grade)",
    entranceExams: ["UPSC Civil Services Exam", "State PSC Exams"],
    colleges: ["Lal Bahadur Shastri National Academy of Administration", "State Administrative Training Institutes"],
    recruiters: ["Government of India", "State Governments"],
    matchScore: 85
  },
  {
    id: "4",
    title: "UI/UX Designer",
    category: "Technical",
    description: "Create user-friendly digital interfaces by combining visual design, interaction design, and user research to enhance user experience with products and services.",
    salary: "₹5,00,000 - ₹18,00,000 per annum",
    entranceExams: ["NID DAT", "CEED", "UCEED"],
    colleges: ["NID", "IIT Bombay", "IIT Delhi", "IDC School of Design"],
    recruiters: ["Amazon", "Flipkart", "Google", "Microsoft", "Startups"],
    matchScore: 89
  },
  {
    id: "5",
    title: "Professor/Lecturer",
    category: "Education",
    description: "Teach and mentor students at colleges and universities. Conduct research in your field of expertise and contribute to academic literature and knowledge.",
    salary: "₹4,50,000 - ₹15,00,000 per annum",
    entranceExams: ["UGC NET", "CSIR NET", "GATE", "JRF"],
    colleges: ["Central Universities", "State Universities", "IITs", "NITs"],
    recruiters: ["Universities", "Colleges", "Research Institutions"],
    matchScore: 76
  },
  {
    id: "6",
    title: "Financial Analyst",
    category: "Finance",
    description: "Analyze financial data to guide investment decisions, evaluate business opportunities, and provide insights for financial planning and strategy.",
    salary: "₹6,00,000 - ₹20,00,000 per annum",
    entranceExams: ["CAT", "XAT", "CFA", "FRM"],
    colleges: ["IIMs", "XLRI", "FMS", "JBIMS"],
    recruiters: ["HDFC Bank", "ICICI Bank", "JP Morgan", "Goldman Sachs"],
    matchScore: 82
  }
];

const CareersPage = () => {
  const [filteredCareers, setFilteredCareers] = useState<Career[]>(sampleCareers);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const allCategories = Array.from(new Set(sampleCareers.map(career => career.category)));
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterCareers(query, activeFilters);
  };
  
  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
    filterCareers(searchQuery, filters);
  };
  
  const filterCareers = (query: string, filters: string[]) => {
    let result = [...sampleCareers];
    
    // Apply text search
    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(career => 
        career.title.toLowerCase().includes(lowerQuery) || 
        career.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Apply category filters
    if (filters.length > 0) {
      result = result.filter(career => filters.includes(career.category));
    }
    
    setFilteredCareers(result);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-6">Career Library</h1>
          
          <CareerFilter 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            categories={allCategories}
          />
          
          {filteredCareers.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No careers found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareers.map((career) => (
                <CareerCard key={career.id} career={career} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;
