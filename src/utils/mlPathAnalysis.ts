
import { toast } from "@/components/ui/use-toast";
import { SkillAssessment } from "@/utils/quizMatchUtils";

// Define types for the path planning data
interface PathData {
  skills: Record<string, number>;
  interests: string[];
  educationLevel: string;
  career_matches: Record<string, number>;
}

// Cache for loaded ML data to avoid repeated network requests
let cachedPathData: PathData[] | null = null;

/**
 * Fetch and process path planning data from Kaggle
 * This is a simplified version that works on the frontend
 * In a production app, this would be handled by a backend service
 */
export async function fetchPathPlanningData(): Promise<PathData[] | null> {
  // Return cached data if available
  if (cachedPathData) {
    return cachedPathData;
  }
  
  try {
    // In a real implementation, this would call your backend API
    // that has proper Kaggle API integration
    // For now, we'll use a simplified approach with sample data
    
    // Simulated data based on the Kaggle dataset structure
    const sampleData: PathData[] = [
      {
        skills: {
          analytical: 8,
          creative: 5,
          technical: 9,
          communication: 6
        },
        interests: ["technology", "engineering", "problem-solving"],
        educationLevel: "after12th",
        career_matches: {
          "Software Engineering": 85,
          "Data Science": 75,
          "Cybersecurity": 70,
          "AI Research": 65,
          "Systems Architecture": 60
        }
      },
      {
        skills: {
          analytical: 7,
          creative: 8,
          technical: 6,
          communication: 8
        },
        interests: ["design", "media", "art"],
        educationLevel: "after12th",
        career_matches: {
          "UX Design": 80,
          "Digital Marketing": 70,
          "Content Creation": 75,
          "Web Development": 65,
          "Graphic Design": 85
        }
      },
      {
        skills: {
          analytical: 9,
          creative: 4,
          technical: 7,
          communication: 6
        },
        interests: ["mathematics", "science", "research"],
        educationLevel: "afterGraduation",
        career_matches: {
          "Data Science": 85,
          "Research Analyst": 80,
          "Quantitative Analyst": 75,
          "Machine Learning Engineer": 70,
          "Statistician": 75
        }
      }
    ];
    
    cachedPathData = sampleData;
    return sampleData;
  } catch (error) {
    console.error("Error fetching path planning data:", error);
    toast({
      title: "Data Fetch Error",
      description: "Could not load machine learning path data. Using AI analysis only.",
      variant: "destructive"
    });
    return null;
  }
}

/**
 * Enhance career match scores using machine learning data
 * This function combines Perplexity AI results with ML dataset patterns
 */
export async function enhanceCareerMatchScores(
  aiCareerMatches: Record<string, number>,
  educationStage: string,
  skills: Record<string, number>
): Promise<Record<string, number>> {
  const mlData = await fetchPathPlanningData();
  if (!mlData) {
    return aiCareerMatches; // Return original data if ML data is unavailable
  }
  
  // Find relevant ML data based on education stage
  const relevantData = mlData.filter(data => 
    data.educationLevel === educationStage ||
    (educationStage === 'after10th' && data.educationLevel === 'after12th') // Fallback
  );
  
  if (relevantData.length === 0) {
    return aiCareerMatches;
  }
  
  // Calculate skill similarity between user and ML data points
  const similarityScores = relevantData.map(data => {
    let similarityScore = 0;
    let totalAttributes = 0;
    
    // Compare skills
    Object.keys(skills).forEach(skill => {
      if (data.skills[skill] !== undefined) {
        // Calculate similarity (0-10 scale)
        const difference = Math.abs(skills[skill] - data.skills[skill]);
        // Convert difference to similarity (10 is perfect match, 0 is complete mismatch)
        const attributeSimilarity = 10 - Math.min(difference, 10);
        similarityScore += attributeSimilarity;
        totalAttributes++;
      }
    });
    
    // Normalize similarity score (0-100%)
    const normalizedScore = totalAttributes > 0 
      ? (similarityScore / (totalAttributes * 10)) * 100
      : 0;
    
    return {
      pathData: data,
      similarity: normalizedScore
    };
  });
  
  // Sort by similarity
  similarityScores.sort((a, b) => b.similarity - a.similarity);
  
  // Take top matches and enhance career scores
  const enhancedMatches = { ...aiCareerMatches };
  
  // Use the top 2 most similar ML data points to influence recommendations
  similarityScores.slice(0, 2).forEach(({ pathData, similarity }) => {
    // Weight based on similarity (how much ML data should influence results)
    const mlInfluence = similarity / 200; // Scale down to have partial influence (0-0.5)
    
    // Apply ML influence to each career match
    Object.entries(pathData.career_matches).forEach(([career, mlScore]) => {
      // If this career already exists in the AI results
      if (enhancedMatches[career] !== undefined) {
        // Blend AI score with ML score based on calculated influence
        enhancedMatches[career] = 
          (enhancedMatches[career] * (1 - mlInfluence)) + (mlScore * mlInfluence);
      } 
      // If the ML data suggests a career not in AI results, add it with lower weight
      else if (mlScore > 65) { // Only add high confidence ML suggestions
        enhancedMatches[career] = mlScore * 0.8; // Apply discount to new suggestions
      }
    });
  });
  
  return enhancedMatches;
}

/**
 * Enhance skills assessment using machine learning data
 * This function ensures it returns a proper SkillAssessment type
 */
export async function enhanceSkillsAssessment(
  aiSkills: Record<string, number>,
  educationStage: string
): Promise<SkillAssessment> {
  const mlData = await fetchPathPlanningData();
  if (!mlData) {
    return convertToSkillAssessment(aiSkills); // Return original data if ML data is unavailable
  }
  
  // Use ML data to identify any potential skill gaps
  const enhancedSkills = { ...aiSkills };
  
  // Find skills in the ML data that might be missing from the AI assessment
  const relevantData = mlData.filter(data => data.educationLevel === educationStage);
  
  if (relevantData.length > 0) {
    // Calculate average skills from ML data
    const mlSkillsAggregated: Record<string, { sum: number, count: number }> = {};
    
    relevantData.forEach(data => {
      Object.entries(data.skills).forEach(([skill, value]) => {
        if (!mlSkillsAggregated[skill]) {
          mlSkillsAggregated[skill] = { sum: 0, count: 0 };
        }
        mlSkillsAggregated[skill].sum += value;
        mlSkillsAggregated[skill].count += 1;
      });
    });
    
    // Add any skills from ML data that weren't in the AI assessment
    Object.entries(mlSkillsAggregated).forEach(([skill, { sum, count }]) => {
      if (enhancedSkills[skill] === undefined) {
        // Add with a moderate value (average from ML data)
        enhancedSkills[skill] = Math.round(sum / count);
      }
    });
  }
  
  // Convert the enhanced skills to the proper SkillAssessment type
  return convertToSkillAssessment(enhancedSkills);
}

/**
 * Helper function to convert a Record<string, number> to a SkillAssessment type
 */
function convertToSkillAssessment(skills: Record<string, number>): SkillAssessment {
  // Create a default SkillAssessment with all fields set to 0
  const defaultSkills: SkillAssessment = {
    analytical: 0,
    creative: 0,
    technical: 0,
    communication: 0,
    leadership: 0
  };
  
  // Update the default assessment with values from the input skills
  Object.entries(skills).forEach(([key, value]) => {
    // Check if the key is a valid skill in SkillAssessment
    if (key in defaultSkills) {
      // Use type assertion to safely set the property
      (defaultSkills as any)[key] = value;
    } else {
      // For skills that don't match the exact names in SkillAssessment,
      // try to map them to the closest match
      const mappedKey = mapSkillToAssessmentKey(key);
      if (mappedKey && mappedKey in defaultSkills) {
        (defaultSkills as any)[mappedKey] = value;
      }
    }
  });
  
  return defaultSkills;
}

/**
 * Map various skill names to standardized SkillAssessment keys
 */
function mapSkillToAssessmentKey(skill: string): string | null {
  const skillMap: Record<string, string> = {
    // Direct mappings
    "analytical": "analytical",
    "creative": "creative",
    "technical": "technical",
    "communication": "communication",
    "leadership": "leadership",
    "problem-solving": "analytical", // Map to analytical
    "problemsolving": "analytical",  // Map to analytical
    "teamwork": "leadership",  // Map teamwork to leadership since teamwork isn't in SkillAssessment
    "adaptability": "leadership", // Map adaptability to leadership
    "time-management": "leadership", // Mapped timeManagement to leadership
    "timemanagement": "leadership", // Mapped timeManagement to leadership
    
    // Synonyms and related terms
    "analysis": "analytical",
    "logical": "analytical",
    "creativity": "creative",
    "innovation": "creative",
    "tech": "technical",
    "programming": "technical",
    "coding": "technical",
    "speaking": "communication",
    "writing": "communication",
    "management": "leadership",
    "leading": "leadership",
    "problem": "analytical", 
    "solutions": "analytical", 
    "collaboration": "leadership", // Map collaboration to leadership
    "cooperative": "leadership", // Map cooperative to leadership
    "flexibility": "leadership", // Map flexibility to leadership
    "versatile": "leadership", // Map versatile to leadership
    "planning": "leadership", // Mapped planning to leadership
    "organization": "leadership" // Mapped organization to leadership
  };
  
  // Convert to lowercase for case-insensitive matching
  const normalizedSkill = skill.toLowerCase();
  
  // Return the mapped key or null if no mapping exists
  return skillMap[normalizedSkill] || null;
}
