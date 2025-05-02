
import { useState } from "react";
import StageSelector from "@/components/quiz/StageSelector";
import QuizQuestion, { Question } from "@/components/quiz/QuizQuestion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button"; // Add this import
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// Enhanced quiz questions with more detailed options
const after10thQuestions: Question[] = [
  {
    id: 1,
    question: "Which subject areas do you enjoy the most?",
    options: [
      "Mathematics and Physics",
      "Biology and Chemistry",
      "Literature and Languages",
      "Computers and Information Technology"
    ],
    category: "academic"
  },
  {
    id: 2,
    question: "How do you prefer to solve problems?",
    options: [
      "By analyzing data and finding patterns",
      "By discussing with others to find solutions",
      "By reading and researching for answers",
      "By trying different approaches until something works"
    ],
    category: "aptitude"
  },
  {
    id: 3,
    question: "What type of career environment appeals to you most?",
    options: [
      "Corporate office with a stable schedule",
      "Creative studio with flexible hours",
      "Laboratory or research facility",
      "Working outdoors or in varied locations"
    ],
    category: "worklife"
  },
  {
    id: 4,
    question: "Which stream are you most interested in pursuing after 10th?",
    options: [
      "Science (PCM - Physics, Chemistry, Mathematics)",
      "Science (PCB - Physics, Chemistry, Biology)",
      "Commerce with or without Mathematics",
      "Arts/Humanities"
    ],
    category: "interest"
  },
  {
    id: 5,
    question: "What skills do others often compliment you on?",
    options: [
      "Analytical thinking and problem-solving",
      "Creativity and artistic abilities",
      "Communication and interpersonal skills",
      "Organization and attention to detail"
    ],
    category: "personality"
  }
];

const after12thQuestions: Question[] = [
  {
    id: 1,
    question: "Based on your 12th stream, which field interests you most?",
    options: [
      "Engineering and Technology",
      "Medical Sciences and Healthcare",
      "Business, Commerce, and Management",
      "Arts, Humanities, and Social Sciences"
    ],
    category: "academic"
  },
  {
    id: 2,
    question: "What's your preferred work setting?",
    options: [
      "Research and Development",
      "Customer-facing roles",
      "Creative and design environment",
      "Administrative and organizational roles"
    ],
    category: "worklife"
  },
  {
    id: 3,
    question: "How do you approach learning new skills?",
    options: [
      "Structured academic courses and degrees",
      "Hands-on experience and practical learning",
      "Self-study through books and online resources",
      "Mentorship and guided learning"
    ],
    category: "aptitude"
  },
  {
    id: 4,
    question: "What aspect of a career is most important to you?",
    options: [
      "Financial stability and growth",
      "Job satisfaction and passion",
      "Work-life balance",
      "Social impact and contribution"
    ],
    category: "interest"
  },
  {
    id: 5,
    question: "How do you handle challenges?",
    options: [
      "Analyze them methodically and find logical solutions",
      "Seek advice from experts or mentors",
      "Use creative approaches and think outside the box",
      "Collaborate with others to find the best solution"
    ],
    category: "personality"
  }
];

const afterGraduationQuestions: Question[] = [
  {
    id: 1,
    question: "Based on your graduation specialization, which career path appeals to you?",
    options: [
      "Advanced specialization through higher studies",
      "Entry-level job in your field",
      "Entrepreneurship or startup",
      "Competitive exams for government services"
    ],
    category: "academic"
  },
  {
    id: 2,
    question: "What kind of role would you excel in?",
    options: [
      "Technical specialist role",
      "Management and leadership",
      "Research and development",
      "Client-facing or service role"
    ],
    category: "worklife"
  },
  {
    id: 3,
    question: "How important is continuous learning to you?",
    options: [
      "Very important - I want to always be developing new skills",
      "Important for career advancement only",
      "I prefer mastering one specific skill set deeply",
      "I value experience over formal learning"
    ],
    category: "aptitude"
  },
  {
    id: 4,
    question: "Where do you see yourself in 5 years?",
    options: [
      "In a senior role in a large organization",
      "Running my own business or startup",
      "Completing advanced education (PhD, etc.)",
      "Working in a specialized niche in my field"
    ],
    category: "interest"
  },
  {
    id: 5,
    question: "How do you make important decisions?",
    options: [
      "Based on data and logical analysis",
      "Considering future prospects and opportunities",
      "Following my passion and interests",
      "Balancing multiple factors including practical concerns"
    ],
    category: "personality"
  }
];

type Stage = 'after10th' | 'after12th' | 'afterGraduation' | null;

const QuizPage = () => {
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState<Stage>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendedCareers, setRecommendedCareers] = useState<string[]>([]);
  
  const handleStageSelection = (stage: Stage) => {
    setSelectedStage(stage);
    // Reset quiz state when changing stages
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizCompleted(false);
  };
  
  const getQuestionsForStage = (): Question[] => {
    switch (selectedStage) {
      case 'after10th':
        return after10thQuestions;
      case 'after12th':
        return after12thQuestions;
      case 'afterGraduation':
        return afterGraduationQuestions;
      default:
        return [];
    }
  };
  
  const handleAnswerSelected = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const handleNextQuestion = () => {
    const questions = getQuestionsForStage();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleQuizComplete = () => {
    // In a real app, we would process the answers to determine career recommendations
    // For now, let's just simulate recommendations based on the stage
    let careers: string[] = [];
    
    switch (selectedStage) {
      case 'after10th':
        careers = ["Science Stream (PCM)", "Science Stream (PCB)", "Commerce Stream", "Arts/Humanities Stream"];
        break;
      case 'after12th':
        careers = ["Engineering", "Medical", "Business Management", "Design", "Law"];
        break;
      case 'afterGraduation':
        careers = ["Masters Degree", "MBA", "Job in Industry", "Civil Services", "Entrepreneurship"];
        break;
    }
    
    setRecommendedCareers(careers);
    setQuizCompleted(true);
    
    toast({
      title: "Quiz completed!",
      description: "Your personalized career recommendations are ready.",
    });
  };
  
  const handleViewCareers = () => {
    navigate('/library');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!selectedStage ? (
            <StageSelector onSelectStage={handleStageSelection} />
          ) : !quizCompleted ? (
            <QuizQuestion 
              questions={getQuestionsForStage()}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              onAnswerSelected={handleAnswerSelected}
              onNextQuestion={handleNextQuestion}
              onPrevQuestion={handlePrevQuestion}
              onComplete={handleQuizComplete}
            />
          ) : (
            <div className="py-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Thank you for completing the quiz!</h2>
              <p className="text-gray-600 mb-8">
                Based on your responses, here are some recommended paths:
              </p>
              
              <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Your Recommendations</h3>
                <ul className="space-y-2">
                  {recommendedCareers.map((career, index) => (
                    <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="h-6 w-6 rounded-full bg-pp-purple text-white flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span>{career}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <Button 
                    className="bg-pp-purple hover:bg-pp-bright-purple w-full"
                    onClick={handleViewCareers}
                  >
                    Explore Careers in Library
                  </Button>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setSelectedStage(null)}
                className="mt-4"
              >
                Take Another Quiz
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizPage;
