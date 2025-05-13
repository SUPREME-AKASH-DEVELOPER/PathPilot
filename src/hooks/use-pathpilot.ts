
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

  // Process quiz answers and generate career recommendations
  const generateCareerGuidance = (
    answers: QuizAnswers, 
    careers: Career[],
    educationStage: Stage
  ) => {
    setResponse(prev => ({ ...prev, isProcessing: true, error: null }));
    
    try {
      // Generate the summary of skills, strengths, etc.
      const summary = generateQuizSummary(answers, educationStage);
      
      // Get career matches
      const matchedCareers = getMatchedCareers(answers, careers, educationStage);
      
      // Update state with results
      setResponse({
        summaryData: summary,
        careerMatches: matchedCareers.slice(0, 5), // Take top 5 matches
        isProcessing: false,
        error: null
      });
      
      toast({
        title: "PathPilot AI Analysis Complete",
        description: "Your personalized career guidance is ready!",
      });
      
      return {
        summary,
        careers: matchedCareers.slice(0, 5)
      };
    } catch (err) {
      setResponse(prev => ({ 
        ...prev, 
        isProcessing: false, 
        error: "There was an error processing your quiz results. Please try again." 
      }));
      
      toast({
        title: "Analysis Error",
        description: "There was a problem generating your career recommendations.",
        variant: "destructive"
      });
      
      return null;
    }
  };

  // Save results to localStorage for use across the app
  const saveResultsToStorage = () => {
    if (response.careerMatches.length > 0) {
      localStorage.setItem('matchedCareers', JSON.stringify(response.careerMatches));
      localStorage.setItem('quizSummary', JSON.stringify(response.summaryData));
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
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };
  
  // Generate a motivational message based on the student's profile
  const generateMotivationalMessage = () => {
    if (!response.summaryData || !response.summaryData.personalityProfile) return "";
    
    const { personalityProfile } = response.summaryData;
    
    const messages = {
      "Analytical": "Your methodical approach gives you a unique advantage in solving complex problems. Stay curious!",
      "Creative": "Your creative spirit will help you innovate in ways others cannot. Keep thinking outside the box!",
      "Practical": "Your practical mindset is a powerful asset in turning ideas into reality. Trust your hands-on approach!",
      "Social": "Your people skills will open doors throughout your career. Your empathy is your superpower!",
      "Enterprising": "Your drive and initiative set you apart. Keep pushing boundaries and leading the way!",
      "Conventional": "Your attention to detail and organization will ensure your success. Structure leads to achievement!",
      "Mixed": "Your balanced approach gives you versatility in any field you choose. Embrace your adaptability!"
    };
    
    return messages[personalityProfile.type] || "Your unique combination of skills makes you well-equipped for your career journey!";
  };

  return {
    pathPilotResponse: response,
    generateCareerGuidance,
    saveResultsToStorage,
    loadSavedResults,
    generateMotivationalMessage
  };
}
