
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ProgressBar } from './ProgressBar';

export interface Question {
  id: number;
  question: string;
  options: string[];
  category: 'personality' | 'academic' | 'interest' | 'worklife' | 'aptitude';
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
  const [selectedOption, setSelectedOption] = useState<string>(
    answers[questions[currentQuestionIndex].id] || ''
  );
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    onAnswerSelected(currentQuestion.id, value);
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      onNextQuestion();
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <ProgressBar progress={progress} />
      
      <div className="mb-8">
        <div className="text-sm font-medium text-pp-saffron mb-2">
          {getCategoryLabel(currentQuestion.category)} • Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          {currentQuestion.question}
        </h3>
        
        <RadioGroup 
          value={selectedOption} 
          onValueChange={handleOptionChange}
          className="space-y-4"
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <RadioGroupItem 
                value={option} 
                id={`option-${index}`} 
              />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!selectedOption}
          className="bg-pp-purple hover:bg-pp-bright-purple"
        >
          {isLastQuestion ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

function getCategoryLabel(category: string): string {
  switch (category) {
    case 'personality':
      return 'Personality Traits';
    case 'academic':
      return 'Academic Strengths';
    case 'interest':
      return 'Interests & Hobbies';
    case 'worklife':
      return 'Work-Life Expectations';
    case 'aptitude':
      return 'Mindset & Aptitude';
    default:
      return 'Question';
  }
}
