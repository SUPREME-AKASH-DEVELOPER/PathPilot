
import { Career } from "@/components/career-library/CareerCard";

export const careerPaths: Career[] = [
  // Technical/IT Careers
  {
    id: "tech-1",
    title: "Data Scientist",
    category: "Technical",
    description: "Analyze complex data to help businesses make better decisions. Combine statistics, programming, and domain expertise to extract insights from data.",
    salary: "₹8,00,000 - ₹25,00,000 per annum",
    entranceExams: ["GATE", "GRE"],
    colleges: ["IITs", "NITs", "IIITs", "BITS"],
    recruiters: ["Amazon", "Microsoft", "Google", "IBM"]
  },
  {
    id: "tech-2",
    title: "Software Engineer",
    category: "Technical",
    description: "Design, develop, and maintain computer software systems and applications. Write clean, efficient code using various programming languages.",
    salary: "₹5,00,000 - ₹30,00,000 per annum",
    entranceExams: ["GATE", "Company-specific tests"],
    colleges: ["IITs", "NITs", "IIITs", "BITS"],
    recruiters: ["TCS", "Infosys", "Google", "Microsoft"]
  },
  {
    id: "tech-3",
    title: "UI/UX Designer",
    category: "Creative",
    description: "Create user-friendly digital interfaces by combining visual design, interaction design, and user research to enhance user experience with products and services.",
    salary: "₹5,00,000 - ₹18,00,000 per annum",
    entranceExams: ["NID DAT", "CEED", "UCEED"],
    colleges: ["NID", "IIT Bombay", "IIT Delhi", "IDC School of Design"],
    recruiters: ["Amazon", "Flipkart", "Google", "Microsoft", "Startups"]
  },
  {
    id: "tech-4",
    title: "Cloud Computing Specialist",
    category: "Technical",
    description: "Design, implement, and manage cloud-based systems for organizations, including infrastructure optimization and security.",
    salary: "₹8,00,000 - ₹24,00,000 per annum",
    entranceExams: ["AWS/Azure/GCP Certification exams"],
    colleges: ["IITs", "NITs", "BITS"],
    recruiters: ["AWS", "Microsoft", "Google Cloud", "IBM"]
  },
  {
    id: "tech-5",
    title: "DevOps Engineer",
    category: "Technical",
    description: "Bridge the gap between software development and IT operations to ensure faster and reliable software delivery through automation and collaboration.",
    salary: "₹8,00,000 - ₹25,00,000 per annum",
    entranceExams: ["Certification exams (Docker, Kubernetes)"],
    colleges: ["IITs", "NITs", "IIITs"],
    recruiters: ["Amazon", "Google", "Microsoft", "Startups"]
  },
  {
    id: "tech-6",
    title: "Cyber Security Analyst",
    category: "Technical",
    description: "Protect organizations from cyber threats by monitoring systems, identifying vulnerabilities, and implementing security measures.",
    salary: "₹6,00,000 - ₹20,00,000 per annum",
    entranceExams: ["CISSP", "CEH", "CompTIA Security+"],
    colleges: ["IITs", "NITs", "IIIT Hyderabad"],
    recruiters: ["Deloitte", "IBM", "TCS", "Infosys"]
  },
  {
    id: "tech-7",
    title: "Machine Learning Engineer",
    category: "Technical",
    description: "Develop AI systems that can learn from and make decisions based on data. Create algorithms and models to power intelligent applications.",
    salary: "₹10,00,000 - ₹28,00,000 per annum",
    entranceExams: ["GATE", "GRE"],
    colleges: ["IISc", "IITs", "IIIT Hyderabad"],
    recruiters: ["Google", "Microsoft", "Amazon", "Nvidia"]
  },
  {
    id: "tech-8",
    title: "Blockchain Developer",
    category: "Technical",
    description: "Design and implement blockchain-based applications and smart contracts. Develop solutions for cryptocurrencies and decentralized applications.",
    salary: "₹8,00,000 - ₹24,00,000 per annum",
    entranceExams: ["Certification exams"],
    colleges: ["IITs", "NITs", "ISB"],
    recruiters: ["Polygon", "CoinDCX", "IBM", "Deloitte"]
  },
  {
    id: "tech-9",
    title: "Game Developer",
    category: "Creative",
    description: "Design and program video games for various platforms, focusing on gameplay mechanics, user experience, and performance optimization.",
    salary: "₹5,00,000 - ₹20,00,000 per annum",
    entranceExams: ["Portfolio-based admissions"],
    colleges: ["IIIT Hyderabad", "DSK Supinfocom", "Arena Animation"],
    recruiters: ["Ubisoft", "EA Games", "Rockstar Games", "Nazara Technologies"]
  },
  {
    id: "tech-10",
    title: "AR/VR Developer",
    category: "Technical",
    description: "Create immersive augmented reality and virtual reality experiences across devices and platforms by combining 3D modeling with programming.",
    salary: "₹7,00,000 - ₹20,00,000 per annum",
    entranceExams: ["Portfolio-based admissions"],
    colleges: ["IITs", "NITs", "NID"],
    recruiters: ["Meta", "Google", "Apple", "Unity Technologies"]
  },
  {
    id: "tech-11",
    title: "Database Administrator",
    category: "Technical",
    description: "Manage and optimize databases to ensure they are secure, efficient, and available to users when needed.",
    salary: "₹6,00,000 - ₹18,00,000 per annum",
    entranceExams: ["Oracle/Microsoft/MongoDB certifications"],
    colleges: ["IITs", "NITs", "IIITs"],
    recruiters: ["Oracle", "IBM", "TCS", "Infosys"]
  },
  {
    id: "tech-12",
    title: "Full Stack Developer",
    category: "Technical",
    description: "Build complete web applications by working on both front-end and back-end development, handling everything from user interfaces to server logic.",
    salary: "₹6,00,000 - ₹25,00,000 per annum",
    entranceExams: ["GATE", "Company-specific tests"],
    colleges: ["IITs", "NITs", "IIITs"],
    recruiters: ["Flipkart", "Amazon", "Startups", "TCS"]
  },
  {
    id: "tech-13",
    title: "Mobile App Developer",
    category: "Technical",
    description: "Design and build applications for mobile devices on platforms like Android and iOS, focusing on user experience and performance.",
    salary: "₹5,00,000 - ₹22,00,000 per annum",
    entranceExams: ["GATE", "Company-specific tests"],
    colleges: ["IITs", "NITs", "IIITs"],
    recruiters: ["Google", "Apple", "Swiggy", "Zomato"]
  },
  {
    id: "tech-14",
    title: "Computer Vision Engineer",
    category: "Technical",
    description: "Develop systems that can process, analyze, and understand digital images or videos to extract meaningful information.",
    salary: "₹10,00,000 - ₹30,00,000 per annum",
    entranceExams: ["GATE", "GRE"],
    colleges: ["IISc", "IITs", "IIIT Hyderabad"],
    recruiters: ["Nvidia", "Intel", "Tesla", "Google"]
  },
  {
    id: "tech-15",
    title: "Natural Language Processing Engineer",
    category: "Technical",
    description: "Work on technology that helps computers understand, interpret, and respond to human language in meaningful ways.",
    salary: "₹10,00,000 - ₹28,00,000 per annum",
    entranceExams: ["GATE", "GRE"],
    colleges: ["IISc", "IITs", "IIIT Hyderabad"],
    recruiters: ["Google", "Microsoft", "Amazon", "OpenAI"]
  },
  
  // Medical/Healthcare Careers
  {
    id: "med-1",
    title: "Medical Officer",
    category: "Medical",
    description: "Provide healthcare services in hospitals, clinics, or government health centers. Diagnose and treat illnesses, prescribe medications, and educate patients.",
    salary: "₹6,00,000 - ₹12,00,000 per annum (Government), ₹8,00,000 - ₹20,00,000 (Private)",
    entranceExams: ["NEET-PG", "AIIMS PG"],
    colleges: ["AIIMS", "JIPMER", "CMC Vellore", "AFMC"],
    recruiters: ["Government Hospitals", "Apollo", "Fortis", "Max Healthcare"]
  },
  {
    id: "med-2",
    title: "Cardiologist",
    category: "Medical",
    description: "Specialize in diagnosing and treating diseases of the cardiovascular system, including heart diseases and disorders of blood vessels.",
    salary: "₹15,00,000 - ₹80,00,000 per annum",
    entranceExams: ["NEET-PG", "DNB-CET"],
    colleges: ["AIIMS", "PGI Chandigarh", "CMC Vellore"],
    recruiters: ["Apollo", "Fortis", "Medanta", "Narayana Health"]
  },
  {
    id: "med-3",
    title: "Neurosurgeon",
    category: "Medical",
    description: "Perform surgeries on the brain, spine, and peripheral nerves to treat injuries, disorders, and diseases affecting the nervous system.",
    salary: "₹20,00,000 - ₹1,00,00,000 per annum",
    entranceExams: ["NEET-PG", "DNB-CET"],
    colleges: ["AIIMS", "NIMHANS", "PGI Chandigarh"],
    recruiters: ["Apollo", "Fortis", "Medanta", "Max Healthcare"]
  },
  {
    id: "med-4",
    title: "Pediatrician",
    category: "Medical",
    description: "Provide medical care for infants, children, and adolescents, focusing on their physical, emotional, and social health.",
    salary: "₹10,00,000 - ₹40,00,000 per annum",
    entranceExams: ["NEET-PG", "DNB-CET"],
    colleges: ["AIIMS", "MAMC", "KGMU"],
    recruiters: ["Apollo", "Fortis", "Rainbow Children's Hospital"]
  },
  {
    id: "med-5",
    title: "Dermatologist",
    category: "Medical",
    description: "Diagnose and treat conditions affecting the skin, hair, nails, and mucous membranes, ranging from acne to skin cancer.",
    salary: "₹12,00,000 - ₹50,00,000 per annum",
    entranceExams: ["NEET-PG", "DNB-CET"],
    colleges: ["AIIMS", "PGIMER", "MAMC"],
    recruiters: ["Apollo", "Fortis", "Kaya Skin Clinic", "Private Practices"]
  },
  {
    id: "med-6",
    title: "Psychiatrist",
    category: "Medical",
    description: "Treat mental health disorders through a combination of psychotherapy, medication, and other treatments, focusing on the biological aspects of mental health.",
    salary: "₹10,00,000 - ₹40,00,000 per annum",
    entranceExams: ["NEET-PG", "DNB-CET"],
    colleges: ["NIMHANS", "AIIMS", "PGI Chandigarh"],
    recruiters: ["Government Hospitals", "Mental Health Institutes", "Private Practices"]
  },
  {
    id: "med-7",
    title: "Anesthesiologist",
    category: "Medical",
    description: "Administer anesthetics during surgeries and other medical procedures to manage pain and vital functions. Monitor patients during operations and recovery.",
    salary: "₹15,00,000 - ₹60,00,000 per annum",
    entranceExams: ["NEET-PG", "DNB-CET"],
    colleges: ["AIIMS", "PGI Chandigarh", "CMC Vellore"],
    recruiters: ["Apollo", "Fortis", "Max Healthcare", "Government Hospitals"]
  },
  {
    id: "med-8",
    title: "Pharmacy Manager",
    category: "Medical",
    description: "Oversee operations of a pharmacy, ensuring compliance with laws and regulations, managing inventory, and supervising staff.",
    salary: "₹5,00,000 - ₹15,00,000 per annum",
    entranceExams: ["GPAT", "NIPER JEE"],
    colleges: ["NIPER", "Jamia Hamdard", "BITS Pilani"],
    recruiters: ["Apollo Pharmacy", "MedPlus", "Hospitals", "Retail Chains"]
  },
  {
    id: "med-9",
    title: "Clinical Research Associate",
    category: "Medical",
    description: "Monitor clinical trials to ensure compliance with protocols and regulatory standards. Collect and analyze data from medical research studies.",
    salary: "₹5,00,000 - ₹15,00,000 per annum",
    entranceExams: ["GRE", "CSIR-NET"],
    colleges: ["NIPER", "AIIMS", "JSS Mysore"],
    recruiters: ["Novartis", "Pfizer", "Sun Pharma", "Quintiles"]
  },
  {
    id: "med-10",
    title: "Physiotherapist",
    category: "Medical",
    description: "Help patients reduce pain and improve mobility through exercises, manual therapy, and other techniques following injury or surgery.",
    salary: "₹3,00,000 - ₹12,00,000 per annum",
    entranceExams: ["CET for MPT courses"],
    colleges: ["AIIMS", "CMC Vellore", "MGM Mumbai"],
    recruiters: ["Hospitals", "Sports Teams", "Rehabilitation Centers", "Private Clinics"]
  },
  {
    id: "med-11",
    title: "Dentist",
    category: "Medical",
    description: "Diagnose and treat problems with teeth, gums, and related parts of the mouth. Provide advice on dental care to prevent future problems.",
    salary: "₹5,00,000 - ₹30,00,000 per annum",
    entranceExams: ["NEET-MDS", "AIIMS MDS"],
    colleges: ["AIIMS", "Maulana Azad", "Government Dental College Mumbai"],
    recruiters: ["Clove Dental", "Apollo White Dental", "Private Practices"]
  },
  {
    id: "med-12",
    title: "Public Health Specialist",
    category: "Medical",
    description: "Work on preventing disease and promoting health at the community or population level through research, policy development, and education.",
    salary: "₹6,00,000 - ₹20,00,000 per annum",
    entranceExams: ["AIIMS MPH", "JNU MPH", "TISS"],
    colleges: ["AIIMS", "JNU", "TISS", "PHFI"],
    recruiters: ["WHO", "UNICEF", "Government Agencies", "NGOs"]
  },
  
  // Government Careers
  {
    id: "gov-1",
    title: "Civil Services Officer",
    category: "Government",
    description: "Work in administrative positions within the Indian government. Shape and implement policies, oversee public services, and work towards national development.",
    salary: "₹56,100 - ₹2,50,000 per month (depends on position and grade)",
    entranceExams: ["UPSC Civil Services Exam", "State PSC Exams"],
    colleges: ["Lal Bahadur Shastri National Academy of Administration", "State Administrative Training Institutes"],
    recruiters: ["Government of India", "State Governments"]
  },
  {
    id: "gov-2",
    title: "Police Officer",
    category: "Government",
    description: "Maintain law and order, investigate crimes, ensure public safety, and enforce laws at various levels in the police force.",
    salary: "₹5,00,000 - ₹25,00,000 per annum (varies by rank)",
    entranceExams: ["UPSC CSE", "State Police Services Exam"],
    colleges: ["National Police Academy", "State Police Academies"],
    recruiters: ["Central Government", "State Governments"]
  },
  {
    id: "gov-3",
    title: "Indian Forest Service Officer",
    category: "Government",
    description: "Manage and conserve India's forest resources, implement forest policies, and work on wildlife conservation and environmental protection.",
    salary: "₹56,100 - ₹2,50,000 per month (depends on position and grade)",
    entranceExams: ["UPSC IFoS Exam"],
    colleges: ["Indira Gandhi National Forest Academy"],
    recruiters: ["Government of India", "State Forest Departments"]
  },
  {
    id: "gov-4",
    title: "Bank Probationary Officer",
    category: "Government",
    description: "Work in managerial positions in public sector banks, handling operations, customer service, and financial transactions.",
    salary: "₹7,00,000 - ₹12,00,000 per annum",
    entranceExams: ["IBPS PO", "SBI PO"],
    colleges: ["Various Management Institutes"],
    recruiters: ["SBI", "PNB", "Bank of Baroda", "Other Public Sector Banks"]
  },
  {
    id: "gov-5",
    title: "Income Tax Officer",
    category: "Government",
    description: "Enforce tax laws, conduct audits, investigate tax evasion cases, and ensure compliance with tax regulations.",
    salary: "₹9,00,000 - ₹15,00,000 per annum",
    entranceExams: ["SSC CGL", "UPSC CAPF"],
    colleges: ["National Academy of Direct Taxes"],
    recruiters: ["Income Tax Department", "Government of India"]
  },
  {
    id: "gov-6",
    title: "Railway Officer",
    category: "Government",
    description: "Manage operations, administration, or technical aspects of the Indian Railways, ensuring safe and efficient railway services.",
    salary: "₹8,00,000 - ₹15,00,000 per annum",
    entranceExams: ["UPSC Civil Services", "UPSC Engineering Services"],
    colleges: ["Indian Railways Institute of Transport Management"],
    recruiters: ["Indian Railways"]
  },
  {
    id: "gov-7",
    title: "Defense Services Officer",
    category: "Government",
    description: "Lead and manage operations in the Indian Armed Forces (Army, Navy, or Air Force), ensuring national security and defense preparedness.",
    salary: "₹6,00,000 - ₹20,00,000 per annum (varies by rank)",
    entranceExams: ["NDA", "CDS", "AFCAT"],
    colleges: ["National Defence Academy", "Indian Military Academy", "Naval Academy"],
    recruiters: ["Indian Army", "Indian Navy", "Indian Air Force"]
  },
  {
    id: "gov-8",
    title: "Intelligence Officer",
    category: "Government",
    description: "Gather and analyze intelligence to identify threats to national security. Conduct operations to counter espionage and terrorism.",
    salary: "₹9,00,000 - ₹18,00,000 per annum",
    entranceExams: ["SSC CGL", "UPSC CAPF AC"],
    colleges: ["Training academies of respective organizations"],
    recruiters: ["Intelligence Bureau", "RAW", "Military Intelligence"]
  },
  {
    id: "gov-9",
    title: "Customs Officer",
    category: "Government",
    description: "Enforce customs regulations, inspect goods at international borders, and prevent illegal import/export of prohibited items.",
    salary: "₹9,00,000 - ₹15,00,000 per annum",
    entranceExams: ["SSC CGL", "UPSC CAPF AC"],
    colleges: ["National Academy of Customs, Indirect Taxes & Narcotics"],
    recruiters: ["Central Board of Indirect Taxes and Customs"]
  },
  {
    id: "gov-10",
    title: "Public Sector Undertaking Executive",
    category: "Government",
    description: "Work in management positions in government-owned corporations across sectors like energy, mining, transportation, and manufacturing.",
    salary: "₹8,00,000 - ₹20,00,000 per annum",
    entranceExams: ["GATE", "Company-specific tests"],
    colleges: ["IITs", "NITs", "IIMs"],
    recruiters: ["ONGC", "BHEL", "NTPC", "SAIL", "GAIL"]
  },
  {
    id: "gov-11",
    title: "Judge/Judicial Services",
    category: "Government",
    description: "Preside over court proceedings, interpret laws, and make judgments in legal cases to ensure justice is served.",
    salary: "₹10,00,000 - ₹30,00,000 per annum",
    entranceExams: ["Judicial Services Exam"],
    colleges: ["National Law Universities", "State Law Colleges"],
    recruiters: ["High Courts", "District Courts"]
  },
  {
    id: "gov-12",
    title: "Assistant Professor (Government)",
    category: "Education",
    description: "Teach at government colleges and universities, conduct research, publish academic papers, and mentor students.",
    salary: "₹8,00,000 - ₹15,00,000 per annum",
    entranceExams: ["UGC NET", "CSIR NET"],
    colleges: ["Central Universities", "State Universities"],
    recruiters: ["Government Universities", "Government Colleges"]
  },
  
  // Education Careers
  {
    id: "edu-1",
    title: "Professor/Lecturer",
    category: "Education",
    description: "Teach at colleges and universities, conduct research, publish academic papers, and mentor students in their chosen field of expertise.",
    salary: "₹8,00,000 - ₹30,00,000 per annum",
    entranceExams: ["UGC NET", "CSIR NET"],
    colleges: ["Central Universities", "State Universities", "IITs", "IIMs"],
    recruiters: ["Universities", "Colleges", "Research Institutes"]
  },
  {
    id: "edu-2",
    title: "School Principal",
    category: "Education",
    description: "Lead and manage school operations, develop educational programs, oversee teaching staff, and ensure quality education delivery.",
    salary: "₹10,00,000 - ₹25,00,000 per annum",
    entranceExams: ["B.Ed", "M.Ed", "Experience-based selection"],
    colleges: ["Regional Institutes of Education", "Education Universities"],
    recruiters: ["Private Schools", "Government Schools", "International Schools"]
  },
  {
    id: "edu-3",
    title: "Educational Counselor",
    category: "Education",
    description: "Guide students in making informed decisions about academic paths, career choices, and personal development by assessing their abilities and interests.",
    salary: "₹4,00,000 - ₹12,00,000 per annum",
    entranceExams: ["MA/M.Sc Psychology entrance exams"],
    colleges: ["TISS", "Delhi University", "Bangalore University"],
    recruiters: ["Schools", "Colleges", "Private Counseling Centers"]
  },
  {
    id: "edu-4",
    title: "Instructional Designer",
    category: "Education",
    description: "Develop educational materials and learning experiences for various platforms, applying learning theories and instructional strategies.",
    salary: "₹5,00,000 - ₹15,00,000 per annum",
    entranceExams: ["M.Ed. Entrance Exams"],
    colleges: ["SNDT Women's University", "TISS", "EFLU"],
    recruiters: ["BYJU'S", "Unacademy", "Corporate Training Departments", "EdTech Startups"]
  },
  {
    id: "edu-5",
    title: "Special Education Teacher",
    category: "Education",
    description: "Work with children and young people who have various disabilities or learning difficulties, adapting teaching methods to their specific needs.",
    salary: "₹3,00,000 - ₹10,00,000 per annum",
    entranceExams: ["B.Ed. Special Education entrance exams"],
    colleges: ["NIEPMD", "NIMH", "Ali Yavar Jung Institute"],
    recruiters: ["Special Schools", "Inclusive Schools", "NGOs"]
  },
  {
    id: "edu-6",
    title: "E-Learning Content Developer",
    category: "Education",
    description: "Create digital educational content including videos, interactive modules, and assessments for online learning platforms.",
    salary: "₹4,00,000 - ₹12,00,000 per annum",
    entranceExams: ["Portfolio-based selection"],
    colleges: ["NIFT", "NID", "Symbiosis Centre for Media"],
    recruiters: ["BYJU'S", "Unacademy", "Vedantu", "Coursera"]
  },
  {
    id: "edu-7",
    title: "Education Policy Analyst",
    category: "Education",
    description: "Research, analyze, and develop education policies and reforms, advising government bodies and educational institutions on best practices.",
    salary: "₹8,00,000 - ₹18,00,000 per annum",
    entranceExams: ["JNU MA, TISS MA"],
    colleges: ["JNU", "TISS", "Azim Premji University"],
    recruiters: ["NITI Aayog", "Ministry of Education", "Think Tanks", "NGOs"]
  },
  {
    id: "edu-8",
    title: "Academic Researcher",
    category: "Education",
    description: "Conduct research in specialized fields, publish findings in academic journals, and contribute to the advancement of knowledge.",
    salary: "₹6,00,000 - ₹20,00,000 per annum",
    entranceExams: ["CSIR NET", "UGC NET", "JRF"],
    colleges: ["IISc", "IITs", "Central Universities"],
    recruiters: ["Research Institutes", "Universities", "Think Tanks"]
  },
  
  // Finance Careers
  {
    id: "fin-1",
    title: "Investment Banker",
    category: "Finance",
    description: "Assist organizations in raising capital by issuing securities, provide financial advisory services, and facilitate mergers and acquisitions.",
    salary: "₹10,00,000 - ₹50,00,000 per annum",
    entranceExams: ["CAT", "XAT", "GMAT"],
    colleges: ["IIMs", "FMS Delhi", "ISB", "XLRI"],
    recruiters: ["JP Morgan", "Goldman Sachs", "Morgan Stanley", "ICICI Securities"]
  },
  {
    id: "fin-2",
    title: "Chartered Accountant",
    category: "Finance",
    description: "Provide financial advice, audit accounts, prepare financial reports, and ensure compliance with tax laws and regulations.",
    salary: "₹7,00,000 - ₹30,00,000 per annum",
    entranceExams: ["CA Foundation", "CA Intermediate", "CA Final"],
    colleges: ["ICAI"],
    recruiters: ["Deloitte", "EY", "KPMG", "PwC", "Corporate Finance Departments"]
  },
  {
    id: "fin-3",
    title: "Financial Analyst",
    category: "Finance",
    description: "Analyze financial data, identify trends, and provide recommendations to help organizations make sound investment decisions.",
    salary: "₹6,00,000 - ₹20,00,000 per annum",
    entranceExams: ["CFA", "FRM", "MBA Entrance Exams"],
    colleges: ["IIMs", "FMS Delhi", "XLRI", "NMIMS"],
    recruiters: ["JP Morgan", "Goldman Sachs", "Credit Suisse", "HDFC Bank"]
  },
  {
    id: "fin-4",
    title: "Wealth Manager",
    category: "Finance",
    description: "Provide personalized financial advice to high-net-worth individuals, helping them manage investments, taxes, estate planning, and more.",
    salary: "₹8,00,000 - ₹40,00,000 per annum",
    entranceExams: ["CFP", "CWM", "MBA Entrance Exams"],
    colleges: ["IIMs", "XLRI", "NMIMS", "ISB"],
    recruiters: ["HDFC Bank", "ICICI Bank", "Kotak Mahindra", "Aditya Birla Capital"]
  },
  {
    id: "fin-5",
    title: "Risk Analyst",
    category: "Finance",
    description: "Identify, analyze, and mitigate financial risks for organizations. Develop strategies to minimize potential losses from market changes or regulatory issues.",
    salary: "₹7,00,000 - ₹25,00,000 per annum",
    entranceExams: ["FRM", "MBA Entrance Exams"],
    colleges: ["IIMs", "NIBM", "XLRI", "NMIMS"],
    recruiters: ["HDFC Bank", "ICICI Bank", "Axis Bank", "Insurance Companies"]
  },
  {
    id: "fin-6",
    title: "Actuary",
    category: "Finance",
    description: "Analyze financial costs of risk and uncertainty using mathematics, statistics, and financial theory, especially for insurance and pension programs.",
    salary: "₹8,00,000 - ₹40,00,000 per annum",
    entranceExams: ["Actuarial Common Entrance Test"],
    colleges: ["Institute of Actuaries of India courses"],
    recruiters: ["Insurance Companies", "Pension Funds", "Consulting Firms"]
  },
  {
    id: "fin-7",
    title: "Credit Analyst",
    category: "Finance",
    description: "Evaluate the creditworthiness of individuals or organizations applying for loans, determining risk levels and appropriate lending terms.",
    salary: "₹4,00,000 - ₹15,00,000 per annum",
    entranceExams: ["MBA Entrance Exams"],
    colleges: ["IIMs", "XLRI", "NIBM"],
    recruiters: ["Banks", "NBFCs", "Credit Rating Agencies"]
  },
  {
    id: "fin-8",
    title: "Tax Consultant",
    category: "Finance",
    description: "Provide advice on tax planning, compliance, and solving complex tax issues for individuals and businesses to optimize their tax positions.",
    salary: "₹5,00,000 - ₹25,00,000 per annum",
    entranceExams: ["CA", "CS", "CMA"],
    colleges: ["ICAI", "ICSI", "ICMAI"],
    recruiters: ["Deloitte", "EY", "KPMG", "PwC", "Independent Practices"]
  },
  {
    id: "fin-9",
    title: "Company Secretary",
    category: "Finance",
    description: "Ensure companies comply with statutory and regulatory requirements, maintain corporate governance standards, and advise boards on legal matters.",
    salary: "₹5,00,000 - ₹20,00,000 per annum",
    entranceExams: ["CSEET", "CS Executive", "CS Professional"],
    colleges: ["ICSI"],
    recruiters: ["Corporate Legal Departments", "Consulting Firms", "Law Firms"]
  },
  {
    id: "fin-10",
    title: "Financial Planner",
    category: "Finance",
    description: "Help individuals and families manage their finances by creating comprehensive plans for savings, investments, insurance, and retirement.",
    salary: "₹5,00,000 - ₹20,00,000 per annum",
    entranceExams: ["CFP", "MBA Entrance Exams"],
    colleges: ["IIMs", "XLRI", "NMIMS"],
    recruiters: ["Banks", "Insurance Companies", "Independent Practices"]
  },
  
  // Creative Careers
  {
    id: "cre-1",
    title: "Graphic Designer",
    category: "Creative",
    description: "Create visual content for various media including websites, advertisements, brochures, magazines, and corporate identity materials.",
    salary: "₹3,00,000 - ₹12,00,000 per annum",
    entranceExams: ["UCEED", "CEED", "NID DAT"],
    colleges: ["NID", "NIFT", "IDC School of Design"],
    recruiters: ["Advertising Agencies", "Design Studios", "Corporate Marketing Departments"]
  },
  {
    id: "cre-2",
    title: "Film Director",
    category: "Creative",
    description: "Control the artistic and dramatic aspects of films, guiding the technical crew and actors to fulfill their creative vision.",
    salary: "₹5,00,000 - ₹50,00,000+ per annum (highly variable)",
    entranceExams: ["FTII JET", "SRFTI"],
    colleges: ["FTII Pune", "SRFTI Kolkata", "Whistling Woods"],
    recruiters: ["Production Houses", "OTT Platforms", "Advertising Agencies"]
  },
  {
    id: "cre-3",
    title: "Fashion Designer",
    category: "Creative",
    description: "Create clothing designs, accessories, and footwear, combining artistic talent with business acumen and knowledge of textiles.",
    salary: "₹3,00,000 - ₹25,00,000 per annum",
    entranceExams: ["NIFT Entrance", "NID DAT"],
    colleges: ["NIFT", "NID", "Pearl Academy"],
    recruiters: ["Fashion Houses", "Retail Brands", "Export Houses"]
  },
  {
    id: "cre-4",
    title: "Animator",
    category: "Creative",
    description: "Create the illusion of movement in sequences of drawings or 3D models for films, television, video games, and other media.",
    salary: "₹3,00,000 - ₹15,00,000 per annum",
    entranceExams: ["NID DAT", "Portfolio-based admissions"],
    colleges: ["NID", "IDC IIT Bombay", "Arena Animation"],
    recruiters: ["Animation Studios", "Gaming Companies", "Advertising Agencies"]
  },
  {
    id: "cre-5",
    title: "Interior Designer",
    category: "Creative",
    description: "Plan and design interior spaces in residential, commercial, and industrial buildings, focusing on both aesthetics and functionality.",
    salary: "₹3,50,000 - ₹15,00,000 per annum",
    entranceExams: ["NIFT", "NID DAT", "CEED"],
    colleges: ["NID", "NIFT", "JJ School of Arts"],
    recruiters: ["Architecture Firms", "Interior Design Studios", "Real Estate Developers"]
  },
  {
    id: "cre-6",
    title: "Content Creator",
    category: "Creative",
    description: "Produce engaging content for various platforms including social media, blogs, websites, and video channels to engage and grow audiences.",
    salary: "₹3,00,000 - ₹20,00,000 per annum (highly variable)",
    entranceExams: ["Portfolio-based selection"],
    colleges: ["MICA", "Symbiosis Institute of Media", "Xavier Institute of Communications"],
    recruiters: ["Media Companies", "Digital Marketing Agencies", "Corporates", "Self-employed"]
  },
  {
    id: "cre-7",
    title: "Photographer",
    category: "Creative",
    description: "Capture images that tell stories, convey emotions, or document events across various genres like fashion, wildlife, journalism, or weddings.",
    salary: "₹3,00,000 - ₹20,00,000 per annum (highly variable)",
    entranceExams: ["Portfolio-based admissions"],
    colleges: ["National Institute of Photography", "Symbiosis School of Photography", "LV Prasad Film & TV Academy"],
    recruiters: ["Media Organizations", "Fashion Houses", "Advertising Agencies", "Self-employed"]
  },
  {
    id: "cre-8",
    title: "Copywriter",
    category: "Creative",
    description: "Write persuasive content for advertisements, marketing materials, websites, and other media to engage audiences and drive action.",
    salary: "₹4,00,000 - ₹15,00,000 per annum",
    entranceExams: ["Portfolio-based selection"],
    colleges: ["MICA", "Xavier Institute of Communications", "Symbiosis Institute of Media"],
    recruiters: ["Advertising Agencies", "Marketing Departments", "Content Marketing Firms"]
  },
  {
    id: "cre-9",
    title: "Art Director",
    category: "Creative",
    description: "Lead the visual aspects of advertising campaigns, publications, films, or other media productions, managing teams of designers and artists.",
    salary: "₹8,00,000 - ₹25,00,000 per annum",
    entranceExams: ["Portfolio-based selection"],
    colleges: ["NID", "JJ School of Arts", "Faculty of Fine Arts, MSU Baroda"],
    recruiters: ["Advertising Agencies", "Design Studios", "Film Production Companies"]
  },
  {
    id: "cre-10",
    title: "Music Producer",
    category: "Creative",
    description: "Oversee and manage the recording, production, and arrangement of music, working with artists to achieve the desired sound and quality.",
    salary: "₹4,00,000 - ₹30,00,000 per annum (highly variable)",
    entranceExams: ["Portfolio/Audition-based selection"],
    colleges: ["KM Music Conservatory", "AR Rahman's KMMC", "True School of Music"],
    recruiters: ["Music Labels", "Film Production Houses", "Independent Studios"]
  },
  
  // Marketing and Sales Careers
  {
    id: "mkt-1",
    title: "Marketing Manager",
    category: "Marketing",
    description: "Develop and implement marketing strategies to promote products or services, build brand awareness, and drive business growth.",
    salary: "₹7,00,000 - ₹25,00,000 per annum",
    entranceExams: ["CAT", "XAT", "SNAP", "NMAT"],
    colleges: ["IIMs", "XLRI", "FMS Delhi", "MDI Gurgaon"],
    recruiters: ["HUL", "P&G", "Nestle", "ITC", "Tech Companies"]
  },
  {
    id: "mkt-2",
    title: "Digital Marketing Specialist",
    category: "Marketing",
    description: "Plan and execute marketing campaigns across digital channels including social media, email, search engines, and websites.",
    salary: "₹4,00,000 - ₹15,00,000 per annum",
    entranceExams: ["CAT", "XAT", "SNAP"],
    colleges: ["MICA", "SIMC", "IMT", "IIMs"],
    recruiters: ["Digital Marketing Agencies", "E-commerce Companies", "Corporate Marketing Departments"]
  },
  {
    id: "mkt-3",
    title: "Public Relations Manager",
    category: "Marketing",
    description: "Build and maintain a positive public image for organizations by managing relationships with media, stakeholders, and the public.",
    salary: "₹5,00,000 - ₹18,00,000 per annum",
    entranceExams: ["CAT", "XAT", "SNAP"],
    colleges: ["MICA", "SIMC", "XIC", "IIMC"],
    recruiters: ["PR Agencies", "Corporate Communications Departments", "Government Organizations"]
  },
  {
    id: "mkt-4",
    title: "Sales Manager",
    category: "Marketing",
    description: "Lead sales teams to achieve targets, develop sales strategies, build client relationships, and identify new business opportunities.",
    salary: "₹6,00,000 - ₹25,00,000 per annum",
    entranceExams: ["CAT", "XAT", "SNAP"],
    colleges: ["IIMs", "XLRI", "FMS Delhi", "SPJIMR"],
    recruiters: ["FMCG Companies", "Pharmaceutical Companies", "Tech Companies", "Financial Institutions"]
  },
  {
    id: "mkt-5",
    title: "Brand Manager",
    category: "Marketing",
    description: "Develop and maintain a brand's identity and perception in the market, overseeing marketing campaigns and product development.",
    salary: "₹8,00,000 - ₹25,00,000 per annum",
    entranceExams: ["CAT", "XAT", "SNAP"],
    colleges: ["IIMs", "XLRI", "FMS Delhi", "MICA"],
    recruiters: ["HUL", "P&G", "ITC", "Nestle", "Coca-Cola"]
  },
  {
    id: "mkt-6",
    title: "Market Research Analyst",
    category: "Marketing",
    description: "Gather and analyze data about consumers, competitors, and market conditions to help companies understand what products people want.",
    salary: "₹4,00,000 - ₹15,00,000 per annum",
    entranceExams: ["CAT", "XAT", "SNAP", "GRE"],
    colleges: ["IIMs", "XLRI", "MICA", "TISS"],
    recruiters: ["Nielsen", "IMRB", "Kantar", "Corporate Research Departments"]
  },
  {
    id: "mkt-7",
    title: "Social Media Manager",
    category: "Marketing",
    description: "Manage an organization's presence on social media platforms, creating content, engaging with followers, and analyzing performance.",
    salary: "₹3,50,000 - ₹12,00,000 per annum",
    entranceExams: ["CAT", "XAT", "SNAP", "Portfolio-based selection"],
    colleges: ["MICA", "SIMC", "XIC"],
    recruiters: ["Digital Marketing Agencies", "Corporate Marketing Departments", "Media Companies"]
  },
  {
    id: "mkt-8",
    title: "E-commerce Manager",
    category: "Marketing",
    description: "Oversee online sales operations, develop strategies to increase web traffic and conversion rates, and enhance customer experience.",
    salary: "₹6,00,000 - ₹20,00,000 per annum",
    entranceExams: ["CAT", "XAT", "SNAP"],
    colleges: ["IIMs", "XLRI", "SPJIMR", "NMIMS"],
    recruiters: ["Amazon", "Flipkart", "Myntra", "Retail Companies"]
  },
  
  // Engineering Careers
  {
    id: "eng-1",
    title: "Civil Engineer",
    category: "Engineering",
    description: "Design, build, and maintain infrastructure projects and systems, including roads, buildings, airports, tunnels, dams, and water supply systems.",
    salary: "₹4,00,000 - ₹20,00,000 per annum",
    entranceExams: ["JEE Main", "JEE Advanced", "GATE"],
    colleges: ["IITs", "NITs", "BITS"],
    recruiters: ["L&T", "Shapoorji Pallonji", "AECOM", "Government Departments"]
  },
  {
    id: "eng-2",
    title: "Mechanical Engineer",
    category: "Engineering",
    description: "Design, develop, build, and test mechanical devices and systems, including tools, engines, machines, and thermal/mechanical sensors.",
    salary: "₹4,00,000 - ₹20,00,000 per annum",
    entranceExams: ["JEE Main", "JEE Advanced", "GATE"],
    colleges: ["IITs", "NITs", "BITS"],
    recruiters: ["Tata Motors", "Mahindra & Mahindra", "Maruti Suzuki", "BHEL", "L&T"]
  },
  {
    id: "eng-3",
    title: "Electronics Engineer",
    category: "Engineering",
    description: "Design and develop electronic equipment, including communication systems, medical monitoring devices, and navigation systems.",
    salary: "₹4,00,000 - ₹20,00,000 per annum",
    entranceExams: ["JEE Main", "JEE Advanced", "GATE"],
    colleges: ["IITs", "NITs", "BITS"],
    recruiters: ["Intel", "Samsung", "LG", "Bosch", "Siemens"]
  },
  {
    id: "eng-4",
    title: "Electrical Engineer",
    category: "Engineering",
    description: "Design, develop, test, and supervise the manufacturing of electrical equipment, including power generation equipment and electrical systems.",
    salary: "₹4,00,000 - ₹20,00,000 per annum",
    entranceExams: ["JEE Main", "JEE Advanced", "GATE"],
    colleges: ["IITs", "NITs", "BITS"],
    recruiters: ["NTPC", "Power Grid", "Siemens", "ABB", "L&T"]
  },
  {
    id: "eng-5",
    title: "Aerospace Engineer",
    category: "Engineering",
    description: "Design aircraft, spacecraft, satellites, and missiles, as well as test prototypes to ensure they function according to design.",
    salary: "₹6,00,000 - ₹25,00,000 per annum",
    entranceExams: ["JEE Advanced", "GATE"],
    colleges: ["IITs", "IISc", "IIST"],
    recruiters: ["ISRO", "HAL", "DRDO", "Boeing India", "Airbus India"]
  },
  {
    id: "eng-6",
    title: "Petroleum Engineer",
    category: "Engineering",
    description: "Develop methods for extracting oil and gas from deposits below the Earth's surface, and design equipment and processes to maximize production.",
    salary: "₹8,00,000 - ₹30,00,000 per annum",
    entranceExams: ["JEE Advanced", "GATE"],
    colleges: ["IITs", "UPES", "MIT"],
    recruiters: ["ONGC", "Reliance Industries", "Oil India Limited", "BPCL", "IOCL"]
  },
  {
    id: "eng-7",
    title: "Biomedical Engineer",
    category: "Engineering",
    description: "Combine engineering principles with medical and biological sciences to design medical equipment, devices, computer systems, and software.",
    salary: "₹4,00,000 - ₹20,00,000 per annum",
    entranceExams: ["JEE Advanced", "GATE", "BITSAT"],
    colleges: ["IITs", "IISc", "Manipal Institute of Technology"],
    recruiters: ["GE Healthcare", "Siemens Healthineers", "Philips Healthcare", "Medtronic"]
  },
  {
    id: "eng-8",
    title: "Chemical Engineer",
    category: "Engineering",
    description: "Apply principles of chemistry, physics, biology, and mathematics to solve problems involving the production or use of chemicals and biochemicals.",
    salary: "₹5,00,000 - ₹20,00,000 per annum",
    entranceExams: ["JEE Advanced", "GATE"],
    colleges: ["IITs", "BITS", "ICT Mumbai"],
    recruiters: ["Reliance Industries", "HPCL", "BPCL", "Dr. Reddy's", "Hindustan Unilever"]
  },
  {
    id: "eng-9",
    title: "Environmental Engineer",
    category: "Engineering",
    description: "Use principles of engineering, soil science, biology, and chemistry to develop solutions to environmental problems and improve environmental conditions.",
    salary: "₹4,00,000 - ₹15,00,000 per annum",
    entranceExams: ["JEE Advanced", "GATE"],
    colleges: ["IITs", "NITs", "BITS"],
    recruiters: ["Pollution Control Boards", "Environmental Consulting Firms", "Government Agencies"]
  },
  
  // Science Careers
  {
    id: "sci-1",
    title: "Research Scientist",
    category: "Science",
    description: "Conduct scientific experiments, investigations, and analysis across disciplines like physics, chemistry, biology, or environmental science.",
    salary: "₹5,00,000 - ₹25,00,000 per annum",
    entranceExams: ["CSIR-NET", "GATE", "JRF", "JEST"],
    colleges: ["IISc", "IITs", "TIFR", "IISER"],
    recruiters: ["ISRO", "DRDO", "CSIR Labs", "Research Institutes", "Pharmaceutical Companies"]
  },
  {
    id: "sci-2",
    title: "Biotechnologist",
    category: "Science",
    description: "Apply technology to biological systems for product development in areas like agriculture, medicine, and environmental conservation.",
    salary: "₹4,00,000 - ₹20,00,000 per annum",
    entranceExams: ["GATE", "JNU Entrance", "CSIR-NET"],
    colleges: ["IITs", "JNU", "IISc", "AIIMS"],
    recruiters: ["Biocon", "Dr. Reddy's", "Novartis", "Research Institutes"]
  },
  {
    id: "sci-3",
    title: "Pharmaceutical Scientist",
    category: "Science",
    description: "Research and develop new drugs and drug delivery systems, ensuring their safety, efficacy, and quality control.",
    salary: "₹5,00,000 - ₹20,00,000 per annum",
    entranceExams: ["GPAT", "NIPER JEE"],
    colleges: ["NIPER", "IIT BHU", "ICT Mumbai", "Manipal College of Pharmaceutical Sciences"],
    recruiters: ["Sun Pharma", "Dr. Reddy's", "Cipla", "Glenmark", "Research Labs"]
  },
  {
    id: "sci-4",
    title: "Astrophysicist",
    category: "Science",
    description: "Study celestial objects like stars, planets, and galaxies, as well as phenomena like black holes and dark matter, using physics and mathematics.",
    salary: "₹6,00,000 - ₹20,00,000 per annum",
    entranceExams: ["JEST", "CSIR-NET", "GATE Physics"],
    colleges: ["IISc", "TIFR", "IUCAA", "IITs"],
    recruiters: ["ISRO", "IUCAA", "TIFR", "Research Institutes", "Universities"]
  },
  {
    id: "sci-5",
    title: "Environmental Scientist",
    category: "Science",
    description: "Study environmental problems and develop solutions to protect the environment and human health, focusing on areas like pollution control and resource conservation.",
    salary: "₹4,00,000 - ₹15,00,000 per annum",
    entranceExams: ["GATE", "CSIR-NET", "JNU Entrance"],
    colleges: ["IITs", "IISc", "JNU", "TERI University"],
    recruiters: ["Pollution Control Boards", "Environmental Consulting Firms", "Government Agencies", "NGOs"]
  },
  {
    id: "sci-6",
    title: "Food Scientist",
    category: "Science",
    description: "Study the physical, microbiological, and chemical makeup of food to develop safe, nutritious food products and innovative packaging solutions.",
    salary: "₹4,00,000 - ₹15,00,000 per annum",
    entranceExams: ["GATE", "ICAR AIEEA"],
    colleges: ["CFTRI", "NIFTEM", "IITs", "NDRI"],
    recruiters: ["Nestle", "ITC", "Britannia", "HUL", "Amul"]
  },
  {
    id: "sci-7",
    title: "Geneticist",
    category: "Science",
    description: "Study genes and heredity in organisms, researching how traits are passed from generation to generation and how genetic diseases develop.",
    salary: "₹5,00,000 - ₹20,00,000 per annum",
    entranceExams: ["CSIR-NET", "GATE", "DBT-JRF"],
    colleges: ["CCMB", "NCBS", "IISc", "JNU"],
    recruiters: ["Research Institutes", "Hospitals", "Pharmaceutical Companies", "Agricultural Companies"]
  },
  {
    id: "sci-8",
    title: "Oceanographer",
    category: "Science",
    description: "Study the physical and biological aspects of the ocean, including marine life, ocean currents, and the ocean floor.",
    salary: "₹5,00,000 - ₹15,00,000 per annum",
    entranceExams: ["GATE", "CSIR-NET", "JNU Entrance"],
    colleges: ["NIO Goa", "IIT Kharagpur", "Cochin University", "Anna University"],
    recruiters: ["NIO", "INCOIS", "Research Institutes", "Environmental Consulting Firms"]
  },
  
  // Hospitality and Tourism Careers
  {
    id: "hosp-1",
    title: "Hotel Manager",
    category: "Hospitality",
    description: "Oversee the operations of hotels, ensuring high-quality guest experiences, efficient staff management, and profitable business operations.",
    salary: "₹4,00,000 - ₹25,00,000 per annum",
    entranceExams: ["NCHMCT JEE", "University-specific entrance exams"],
    colleges: ["IHMs", "Welcomgroup School of Hotel Management", "Christ University"],
    recruiters: ["Taj Group", "Oberoi", "ITC Hotels", "Marriott", "Hyatt"]
  },
  {
    id: "hosp-2",
    title: "Chef",
    category: "Hospitality",
    description: "Create dishes and menus, manage kitchen staff, maintain food quality, and ensure adherence to health and safety standards in restaurants or hotels.",
    salary: "₹3,00,000 - ₹20,00,000 per annum",
    entranceExams: ["NCHMCT JEE", "University-specific entrance exams"],
    colleges: ["IHMs", "Culinary Academy of India", "OCLD"],
    recruiters: ["Taj Group", "Oberoi", "ITC Hotels", "Standalone Restaurants"]
  },
  {
    id: "hosp-3",
    title: "Tourism Officer",
    category: "Hospitality",
    description: "Promote tourism in specific regions or countries by planning marketing campaigns, organizing events, and developing tourism infrastructure.",
    salary: "₹4,00,000 - ₹12,00,000 per annum",
    entranceExams: ["UPSC", "State PSC exams"],
    colleges: ["IITTM", "IGNOU Tourism Studies", "Kuoni Academy"],
    recruiters: ["Government Tourism Departments", "Tourism Development Corporations", "Travel Companies"]
  },
  {
    id: "hosp-4",
    title: "Event Manager",
    category: "Hospitality",
    description: "Plan, organize, and execute events like conferences, weddings, exhibitions, and corporate functions, coordinating all logistical aspects.",
    salary: "₹3,50,000 - ₹15,00,000 per annum",
    entranceExams: ["University-specific entrance exams"],
    colleges: ["NIFT", "EMDI", "Symbiosis Centre for Management Studies"],
    recruiters: ["Event Management Companies", "Hotels", "Corporate Marketing Departments"]
  },
  {
    id: "hosp-5",
    title: "Travel Consultant",
    category: "Hospitality",
    description: "Assist clients in planning trips by providing information on destinations, making travel arrangements, and offering personalized recommendations.",
    salary: "₹3,00,000 - ₹10,00,000 per annum",
    entranceExams: ["University-specific entrance exams"],
    colleges: ["IITTM", "Kuoni Academy", "Tourism Management Institutes"],
    recruiters: ["MakeMyTrip", "Thomas Cook", "Cox & Kings", "Travel Agencies"]
  },
  
  // Aviation Careers
  {
    id: "avi-1",
    title: "Pilot",
    category: "Aviation",
    description: "Operate aircraft for airlines, charters, or private companies, ensuring the safety of passengers and crew while navigating between destinations.",
    salary: "₹15,00,000 - ₹80,00,000 per annum",
    entranceExams: ["Airline-specific tests", "DGCA exams"],
    colleges: ["Indira Gandhi Rashtriya Uran Akademi", "Government Flying Training School", "Flying clubs"],
    recruiters: ["Air India", "IndiGo", "SpiceJet", "Vistara", "Private Charters"]
  },
  {
    id: "avi-2",
    title: "Aircraft Maintenance Engineer",
    category: "Aviation",
    description: "Inspect, service, repair, and overhaul aircraft to ensure they are safe and airworthy according to regulations and manufacturer specifications.",
    salary: "₹5,00,000 - ₹25,00,000 per annum",
    entranceExams: ["AME CET", "DGCA exams"],
    colleges: ["Hindustan Institute of Engineering Technology", "Rajiv Gandhi Aviation Academy", "IIAEIT"],
    recruiters: ["Air India", "IndiGo", "SpiceJet", "Maintenance, Repair, and Overhaul (MRO) companies"]
  },
  {
    id: "avi-3",
    title: "Air Traffic Controller",
    category: "Aviation",
    description: "Direct aircraft movements in airports and airspace to ensure safe and efficient flow of air traffic, preventing collisions and minimizing delays.",
    salary: "₹10,00,000 - ₹25,00,000 per annum",
    entranceExams: ["AAI ATC Exam"],
    colleges: ["Civil Aviation Training College", "AAI Training Institutes"],
    recruiters: ["Airports Authority of India (AAI)", "Private Airports"]
  },
  {
    id: "avi-4",
    title: "Cabin Crew",
    category: "Aviation",
    description: "Ensure passenger safety and comfort during flights, performing safety procedures, providing customer service, and handling in-flight situations.",
    salary: "₹4,00,000 - ₹12,00,000 per annum",
    entranceExams: ["Airline-specific selection processes"],
    colleges: ["Air Hostess Academies", "Frankfinn Institute", "Airline Training Centers"],
    recruiters: ["Air India", "IndiGo", "SpiceJet", "Vistara", "International Airlines"]
  },
  {
    id: "avi-5",
    title: "Aeronautical Engineer",
    category: "Aviation",
    description: "Design, develop, and test aircraft, missiles, satellites, and spacecraft, focusing on aerodynamics, propulsion, and structural integrity.",
    salary: "₹6,00,000 - ₹25,00,000 per annum",
    entranceExams: ["JEE Advanced", "GATE"],
    colleges: ["IITs", "IISc", "MIT", "Madras Institute of Technology"],
    recruiters: ["HAL", "ISRO", "DRDO", "Airbus India", "Boeing India"]
  },
  {
    id: "avi-6",
    title: "Aviation Security Officer",
    category: "Aviation",
    description: "Ensure security at airports by screening passengers and baggage, monitoring security systems, and responding to security breaches.",
    salary: "₹4,00,000 - ₹10,00,000 per annum",
    entranceExams: ["BCAS exams", "Organization-specific tests"],
    colleges: ["CISF Training Centers", "Security Training Institutes"],
    recruiters: ["CISF", "Private Security Agencies", "Airport Operators"]
  },
  
  // Legal Careers
  {
    id: "legal-1",
    title: "Corporate Lawyer",
    category: "Legal",
    description: "Provide legal advice to businesses on corporate matters including contracts, compliance, mergers and acquisitions, and corporate governance.",
    salary: "₹6,00,000 - ₹40,00,000 per annum",
    entranceExams: ["CLAT", "AILET", "Specific University Entrance Exams"],
    colleges: ["National Law Universities", "ILS Pune", "GLC Mumbai"],
    recruiters: ["Law Firms", "Corporate Legal Departments", "Financial Institutions"]
  },
  {
    id: "legal-2",
    title: "Litigation Attorney",
    category: "Legal",
    description: "Represent clients in court proceedings and dispute resolutions, handling cases across various legal fields including civil and criminal matters.",
    salary: "₹5,00,000 - ₹30,00,000 per annum",
    entranceExams: ["CLAT", "AILET", "Specific University Entrance Exams"],
    colleges: ["National Law Universities", "Delhi University", "ILS Pune"],
    recruiters: ["Law Firms", "Independent Practice", "Government Legal Services"]
  },
  {
    id: "legal-3",
    title: "Intellectual Property Lawyer",
    category: "Legal",
    description: "Specialize in legal matters related to patents, trademarks, copyrights, and other intellectual property, helping clients protect their innovations and creative works.",
    salary: "₹7,00,000 - ₹35,00,000 per annum",
    entranceExams: ["CLAT", "AILET", "Specific University Entrance Exams"],
    colleges: ["National Law Universities", "NALSAR", "ILI Delhi"],
    recruiters: ["Specialized IP Law Firms", "Corporate Legal Departments", "Patent Offices"]
  },
  {
    id: "legal-4",
    title: "Legal Consultant",
    category: "Legal",
    description: "Provide specialized legal advice to clients on specific areas of law, helping them navigate complex legal issues without necessarily representing them in court.",
    salary: "₹6,00,000 - ₹25,00,000 per annum",
    entranceExams: ["CLAT", "AILET", "Specific University Entrance Exams"],
    colleges: ["National Law Universities", "ILS Pune", "GLC Mumbai"],
    recruiters: ["Consulting Firms", "Law Firms", "Independent Practice"]
  },
  {
    id: "legal-5",
    title: "Legal Researcher",
    category: "Legal",
    description: "Conduct research on legal issues, analyze legislation and case law, and prepare legal documents and reports for law firms, courts, or academic institutions.",
    salary: "₹4,00,000 - ₹15,00,000 per annum",
    entranceExams: ["CLAT", "AILET", "Specific University Entrance Exams"],
    colleges: ["National Law Universities", "ILI Delhi", "Law Research Institutes"],
    recruiters: ["Law Firms", "Research Organizations", "Academic Institutions"]
  },
  
  // Additional careers for a comprehensive library
  {
    id: "add-1",
    title: "Sports Coach",
    category: "Sports",
    description: "Train and guide athletes in specific sports, developing their skills, strategies, and physical fitness to improve performance and achieve goals.",
    salary: "₹3,00,000 - ₹20,00,000 per annum (highly variable)",
    entranceExams: ["NIS Diploma", "University Physical Education entrance exams"],
    colleges: ["National Institute of Sports", "LNIPE", "Jamia Millia Islamia"],
    recruiters: ["Sports Authorities", "Schools", "Colleges", "Sports Academies", "Private Coaching"]
  },
  {
    id: "add-2",
    title: "Psychologist",
    category: "Medical",
    description: "Study human behavior and mental processes, providing therapy and counseling to individuals and groups facing emotional, mental, or behavioral issues.",
    salary: "₹4,00,000 - ₹20,00,000 per annum",
    entranceExams: ["MA/M.Sc Psychology entrance exams", "M.Phil Clinical Psychology"],
    colleges: ["NIMHANS", "TISS", "Delhi University", "Christ University"],
    recruiters: ["Hospitals", "Schools", "Counseling Centers", "Corporate Organizations", "Private Practice"]
  },
  {
    id: "add-3",
    title: "Agricultural Scientist",
    category: "Science",
    description: "Conduct research to improve agricultural productivity, study crop diseases, develop new farming techniques, and work on sustainable agriculture solutions.",
    salary: "₹5,00,000 - ₹15,00,000 per annum",
    entranceExams: ["ICAR AIEEA", "JRF", "SRF"],
    colleges: ["IARI", "ICAR Institutes", "Agricultural Universities"],
    recruiters: ["ICAR", "Government Agricultural Departments", "Seed and Agro-chemical Companies"]
  },
  {
    id: "add-4",
    title: "Urban Planner",
    category: "Engineering",
    description: "Design and develop land use plans for cities and communities, focusing on infrastructure, environmental sustainability, and quality of life.",
    salary: "₹5,00,000 - ₹15,00,000 per annum",
    entranceExams: ["GATE", "CEED", "University-specific entrance exams"],
    colleges: ["SPA", "IITs", "CEPT University"],
    recruiters: ["Urban Development Authorities", "Municipal Corporations", "Architecture Firms", "Consulting Firms"]
  },
  {
    id: "add-5",
    title: "Wildlife Conservationist",
    category: "Science",
    description: "Work to protect endangered species and their habitats through research, conservation programs, policy development, and public education.",
    salary: "₹4,00,000 - ₹15,00,000 per annum",
    entranceExams: ["GATE", "CSIR-NET", "University-specific entrance exams"],
    colleges: ["WII", "FRI", "BNHS", "Wildlife Science Departments in Universities"],
    recruiters: ["Forest Departments", "Wildlife NGOs", "Research Organizations", "Zoological Parks"]
  }
];

export default careerPaths;
