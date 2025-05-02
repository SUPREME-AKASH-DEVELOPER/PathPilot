
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Star, GraduationCap, Briefcase, TrendingUp, Palette, PieChart, Plane, Microscope, Brain, Leaf, Save, Info } from "lucide-react";

export interface Career {
  id: string;
  title: string;
  category: string;
  description: string;
  salary: string;
  entranceExams: string[];
  colleges: string[];
  recruiters: string[];
  matchScore?: number;
}

interface CareerCardProps {
  career: Career;
  onSave?: () => void;
  onViewDetails?: () => void;
  isSaved?: boolean;
}

export default function CareerCard({ career, onSave, onViewDetails, isSaved }: CareerCardProps) {
  // Get appropriate icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technical':
        return <Briefcase className="h-5 w-5" />;
      case 'medical':
        return <Star className="h-5 w-5" />;
      case 'government':
        return <TrendingUp className="h-5 w-5" />;
      case 'education':
        return <GraduationCap className="h-5 w-5" />;
      case 'finance':
        return <PieChart className="h-5 w-5" />;
      case 'creative':
        return <Palette className="h-5 w-5" />;
      case 'marketing':
        return <TrendingUp className="h-5 w-5" />;
      case 'aviation':
        return <Plane className="h-5 w-5" />;
      case 'science':
        return <Microscope className="h-5 w-5" />;
      case 'engineering':
        return <Leaf className="h-5 w-5" />;
      case 'hospitality':
        return <BookOpen className="h-5 w-5" />; 
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <Card className="gradient-card hover-scale h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{career.title}</CardTitle>
          <div className="flex items-center px-2 py-1 rounded-full bg-pp-purple/10 text-pp-purple">
            {getCategoryIcon(career.category)}
            <span className="text-xs ml-1">{career.category}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
          {career.description}
        </p>
        
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white">Salary Range:</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{career.salary}</p>
          </div>
          
          {career.entranceExams.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">Key Entrance Exams:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {career.entranceExams.join(', ')}
              </p>
            </div>
          )}
          
          {career.matchScore && (
            <div className="mt-2">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">Match Score:</h4>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-pp-bright-purple h-2 rounded-full" 
                  style={{ width: `${career.matchScore}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{career.matchScore}% match with your profile</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button 
            variant={isSaved ? "default" : "outline"}
            className={`flex-1 ${isSaved ? "bg-green-600 hover:bg-green-700" : ""}`}
            onClick={onSave}
          >
            <Save className="h-4 w-4 mr-1" />
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button 
            className="flex-1 bg-pp-purple hover:bg-pp-bright-purple"
            onClick={onViewDetails}
          >
            <Info className="h-4 w-4 mr-1" />
            Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
