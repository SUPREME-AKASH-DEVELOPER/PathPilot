
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProgressBar from "./ProgressBar";
import { useLanguage } from "@/contexts/LanguageContext";

export interface Question {
  id: number;
  question: string;
  options: string[];
  category: string;
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
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onAnswerSelected(currentQuestion.id, option);
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      onNextQuestion();
      // Reset selected option for the next question
      setSelectedOption(answers[questions[currentQuestionIndex + 1]?.id] || null);
    }
  };
  
  const handlePrevious = () => {
    onPrevQuestion();
    // Set selected option to the previously selected answer
    setSelectedOption(answers[questions[currentQuestionIndex - 1]?.id] || null);
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

  return (
    <div className="py-10 max-w-3xl mx-auto">
      <ProgressBar progress={progress} />
      
      <div className="flex justify-between text-sm text-gray-500 mt-2 mb-8">
        <span>{t("question")} {currentQuestionIndex + 1} {t("of")} {questions.length}</span>
        <span>Category: {currentQuestion.category}</span>
      </div>
      
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {currentQuestion.options.map((option, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={`cursor-pointer ${
                  selectedOption === option
                    ? "border-pp-purple bg-pp-purple/10"
                    : "hover:border-gray-400"
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
                    <div>{option}</div>
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
}
