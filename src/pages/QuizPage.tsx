
import { useState } from "react";
import StageSelector from "@/components/quiz/StageSelector";
import QuizQuestion, { Question } from "@/components/quiz/QuizQuestion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample quiz questions for demonstration
const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "How do you prefer to solve problems?",
    options: [
      "I like to analyze data and find logical solutions",
      "I prefer creative approaches and thinking outside the box",
      "I enjoy collaborating with others to find solutions",
      "I trust my intuition and go with what feels right"
    ],
    category: "personality"
  },
  {
    id: 2,
    question: "Which school subjects do you excel at?",
    options: [
      "Mathematics and Physics",
      "Languages and Literature",
      "Biology and Chemistry",
      "Arts and Creative subjects"
    ],
    category: "academic"
  },
  {
    id: 3,
    question: "What activities do you enjoy in your free time?",
    options: [
      "Reading books or researching topics that interest me",
      "Creating art, music, or writing",
      "Playing sports or physical activities",
      "Socializing with friends and organizing events"
    ],
    category: "interest"
  },
  {
    id: 4,
    question: "What's most important to you in a future career?",
    options: [
      "High salary and financial stability",
      "Making a positive impact on society",
      "Work-life balance and flexibility",
      "Recognition and opportunities for growth"
    ],
    category: "worklife"
  },
  {
    id: 5,
    question: "How do you approach new challenges?",
    options: [
      "I carefully plan and prepare before starting",
      "I dive in and learn as I go",
      "I seek advice from others who have experience",
      "I research different approaches and then decide"
    ],
    category: "aptitude"
  }
];

type Stage = 'after10th' | 'after12th' | 'afterGraduation' | null;

const QuizPage = () => {
  const [selectedStage, setSelectedStage] = useState<Stage>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const handleStageSelection = (stage: Stage) => {
    setSelectedStage(stage);
  };
  
  const handleAnswerSelected = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };
  
  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(prev => prev - 1);
  };
  
  const handleQuizComplete = () => {
    setQuizCompleted(true);
    // In a real app, we would process the answers here 
    // and calculate recommendations
    console.log("Quiz completed with answers:", answers);
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
              questions={sampleQuestions}
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
                We're analyzing your responses to provide personalized career recommendations.
              </p>
              {/* In a real app, we would display recommendations or a loading state */}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizPage;
