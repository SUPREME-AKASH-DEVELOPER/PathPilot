
import { useState, useEffect } from "react";
import StageSelector from "@/components/quiz/StageSelector";
import QuizQuestion, { Question } from "@/components/quiz/QuizQuestion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { QuizAnswers, getMatchedCareers, generateQuizSummary, SkillAssessment } from "@/utils/quizMatchUtils";
import { Career } from "@/components/career-library/CareerCard";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Book, Briefcase, GraduationCap, PieChart, StarHalf, SchoolIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Enhanced quiz questions with more detailed options for 10th grade
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
    question: "What are your strongest skills?",
    options: [
      "Problem-solving and logical thinking",
      "Memory and observation",
      "Communication and expression",
      "Design and creativity"
    ],
    category: "skills"
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
    question: "What skills do others often compliment you on?",
    options: [
      "Analytical thinking and problem-solving",
      "Creativity and artistic abilities",
      "Communication and interpersonal skills",
      "Organization and attention to detail"
    ],
    category: "personality"
  },
  {
    id: 7,
    question: "Which career field are you most drawn to?",
    options: [
      "Computer Science related fields",
      "Life Sciences related fields",
      "Commerce and Economics related fields",
      "Humanities and Arts related fields"
    ],
    category: "interest",
    weight: 1.5 // Higher weight as this directly relates to career interest
  },
  {
    id: 8,
    question: "What type of work would you find most satisfying?",
    options: [
      "Building and creating new things",
      "Helping and serving others",
      "Analyzing and solving complex problems",
      "Leading teams and projects"
    ],
    category: "worktype"
  }
];

// More detailed questions for 12th grade
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
    category: "academic",
    weight: 1.5 // Higher weight as this is a key decision point
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
    category: "learning"
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
    category: "values"
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
  },
  {
    id: 6,
    question: "Which skills would you like to develop further?",
    options: [
      "Technical and specialized knowledge",
      "Leadership and management abilities",
      "Creative and innovative thinking",
      "Communication and interpersonal skills"
    ],
    category: "development"
  },
  {
    id: 7,
    question: "What type of educational path are you considering?",
    options: [
      "Traditional university degree (Bachelor's)",
      "Professional certification or diploma",
      "Vocational training or skill-based programs",
      "Online courses and self-learning"
    ],
    category: "education"
  },
  {
    id: 8,
    question: "Which broad career category aligns with your strengths?",
    options: [
      "STEM (Science, Technology, Engineering, Math)",
      "Healthcare and Life Sciences",
      "Business and Finance",
      "Creative Arts and Communication"
    ],
    category: "alignment",
    weight: 1.3
  }
];

// More specialized questions for graduates
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
  const [quizSummary, setQuizSummary] = useState<{
    strengths: string[];
    recommendedPaths: string[];
    skills: SkillAssessment;
    nextSteps?: string[];
  } | null>(null);
  
  const handleStageSelection = (stage: Stage) => {
    setSelectedStage(stage);
    // Reset quiz state when changing stages
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizCompleted(false);
    setQuizSummary(null);
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
    // Generate skills and strengths summary with education stage
    const summary = generateQuizSummary(answers, selectedStage);
    setQuizSummary(summary);
    
    // Get matched careers with scores based on user's answers and education stage
    const matchedCareers = getMatchedCareers(answers, allCareers, selectedStage);
    
    // Take top 5 matches
    setRecommendedCareers(matchedCareers.slice(0, 5));
    setQuizCompleted(true);
    
    toast({
      title: t("quizCompleted"),
      description: t("personalizedRecommendations"),
    });
  };
  
  const handleViewCareers = () => {
    // Pass the recommended careers and quiz stage to the library page
    localStorage.setItem('matchedCareers', JSON.stringify(recommendedCareers));
    localStorage.setItem('educationStage', selectedStage || '');
    navigate('/library');
  };

  // Function to render the skills graph
  const renderSkillsGraph = () => {
    if (!quizSummary) return null;
    
    const { skills } = quizSummary;
    const maxSkillValue = Math.max(...Object.values(skills));
    const normalizeSkill = (value: number) => maxSkillValue > 0 ? (value / maxSkillValue) * 100 : 0;
    
    return (
      <div className="mt-6 space-y-3">
        <h4 className="font-medium text-gray-800 dark:text-gray-200">Your Skills Assessment:</h4>
        
        <div className="space-y-3">
          {Object.entries(skills).map(([skill, value]) => (
            <div key={skill} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm capitalize">{skill}</span>
                <span className="text-xs font-medium">{value}</span>
              </div>
              <Progress value={normalizeSkill(value)} className="h-2" />
            </div>
          ))}
        </div>
      </div>
    );
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
            <div className="py-12">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold mb-4 text-center"
              >
                {t("thankYouQuiz")}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                className="text-gray-600 dark:text-gray-300 mb-8 text-center"
              >
                {t("basedOnResponses")}
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <StarHalf className="h-5 w-5 mr-2 text-pp-purple" />
                    {t("yourStrengths")}
                  </h3>
                  {quizSummary && (
                    <>
                      <ul className="space-y-2 mb-6">
                        {quizSummary.strengths.map((strength, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0, transition: { delay: 0.4 + index * 0.1 } }}
                            className="flex items-center text-sm"
                          >
                            <div className="h-2 w-2 bg-pp-purple rounded-full mr-2"></div>
                            {strength}
                          </motion.li>
                        ))}
                      </ul>
                      
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Book className="h-5 w-5 mr-2 text-pp-purple" />
                        {t("recommendedPaths")}
                      </h3>
                      <ul className="space-y-2">
                        {quizSummary.recommendedPaths.map((path, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0, transition: { delay: 0.6 + index * 0.1 } }}
                            className="flex items-center text-sm"
                          >
                            <div className="h-2 w-2 bg-pp-saffron rounded-full mr-2"></div>
                            {path}
                          </motion.li>
                        ))}
                      </ul>
                      
                      {/* Add practical next steps based on education stage */}
                      {quizSummary.nextSteps && (
                        <>
                          <h3 className="text-lg font-semibold mt-6 mb-4 flex items-center">
                            <GraduationCap className="h-5 w-5 mr-2 text-pp-purple" />
                            Practical Next Steps
                          </h3>
                          <ul className="space-y-2">
                            {quizSummary.nextSteps.map((step, index) => (
                              <motion.li 
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0, transition: { delay: 0.8 + index * 0.1 } }}
                                className="flex items-center text-sm"
                              >
                                <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                                {step}
                              </motion.li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {renderSkillsGraph()}
                    </>
                  )}
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-pp-purple" />
                    {t("yourRecommendations")}
                  </h3>
                  
                  {selectedStage === 'after10th' && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-700 rounded-md">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        These are career options you can aim for after completing the necessary education path. 
                        First focus on choosing the right stream in 11th-12th that aligns with these careers.
                      </p>
                    </div>
                  )}
                  
                  <ul className="space-y-4">
                    {recommendedCareers.map((career, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.6 + index * 0.1 } }}
                        className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded"
                      >
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pp-purple dark:bg-pp-bright-purple text-white font-semibold text-sm mt-1">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm md:text-base">{career.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{career.category}</p>
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
              </div>
              
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedStage(null)}
                >
                  {t("takeAnotherQuiz")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizPage;
