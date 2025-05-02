import { useState } from "react";
import StageSelector from "@/components/quiz/StageSelector";
import QuizQuestion, { Question } from "@/components/quiz/QuizQuestion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { QuizAnswers, getMatchedCareers } from "@/utils/quizMatchUtils";
import { Career } from "@/components/career-library/CareerCard";
import { motion } from "framer-motion";

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

// Sample careers data (in a real app, this would come from a database or API)
const allCareers: Career[] = [
  {
    id: "1",
    title: "Software Engineer",
    category: "Technical",
    description: "Design, develop and maintain software systems and applications using programming languages and development tools.",
    salary: "₹5L - ₹40L per annum",
    entranceExams: ["GATE", "Company Specific Tests"],
    colleges: ["IITs", "NITs", "BITS", "IIIT"],
    recruiters: ["TCS", "Infosys", "Google", "Microsoft"]
  },
  // ... imagine more career objects here - we don't need to list them all
  {
    id: "22",
    title: "Urban Planner",
    category: "Government",
    description: "Develop comprehensive plans and programs for land use and growth of urban and rural communities.",
    salary: "₹5L - ₹20L per annum",
    entranceExams: ["GATE (AR/PL)", "CEPT Entrance"],
    colleges: ["SPA", "CEPT", "IIT Kharagpur", "JMI"],
    recruiters: ["Municipal Corporations", "Development Authorities", "Consulting Firms"]
  }
];

const QuizPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState<Stage>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendedCareers, setRecommendedCareers] = useState<Career[]>([]);
  
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
    // Get matched careers with scores based on user's answers
    const matchedCareers = getMatchedCareers(answers, allCareers);
    
    // Take top 5 matches
    setRecommendedCareers(matchedCareers.slice(0, 5));
    setQuizCompleted(true);
    
    toast({
      title: t("quizCompleted"),
      description: t("personalizedRecommendations"),
    });
  };
  
  const handleViewCareers = () => {
    // Pass the recommended careers to the library page through localStorage
    localStorage.setItem('matchedCareers', JSON.stringify(recommendedCareers));
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
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold mb-4"
              >
                {t("thankYouQuiz")}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                className="text-gray-600 dark:text-gray-300 mb-8"
              >
                {t("basedOnResponses")}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
                className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
              >
                <h3 className="text-lg font-semibold mb-4">{t("yourRecommendations")}</h3>
                <ul className="space-y-2">
                  {recommendedCareers.map((career, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: 0.5 + index * 0.1 } }}
                      className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded"
                    >
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pp-purple dark:bg-pp-bright-purple text-white font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{career.title}</p>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className="bg-pp-bright-purple dark:bg-pp-saffron h-2 rounded-full"
                              style={{ width: `${career.matchScore || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium ml-2 min-w-[40px]">
                            {career.matchScore}%
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <Button 
                    className="bg-pp-purple hover:bg-pp-bright-purple dark:bg-pp-saffron dark:hover:bg-amber-500 w-full"
                    onClick={handleViewCareers}
                  >
                    {t("exploreCareersLibrary")}
                  </Button>
                </div>
              </motion.div>
              
              <Button 
                variant="outline" 
                onClick={() => setSelectedStage(null)}
                className="mt-4"
              >
                {t("takeAnotherQuiz")}
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
