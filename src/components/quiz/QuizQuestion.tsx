
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Timer, Brain, CircleHelp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface Question {
  id: number;
  question: string;
  question_hi?: string; // Hindi version of the question
  options: string[];
  options_hi?: string[]; // Hindi version of options
  category: string;
  difficulty?: "beginner" | "intermediate" | "advanced"; 
  weight?: number; // Question importance weight
  skillMapping?: Record<string, number>; // Maps answers to skill scores
}

interface QuizQuestionProps {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  onAnswerSelected: (questionId: number, answer: string) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onComplete: () => void;
}

export default function QuizQuestion({
  questions,
  currentQuestionIndex,
  answers,
  onAnswerSelected,
  onNextQuestion,
  onPrevQuestion,
  onComplete
}: QuizQuestionProps) {
  const { t, language } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<string | null>(
    answers[questions[currentQuestionIndex]?.id] || null
  );
  const [animateOptions, setAnimateOptions] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  // Get the appropriate question text and options based on current language
  const questionText = language === 'hindi' && currentQuestion?.question_hi 
    ? currentQuestion.question_hi 
    : currentQuestion?.question;
  
  const optionsList = language === 'hindi' && currentQuestion?.options_hi 
    ? currentQuestion.options_hi 
    : currentQuestion?.options;
  
  // Update selected option when changing questions
  useEffect(() => {
    setSelectedOption(answers[currentQuestion?.id] || null);
    // Reset animation state when changing questions
    setAnimateOptions(false);
    const timer = setTimeout(() => setAnimateOptions(true), 50);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, answers, currentQuestion?.id]);
  
  // Track time spent on each question
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestionIndex]);
  
  // Reset timer when moving to next question
  useEffect(() => {
    setTimeSpent(0);
  }, [currentQuestionIndex]);
  
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onAnswerSelected(currentQuestion.id, option);
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      onNextQuestion();
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Get difficulty badge color with enhanced visual distinction
  const getDifficultyColor = () => {
    switch (currentQuestion.difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800";
      default:
        return "";
    }
  };
  
  const getCategoryIcon = () => {
    switch(currentQuestion.category) {
      case "academic":
      case "learning":
      case "education":
        return <Brain className="w-3.5 h-3.5 mr-1" />;
      default:
        return null;
    }
  };

  // Get category display text with proper capitalization
  const getCategoryDisplayText = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="py-10 max-w-3xl mx-auto">
      <ProgressBar progress={progress} />
      
      <div className="flex justify-between items-center text-sm text-gray-500 mt-2 mb-4">
        <span className="flex items-center">
          <span>{t("question")} {currentQuestionIndex + 1} {t("of")} {questions.length}</span>
          <span className="ml-3 flex items-center text-gray-400">
            <Timer className="w-4 h-4 mr-1" />
            {Math.floor(timeSpent / 60)}:{timeSpent % 60 < 10 ? '0' : ''}{timeSpent % 60}
          </span>
        </span>
        <div className="flex gap-2">
          {currentQuestion.difficulty && (
            <Badge variant="outline" className={`text-xs font-normal border ${getDifficultyColor()}`}>
              {currentQuestion.difficulty}
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs font-normal flex items-center">
            {getCategoryIcon()}
            {getCategoryDisplayText(currentQuestion.category)}
          </Badge>
          {currentQuestion.weight && currentQuestion.weight > 1 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs font-normal bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:border-purple-800 cursor-help">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    High impact
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">This question has a higher impact on your career matches</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start mb-6">
          <h2 className="text-xl md:text-2xl font-bold">{questionText}</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2 p-0 h-auto">
                  <CircleHelp className="h-5 w-5 text-gray-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">Your answer helps us understand your preferences and match you with suitable careers</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={animateOptions ? "visible" : "hidden"}
          className="space-y-3"
        >
          {optionsList?.map((option, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={`cursor-pointer transition-all ${
                  selectedOption === option
                    ? "border-pp-purple bg-pp-purple/10 shadow-md"
                    : "hover:border-gray-400 hover:shadow-md"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                        selectedOption === option
                          ? "bg-pp-purple border-pp-purple text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedOption === option && "✓"}
                    </div>
                    <div className="text-sm md:text-base">{option}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-8 flex justify-between">
          <Button 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="transition-all"
          >
            {t("previous")}
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!selectedOption}
            className="bg-pp-purple hover:bg-pp-bright-purple transition-all"
          >
            {isLastQuestion ? t("submit") : t("next")}
          </Button>
        </div>
      </motion.div>
    </div>
  );
  
  function handlePrevious() {
    onPrevQuestion();
  }
}
