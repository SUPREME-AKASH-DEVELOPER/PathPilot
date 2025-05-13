
import { Career } from "@/components/career-library/CareerCard";

// Define the answer type to store user's quiz responses
export type QuizAnswers = Record<number, string>;

// Define career traits that correspond to quiz categories
type CareerTrait = {
  category: string;
  keywords: string[];
  weight: number;
};

// Define skill mapping to track student's strengths
export type SkillAssessment = {
  analytical: number;
  creative: number;
  technical: number;
  communication: number;
  leadership: number;
  scientific: number;
  entrepreneurial: number; 
  social: number; 
  critical_thinking: number;
};

// Enhanced personality type identification
export type PersonalityProfile = {
  type: "Analytical" | "Creative" | "Practical" | "Social" | "Enterprising" | "Conventional" | "Mixed";
  traits: string[];
  learningStyle: string;
  workEnvironmentPreference: string;
};

// Enhanced career traits mapping based on quiz categories with improved diversity
const careerTraitMapping: Record<string, CareerTrait[]> = {
  // Academic interests
  "Mathematics and Physics": [
    { category: "Technical", keywords: ["engineer", "developer", "analyst", "physicist", "mathematician"], weight: 0.95 },
    { category: "Science", keywords: ["research", "physics", "mathematics", "laboratory", "scientist"], weight: 0.85 },
    { category: "Engineering", keywords: ["build", "design", "construct", "develop", "analyze"], weight: 0.8 },
    // Non-conventional paths
    { category: "Finance", keywords: ["quantitative", "analyst", "actuary", "statistical"], weight: 0.7 },
    { category: "Creative", keywords: ["game development", "simulation", "modeling"], weight: 0.5 },
  ],
  "Biology and Chemistry": [
    { category: "Medical", keywords: ["health", "doctor", "medicine", "surgeon", "physician"], weight: 0.95 },
    { category: "Science", keywords: ["biology", "research", "laboratory", "biochemist", "chemist"], weight: 0.9 },
    { category: "Healthcare", keywords: ["pharmacy", "nutrition", "therapy", "diagnostics"], weight: 0.85 },
    // Non-conventional paths
    { category: "Environmental", keywords: ["ecology", "conservation", "sustainability"], weight: 0.7 },
    { category: "Agriculture", keywords: ["biotechnology", "food science", "agronomy"], weight: 0.6 },
  ],
  "Literature and Languages": [
    { category: "Creative", keywords: ["write", "author", "content", "journalism", "editor"], weight: 0.95 },
    { category: "Education", keywords: ["teach", "professor", "language", "instructor", "tutor"], weight: 0.85 },
    { category: "Media", keywords: ["publishing", "communication", "translation", "localization"], weight: 0.8 },
    // Non-conventional paths
    { category: "Technical", keywords: ["documentation", "technical writing", "content strategy"], weight: 0.6 },
    { category: "Legal", keywords: ["paralegal", "contracts", "compliance", "copyright"], weight: 0.5 },
  ],
  "Computers and Information Technology": [
    { category: "Technical", keywords: ["software", "programmer", "database", "developer", "engineer"], weight: 0.95 },
    { category: "Systems", keywords: ["administration", "network", "infrastructure", "cloud"], weight: 0.85 },
    { category: "Security", keywords: ["cybersecurity", "encryption", "protection", "ethical hacker"], weight: 0.8 },
    // Non-conventional paths
    { category: "Creative", keywords: ["UI/UX", "digital design", "game development"], weight: 0.7 },
    { category: "Healthcare", keywords: ["health informatics", "medical technology", "biomedical"], weight: 0.6 },
  ],
  // Problem-solving approaches
  "By analyzing data and finding patterns": [
    { category: "Technical", keywords: ["data", "analyst", "science", "engineer", "statistics"], weight: 0.95 },
    { category: "Finance", keywords: ["accountant", "financial", "analyst", "economist", "actuary"], weight: 0.8 },
    { category: "Science", keywords: ["researcher", "analyst", "statistician", "epidemiologist"], weight: 0.75 },
    // Non-conventional matches
    { category: "Creative", keywords: ["ux researcher", "market analyst", "consumer insights"], weight: 0.6 },
    { category: "Healthcare", keywords: ["clinical research", "medical statistician", "health data"], weight: 0.55 },
  ],
  "By discussing with others to find solutions": [
    { category: "Marketing", keywords: ["marketing", "sales", "communication", "public relations"], weight: 0.9 },
    { category: "Management", keywords: ["manager", "coordinator", "facilitator", "team lead"], weight: 0.85 },
    { category: "Hospitality", keywords: ["management", "hotel", "service", "customer relations"], weight: 0.8 },
    // Non-conventional matches
    { category: "Social Impact", keywords: ["community organizer", "mediator", "advocate", "coordinator"], weight: 0.7 },
    { category: "Healthcare", keywords: ["health administrator", "patient advocate", "coordinator"], weight: 0.65 },
  ],
  "By reading and researching for answers": [
    { category: "Education", keywords: ["researcher", "academic", "scientist", "historian", "analyst"], weight: 0.9 },
    { category: "Science", keywords: ["research", "laboratory", "investigation", "study"], weight: 0.85 },
    { category: "Creative", keywords: ["writer", "journalist", "content", "researcher", "analyst"], weight: 0.8 },
    // Non-conventional matches
    { category: "Government", keywords: ["policy analyst", "researcher", "intelligence", "advisor"], weight: 0.7 },
    { category: "Legal", keywords: ["paralegal", "legal researcher", "compliance", "analyst"], weight: 0.65 },
  ],
  "By trying different approaches until something works": [
    { category: "Technical", keywords: ["developer", "engineer", "designer", "troubleshooter"], weight: 0.8 },
    { category: "Creative", keywords: ["artist", "designer", "innovator", "creator", "inventor"], weight: 0.85 },
    { category: "Engineering", keywords: ["prototype", "test", "iterate", "debug", "solve"], weight: 0.75 },
    // Non-conventional matches
    { category: "Entrepreneurial", keywords: ["entrepreneur", "startup founder", "innovator", "inventor"], weight: 0.9 },
    { category: "Culinary", keywords: ["chef", "recipe developer", "food scientist", "tester"], weight: 0.6 },
  ],
  // Work environments with expanded options
  "Corporate office with a stable schedule": [
    { category: "Finance", keywords: ["accountant", "banking", "investment", "financial"], weight: 0.9 },
    { category: "Technical", keywords: ["software", "programmer", "developer", "analyst"], weight: 0.8 },
    { category: "Management", keywords: ["manager", "executive", "director", "administrator"], weight: 0.85 },
    { category: "Legal", keywords: ["lawyer", "attorney", "legal", "compliance"], weight: 0.8 },
    { category: "Administrative", keywords: ["secretary", "coordinator", "assistant", "planner"], weight: 0.75 },
  ],
  "Creative studio with flexible hours": [
    { category: "Creative", keywords: ["design", "artist", "creator", "content", "media"], weight: 0.95 },
    { category: "Marketing", keywords: ["digital", "content", "media", "creative", "design"], weight: 0.85 },
    { category: "Entertainment", keywords: ["production", "studio", "media", "film", "music"], weight: 0.8 },
    { category: "Technical", keywords: ["game development", "animation", "web design"], weight: 0.7 },
    { category: "Freelance", keywords: ["consultant", "contractor", "independent", "self-employed"], weight: 0.75 },
  ],
  "Laboratory or research facility": [
    { category: "Science", keywords: ["research", "scientist", "laboratory", "technician"], weight: 0.95 },
    { category: "Medical", keywords: ["medical", "clinical", "healthcare", "research", "biomedical"], weight: 0.9 },
    { category: "Technical", keywords: ["engineer", "technician", "developer", "researcher"], weight: 0.8 },
    { category: "Environmental", keywords: ["environmental", "conservation", "ecology", "research"], weight: 0.75 },
    { category: "Agriculture", keywords: ["agricultural", "food science", "biotechnology", "research"], weight: 0.7 },
  ],
  "Working outdoors or in varied locations": [
    { category: "Engineering", keywords: ["civil", "environmental", "field", "surveyor", "construction"], weight: 0.85 },
    { category: "Creative", keywords: ["photographer", "filmmaker", "journalist", "artist"], weight: 0.8 },
    { category: "Environmental", keywords: ["conservation", "field researcher", "naturalist", "forester"], weight: 0.9 },
    { category: "Agriculture", keywords: ["farming", "forestry", "horticulture", "landscaping"], weight: 0.85 },
    { category: "Tourism", keywords: ["guide", "travel", "adventure", "exploration", "hospitality"], weight: 0.8 },
  ],
  // Career fields (12th grade) - Enhanced with more diverse options
  "Engineering and Technology": [
    { category: "Technical", keywords: ["engineer", "developer", "technology", "systems", "analyst"], weight: 0.95 },
    { category: "Engineering", keywords: ["mechanical", "electrical", "civil", "chemical", "aerospace"], weight: 0.9 },
    { category: "Systems", keywords: ["systems", "network", "infrastructure", "architect"], weight: 0.85 },
    // Add non-conventional matches
    { category: "Creative", keywords: ["sound designer", "vfx artist", "technical artist"], weight: 0.65 },
    { category: "Social Impact", keywords: ["sustainable engineer", "accessibility specialist", "humanitarian"], weight: 0.6 },
    { category: "Healthcare", keywords: ["biomedical", "medical technology", "prosthetics"], weight: 0.7 },
  ],
  "Medical Sciences and Healthcare": [
    { category: "Medical", keywords: ["doctor", "nurse", "healthcare", "physician", "surgeon"], weight: 0.95 },
    { category: "Science", keywords: ["biology", "research", "pharmaceutical", "laboratory", "medical"], weight: 0.9 },
    { category: "Healthcare", keywords: ["therapist", "technician", "specialist", "pharmacist"], weight: 0.85 },
    // Add non-conventional matches
    { category: "Social Impact", keywords: ["public health specialist", "mental health advocate", "community health"], weight: 0.75 },
    { category: "Technical", keywords: ["health informatics", "medical technology", "bioinformatics"], weight: 0.7 },
    { category: "Management", keywords: ["healthcare administrator", "practice manager", "coordinator"], weight: 0.65 },
  ],
  "Business, Commerce, and Management": [
    { category: "Finance", keywords: ["business", "management", "commerce", "financial", "banking"], weight: 0.95 },
    { category: "Marketing", keywords: ["sales", "marketing", "business", "advertising", "market"], weight: 0.9 },
    { category: "Management", keywords: ["manager", "executive", "director", "administrator", "coordinator"], weight: 0.85 },
    // Add non-conventional matches
    { category: "Creative", keywords: ["brand strategist", "experience designer", "creative director"], weight: 0.7 },
    { category: "Social Impact", keywords: ["social entrepreneur", "sustainable business consultant", "ethical business"], weight: 0.65 },
    { category: "Technical", keywords: ["business analyst", "systems analyst", "operations research"], weight: 0.6 },
  ],
  "Arts, Humanities, and Social Sciences": [
    { category: "Creative", keywords: ["arts", "design", "media", "writer", "artist"], weight: 0.95 },
    { category: "Education", keywords: ["social", "humanities", "teaching", "professor", "researcher"], weight: 0.9 },
    { category: "Social Services", keywords: ["counselor", "social worker", "therapist", "advisor"], weight: 0.85 },
    // Add non-conventional matches
    { category: "Technical", keywords: ["digital humanities specialist", "ai ethicist", "computational linguist"], weight: 0.6 },
    { category: "Entrepreneurial", keywords: ["cultural entrepreneur", "independent creator", "consultant"], weight: 0.7 },
    { category: "Government", keywords: ["policy analyst", "diplomat", "cultural officer", "archivist"], weight: 0.75 },
  ],
  // Enhanced skills recognition with more granular mapping
  "Problem-solving and logical thinking": [
    { category: "Technical", keywords: ["engineer", "developer", "analyst", "programmer", "scientist"], weight: 0.95 },
    { category: "Science", keywords: ["researcher", "scientist", "mathematician", "analyst", "physician"], weight: 0.9 },
    { category: "Finance", keywords: ["analyst", "actuary", "economist", "statistician", "consultant"], weight: 0.85 },
    { category: "Legal", keywords: ["lawyer", "attorney", "judge", "legal analyst", "consultant"], weight: 0.8 },
    { category: "Engineering", keywords: ["engineer", "architect", "designer", "systems analyst"], weight: 0.9 },
  ],
  "Memory and observation": [
    { category: "Medical", keywords: ["doctor", "diagnostician", "researcher", "pathologist", "specialist"], weight: 0.9 },
    { category: "Science", keywords: ["biologist", "chemist", "observer", "researcher", "analyst"], weight: 0.85 },
    { category: "Legal", keywords: ["lawyer", "investigator", "detective", "auditor", "reviewer"], weight: 0.8 },
    { category: "Creative", keywords: ["writer", "journalist", "filmmaker", "documentary", "reporter"], weight: 0.75 },
    { category: "Quality", keywords: ["inspector", "analyst", "tester", "auditor", "compliance"], weight: 0.7 },
  ],
  "Communication and expression": [
    { category: "Creative", keywords: ["writer", "presenter", "communicator", "journalist", "author"], weight: 0.95 },
    { category: "Marketing", keywords: ["marketer", "public relations", "speaker", "communications", "spokesperson"], weight: 0.9 },
    { category: "Media", keywords: ["journalist", "broadcaster", "presenter", "reporter", "content creator"], weight: 0.85 },
    { category: "Education", keywords: ["teacher", "trainer", "coach", "presenter", "lecturer"], weight: 0.8 },
    { category: "Management", keywords: ["manager", "leader", "negotiator", "facilitator", "coordinator"], weight: 0.75 },
  ],
  "Design and creativity": [
    { category: "Creative", keywords: ["designer", "artist", "architect", "creator", "innovator"], weight: 0.95 },
    { category: "Marketing", keywords: ["advertiser", "content creator", "brand manager", "creative director"], weight: 0.85 },
    { category: "Technical", keywords: ["game designer", "user experience", "interface designer", "developer"], weight: 0.8 },
    { category: "Entertainment", keywords: ["animator", "film maker", "game designer", "artist", "producer"], weight: 0.9 },
    { category: "Product", keywords: ["product designer", "industrial designer", "fashion designer"], weight: 0.8 },
  ],
  // Adding many more mappings for all the other quiz options
  // The rest of the mapping would continue with the same expanded pattern
  
  // Emerging technology interests
  "Artificial Intelligence and Machine Learning": [
    { category: "Technical", keywords: ["AI", "machine learning", "data science", "deep learning", "NLP"], weight: 0.95 },
    { category: "Research", keywords: ["AI researcher", "computer scientist", "algorithm developer"], weight: 0.9 },
    { category: "Engineering", keywords: ["AI engineer", "ML engineer", "systems architect"], weight: 0.85 },
    // Add non-conventional matches
    { category: "Creative", keywords: ["ai artist", "creative technologist", "generative design"], weight: 0.7 },
    { category: "Social Impact", keywords: ["ai ethics researcher", "fairness specialist", "responsible AI"], weight: 0.65 },
    { category: "Healthcare", keywords: ["medical AI", "diagnostic systems", "health informatics"], weight: 0.75 },
  ],
  "Sustainable Technology and Renewable Energy": [
    { category: "Engineering", keywords: ["renewable", "sustainable", "environmental", "energy", "green"], weight: 0.95 },
    { category: "Science", keywords: ["green", "climate", "environmental", "scientist", "research"], weight: 0.9 },
    { category: "Technical", keywords: ["sustainability engineer", "clean tech", "renewable systems"], weight: 0.85 },
    { category: "Manufacturing", keywords: ["sustainable manufacturing", "green production", "clean energy"], weight: 0.8 },
    { category: "Agricultural", keywords: ["sustainable agriculture", "precision farming", "agritech"], weight: 0.75 },
  ],
  "Biotechnology and Genetic Engineering": [
    { category: "Science", keywords: ["biotech", "genetics", "medical research", "biologist", "molecular"], weight: 0.95 },
    { category: "Medical", keywords: ["pharmaceutical", "research", "laboratory", "clinical trials"], weight: 0.9 },
    { category: "Agriculture", keywords: ["agricultural biotech", "crop science", "plant genetics"], weight: 0.85 },
    { category: "Healthcare", keywords: ["genetic counselor", "clinical geneticist", "genomics"], weight: 0.8 },
    { category: "Environmental", keywords: ["environmental biotechnology", "bioremediation", "conservation"], weight: 0.75 },
  ],
  "Digital Media and Virtual Reality": [
    { category: "Creative", keywords: ["media", "virtual reality", "design", "content creation"], weight: 0.95 },
    { category: "Technical", keywords: ["software", "gaming", "development", "VR/AR engineer"], weight: 0.9 },
    { category: "Entertainment", keywords: ["game designer", "VR experience", "immersive media"], weight: 0.85 },
    { category: "Education", keywords: ["educational technology", "immersive learning", "simulation"], weight: 0.75 },
    { category: "Healthcare", keywords: ["medical simulation", "therapeutic VR", "rehabilitation"], weight: 0.7 },
  ],
};

// Define education path appropriateness for career fields with more nuance
const educationPathMapping: Record<string, Record<string, number>> = {
  "Technical": {
    "after10th": 0.75, // Improved for technical diploma after 10th
    "after12th": 0.9,
    "afterGraduation": 1.0
  },
  "Medical": {
    "after10th": 0.4, // Adjusted for medical pathway planning after 10th
    "after12th": 0.8,
    "afterGraduation": 1.0
  },
  "Engineering": {
    "after10th": 0.6, // Improved for diploma pathways after 10th
    "after12th": 0.9,
    "afterGraduation": 1.0
  },
  "Finance": {
    "after10th": 0.65, // Adjusted for commerce pathway after 10th
    "after12th": 0.9,
    "afterGraduation": 1.0
  },
  "Creative": {
    "after10th": 0.9, // Creative fields can be started early
    "after12th": 0.95,
    "afterGraduation": 1.0
  },
  "Education": {
    "after10th": 0.5, // Adjusted for teaching pathway planning
    "after12th": 0.75,
    "afterGraduation": 1.0
  },
  "Government": {
    "after10th": 0.5, // Improved for government job preparation
    "after12th": 0.8,
    "afterGraduation": 1.0
  },
  "Marketing": {
    "after10th": 0.6, // Improved for marketing preparation
    "after12th": 0.85,
    "afterGraduation": 1.0
  },
  "Science": {
    "after10th": 0.5, // Adjusted for science path preparation
    "after12th": 0.8,
    "afterGraduation": 1.0
  },
  "Aviation": {
    "after10th": 0.4, // Adjusted for aviation preparation
    "after12th": 0.7,
    "afterGraduation": 0.95
  },
  "Hospitality": {
    "after10th": 0.85, // Improved for hospitality diploma paths
    "after12th": 0.95,
    "afterGraduation": 1.0
  },
  "Entertainment": {
    "after10th": 0.8, // Added entertainment industry
    "after12th": 0.9,
    "afterGraduation": 1.0
  },
  "Environmental": {
    "after10th": 0.6, // Added environmental field
    "after12th": 0.8,
    "afterGraduation": 1.0
  },
  "Agriculture": {
    "after10th": 0.7, // Added agriculture field
    "after12th": 0.85,
    "afterGraduation": 1.0
  },
  "Healthcare": {
    "after10th": 0.5, // Added healthcare (distinct from medical)
    "after12th": 0.8,
    "afterGraduation": 1.0
  },
  "Legal": {
    "after10th": 0.4, // Added legal field
    "after12th": 0.7,
    "afterGraduation": 1.0
  },
  "Social Impact": {
    "after10th": 0.7, // Added social impact field
    "after12th": 0.85,
    "afterGraduation": 1.0
  },
  "Entrepreneurial": {
    "after10th": 0.6, // Added entrepreneurial path
    "after12th": 0.8,
    "afterGraduation": 1.0
  }
};

// Expanded practical next steps for students based on education stage
const practicalNextSteps: Record<string, string[]> = {
  "after10th": [
    "Science (PCM/PCB) stream in 11th-12th",
    "Commerce stream in 11th-12th",
    "Arts/Humanities stream in 11th-12th",
    "Vocational courses/ITI",
    "Diploma programs in technical fields",
    "Certificate courses in skill development",
    "Online introductory courses in areas of interest",
    "Join clubs or communities related to potential career paths",
    "Research and follow professionals in fields of interest",
    "Create small personal projects to build a portfolio",
    "Volunteer in organizations related to your interests",
    "Participate in competitions and olympiads",
    "Attend career fairs and exhibitions",
    "Shadow professionals in fields of interest",
    "Take personality and aptitude tests",
    "Develop digital literacy skills",
    "Learn basic coding and computer skills",
    "Build communication and presentation skills",
    "Participate in entrepreneurship workshops",
    "Look for internship opportunities during vacations"
  ],
  "after12th": [
    "Bachelor's degree programs",
    "Professional courses (CA, CS, etc.)",
    "Diploma in specialized fields",
    "Entrance preparation for competitive exams",
    "Vocational training programs",
    "Industry certifications in technical fields",
    "Internships and shadowing opportunities",
    "Volunteering in related organizations",
    "Online specialization courses from platforms like Coursera or edX",
    "Participate in competitions related to your field",
    "Join college clubs and professional societies",
    "Attend industry conferences and workshops",
    "Network with professionals in your field",
    "Build a portfolio of projects and achievements",
    "Part-time jobs in related fields",
    "Study abroad opportunities",
    "Research assistant roles",
    "Write and publish articles in your area of interest",
    "Entrepreneurship and startup incubation programs",
    "Develop leadership skills through campus roles"
  ],
  "afterGraduation": [
    "Master's degree programs",
    "Professional certifications",
    "Entry-level job opportunities",
    "Competitive exams for government services",
    "Entrepreneurship opportunities",
    "Advanced industry certifications",
    "Research assistantships or fellowships",
    "Networking with industry professionals",
    "Build a personal brand in your niche",
    "Contribute to open-source or community projects",
    "Join professional associations",
    "Publish research or thought leadership content",
    "Mentor juniors in your field",
    "Attend advanced workshops and bootcamps",
    "Explore interdisciplinary opportunities",
    "Apply for innovation grants and competitions",
    "Participate in hackathons and challenges",
    "Develop specialized technical skills",
    "Seek mentorship from industry leaders",
    "Explore remote and international work opportunities"
  ]
};

// Expanded non-conventional career options with more detailed information
const nonConventionalCareers: Record<string, Career[]> = {
  "Technical": [
    {
      id: "nc1",
      title: "Ethical Hacker",
      category: "Technical",
      description: "Identify and fix security vulnerabilities in computer systems and networks before malicious hackers can exploit them.",
      salary: "₹6L - ₹25L per annum",
      entranceExams: ["CEH Certification", "OSCP Certification"],
      colleges: ["Self-learning", "Cybersecurity Institutes"],
      recruiters: ["IT Companies", "Banks", "Government Agencies"]
    },
    {
      id: "nc2",
      title: "Sound Designer",
      category: "Technical",
      description: "Create and manipulate audio elements for films, games, and other media to enhance the user experience.",
      salary: "₹4L - ₹20L per annum",
      entranceExams: ["Portfolio-based selection"],
      colleges: ["Film Schools", "Audio Engineering Institutes"],
      recruiters: ["Gaming Studios", "Film Production Companies"]
    },
    {
      id: "nc3",
      title: "AI Ethics Specialist",
      category: "Technical",
      description: "Evaluate AI systems for bias, fairness, and ethical implications, developing guidelines for responsible AI development.",
      salary: "₹8L - ₹30L per annum",
      entranceExams: ["GATE Computer Science", "AI Certifications"],
      colleges: ["IITs", "Technical Universities", "Specialized AI Institutes"],
      recruiters: ["Tech Giants", "Research Organizations", "Government"]
    }
  ],
  "Creative": [
    {
      id: "nc4",
      title: "UX Researcher",
      category: "Creative",
      description: "Study user behavior and needs through various methodologies to improve product design and user satisfaction.",
      salary: "₹5L - ₹25L per annum",
      entranceExams: ["Portfolio-based selection"],
      colleges: ["Design Schools", "HCI Programs"],
      recruiters: ["Tech Companies", "Design Agencies", "Startups"]
    },
    {
      id: "nc5",
      title: "Content Strategist",
      category: "Creative",
      description: "Develop and implement content plans for brands across various channels, focusing on audience engagement and business goals.",
      salary: "₹5L - ₹22L per annum",
      entranceExams: ["Portfolio-based selection"],
      colleges: ["Media Schools", "Communication Programs"],
      recruiters: ["Media Companies", "Marketing Agencies", "Corporations"]
    },
    {
      id: "nc6",
      title: "Immersive Experience Designer",
      category: "Creative",
      description: "Create engaging experiences using virtual and augmented reality technologies for entertainment, education, or business applications.",
      salary: "₹7L - ₹28L per annum",
      entranceExams: ["Portfolio-based selection"],
      colleges: ["Design Schools", "Technical Universities"],
      recruiters: ["Gaming Companies", "Tech Giants", "Experience Agencies"]
    }
  ],
  "Social Impact": [
    {
      id: "nc7",
      title: "Wildlife Conservationist",
      category: "Social Impact",
      description: "Work to protect and preserve wildlife and their habitats through research, education, and conservation efforts.",
      salary: "₹3L - ₹15L per annum",
      entranceExams: ["MSc/PhD Entrance Exams"],
      colleges: ["Wildlife Institutes", "Environmental Science Programs"],
      recruiters: ["NGOs", "Government Wildlife Departments", "Research Organizations"]
    },
    {
      id: "nc8",
      title: "Sustainability Consultant",
      category: "Social Impact",
      description: "Help organizations develop and implement sustainable practices and policies to minimize environmental impact.",
      salary: "₹5L - ₹25L per annum",
      entranceExams: ["Environmental Science Entrance Exams"],
      colleges: ["Environmental Management Programs", "Sustainable Development Courses"],
      recruiters: ["Consulting Firms", "Corporations", "Government Agencies"]
    },
    {
      id: "nc9",
      title: "Social Entrepreneur",
      category: "Social Impact",
      description: "Launch ventures that address social problems through innovative, sustainable business models.",
      salary: "₹3L - ₹30L per annum (highly variable)",
      entranceExams: ["Business School Entrance Exams"],
      colleges: ["Social Entrepreneurship Programs", "Business Schools"],
      recruiters: ["Self-employed", "Impact Investors", "Foundations"]
    }
  ],
  "Sports": [
    {
      id: "nc10",
      title: "Sports Statistician",
      category: "Sports",
      description: "Collect and analyze data on sports performances to identify patterns and insights for teams and media.",
      salary: "₹4L - ₹18L per annum",
      entranceExams: ["Statistics background required"],
      colleges: ["Sports Management Programs", "Statistics Programs"],
      recruiters: ["Sports Teams", "Media Companies", "Betting Companies"]
    },
    {
      id: "nc11",
      title: "Sports Psychologist",
      category: "Sports",
      description: "Help athletes overcome psychological barriers, enhance performance, and maintain mental well-being.",
      salary: "₹5L - ₹25L per annum",
      entranceExams: ["Psychology Entrance Exams", "M.Phil/PhD Clinical Psychology"],
      colleges: ["Psychology Programs", "Sports Science Institutes"],
      recruiters: ["Sports Teams", "Training Academies", "Individual Athletes"]
    },
    {
      id: "nc12",
      title: "Performance Analyst",
      category: "Sports",
      description: "Analyze technical aspects of athletic performance to provide insights for improvement and competitive strategy.",
      salary: "₹4L - ₹20L per annum",
      entranceExams: ["Sports Science Entrance Exams"],
      colleges: ["Sports Science Programs", "Performance Analysis Courses"],
      recruiters: ["Professional Sports Teams", "National Sports Institutions", "Training Academies"]
    }
  ],
  "Government": [
    {
      id: "nc13",
      title: "Public Policy Analyst",
      category: "Government",
      description: "Research and analyze public policies and their impacts to recommend improvements or new approaches.",
      salary: "₹5L - ₹22L per annum",
      entranceExams: ["Public Policy Program Entrance", "UPSC"],
      colleges: ["Public Policy Institutes", "Law Schools"],
      recruiters: ["Think Tanks", "Government Agencies", "NGOs"]
    },
    {
      id: "nc14",
      title: "Disaster Management Specialist",
      category: "Government",
      description: "Plan for and respond to natural disasters and emergencies, coordinating relief efforts and risk reduction strategies.",
      salary: "₹4L - ₹20L per annum",
      entranceExams: ["Civil Services Exams", "Specialized Course Entrance"],
      colleges: ["Disaster Management Institutes", "Public Administration Programs"],
      recruiters: ["Government Agencies", "International Organizations", "NGOs"]
    },
    {
      id: "nc15",
      title: "Urban Planner",
      category: "Government",
      description: "Design and develop urban spaces to optimize functionality, sustainability, and quality of life for residents.",
      salary: "₹5L - ₹25L per annum",
      entranceExams: ["GATE (Planning)", "Architecture Entrance Exams"],
      colleges: ["Planning Schools", "Architecture Programs"],
      recruiters: ["Municipal Corporations", "Development Authorities", "Private Firms"]
    }
  ],
  "Healthcare": [
    {
      id: "nc16",
      title: "Health Informatics Specialist",
      category: "Healthcare",
      description: "Apply information technology to improve healthcare systems, patient records, and clinical workflows.",
      salary: "₹6L - ₹28L per annum",
      entranceExams: ["Health Informatics Program Entrance"],
      colleges: ["Medical Informatics Programs", "Healthcare IT Courses"],
      recruiters: ["Hospitals", "Healthcare IT Companies", "Medical Research Organizations"]
    },
    {
      id: "nc17",
      title: "Genetic Counselor",
      category: "Healthcare",
      description: "Advise patients about genetic disorders, risks, and testing options, helping them make informed healthcare decisions.",
      salary: "₹5L - ₹25L per annum",
      entranceExams: ["MSc Genetic Counseling Entrance", "Medical Genetics Entrance"],
      colleges: ["Medical Genetics Programs", "Specialized Genetic Counseling Courses"],
      recruiters: ["Hospitals", "Fertility Clinics", "Genetic Testing Companies"]
    },
    {
      id: "nc18",
      title: "Medical Science Liaison",
      category: "Healthcare",
      description: "Serve as scientific experts for pharmaceutical companies, bridging research and clinical applications.",
      salary: "₹8L - ₹35L per annum",
      entranceExams: ["PharmD", "PhD in relevant sciences"],
      colleges: ["Pharmacy Schools", "Life Sciences Programs"],
      recruiters: ["Pharmaceutical Companies", "Biotech Firms", "Medical Device Manufacturers"]
    }
  ],
  "Environmental": [
    {
      id: "nc19",
      title: "Environmental Economist",
      category: "Environmental",
      description: "Analyze economic aspects of environmental issues to develop sustainable policies and business practices.",
      salary: "₹5L - ₹25L per annum",
      entranceExams: ["Economics Entrance Exams", "Environmental Science Entrance"],
      colleges: ["Economics Programs", "Environmental Economics Specializations"],
      recruiters: ["Research Institutions", "Government Agencies", "International Organizations"]
    },
    {
      id: "nc20",
      title: "Renewable Energy Analyst",
      category: "Environmental",
      description: "Evaluate renewable energy technologies, markets, and policies to guide investment and development decisions.",
      salary: "₹6L - ₹28L per annum",
      entranceExams: ["Energy Studies Entrance", "Engineering Entrance Exams"],
      colleges: ["Energy Engineering Programs", "Renewable Energy Management Courses"],
      recruiters: ["Energy Companies", "Consulting Firms", "Government Agencies"]
    }
  ]
};

// Enhanced helper function to calculate match score with more sophisticated logic
export const calculateMatchScore = (
  answers: QuizAnswers, 
  career: Career,
  educationStage?: string
): number => {
  let totalScore = 0;
  let maxPossibleScore = 0;
  let matchReasons: string[] = []; // Track reasons for match
  
  // If no answers, return a random score between 30-70 to avoid all having 15%
  if (Object.keys(answers).length === 0) {
    return Math.floor(Math.random() * 40) + 30;
  }
  
  // Process each answer with enhanced matching logic
  Object.values(answers).forEach((answer) => {
    const traits = careerTraitMapping[answer];
    
    if (traits) {
      // Find relevant traits for this career
      traits.forEach(trait => {
        maxPossibleScore += trait.weight;
        
        // Match category directly with higher weight
        if (career.category.toLowerCase() === trait.category.toLowerCase()) {
          totalScore += trait.weight * 0.8; 
          matchReasons.push(`Strong alignment with ${trait.category} field`);
        }
        
        // Enhanced keyword matching with reason tracking
        trait.keywords.forEach(keyword => {
          if (career.title.toLowerCase().includes(keyword.toLowerCase())) {
            totalScore += trait.weight * 0.6;
            matchReasons.push(`Your interests align with ${keyword} in this role`);
          } else if (career.description && career.description.toLowerCase().includes(keyword.toLowerCase())) {
            totalScore += trait.weight * 0.4;
            matchReasons.push(`This career involves ${keyword} which matches your profile`);
          }
        });
      });
    }
  });
  
  // Apply education stage filter with more significant adjustments
  if (educationStage && educationPathMapping[career.category]) {
    const categoryFactor = educationPathMapping[career.category][educationStage] || 0.5;
    totalScore *= categoryFactor;
    
    // Further adjustments based on specific career requirements
    if (educationStage === 'after10th') {
      // Reduce score more significantly for careers that clearly require advanced degrees
      if (
        career.entranceExams.some(exam => 
          exam.includes("PhD") || 
          exam.includes("Masters") ||
          exam.includes("M.Phil") ||
          exam.includes("UPSC") ||
          exam.includes("NEET-PG") ||
          exam.includes("UGC-NET")
        )
      ) {
        totalScore *= 0.3; // More significant reduction for careers requiring advanced degrees
        matchReasons.push("Note: This career requires advanced education you'll need to pursue later");
      }
      
      // Check if any entrance exam specifies "after 12th" or graduate level
      if (
        career.entranceExams.some(exam =>
          exam.includes("JEE Advanced") ||
          exam.includes("NEET") ||
          exam.includes("CA Final") ||
          exam.includes("CS") ||
          exam.includes("CAT")
        )
      ) {
        totalScore *= 0.5; // Reduce score for exams that can only be taken after 12th
        matchReasons.push("You'll need to complete 12th grade before pursuing this path");
      }
    }
  }
  
  // Normalize the score as a percentage with a minimum of 30% match
  const normalizedScore = maxPossibleScore > 0 
    ? Math.min(99, Math.max(30, Math.round((totalScore / maxPossibleScore) * 100)))
    : Math.floor(Math.random() * 40) + 30; // Random score between 30-70 if no calculation possible
  
  // Add match reasons to career object
  (career as any).matchReasons = [...new Set(matchReasons)].slice(0, 3); // Keep only unique reasons, max 3
  
  // Add specific skills that match the career
  const skillsNeeded: string[] = [];
  if (career.title.toLowerCase().includes("engineer") || career.title.toLowerCase().includes("developer")) {
    skillsNeeded.push("Technical and analytical thinking");
  }
  if (career.title.toLowerCase().includes("design") || career.title.toLowerCase().includes("creat")) {
    skillsNeeded.push("Creativity and innovation");
  }
  if (career.title.toLowerCase().includes("manage") || career.title.toLowerCase().includes("direct")) {
    skillsNeeded.push("Leadership and organization");
  }
  if (career.title.toLowerCase().includes("research") || career.title.toLowerCase().includes("scientist")) {
    skillsNeeded.push("Scientific inquiry and methodical approach");
  }
  
  (career as any).skillsNeeded = skillsNeeded;
  
  return normalizedScore;
};

// Apply match scores to all careers with enhanced diversity in recommendations
export const getMatchedCareers = (
  answers: QuizAnswers,
  careers: Career[],
  educationStage?: string
): Career[] => {
  // Add non-conventional careers to the mix for more diverse recommendations
  const allCareers = [...careers];
  
  // Include relevant non-conventional careers based on answers
  Object.keys(nonConventionalCareers).forEach(category => {
    // Check if this category seems relevant based on answers
    const shouldInclude = Object.values(answers).some(answer => 
      careerTraitMapping[answer]?.some(trait => 
        trait.category.toLowerCase() === category.toLowerCase()
      )
    );
    
    if (shouldInclude) {
      allCareers.push(...nonConventionalCareers[category]);
    }
  });
  
  // Make a copy of careers to avoid modifying the original data
  const careersWithScores = allCareers.map(career => ({
    ...career,
    matchScore: calculateMatchScore(answers, career, educationStage)
  }));
  
  // Add entropy to avoid identical scores when answers are similar
  careersWithScores.forEach(career => {
    // Add small variation (-3 to +3) to prevent identical scores
    const variation = Math.floor(Math.random() * 7) - 3;
    career.matchScore = Math.min(99, Math.max(30, (career.matchScore || 50) + variation));
  });
  
  // Enhance top matches with more detailed descriptions where possible
  const topMatches = careersWithScores.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)).slice(0, 15);
  
  // Add growth potential and future outlook to top matches
  topMatches.forEach(career => {
    const growthPotentials = [
      "High demand in growing sector",
      "Evolving field with new opportunities",
      "Stable career path with advancement options",
      "Emerging specializations available",
      "Cross-sector applications increasing"
    ];
    
    (career as any).growthPotential = growthPotentials[Math.floor(Math.random() * growthPotentials.length)];
  });
  
  return topMatches;
};

// Generate a personalized student profile from quiz answers with enhanced traits
export const generateStudentProfile = (answers: QuizAnswers): PersonalityProfile => {
  const answerValues = Object.values(answers);
  let personalityType: PersonalityProfile["type"] = "Mixed";
  const traits: string[] = [];
  let learningStyle = "Mixed";
  let workEnvironment = "Balanced";
  
  // Determine personality type based on answers with more nuanced classification
  if ((answerValues.includes("By analyzing data and finding patterns") || 
      answerValues.includes("Problem-solving and logical thinking")) && 
      !answerValues.includes("Design and creativity")) {
    personalityType = "Analytical";
    traits.push("Detail-oriented", "Systematic", "Logical", "Methodical");
    learningStyle = "Conceptual and structured learning with emphasis on understanding principles";
  } else if ((answerValues.includes("Design and creativity") || 
             answerValues.includes("Creative studio with flexible hours")) &&
             !answerValues.includes("Corporate office with a stable schedule")) {
    personalityType = "Creative";
    traits.push("Imaginative", "Expressive", "Innovative", "Open-minded");
    learningStyle = "Visual and hands-on learning with freedom to explore ideas";
  } else if ((answerValues.includes("By discussing with others to find solutions") || 
             answerValues.includes("Communication and expression")) &&
             !answerValues.includes("By analyzing data and finding patterns")) {
    personalityType = "Social";
    traits.push("People-oriented", "Empathetic", "Collaborative", "Communicative");
    learningStyle = "Discussion-based and collaborative learning through interaction";
  } else if ((answerValues.includes("The planner who organizes tasks and schedules") || 
             answerValues.includes("Corporate office with a stable schedule")) &&
             !answerValues.includes("Creative studio with flexible hours")) {
    personalityType = "Conventional";
    traits.push("Organized", "Methodical", "Detail-focused", "Procedural");
    learningStyle = "Structured and sequential learning with clear guidelines";
  } else if ((answerValues.includes("By trying different approaches until something works") || 
             answerValues.includes("Competitive environments that push me to excel")) &&
             !answerValues.includes("The planner who organizes tasks and schedules")) {
    personalityType = "Enterprising";
    traits.push("Risk-taking", "Goal-oriented", "Persuasive", "Ambitious");
    learningStyle = "Challenge-based learning with practical application";
  } else if ((answerValues.includes("Working outdoors or in varied locations") || 
             answerValues.includes("Building electronic gadgets or programming")) &&
             !answerValues.includes("By reading and researching for answers")) {
    personalityType = "Practical";
    traits.push("Hands-on", "Realistic", "Technical", "Action-oriented");
    learningStyle = "Learning by doing through practical experiences";
  }
  
  // Determine work environment preference with more specific descriptions
  if (answerValues.includes("Corporate office with a stable schedule")) {
    workEnvironment = "Structured professional environment with clear protocols and stability";
  } else if (answerValues.includes("Creative studio with flexible hours")) {
    workEnvironment = "Flexible creative environment that encourages innovation and self-direction";
  } else if (answerValues.includes("Laboratory or research facility")) {
    workEnvironment = "Research-oriented environment focused on investigation and discovery";
  } else if (answerValues.includes("Working outdoors or in varied locations")) {
    workEnvironment = "Dynamic and varied environment with changing scenery and practical challenges";
  } else if (answerValues.includes("Competitive environments that push me to excel")) {
    workEnvironment = "High-pressure performance-driven environment that rewards achievement";
  } else if (answerValues.includes("Collaborative environments with shared goals")) {
    workEnvironment = "Supportive team-based environment that values cooperation and shared success";
  }
  
  return {
    type: personalityType,
    traits: traits.length > 0 ? traits : ["Adaptable", "Balanced", "Evolving", "Versatile"],
    learningStyle,
    workEnvironmentPreference: workEnvironment
  };
};

// Generate a summary of strengths and recommended career paths with enhanced personalization
export const generateQuizSummary = (
  answers: QuizAnswers, 
  educationStage?: string
): {
  strengths: string[];
  weaknesses: string[]; 
  recommendedPaths: string[];
  skills: SkillAssessment;
  personalityProfile: PersonalityProfile; 
  nextSteps?: string[];
  emotionalGuidance?: string; 
} => {
  // Initialize skill assessment with additional skills
  const skills: SkillAssessment = {
    analytical: 0,
    creative: 0,
    technical: 0,
    communication: 0,
    leadership: 0,
    scientific: 0,
    entrepreneurial: 0,
    social: 0,
    critical_thinking: 0
  };
  
  // Analyze answers to determine strengths with enhanced scoring
  const answerValues = Object.values(answers);
  
  // Process skills based on answers with more detailed mapping
  answerValues.forEach(answer => {
    // Analytical skills assessment
    if (answer.includes("analyzing data") || 
        answer.includes("Problem-solving and logical thinking") ||
        answer.includes("Mathematics and Physics")) {
      skills.analytical += 3;
      skills.critical_thinking += 2;
    }
    
    // Creative skills assessment
    if (answer.includes("Design and creativity") || 
        answer.includes("Creative studio") ||
        answer.includes("Arts, Humanities")) {
      skills.creative += 3;
      skills.communication += 1;
    }
    
    // Technical skills assessment
    if (answer.includes("Computers and Information Technology") || 
        answer.includes("Engineering and Technology") ||
        answer.includes("building electronic gadgets")) {
      skills.technical += 3;
      skills.analytical += 1;
    }
    
    // Communication skills assessment
    if (answer.includes("Communication and expression") || 
        answer.includes("discussing with others") ||
        answer.includes("Literature and Languages")) {
      skills.communication += 3;
      skills.social += 2;
    }
    
    // Leadership skills assessment
    if (answer.includes("planner who organizes tasks") || 
        answer.includes("I have a detailed 5-10 year plan") ||
        answer.includes("Management and leadership")) {
      skills.leadership += 3;
      skills.entrepreneurial += 1;
    }
    
    // Scientific skills assessment
    if (answer.includes("Biology and Chemistry") || 
        answer.includes("Medical Sciences and Healthcare") ||
        answer.includes("Laboratory or research facility")) {
      skills.scientific += 3;
      skills.analytical += 1;
    }
    
    // Entrepreneurial skills assessment
    if (answer.includes("By trying different approaches") || 
        answer.includes("I'm comfortable with calculated risks") ||
        answer.includes("Running my own business or startup")) {
      skills.entrepreneurial += 3;
      skills.leadership += 1;
    }
    
    // Social skills assessment
    if (answer.includes("By discussing with others") || 
        answer.includes("People-focused initiatives") ||
        answer.includes("Communication and interpersonal skills")) {
      skills.social += 3;
      skills.communication += 1;
    }
    
    // Critical thinking assessment
    if (answer.includes("I address issues directly") || 
        answer.includes("Based on data and logical analysis") ||
        answer.includes("Complex technical problems")) {
      skills.critical_thinking += 3;
      skills.analytical += 1;
    }
  });
  
  // Determine top skills
  const skillEntries = Object.entries(skills) as [keyof SkillAssessment, number][];
  const topSkills = skillEntries
    .sort((a, b) => b[1] - a[1])
    .filter(([_, value]) => value > 0)
    .slice(0, 3)
    .map(([skill]) => skill);
  
  // Determine bottom skills (weaknesses)
  const bottomSkills = skillEntries
    .sort((a, b) => a[1] - b[1])
    .filter(([_, value]) => value <= 1) // Include skills with 0 or 1 points
    .slice(0, 2)
    .map(([skill]) => skill);
  
  // Generate strengths based on top skills with more personalized descriptions
  const strengthsMap: Record<keyof SkillAssessment, string> = {
    analytical: "Strong analytical abilities and systematic approach to solving complex problems",
    creative: "Creative thinking, originality, and ability to generate innovative solutions",
    technical: "Technical aptitude and proficiency in understanding and working with complex systems",
    communication: "Excellent communication skills with clarity in expressing ideas and engaging others",
    leadership: "Natural leadership qualities with strong decision-making and team motivation abilities",
    scientific: "Scientific curiosity and methodical research orientation with attention to detail",
    entrepreneurial: "Entrepreneurial mindset with comfort in taking calculated risks and identifying opportunities",
    social: "Strong interpersonal skills and ability to build meaningful connections and work effectively in teams",
    critical_thinking: "Advanced critical thinking with ability to evaluate information objectively and form reasoned judgments"
  };
  
  // Generate weaknesses based on bottom skills with constructive framing
  const weaknessesMap: Record<keyof SkillAssessment, string> = {
    analytical: "Potential to develop more structured analytical approaches to complex problems",
    creative: "Opportunity to enhance creative problem-solving and innovative thinking",
    technical: "Room to strengthen technical understanding and hands-on technical abilities",
    communication: "Communication effectiveness could be further developed, especially in formal contexts",
    leadership: "Leadership capabilities and initiative-taking are areas for potential growth",
    scientific: "Scientific methodology and detail-oriented research approaches could be strengthened",
    entrepreneurial: "Risk assessment and entrepreneurial opportunity recognition could be developed",
    social: "Interpersonal effectiveness and teamwork might benefit from more conscious practice",
    critical_thinking: "Critical evaluation of information and logical reasoning could be enhanced"
  };
  
  const strengths = topSkills.map(skill => strengthsMap[skill]);
  const weaknesses = bottomSkills.map(skill => weaknessesMap[skill]);
  
  // Generate more personalized recommended career paths with stage-appropriate suggestions
  const pathsMap: Partial<Record<keyof SkillAssessment, string[]>> = {
    analytical: ["Data Analysis", "Research", "Finance", "Business Intelligence", "System Analysis"],
    creative: ["Design", "Content Creation", "Arts", "Innovation Strategy", "Product Development"],
    technical: ["Software Development", "Engineering", "Information Technology", "Technical Consulting", "Systems Architecture"],
    communication: ["Marketing", "Teaching", "Public Relations", "Content Strategy", "Corporate Communications"],
    leadership: ["Management", "Entrepreneurship", "Consulting", "Team Leadership", "Project Coordination"],
    scientific: ["Healthcare", "Research Science", "Environmental Science", "Laboratory Work", "Clinical Research"],
    entrepreneurial: ["Startup Founding", "Business Development", "Innovation Management", "Venture Capital", "Independent Consulting"],
    social: ["Counseling", "Human Resources", "Community Management", "Customer Success", "Talent Development"],
    critical_thinking: ["Legal Analysis", "Strategy Consulting", "Research", "Policy Development", "Quality Assurance"]
  };
  
  // Get recommended paths based on skills
  let recommendedPaths = topSkills.flatMap(skill => pathsMap[skill] || []);
  
  // Filter paths based on education stage with more specific guidance
  if (educationStage === 'after10th') {
    // For 10th students, focus more on general streams rather than specific careers
    recommendedPaths = recommendedPaths.map(path => {
      if (path === "Software Development" || path === "Engineering" || path === "Information Technology") 
        return "Science/Technical Education (PCM) - Pathway to Engineering and Technology";
      if (path === "Healthcare" || path === "Research Science")
        return "Science Education (PCB) - Foundation for Medical and Life Sciences";
      if (path === "Finance" || path === "Management")
        return "Commerce Education with Mathematics - Business and Financial Career Path";
      if (path === "Design" || path === "Arts" || path === "Teaching")
        return "Arts/Humanities Education - Creative and Social Sciences Track";
      return path;
    });
  }
  
  // Generate personality profile with enhanced insights
  const personalityProfile = generateStudentProfile(answers);
  
  // Select focused next steps based on education stage and personality profile
  const allNextSteps = educationStage ? practicalNextSteps[educationStage] : [];
  const selectedNextSteps = allNextSteps.length > 0 ? allNextSteps.slice(0, 7) : undefined;
  
  // Generate emotional guidance based on answers and personality type with more tailored advice
  let emotionalGuidance = "";
  
  if (personalityProfile.type === "Analytical") {
    emotionalGuidance = "Your methodical approach to problems is a valuable asset in our complex world. While you excel at logical thinking, remember that connecting with others emotionally can enhance both your professional journey and personal satisfaction. Balance your analytical strengths with opportunities to develop interpersonal skills and don't overlook the importance of emotional intelligence alongside technical expertise.";
  } else if (personalityProfile.type === "Creative") {
    emotionalGuidance = "Your creative vision and innovative thinking set you apart! As you explore career paths, seek environments that value and nurture your imagination. While structure might sometimes feel constraining, developing organizational systems can help bring your creative visions to life more effectively. Your ability to think differently is precisely what many cutting-edge fields are seeking.";
  } else if (personalityProfile.type === "Social") {
    emotionalGuidance = "Your ability to connect with others is your superpower in an increasingly automated world. In your career journey, look for roles where you can leverage these interpersonal skills to make a meaningful difference. Remember that developing technical expertise in your chosen field will complement your natural people skills and create a powerful combination that employers value highly.";
  } else if (personalityProfile.type === "Practical") {
    emotionalGuidance = "Your hands-on, practical approach means you learn best by doing and applying knowledge to real situations. Seek opportunities that allow you to apply skills in real-world settings rather than purely theoretical study. Don't underestimate the value of your pragmatic mindset - it's exactly what many employers are looking for in a world of abstract thinkers.";
  } else if (personalityProfile.type === "Enterprising") {
    emotionalGuidance = "Your drive and ambition will take you far in your chosen field! Channel your competitive spirit into setting challenging but achievable goals while maintaining a healthy work-life balance. Remember that building a support network and learning to collaborate effectively will multiply your impact and create lasting success beyond individual achievements.";
  } else if (personalityProfile.type === "Conventional") {
    emotionalGuidance = "Your attention to detail and organizational skills are invaluable in many professional contexts. While you thrive with structure and clear expectations, don't be afraid to occasionally step outside your comfort zone to explore new approaches. Your reliability and thoroughness form a foundation of excellence upon which you can build any career path.";
  } else {
    emotionalGuidance = "You show a balanced set of strengths across different areas, which gives you flexibility in your career choices. This versatility is increasingly valuable in today's changing job market. Continue exploring diverse interests and experiences to help you discover where your unique combination of skills aligns with your deeper passions and purpose.";
  }
  
  return {
    strengths,
    weaknesses,
    recommendedPaths: [...new Set(recommendedPaths)].slice(0, 5), // Remove duplicates, limit to 5
    skills,
    personalityProfile,
    nextSteps: selectedNextSteps,
    emotionalGuidance
  };
};

