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
  entrepreneurial: number; // Added entrepreneurial skill
  social: number; // Added social skills
  critical_thinking: number; // Added critical thinking
};

// Enhanced personality type identification
export type PersonalityProfile = {
  type: "Analytical" | "Creative" | "Practical" | "Social" | "Enterprising" | "Conventional" | "Mixed";
  traits: string[];
  learningStyle: string;
  workEnvironmentPreference: string;
};

// Career traits mapping based on quiz categories with enhanced diversity
const careerTraitMapping: Record<string, CareerTrait[]> = {
  // Academic interests
  "Mathematics and Physics": [
    { category: "Technical", keywords: ["engineer", "developer", "analyst"], weight: 0.9 },
    { category: "Science", keywords: ["research", "physics", "mathematics"], weight: 0.8 },
    { category: "Engineering", keywords: ["build", "design", "construct"], weight: 0.7 },
  ],
  "Biology and Chemistry": [
    { category: "Medical", keywords: ["health", "doctor", "medicine"], weight: 0.9 },
    { category: "Science", keywords: ["biology", "research", "laboratory"], weight: 0.8 },
  ],
  "Literature and Languages": [
    { category: "Creative", keywords: ["write", "author", "content"], weight: 0.9 },
    { category: "Education", keywords: ["teach", "professor", "language"], weight: 0.8 },
  ],
  "Computers and Information Technology": [
    { category: "Technical", keywords: ["software", "programmer", "database"], weight: 0.95 },
  ],
  // Problem-solving approaches
  "By analyzing data and finding patterns": [
    { category: "Technical", keywords: ["data", "analyst", "science"], weight: 0.9 },
    { category: "Finance", keywords: ["accountant", "financial", "analyst"], weight: 0.7 },
    // Add non-conventional matches
    { category: "Creative", keywords: ["ux researcher", "market analyst"], weight: 0.5 },
  ],
  "By discussing with others to find solutions": [
    { category: "Marketing", keywords: ["marketing", "sales", "communication"], weight: 0.8 },
    { category: "Hospitality", keywords: ["management", "hotel", "service"], weight: 0.7 },
    // Add non-conventional matches
    { category: "Social Impact", keywords: ["community organizer", "mediator"], weight: 0.6 },
  ],
  "By reading and researching for answers": [
    { category: "Education", keywords: ["researcher", "academic", "scientist"], weight: 0.8 },
    { category: "Creative", keywords: ["writer", "journalist", "content"], weight: 0.7 },
    // Add non-conventional matches
    { category: "Government", keywords: ["policy analyst", "researcher"], weight: 0.6 },
  ],
  "By trying different approaches until something works": [
    { category: "Technical", keywords: ["developer", "engineer", "designer"], weight: 0.7 },
    { category: "Creative", keywords: ["artist", "designer", "innovator"], weight: 0.8 },
    // Add non-conventional matches
    { category: "Entrepreneurial", keywords: ["entrepreneur", "startup founder"], weight: 0.9 },
  ],
  // Work environments
  "Corporate office with a stable schedule": [
    { category: "Finance", keywords: ["accountant", "banking", "investment"], weight: 0.8 },
    { category: "Technical", keywords: ["software", "programmer", "developer"], weight: 0.7 },
  ],
  "Creative studio with flexible hours": [
    { category: "Creative", keywords: ["design", "artist", "creator"], weight: 0.9 },
    { category: "Marketing", keywords: ["digital", "content", "media"], weight: 0.8 },
  ],
  "Laboratory or research facility": [
    { category: "Science", keywords: ["research", "scientist", "laboratory"], weight: 0.9 },
    { category: "Medical", keywords: ["medical", "clinical", "healthcare"], weight: 0.8 },
  ],
  "Working outdoors or in varied locations": [
    { category: "Engineering", keywords: ["civil", "environmental", "field"], weight: 0.7 },
    { category: "Creative", keywords: ["photographer", "filmmaker", "journalist"], weight: 0.8 },
  ],
  // Career fields (12th grade) - Enhanced with non-conventional options
  "Engineering and Technology": [
    { category: "Technical", keywords: ["engineer", "developer", "technology"], weight: 0.95 },
    { category: "Engineering", keywords: ["mechanical", "electrical", "civil"], weight: 0.9 },
    // Add non-conventional matches
    { category: "Creative", keywords: ["sound designer", "vfx artist"], weight: 0.5 },
    { category: "Social Impact", keywords: ["sustainable engineer", "accessibility specialist"], weight: 0.4 },
  ],
  "Medical Sciences and Healthcare": [
    { category: "Medical", keywords: ["doctor", "nurse", "healthcare"], weight: 0.95 },
    { category: "Science", keywords: ["biology", "research", "pharmaceutical"], weight: 0.8 },
    // Add non-conventional matches
    { category: "Social Impact", keywords: ["public health specialist", "mental health advocate"], weight: 0.7 },
    { category: "Technical", keywords: ["health informatics", "medical technology"], weight: 0.5 },
  ],
  "Business, Commerce, and Management": [
    { category: "Finance", keywords: ["business", "management", "commerce"], weight: 0.9 },
    { category: "Marketing", keywords: ["sales", "marketing", "business"], weight: 0.8 },
    // Add non-conventional matches
    { category: "Creative", keywords: ["brand strategist", "experience designer"], weight: 0.6 },
    { category: "Social Impact", keywords: ["social entrepreneur", "sustainable business consultant"], weight: 0.5 },
  ],
  "Arts, Humanities, and Social Sciences": [
    { category: "Creative", keywords: ["arts", "design", "media"], weight: 0.9 },
    { category: "Education", keywords: ["social", "humanities", "teaching"], weight: 0.8 },
    // Add non-conventional matches
    { category: "Technical", keywords: ["digital humanities specialist", "ai ethicist"], weight: 0.5 },
    { category: "Entrepreneurial", keywords: ["cultural entrepreneur", "independent creator"], weight: 0.6 },
  ],
  // Skills
  "Problem-solving and logical thinking": [
    { category: "Technical", keywords: ["engineer", "developer", "analyst"], weight: 0.9 },
    { category: "Science", keywords: ["researcher", "scientist", "mathematician"], weight: 0.85 },
  ],
  "Memory and observation": [
    { category: "Medical", keywords: ["doctor", "diagnostician", "researcher"], weight: 0.8 },
    { category: "Science", keywords: ["biologist", "chemist", "observer"], weight: 0.7 },
  ],
  "Communication and expression": [
    { category: "Creative", keywords: ["writer", "presenter", "communicator"], weight: 0.9 },
    { category: "Marketing", keywords: ["marketer", "public relations", "speaker"], weight: 0.8 },
  ],
  "Design and creativity": [
    { category: "Creative", keywords: ["designer", "artist", "architect"], weight: 0.95 },
    { category: "Marketing", keywords: ["advertiser", "content creator"], weight: 0.8 },
  ],
  // Interest fields
  "Computer Science related fields": [
    { category: "Technical", keywords: ["software", "developer", "engineer"], weight: 0.95 },
    { category: "Technical", keywords: ["data", "analyst", "scientist"], weight: 0.9 },
  ],
  "Life Sciences related fields": [
    { category: "Medical", keywords: ["doctor", "nurse", "healthcare"], weight: 0.9 },
    { category: "Science", keywords: ["biologist", "researcher", "scientist"], weight: 0.85 },
  ],
  "Commerce and Economics related fields": [
    { category: "Finance", keywords: ["accountant", "banker", "economist"], weight: 0.9 },
    { category: "Finance", keywords: ["investor", "broker", "financial"], weight: 0.85 },
  ],
  "Humanities and Arts related fields": [
    { category: "Creative", keywords: ["writer", "artist", "designer"], weight: 0.9 },
    { category: "Education", keywords: ["teacher", "professor", "historian"], weight: 0.8 },
  ],
  "STEM (Science, Technology, Engineering, Math)": [
    { category: "Technical", keywords: ["engineer", "developer", "analyst"], weight: 0.9 },
    { category: "Science", keywords: ["scientist", "researcher", "mathematician"], weight: 0.85 },
  ],
  // Work satisfaction vs salary
  "Salary is more important than day-to-day satisfaction": [
    { category: "Finance", keywords: ["finance", "investment", "banking"], weight: 0.8 },
    { category: "Technical", keywords: ["technology", "engineering", "development"], weight: 0.7 },
  ],
  "Work satisfaction is more important than salary": [
    { category: "Education", keywords: ["teaching", "counseling", "nonprofit"], weight: 0.8 },
    { category: "Creative", keywords: ["arts", "design", "expression"], weight: 0.75 },
  ],
  // New mappings for added questions
  "I stay calm and methodical in high-pressure situations": [
    { category: "Medical", keywords: ["surgeon", "emergency", "critical"], weight: 0.8 },
    { category: "Finance", keywords: ["trader", "analyst", "manager"], weight: 0.7 },
  ],
  "Building electronic gadgets or programming": [
    { category: "Technical", keywords: ["electronics", "programming", "engineering"], weight: 0.9 },
  ],
  "The planner who organizes tasks and schedules": [
    { category: "Finance", keywords: ["manager", "administrator", "planner"], weight: 0.8 },
  ],
  // Emerging technology interests
  "Artificial Intelligence and Machine Learning": [
    { category: "Technical", keywords: ["AI", "machine learning", "data science"], weight: 0.95 },
    // Add non-conventional matches
    { category: "Creative", keywords: ["ai artist", "creative technologist"], weight: 0.7 },
    { category: "Social Impact", keywords: ["ai ethics researcher", "fairness specialist"], weight: 0.6 },
  ],
  "Sustainable Technology and Renewable Energy": [
    { category: "Engineering", keywords: ["renewable", "sustainable", "environmental"], weight: 0.9 },
    { category: "Science", keywords: ["green", "climate", "environmental"], weight: 0.85 },
  ],
  "Biotechnology and Genetic Engineering": [
    { category: "Science", keywords: ["biotech", "genetics", "medical research"], weight: 0.9 },
    { category: "Medical", keywords: ["pharmaceutical", "research", "laboratory"], weight: 0.85 },
  ],
  "Digital Media and Virtual Reality": [
    { category: "Creative", keywords: ["media", "virtual reality", "design"], weight: 0.9 },
    { category: "Technical", keywords: ["software", "gaming", "development"], weight: 0.85 },
  ],
  // Work environments (new)
  "Competitive environments that push me to excel": [
    { category: "Finance", keywords: ["investment", "trading", "sales"], weight: 0.8 },
    { category: "Technical", keywords: ["startup", "innovation", "technology"], weight: 0.75 },
  ],
  "Collaborative environments with shared goals": [
    { category: "Creative", keywords: ["agency", "studio", "team"], weight: 0.8 },
    { category: "Education", keywords: ["teaching", "research", "academic"], weight: 0.75 },
  ],
};

// Define education path appropriateness for career fields
const educationPathMapping: Record<string, Record<string, number>> = {
  "Technical": {
    "after10th": 0.7, // Can pursue technical diploma after 10th
    "after12th": 0.9,
    "afterGraduation": 1.0
  },
  "Medical": {
    "after10th": 0.3, // Medical requires 12th PCB at minimum
    "after12th": 0.8,
    "afterGraduation": 1.0
  },
  "Engineering": {
    "after10th": 0.5, // Can pursue diploma after 10th
    "after12th": 0.9,
    "afterGraduation": 1.0
  },
  "Finance": {
    "after10th": 0.6, // Can pursue commerce after 10th
    "after12th": 0.9,
    "afterGraduation": 1.0
  },
  "Creative": {
    "after10th": 0.9, // Creative fields can be started early
    "after12th": 0.95,
    "afterGraduation": 1.0
  },
  "Education": {
    "after10th": 0.4, // Education careers require higher education
    "after12th": 0.7,
    "afterGraduation": 1.0
  },
  "Government": {
    "after10th": 0.4, // Most government jobs require 12th as minimum
    "after12th": 0.8,
    "afterGraduation": 1.0
  },
  "Marketing": {
    "after10th": 0.5, // Marketing can be pursued via diploma after 10th
    "after12th": 0.8,
    "afterGraduation": 1.0
  },
  "Science": {
    "after10th": 0.4, // Science careers typically require higher education
    "after12th": 0.7,
    "afterGraduation": 1.0
  },
  "Aviation": {
    "after10th": 0.3, // Aviation typically requires higher education
    "after12th": 0.6,
    "afterGraduation": 0.9
  },
  "Hospitality": {
    "after10th": 0.8, // Hospitality can be pursued after 10th via diploma
    "after12th": 0.9,
    "afterGraduation": 1.0
  }
};

// Practical next steps for students based on education stage with enhanced diversity
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
  ]
};

// New mapping for non-conventional career options
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
    }
  ],
  "Creative": [
    {
      id: "nc3",
      title: "UX Researcher",
      category: "Creative",
      description: "Study user behavior and needs through various methodologies to improve product design and user satisfaction.",
      salary: "₹5L - ₹25L per annum",
      entranceExams: ["Portfolio-based selection"],
      colleges: ["Design Schools", "HCI Programs"],
      recruiters: ["Tech Companies", "Design Agencies", "Startups"]
    }
  ],
  "Social Impact": [
    {
      id: "nc4",
      title: "Wildlife Conservationist",
      category: "Social Impact",
      description: "Work to protect and preserve wildlife and their habitats through research, education, and conservation efforts.",
      salary: "₹3L - ₹15L per annum",
      entranceExams: ["MSc/PhD Entrance Exams"],
      colleges: ["Wildlife Institutes", "Environmental Science Programs"],
      recruiters: ["NGOs", "Government Wildlife Departments", "Research Organizations"]
    }
  ],
  "Sports": [
    {
      id: "nc5",
      title: "Sports Statistician",
      category: "Sports",
      description: "Collect and analyze data on sports performances to identify patterns and insights for teams and media.",
      salary: "₹4L - ₹18L per annum",
      entranceExams: ["Statistics background required"],
      colleges: ["Sports Management Programs", "Statistics Programs"],
      recruiters: ["Sports Teams", "Media Companies", "Betting Companies"]
    }
  ],
  "Government": [
    {
      id: "nc6",
      title: "Public Policy Analyst",
      category: "Government",
      description: "Research and analyze public policies and their impacts to recommend improvements or new approaches.",
      salary: "₹5L - ₹22L per annum",
      entranceExams: ["Public Policy Program Entrance", "UPSC"],
      colleges: ["Public Policy Institutes", "Law Schools"],
      recruiters: ["Think Tanks", "Government Agencies", "NGOs"]
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
          totalScore += trait.weight * 0.7; 
          matchReasons.push(`Strong alignment with ${trait.category} field`);
        }
        
        // Enhanced keyword matching with reason tracking
        trait.keywords.forEach(keyword => {
          if (career.title.toLowerCase().includes(keyword.toLowerCase())) {
            totalScore += trait.weight * 0.5;
            matchReasons.push(`Your interests align with ${keyword} in this role`);
          } else if (career.description.toLowerCase().includes(keyword.toLowerCase())) {
            totalScore += trait.weight * 0.3;
            matchReasons.push(`This career involves ${keyword} which matches your profile`);
          }
        });
      });
    }
  });
  
  // Apply education stage filter with more significant adjustments
  if (educationStage) {
    const categoryFactor = educationPathMapping[career.category]?.[educationStage] || 0.5;
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
    ? Math.min(100, Math.max(30, Math.round((totalScore / maxPossibleScore) * 100)))
    : Math.floor(Math.random() * 40) + 30; // Random score between 30-70 if no calculation possible
  
  // Add match reasons to career object
  (career as any).matchReasons = [...new Set(matchReasons)].slice(0, 3); // Keep only unique reasons, max 3
  
  return normalizedScore;
};

// Apply match scores to all careers with enhanced diversity in recommendations
export const getMatchedCareers = (
  answers: QuizAnswers,
  careers: Career[],
  educationStage?: string
): Career[] => {
  // Add non-conventional careers to the mix
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
  
  return careersWithScores.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
};

// Generate a personalized student profile from quiz answers
export const generateStudentProfile = (answers: QuizAnswers): PersonalityProfile => {
  const answerValues = Object.values(answers);
  let personalityType: PersonalityProfile["type"] = "Mixed";
  const traits: string[] = [];
  let learningStyle = "Mixed";
  let workEnvironment = "Balanced";
  
  // Determine personality type based on answers
  if (answerValues.includes("By analyzing data and finding patterns") || 
      answerValues.includes("Problem-solving and logical thinking")) {
    personalityType = "Analytical";
    traits.push("Detail-oriented", "Systematic", "Logical");
    learningStyle = "Conceptual and structured learning";
  } else if (answerValues.includes("Design and creativity") || 
             answerValues.includes("Creative studio with flexible hours")) {
    personalityType = "Creative";
    traits.push("Imaginative", "Expressive", "Innovative");
    learningStyle = "Visual and hands-on learning";
  } else if (answerValues.includes("By discussing with others to find solutions") || 
             answerValues.includes("Communication and expression")) {
    personalityType = "Social";
    traits.push("People-oriented", "Empathetic", "Collaborative");
    learningStyle = "Discussion-based and collaborative learning";
  } else if (answerValues.includes("The planner who organizes tasks and schedules") || 
             answerValues.includes("Corporate office with a stable schedule")) {
    personalityType = "Conventional";
    traits.push("Organized", "Methodical", "Detail-focused");
    learningStyle = "Structured and sequential learning";
  } else if (answerValues.includes("By trying different approaches until something works") || 
             answerValues.includes("Competitive environments that push me to excel")) {
    personalityType = "Enterprising";
    traits.push("Risk-taking", "Goal-oriented", "Persuasive");
    learningStyle = "Challenge-based learning";
  } else if (answerValues.includes("Working outdoors or in varied locations") || 
             answerValues.includes("Building electronic gadgets or programming")) {
    personalityType = "Practical";
    traits.push("Hands-on", "Realistic", "Technical");
    learningStyle = "Learning by doing";
  }
  
  // Determine work environment preference
  if (answerValues.includes("Corporate office with a stable schedule")) {
    workEnvironment = "Structured professional environment";
  } else if (answerValues.includes("Creative studio with flexible hours")) {
    workEnvironment = "Flexible creative environment";
  } else if (answerValues.includes("Laboratory or research facility")) {
    workEnvironment = "Research-oriented environment";
  } else if (answerValues.includes("Working outdoors or in varied locations")) {
    workEnvironment = "Dynamic and varied environment";
  } else if (answerValues.includes("Competitive environments that push me to excel")) {
    workEnvironment = "High-pressure performance-driven environment";
  } else if (answerValues.includes("Collaborative environments with shared goals")) {
    workEnvironment = "Supportive team-based environment";
  }
  
  return {
    type: personalityType,
    traits: traits.length > 0 ? traits : ["Adaptable", "Balanced", "Evolving"],
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
  weaknesses: string[]; // New: Added weaknesses
  recommendedPaths: string[];
  skills: SkillAssessment;
  personalityProfile: PersonalityProfile; // New: Added personality profile
  nextSteps?: string[];
  emotionalGuidance?: string; // New: Added emotional guidance
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
  
  // ... keep existing code (skill processing logic) the same but add new skills:
  
  // Added entrepreneurial skills assessment
  if (answerValues.includes("By trying different approaches until something works") || 
      answerValues.includes("I'm comfortable with calculated risks for greater rewards") ||
      answerValues.includes("Running my own business or startup")) {
    skills.entrepreneurial += 2;
    skills.leadership += 1;
  }
  
  // Added social skills assessment
  if (answerValues.includes("By discussing with others to find solutions") || 
      answerValues.includes("People-focused initiatives involving human interaction") ||
      answerValues.includes("Communication and interpersonal skills")) {
    skills.social += 2;
    skills.communication += 1;
  }
  
  // Added critical thinking assessment
  if (answerValues.includes("I address issues directly with clear communication") || 
      answerValues.includes("Based on data and logical analysis") ||
      answerValues.includes("Problem-solving and logical thinking")) {
    skills.critical_thinking += 2;
    skills.analytical += 1;
  }
  
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
    .filter(([_, value]) => value === 0) // Only include skills with no points
    .slice(0, 2)
    .map(([skill]) => skill);
  
  // Generate strengths based on top skills with more personalized descriptions
  const strengthsMap: Record<keyof SkillAssessment, string> = {
    analytical: "Strong analytical abilities and systematic problem-solving approach",
    creative: "Creative thinking and ability to generate innovative solutions",
    technical: "Technical aptitude and capacity to understand complex systems",
    communication: "Excellent communication skills and ability to express ideas clearly",
    leadership: "Natural leadership qualities and decision-making capabilities",
    scientific: "Scientific curiosity and methodical research orientation",
    entrepreneurial: "Entrepreneurial mindset and comfort with calculated risks",
    social: "Strong interpersonal skills and ability to work effectively with others",
    critical_thinking: "Critical thinking skills and ability to evaluate information objectively"
  };
  
  // Generate weaknesses based on bottom skills
  const weaknessesMap: Record<keyof SkillAssessment, string> = {
    analytical: "May benefit from developing more structured analytical approaches",
    creative: "Could work on enhancing creative problem-solving skills",
    technical: "May need to strengthen technical understanding and abilities",
    communication: "Communication skills could be further developed",
    leadership: "Leadership and initiative-taking are areas for potential growth",
    scientific: "Scientific methodology and research skills could be strengthened",
    entrepreneurial: "Risk assessment and entrepreneurial thinking could be developed",
    social: "Interpersonal skills and teamwork might benefit from more practice",
    critical_thinking: "Critical evaluation of information could be enhanced"
  };
  
  const strengths = topSkills.map(skill => strengthsMap[skill]);
  const weaknesses = bottomSkills.map(skill => weaknessesMap[skill]);
  
  // Generate more personalized recommended career paths
  const pathsMap: Partial<Record<keyof SkillAssessment, string[]>> = {
    analytical: ["Data Analysis", "Research", "Finance", "Business Intelligence"],
    creative: ["Design", "Content Creation", "Arts", "Innovation Strategy"],
    technical: ["Software Development", "Engineering", "Information Technology", "Technical Consulting"],
    communication: ["Marketing", "Teaching", "Public Relations", "Content Strategy"],
    leadership: ["Management", "Entrepreneurship", "Consulting", "Team Leadership"],
    scientific: ["Healthcare", "Research Science", "Environmental Science", "Laboratory Work"],
    entrepreneurial: ["Startup Founding", "Business Development", "Innovation Management", "Venture Capital"],
    social: ["Counseling", "Human Resources", "Community Management", "Customer Success"],
    critical_thinking: ["Legal Analysis", "Strategy Consulting", "Research", "Policy Development"]
  };
  
  // Get recommended paths based on skills
  let recommendedPaths = topSkills.flatMap(skill => pathsMap[skill] || []);
  
  // Filter paths based on education stage
  if (educationStage === 'after10th') {
    // For 10th students, focus more on general streams rather than specific careers
    recommendedPaths = recommendedPaths.map(path => {
      if (path === "Software Development" || path === "Engineering" || path === "Information Technology") 
        return "Science/Technical Education (PCM)";
      if (path === "Healthcare" || path === "Research Science")
        return "Science Education (PCB)";
      if (path === "Finance" || path === "Management")
        return "Commerce Education";
      if (path === "Design" || path === "Arts" || path === "Teaching")
        return "Arts/Humanities Education";
      return path;
    });
  }
  
  // Generate personality profile
  const personalityProfile = generateStudentProfile(answers);
  
  // Add next steps based on education stage
  const nextSteps = educationStage ? practicalNextSteps[educationStage] : undefined;
  
  // Generate emotional guidance based on answers and personality type
  let emotionalGuidance = "";
  
  if (personalityProfile.type === "Analytical") {
    emotionalGuidance = "Your methodical approach to problems is a valuable asset. While you excel at logical thinking, remember that connecting with others emotionally can enhance your professional journey. Balance your analytical strengths with opportunities to develop interpersonal skills.";
  } else if (personalityProfile.type === "Creative") {
    emotionalGuidance = "Your creative vision sets you apart! As you explore career paths, find environments that value innovation and allow your ideas to flourish. While structure might sometimes feel constraining, developing organizational systems can help bring your creative visions to life.";
  } else if (personalityProfile.type === "Social") {
    emotionalGuidance = "Your ability to connect with others is your superpower. In your career journey, look for roles where you can leverage these interpersonal skills. Remember that developing technical expertise in your chosen field will complement your natural people skills.";
  } else if (personalityProfile.type === "Practical") {
    emotionalGuidance = "Your hands-on, practical approach means you learn best by doing. Seek opportunities that allow you to apply skills in real-world settings. Don't underestimate the value of your pragmatic mindset - it's exactly what many employers are looking for.";
  } else if (personalityProfile.type === "Enterprising") {
    emotionalGuidance = "Your drive and ambition will take you far! Channel your competitive spirit into setting challenging but achievable goals. Remember that building a support network and learning to collaborate effectively will multiply your impact.";
  } else if (personalityProfile.type === "Conventional") {
    emotionalGuidance = "Your attention to detail and organizational skills are invaluable. While you thrive with structure, don't be afraid to occasionally step outside your comfort zone to explore new approaches. Your reliability is a foundation upon which you can build any career.";
  } else {
    emotionalGuidance = "You show a balanced set of strengths across different areas, which gives you flexibility in your career choices. Continue exploring diverse interests and experiences to help you discover where your passion and purpose align.";
  }
  
  return {
    strengths,
    weaknesses,
    recommendedPaths: [...new Set(recommendedPaths)].slice(0, 5), // Remove duplicates, limit to 5
    skills,
    personalityProfile,
    nextSteps: nextSteps ? nextSteps.slice(0, 5) : undefined, // Limit to 5 next steps
    emotionalGuidance
  };
};
