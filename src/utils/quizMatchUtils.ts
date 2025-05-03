
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
};

// Career traits mapping based on quiz categories
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
  ],
  "By discussing with others to find solutions": [
    { category: "Marketing", keywords: ["marketing", "sales", "communication"], weight: 0.8 },
    { category: "Hospitality", keywords: ["management", "hotel", "service"], weight: 0.7 },
  ],
  "By reading and researching for answers": [
    { category: "Education", keywords: ["researcher", "academic", "scientist"], weight: 0.8 },
    { category: "Creative", keywords: ["writer", "journalist", "content"], weight: 0.7 },
  ],
  "By trying different approaches until something works": [
    { category: "Technical", keywords: ["developer", "engineer", "designer"], weight: 0.7 },
    { category: "Creative", keywords: ["artist", "designer", "innovator"], weight: 0.8 },
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
  // Career fields (12th grade)
  "Engineering and Technology": [
    { category: "Technical", keywords: ["engineer", "developer", "technology"], weight: 0.95 },
    { category: "Engineering", keywords: ["mechanical", "electrical", "civil"], weight: 0.9 },
  ],
  "Medical Sciences and Healthcare": [
    { category: "Medical", keywords: ["doctor", "nurse", "healthcare"], weight: 0.95 },
    { category: "Science", keywords: ["biology", "research", "pharmaceutical"], weight: 0.8 },
  ],
  "Business, Commerce, and Management": [
    { category: "Finance", keywords: ["business", "management", "commerce"], weight: 0.9 },
    { category: "Marketing", keywords: ["sales", "marketing", "business"], weight: 0.8 },
  ],
  "Arts, Humanities, and Social Sciences": [
    { category: "Creative", keywords: ["arts", "design", "media"], weight: 0.9 },
    { category: "Education", keywords: ["social", "humanities", "teaching"], weight: 0.8 },
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

// Practical next steps for students based on education stage
const practicalNextSteps: Record<string, string[]> = {
  "after10th": [
    "Science (PCM/PCB) stream in 11th-12th",
    "Commerce stream in 11th-12th",
    "Arts/Humanities stream in 11th-12th",
    "Vocational courses/ITI",
    "Diploma programs in technical fields",
    "Certificate courses in skill development"
  ],
  "after12th": [
    "Bachelor's degree programs",
    "Professional courses (CA, CS, etc.)",
    "Diploma in specialized fields",
    "Entrance preparation for competitive exams",
    "Vocational training programs"
  ],
  "afterGraduation": [
    "Master's degree programs",
    "Professional certifications",
    "Entry-level job opportunities",
    "Competitive exams for government services",
    "Entrepreneurship opportunities"
  ]
};

// Helper function to calculate match score based on user answers and career data
export const calculateMatchScore = (
  answers: QuizAnswers, 
  career: Career,
  educationStage?: string
): number => {
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  // Process each answer
  Object.values(answers).forEach((answer) => {
    const traits = careerTraitMapping[answer];
    
    if (traits) {
      // Find relevant traits for this career
      traits.forEach(trait => {
        maxPossibleScore += trait.weight;
        
        // Match category directly
        if (career.category.toLowerCase() === trait.category.toLowerCase()) {
          totalScore += trait.weight * 0.6; // 60% of weight for category match
        }
        
        // Check for keyword matches in title and description
        trait.keywords.forEach(keyword => {
          if (
            career.title.toLowerCase().includes(keyword.toLowerCase()) ||
            career.description.toLowerCase().includes(keyword.toLowerCase())
          ) {
            totalScore += trait.weight * 0.4; // 40% of weight for keyword match
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
      }
    }
  }
  
  // Normalize the score as a percentage with a minimum of 15% match
  const normalizedScore = maxPossibleScore > 0 
    ? Math.min(100, Math.max(15, Math.round((totalScore / maxPossibleScore) * 100)))
    : 15;
  
  return normalizedScore;
};

// Apply match scores to all careers based on quiz answers
export const getMatchedCareers = (
  answers: QuizAnswers,
  careers: Career[],
  educationStage?: string
): Career[] => {
  return careers.map(career => ({
    ...career,
    matchScore: calculateMatchScore(answers, career, educationStage)
  }))
  .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
};

// Generate a summary of strengths and recommended career paths based on quiz answers
export const generateQuizSummary = (
  answers: QuizAnswers, 
  educationStage?: string
): {
  strengths: string[];
  recommendedPaths: string[];
  skills: SkillAssessment;
  nextSteps?: string[];
} => {
  // Initialize skill assessment
  const skills: SkillAssessment = {
    analytical: 0,
    creative: 0,
    technical: 0,
    communication: 0,
    leadership: 0,
    scientific: 0
  };
  
  // Analyze answers to determine strengths
  const answerValues = Object.values(answers);
  
  // Update skills based on answers
  if (answerValues.includes("Mathematics and Physics") || 
      answerValues.includes("By analyzing data and finding patterns") ||
      answerValues.includes("STEM (Science, Technology, Engineering, Math)") ||
      answerValues.includes("Problem-solving and logical thinking") ||
      answerValues.includes("Artificial Intelligence and Machine Learning")) {
    skills.analytical += 2;
    skills.technical += 1;
  }
  
  if (answerValues.includes("Biology and Chemistry") || 
      answerValues.includes("Laboratory or research facility") ||
      answerValues.includes("Medical Sciences and Healthcare") ||
      answerValues.includes("Life Sciences related fields") ||
      answerValues.includes("Biotechnology and Genetic Engineering")) {
    skills.scientific += 2;
    skills.analytical += 1;
  }
  
  if (answerValues.includes("Literature and Languages") || 
      answerValues.includes("Creative studio with flexible hours") ||
      answerValues.includes("Design and creativity") ||
      answerValues.includes("Humanities and Arts related fields") ||
      answerValues.includes("Communication and expression") ||
      answerValues.includes("Digital Media and Virtual Reality")) {
    skills.creative += 2;
    skills.communication += 1;
  }
  
  if (answerValues.includes("Computers and Information Technology") || 
      answerValues.includes("Engineering and Technology") ||
      answerValues.includes("Computer Science related fields") ||
      answerValues.includes("Technical and specialized knowledge")) {
    skills.technical += 2;
    skills.analytical += 1;
  }
  
  if (answerValues.includes("By discussing with others to find solutions") || 
      answerValues.includes("Corporate office with a stable schedule") ||
      answerValues.includes("Leadership and management abilities") ||
      answerValues.includes("The planner who organizes tasks and schedules") ||
      answerValues.includes("Management and leadership")) {
    skills.communication += 1;
    skills.leadership += 1;
  }

  if (answerValues.includes("Commerce and Economics related fields") ||
      answerValues.includes("Business, Commerce, and Management") ||
      answerValues.includes("Financial stability and growth") ||
      answerValues.includes("Business and Finance")) {
    skills.analytical += 1;
    skills.leadership += 1;
  }
  
  // Determine top three skills
  const skillEntries = Object.entries(skills) as [keyof SkillAssessment, number][];
  const topSkills = skillEntries
    .sort((a, b) => b[1] - a[1])
    .filter(([_, value]) => value > 0)
    .slice(0, 3)
    .map(([skill]) => skill);
  
  // Generate strengths based on top skills
  const strengthsMap: Record<keyof SkillAssessment, string> = {
    analytical: "Strong analytical and problem-solving abilities",
    creative: "Creative thinking and artistic expression",
    technical: "Technical aptitude and logical reasoning",
    communication: "Excellent communication and interpersonal skills",
    leadership: "Leadership potential and decision-making capabilities",
    scientific: "Scientific curiosity and research orientation"
  };
  
  const strengths = topSkills.map(skill => strengthsMap[skill]);
  
  // Generate recommended career paths
  const pathsMap: Partial<Record<keyof SkillAssessment, string[]>> = {
    analytical: ["Data Analysis", "Research", "Finance"],
    creative: ["Design", "Content Creation", "Arts"],
    technical: ["Software Development", "Engineering", "Information Technology"],
    communication: ["Marketing", "Teaching", "Public Relations"],
    leadership: ["Management", "Entrepreneurship", "Consulting"],
    scientific: ["Healthcare", "Research Science", "Environmental Science"]
  };
  
  // Get generic recommended paths based on skills
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
  
  // Add next steps based on education stage
  const nextSteps = educationStage ? practicalNextSteps[educationStage] : undefined;
  
  return {
    strengths,
    recommendedPaths: [...new Set(recommendedPaths)], // Remove duplicates
    skills,
    nextSteps
  };
};
