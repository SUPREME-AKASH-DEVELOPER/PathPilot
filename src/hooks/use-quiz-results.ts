
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface QuizResult {
  id: string;
  date: string;
  educationStage: string;
  strengths: string[];
  weaknesses: string[];
  recommendedPaths: string[];
  skillsAssessment: Record<string, number>;
  careerMatchScores: Record<string, number>;
  personalityProfile?: {
    type: string;
    traits: string[];
    learningStyle: string;
    workEnvironmentPreference: string;
  };
}

// Define all expected skills to ensure they're always included
const EXPECTED_SKILLS = [
  'analytical', 'creative', 'technical', 'communication',
  'leadership', 'scientific', 'entrepreneurial', 'social', 'critical thinking'
];

export function useQuizResults() {
  const { user } = useAuth();
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load quiz results from localStorage
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      try {
        const storedResults = localStorage.getItem(`quiz_results_${user.id}`);
        if (storedResults) {
          const parsedResults = JSON.parse(storedResults);
          
          // Ensure all expected skills are present in each result
          const completeResults = parsedResults.map((result: QuizResult) => {
            const completeSkills = { ...result.skillsAssessment };
            EXPECTED_SKILLS.forEach(skill => {
              if (completeSkills[skill] === undefined) {
                completeSkills[skill] = 0;
              }
            });
            return {
              ...result,
              skillsAssessment: completeSkills
            };
          });
          
          setQuizResults(completeResults);
        }
      } catch (error) {
        console.error("Error loading quiz results:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setQuizResults([]);
      setIsLoading(false);
    }
  }, [user]);

  // Save a new quiz result
  const saveQuizResult = (result: Omit<QuizResult, 'id' | 'date'>) => {
    if (!user) return null;
    
    // Ensure all expected skills are present in the new result
    const completeSkills = { ...result.skillsAssessment };
    EXPECTED_SKILLS.forEach(skill => {
      if (completeSkills[skill] === undefined) {
        completeSkills[skill] = 0;
      }
    });

    const newResult: QuizResult = {
      ...result,
      skillsAssessment: completeSkills,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    };

    const updatedResults = [...quizResults, newResult];
    setQuizResults(updatedResults);

    try {
      localStorage.setItem(`quiz_results_${user.id}`, JSON.stringify(updatedResults));
    } catch (error) {
      console.error("Error saving quiz results:", error);
    }

    return newResult;
  };

  // Get the latest quiz result
  const getLatestResult = (): QuizResult | null => {
    if (quizResults.length === 0) return null;
    return quizResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  };

  return {
    quizResults,
    isLoading,
    saveQuizResult,
    getLatestResult
  };
}
