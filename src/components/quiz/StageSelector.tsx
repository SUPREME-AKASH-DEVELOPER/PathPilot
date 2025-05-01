
import { useState } from 'react';
import { BookOpen, GraduationCap, BookText } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StageSelectorProps {
  onSelectStage: (stage: 'after10th' | 'after12th' | 'afterGraduation') => void;
}

export default function StageSelector({ onSelectStage }: StageSelectorProps) {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  const stages = [
    {
      id: 'after10th',
      title: 'After 10th',
      icon: <BookOpen className="h-12 w-12 mb-4 text-pp-purple" />,
      description: 'Explore science, commerce, arts streams and vocational options'
    },
    {
      id: 'after12th',
      title: 'After 12th',
      icon: <BookText className="h-12 w-12 mb-4 text-pp-purple" />,
      description: 'Discover degree courses, diploma programs and career paths'
    },
    {
      id: 'afterGraduation',
      title: 'After Graduation',
      icon: <GraduationCap className="h-12 w-12 mb-4 text-pp-purple" />,
      description: 'Find postgraduate courses, professional paths and job opportunities'
    }
  ];

  return (
    <div className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
        Where are you in your journey?
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
        Select your current educational stage to get personalized career guidance tailored to your situation.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {stages.map((stage) => (
          <Card 
            key={stage.id}
            className={`gradient-card hover-scale overflow-hidden ${
              hoveredStage === stage.id ? 'ring-2 ring-pp-purple' : ''
            }`}
            onMouseEnter={() => setHoveredStage(stage.id)}
            onMouseLeave={() => setHoveredStage(null)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              {stage.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{stage.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{stage.description}</p>
              <Button 
                className="bg-pp-purple hover:bg-pp-bright-purple w-full" 
                onClick={() => onSelectStage(stage.id as 'after10th' | 'after12th' | 'afterGraduation')}
              >
                Start Here
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
