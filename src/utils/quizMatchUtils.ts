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
  // Keep existing mappings
  "By analyzing data and finding patterns": [
    { category: "Technical", keywords: ["data", "analyst", "science"], weight: 0.9 },
    { category: "Finance", keywords: ["accountant", "financial", "analyst"], weight: 0.7 },
  ],
  "By discussing with others to find solutions": [
    { category: "Marketing", keywords: ["marketing", "sales", "communication"], weight: 0.8 },
    { category: "Hospitality", keywords: ["management", "hotel", "service"], weight: 0.7 },
  ],
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
  // Adding more mappings for other quiz options
  "Engineering and Technology": [
    { category: "Technical", keywords: ["engineer", "developer", "technology"], weight: 0.95 },
    { category: "Engineering", keywords: ["mechanical", "electrical", "civil"], weight: 0.9 },
  ],
  "Medical Sciences and Healthcare": [
    { category: "Medical", keywords: ["doctor", "nurse", "healthcare"], weight: 0.95 },
    { category: "Science", keywords: ["biology", "research", "pharmaceutical"], weight: 0.8 },
  ],
  // New mappings for additional questions
  "Problem-solving and logical thinking": [
    { category: "Technical", keywords: ["engineer", "developer", "analyst"], weight: 0.9 },
    { category: "Science", keywords: ["researcher", "scientist", "mathematician"], weight: 0.85 },
  ],
  "Design and creativity": [
    { category: "Creative", keywords: ["designer", "artist", "architect"], weight: 0.95 },
    { category: "Marketing", keywords: ["advertiser", "content creator"], weight: 0.8 },
  ],
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
  
  // Education stage filter - adjust scores based on education requirements
  if (educationStage) {
    switch (educationStage) {
      case 'after10th':
        // Lower match score for careers that require advanced degrees
        if (
          career.entranceExams.some(exam => 
            exam.includes("PhD") || 
            exam.includes("Masters") ||
            exam.includes("M.Phil")
          )
        ) {
          totalScore *= 0.7; // Reduce score by 30%
        }
        break;
      case 'after12th':
        // Lower match score for careers requiring postgraduate degrees
        if (
          career.entranceExams.some(exam => 
            exam.includes("PhD") || 
            exam.includes("M.Phil")
          )
        ) {
          totalScore *= 0.8; // Reduce score by 20%
        }
        break;
      default:
        // No adjustment for graduate students
        break;
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
export const generateQuizSummary = (answers: QuizAnswers): {
  strengths: string[];
  recommendedPaths: string[];
  skills: SkillAssessment;
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
      answerValues.includes("STEM (Science, Technology, Engineering, Math)")) {
    skills.analytical += 2;
    skills.technical += 1;
  }
  
  if (answerValues.includes("Biology and Chemistry") || 
      answerValues.includes("Laboratory or research facility") ||
      answerValues.includes("Medical Sciences and Healthcare") ||
      answerValues.includes("Life Sciences related fields")) {
    skills.scientific += 2;
    skills.analytical += 1;
  }
  
  if (answerValues.includes("Literature and Languages") || 
      answerValues.includes("Creative studio with flexible hours") ||
      answerValues.includes("Design and creativity") ||
      answerValues.includes("Humanities and Arts related fields")) {
    skills.creative += 2;
    skills.communication += 1;
  }
  
  if (answerValues.includes("Computers and Information Technology") || 
      answerValues.includes("Engineering and Technology") ||
      answerValues.includes("Computer Science related fields")) {
    skills.technical += 2;
    skills.analytical += 1;
  }
  
  if (answerValues.includes("By discussing with others to find solutions") || 
      answerValues.includes("Corporate office with a stable schedule")) {
    skills.communication += 1;
    skills.leadership += 1;
  }

  if (answerValues.includes("Commerce and Economics related fields")) {
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
  
  const recommendedPaths = topSkills.flatMap(skill => pathsMap[skill] || []);
  
  return {
    strengths,
    recommendedPaths: [...new Set(recommendedPaths)], // Remove duplicates
    skills
  };
};
