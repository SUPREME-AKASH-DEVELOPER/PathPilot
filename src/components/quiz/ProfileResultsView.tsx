
import { useState } from "react";
import { QuizResult } from "@/hooks/use-quiz-results";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ResultCharts from "./ResultCharts";
import { formatDistance } from "date-fns";
import { Briefcase, Brain, Star, AlertTriangle, User, Book } from "lucide-react";

interface ProfileResultsViewProps {
  result: QuizResult;
}

export default function ProfileResultsView({ result }: ProfileResultsViewProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  if (!result) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">No quiz results available yet.</p>
      </div>
    );
  }

  const formattedDate = new Date(result.date).toLocaleDateString();
  const timeAgo = formatDistance(new Date(result.date), new Date(), { addSuffix: true });
  
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle>Your PathPilot Results</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{result.educationStage}</Badge>
            <Badge variant="secondary" className="text-xs">
              {formattedDate} ({timeAgo})
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Star className="h-5 w-5 mr-2 text-amber-500" />
                    Your Strengths
                  </h3>
                  <ul className="space-y-1.5">
                    {result.strengths.map((strength, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                    Growth Areas
                  </h3>
                  <ul className="space-y-1.5">
                    {result.weaknesses.map((weakness, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <div className="h-2 w-2 bg-amber-400 rounded-full mr-2"></div>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3 pt-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <Book className="h-5 w-5 mr-2 text-pp-purple" />
                  Recommended Paths
                </h3>
                <ul className="space-y-1.5">
                  {result.recommendedPaths.map((path, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <div className="h-2 w-2 bg-pp-saffron rounded-full mr-2"></div>
                      {path}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3 pt-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-pp-purple" />
                  Skills Assessment
                </h3>
                <div className="space-y-2">
                  {Object.entries(result.skillsAssessment).map(([skill, value]) => (
                    <div key={skill} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm capitalize">{skill}</span>
                        <span className="text-xs font-medium">{value}/10</span>
                      </div>
                      <Progress value={value * 10} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="personality">
            <div className="space-y-4">
              {result.personalityProfile ? (
                <>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <User className="h-5 w-5 mr-2 text-pp-purple" />
                      {result.personalityProfile.type}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium">Key Traits:</span> 
                        <div className="mt-1 flex flex-wrap gap-1">
                          {result.personalityProfile.traits.map((trait, i) => (
                            <Badge key={i} variant="outline" className="bg-purple-100 dark:bg-purple-900/30">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Learning Style:</span> 
                        <p className="mt-1">{result.personalityProfile.learningStyle}</p>
                      </div>
                      <div>
                        <span className="font-medium">Ideal Work Environment:</span>
                        <p className="mt-1">{result.personalityProfile.workEnvironmentPreference}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center py-4 text-gray-500">Personality profile not available.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="careers">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-pp-purple" />
                Career Match Scores
              </h3>
              
              <div className="space-y-3">
                {Object.entries(result.careerMatchScores)
                  .sort(([, a], [, b]) => b - a)
                  .map(([career, score], i) => (
                    <div key={career} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-pp-purple text-white font-semibold text-xs mr-2">
                            {i + 1}
                          </div>
                          <span className="font-medium">{career}</span>
                        </div>
                        <Badge className="bg-pp-purple/10 text-pp-purple dark:bg-pp-purple/20">
                          {score}% Match
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-pp-bright-purple dark:bg-pp-saffron h-2 rounded-full"
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="charts">
            <ResultCharts 
              skillsData={result.skillsAssessment} 
              careerMatchData={result.careerMatchScores} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
