
import { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, 
  Tooltip, Cell, Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, ChartBar, LineChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ResultChartsProps {
  skillsData: Record<string, number>;
  careerMatchData: Record<string, number>;
}

export default function ResultCharts({ skillsData, careerMatchData }: ResultChartsProps) {
  const [activeChart, setActiveChart] = useState<"bar" | "column" | "histogram">("bar");
  const navigate = useNavigate();
  
  // Transform skills data for charts, ensuring all skills are included
  const skillsChartData = Object.entries(skillsData).map(([name, value]) => ({
    name,
    value: value || 0 // Ensure null/undefined values are converted to 0
  }));
  
  // Transform career match data for charts
  const careerMatchChartData = Object.entries(careerMatchData)
    .map(([name, value]) => ({
      name,
      value: value || 0 // Ensure null/undefined values are converted to 0
    }))
    .sort((a, b) => b.value - a.value); // Sort by highest match score
  
  // Colors for charts with improved visibility
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57', '#f28cb1', '#af69ee', '#6897bb'];

  // Get top career match
  const topCareerMatch = careerMatchChartData.length > 0 ? careerMatchChartData[0].name : '';
  
  const handleViewMentors = () => {
    // Store top career match for mentor page to use
    localStorage.setItem('careerInterest', topCareerMatch);
    navigate('/mentors');
  };
  
  return (
    <div className="space-y-6 w-full">
      <Tabs defaultValue="bar" className="w-full" onValueChange={(value) => setActiveChart(value as any)}>
        <div className="flex justify-center mb-4">
          <TabsList>
            <TabsTrigger value="bar" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              Bar Chart
            </TabsTrigger>
            <TabsTrigger value="column" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Column Chart
            </TabsTrigger>
            <TabsTrigger value="histogram" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Histogram
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Bar Chart View (Horizontal) */}
        <TabsContent value="bar" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={skillsChartData}
                    layout="vertical"
                    margin={{ top: 20, right: 40, left: 100, bottom: 20 }}
                  >
                    <XAxis type="number" domain={[0, 10]} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={100} 
                      tick={{ fontSize: 12 }} 
                      tickFormatter={(value) => value.replace(/[_-]/g, ' ')}
                    />
                    <Tooltip formatter={(value) => [`Score: ${value}`, '']} />
                    <Bar dataKey="value" fill="#8884d8" barSize={20}>
                      {skillsChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Career Match Scores</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={careerMatchChartData}
                    layout="vertical"
                    margin={{ top: 20, right: 40, left: 100, bottom: 20 }}
                  >
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={100} 
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                    <Bar dataKey="value" fill="#82ca9d" barSize={20}>
                      {careerMatchChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Column Chart View (Vertical) */}
        <TabsContent value="column" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={skillsChartData}
                    margin={{ top: 20, right: 30, left: 30, bottom: 80 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => value.replace(/[_-]/g, ' ')}
                    />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8">
                      {skillsChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Career Match Scores</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={careerMatchChartData}
                    margin={{ top: 20, right: 30, left: 30, bottom: 80 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                    <Bar dataKey="value" fill="#82ca9d">
                      {careerMatchChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Histogram View */}
        <TabsContent value="histogram" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={skillsChartData}
                    margin={{ top: 20, right: 30, left: 30, bottom: 80 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => value.replace(/[_-]/g, ' ')}
                    />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Skill Level" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Career Match Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={careerMatchChartData}
                    barSize={30}
                    margin={{ top: 20, right: 30, left: 30, bottom: 80 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" name="Match Percentage" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => window.print()} className="px-6">
          Download Results
        </Button>
        <Button 
          onClick={handleViewMentors} 
          className="px-6 bg-pp-purple hover:bg-pp-bright-purple"
        >
          Connect with Mentors
        </Button>
      </div>
    </div>
  );
}
