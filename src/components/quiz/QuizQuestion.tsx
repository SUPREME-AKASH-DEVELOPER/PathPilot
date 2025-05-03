
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

export interface Question {
  id: number;
  question: string;
  options: string[];
  category: string;
  difficulty?: "beginner" | "intermediate" | "advanced"; // Added difficulty level
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
  const { t } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<string | null>(
    answers[questions[currentQuestionIndex]?.id] || null
  );
  const [animateOptions, setAnimateOptions] = useState(true);
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  // Update selected option when changing questions
  useEffect(() => {
    setSelectedOption(answers[currentQuestion?.id] || null);
    // Reset animation state when changing questions
    setAnimateOptions(false);
    const timer = setTimeout(() => setAnimateOptions(true), 50);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, answers, currentQuestion?.id]);
  
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

  // Get difficulty badge color
  const getDifficultyColor = () => {
    switch (currentQuestion.difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "";
    }
  };

  return (
    <div className="py-10 max-w-3xl mx-auto">
      <ProgressBar progress={progress} />
      
      <div className="flex justify-between items-center text-sm text-gray-500 mt-2 mb-4">
        <span>{t("question")} {currentQuestionIndex + 1} {t("of")} {questions.length}</span>
        <div className="flex gap-2">
          {currentQuestion.difficulty && (
            <Badge variant="outline" className={`text-xs font-normal ${getDifficultyColor()}`}>
              {currentQuestion.difficulty}
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs font-normal">
            {currentQuestion.category}
          </Badge>
        </div>
      </div>
      
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-6">{currentQuestion.question}</h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={animateOptions ? "visible" : "hidden"}
          className="space-y-3"
        >
          {currentQuestion.options.map((option, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={`cursor-pointer transition-all ${
                  selectedOption === option
                    ? "border-pp-purple bg-pp-purple/10"
                    : "hover:border-gray-400 hover:shadow-md"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border ${
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
          >
            {t("previous")}
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!selectedOption}
            className="bg-pp-purple hover:bg-pp-bright-purple"
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
