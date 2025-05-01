
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerCard, { Career } from "@/components/career-library/CareerCard";
import CareerFilter from "@/components/career-library/CareerFilter";
import { toast } from "@/components/ui/use-toast";

export default function LibraryPage() {
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
    }
  ]);

  const [filteredCareers, setFilteredCareers] = useState<Career[]>(careers);
  const categories = Array.from(new Set(careers.map(career => career.category)));

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

  const handleSaveCareer = (careerId: string) => {
    toast({
      title: "Career saved",
      description: "This career has been saved to your profile.",
    });
  };

  const handleViewDetails = (careerId: string) => {
    // In a real app, this would navigate to a detailed view
    toast({
      title: "Career details",
      description: "Showing detailed information for this career path.",
    });
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
                <CareerCard 
                  key={career.id} 
                  career={career} 
                  onSave={() => handleSaveCareer(career.id)}
                  onViewDetails={() => handleViewDetails(career.id)}
                />
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
