
import { useState } from 'react';
import { QuizAnswers, generateQuizSummary, getMatchedCareers } from "@/utils/quizMatchUtils";
import { Career } from "@/components/career-library/CareerCard";
import { toast } from "@/components/ui/use-toast";

type Stage = 'after10th' | 'after12th' | 'afterGraduation' | null;

interface PathPilotResponse {
  summaryData: ReturnType<typeof generateQuizSummary> | null;
  careerMatches: Career[];
  isProcessing: boolean;
  error: string | null;
}

export function usePathPilot() {
  const [response, setResponse] = useState<PathPilotResponse>({
    summaryData: null,
    careerMatches: [],
    isProcessing: false,
    error: null
  });

  // Process quiz answers and generate career recommendations with improved accuracy
  const generateCareerGuidance = (
    answers: QuizAnswers, 
    careers: Career[],
    educationStage: Stage
  ) => {
    setResponse(prev => ({ ...prev, isProcessing: true, error: null }));
    
    try {
      // Generate the enhanced summary of skills, strengths, etc.
      const summary = generateQuizSummary(answers, educationStage);
      
      // Get more accurately matched careers with detailed insights
      let matchedCareers = getMatchedCareers(answers, careers, educationStage);
      
      // Ensure diverse career options especially for afterGraduation stage
      if (educationStage === 'afterGraduation' && matchedCareers.length < 8) {
        // If we don't have enough diverse matches, add more careers with lower threshold
        const additionalCareers = careers.filter(career => 
          !matchedCareers.some(match => match.id === career.id)
        )
        .sort((a, b) => {
          // Sort by category first to ensure diversity
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category);
          }
          // Then by match score if available, otherwise randomly
          const scoreA = (a as any).matchScore || Math.random() * 100;
          const scoreB = (b as any).matchScore || Math.random() * 100;
          return scoreB - scoreA;
        })
        .slice(0, 8 - matchedCareers.length);
        
        // Add match scores to additional careers if they don't have them
        const enhancedAdditionalCareers = additionalCareers.map(career => {
          if (!(career as any).matchScore) {
            return { 
              ...career, 
              matchScore: Math.floor(Math.random() * 20) + 20, // Random score between 20-40%
              matchReasons: [
                "Emerging field aligned with some of your interests",
                "Offers potential based on your educational background"
              ]
            };
          }
          return career;
        });
        
        // Combine original matches with additional diverse options
        matchedCareers = [...matchedCareers, ...enhancedAdditionalCareers];
      }
      
      // Update state with comprehensive results
      setResponse({
        summaryData: summary,
        careerMatches: matchedCareers.slice(0, 8), // Take top 8 matches for more options
        isProcessing: false,
        error: null
      });
      
      toast.success("Your personalized career guidance is ready!");
      
      return {
        summary,
        careers: matchedCareers.slice(0, 8)
      };
    } catch (err) {
      const errorMessage = "There was an error processing your quiz results. Please try again.";
      setResponse(prev => ({ 
        ...prev, 
        isProcessing: false, 
        error: errorMessage
      }));
      
      toast.error(errorMessage);
      
      return null;
    }
  };

  // Save enhanced results to localStorage for use across the app
  const saveResultsToStorage = () => {
    if (response.careerMatches.length > 0) {
      localStorage.setItem('matchedCareers', JSON.stringify(response.careerMatches));
      localStorage.setItem('quizSummary', JSON.stringify(response.summaryData));
      toast.success("Your results have been saved for future reference");
    }
  };
  
  // Load previously saved results if available
  const loadSavedResults = (): boolean => {
    try {
      const savedCareers = localStorage.getItem('matchedCareers');
      const savedSummary = localStorage.getItem('quizSummary');
      
      if (savedCareers && savedSummary) {
        setResponse({
          summaryData: JSON.parse(savedSummary),
          careerMatches: JSON.parse(savedCareers),
          isProcessing: false,
          error: null
        });
        
        toast.info("Previously saved career matches loaded");
        return true;
      }
      return false;
    } catch (err) {
      toast.error("Unable to load saved results");
      return false;
    }
  };
  
  // Generate a more personalized motivational message based on the student's profile
  const generateMotivationalMessage = () => {
    if (!response.summaryData || !response.summaryData.personalityProfile) return "";
    
    const { personalityProfile } = response.summaryData;
    
    const messages = {
      "Analytical": "Your methodical approach gives you a unique advantage in solving complex problems. Stay curious and continue developing your logical thinking skills!",
      "Creative": "Your creative spirit and innovative thinking will help you develop solutions others cannot see. Keep exploring and expressing your unique perspective!",
      "Practical": "Your hands-on, practical mindset is a powerful asset in turning ideas into reality. Your ability to implement solutions is invaluable in any field!",
      "Social": "Your people skills and empathy will open doors throughout your career. These human connections are increasingly valuable in our technological world!",
      "Enterprising": "Your drive and initiative set you apart. Keep challenging yourself and pursuing ambitious goals - your determination will take you far!",
      "Conventional": "Your attention to detail and organizational abilities ensure quality in everything you do. This foundation of excellence will serve you well!",
      "Mixed": "Your balanced approach and versatile skillset gives you flexibility in any field you choose. This adaptability is increasingly valuable in today's changing world!"
    };
    
    return messages[personalityProfile.type] || "Your unique combination of skills and perspectives makes you well-equipped for your career journey ahead!";
  };

  return {
    pathPilotResponse: response,
    generateCareerGuidance,
    saveResultsToStorage,
    loadSavedResults,
    generateMotivationalMessage
  };
}
