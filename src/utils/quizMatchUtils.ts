
import { Career } from "@/components/career-library/CareerCard";

// Define the answer type to store user's quiz responses
export type QuizAnswers = Record<number, string>;

// Define career traits that correspond to quiz categories
type CareerTrait = {
  category: string;
  keywords: string[];
  weight: number;
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
};

// Helper function to calculate match score based on user answers and career data
export const calculateMatchScore = (
  answers: QuizAnswers, 
  career: Career
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
  
  // Normalize the score as a percentage with a minimum of 15% match
  const normalizedScore = maxPossibleScore > 0 
    ? Math.min(100, Math.max(15, Math.round((totalScore / maxPossibleScore) * 100)))
    : 15;
  
  return normalizedScore;
};

// Apply match scores to all careers based on quiz answers
export const getMatchedCareers = (
  answers: QuizAnswers,
  careers: Career[]
): Career[] => {
  return careers.map(career => ({
    ...career,
    matchScore: calculateMatchScore(answers, career)
  }))
  .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
};
