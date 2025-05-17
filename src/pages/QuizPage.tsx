import { useState, useEffect } from "react";
import StageSelector from "@/components/quiz/StageSelector";
import PathCreator, { Question } from "@/components/quiz/QuizQuestion";
import ResultCharts from "@/components/quiz/ResultCharts";
import RecommendedMentors from "@/components/quiz/RecommendedMentors";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { 
  QuizAnswers, 
  getMatchedCareers, 
  generateQuizSummary, 
  SkillAssessment,
  PersonalityProfile
} from "@/utils/quizMatchUtils";
import { Career } from "@/components/career-library/CareerCard";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { 
  Book, 
  Briefcase, 
  GraduationCap, 
  StarHalf, 
  AlertTriangle, 
  Heart,
  User,
  Lightbulb,
  Compass
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyzeQuizResponses } from "@/lib/perplexity";
import { useQuizResults } from "@/hooks/use-quiz-results";
import { enhanceCareerMatchScores, enhanceSkillsAssessment } from "@/utils/mlPathAnalysis";

// Import existing question sets from your current codebase
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
    category: "academic",
    difficulty: "beginner"
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
    category: "skills",
    difficulty: "beginner"
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
    category: "aptitude",
    difficulty: "intermediate"
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
    category: "worklife",
    difficulty: "beginner"
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
    category: "interest",
    difficulty: "intermediate"
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
    category: "personality",
    difficulty: "beginner"
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
    weight: 1.5, // Higher weight as this directly relates to career interest
    difficulty: "intermediate"
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
    category: "worktype",
    difficulty: "intermediate"
  },
  // New questions start here
  {
    id: 9,
    question: "How do you handle pressure and stress?",
    options: [
      "I stay calm and methodical in high-pressure situations",
      "I seek support and collaborate to reduce stress",
      "I become more focused and efficient under pressure",
      "I prefer to avoid high-stress environments when possible"
    ],
    category: "personality",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "Which of these activities would you most enjoy as a hobby?",
    options: [
      "Building electronic gadgets or programming",
      "Reading about science discoveries and experiments",
      "Creating art, music, or writing stories",
      "Organizing events or leading community activities"
    ],
    category: "interest",
    difficulty: "beginner"
  },
  {
    id: 11,
    question: "In a group project, which role do you naturally take on?",
    options: [
      "The planner who organizes tasks and schedules",
      "The creative who comes up with innovative ideas",
      "The problem solver who figures out challenges",
      "The communicator who facilitates discussions"
    ],
    category: "teamwork",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "How important is salary vs. work satisfaction in your future career?",
    options: [
      "Salary is more important than day-to-day satisfaction",
      "Work satisfaction is more important than salary",
      "Both are equally important to me",
      "I care more about work-life balance than either"
    ],
    category: "values",
    difficulty: "advanced"
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
    weight: 1.5, // Higher weight as this is a key decision point
    difficulty: "intermediate"
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
    category: "worklife",
    difficulty: "beginner"
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
    category: "learning",
    difficulty: "intermediate"
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
    category: "values",
    difficulty: "intermediate"
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
    category: "personality",
    difficulty: "intermediate"
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
    category: "development",
    difficulty: "intermediate"
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
    category: "education",
    difficulty: "beginner"
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
    weight: 1.3,
    difficulty: "intermediate"
  },
  // New questions start here
  {
    id: 9,
    question: "What kind of projects do you enjoy working on the most?",
    options: [
      "Complex technical problems requiring deep analysis",
      "People-focused initiatives involving human interaction",
      "Data-driven projects with measurable outcomes",
      "Creative projects with design or artistic elements"
    ],
    category: "worktype",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "How do you feel about taking risks in your career path?",
    options: [
      "I prefer stable, predictable career paths with clear advancement",
      "I'm comfortable with calculated risks for greater rewards",
      "I actively seek innovative paths, even with uncertainty",
      "I balance security with occasional, well-researched risks"
    ],
    category: "personality",
    difficulty: "advanced"
  },
  {
    id: 11,
    question: "When learning something new, what approach works best for you?",
    options: [
      "Theoretical understanding before practical application",
      "Learning by doing and hands-on experimentation",
      "Watching demonstrations and following examples",
      "Discussion and questioning to develop understanding"
    ],
    category: "learning",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "Which emerging technology field interests you the most?",
    options: [
      "Artificial Intelligence and Machine Learning",
      "Sustainable Technology and Renewable Energy",
      "Biotechnology and Genetic Engineering",
      "Digital Media and Virtual Reality"
    ],
    category: "interest",
    difficulty: "advanced"
  },
  {
    id: 13,
    question: "In what kind of environment do you perform better?",
    options: [
      "Competitive environments that push me to excel",
      "Collaborative environments with shared goals",
      "Independent settings where I can self-direct",
      "Structured environments with clear expectations"
    ],
    category: "worklife",
    difficulty: "intermediate"
  },
  {
    id: 14,
    question: "What is your approach to long-term career planning?",
    options: [
      "I have a detailed 5-10 year plan with specific milestones",
      "I focus on building versatile skills for multiple opportunities",
      "I prioritize immediate growth and reassess periodically",
      "I follow my passions and let them guide my career path"
    ],
    category: "planning",
    difficulty: "advanced"
  }
];

// More specialized questions for graduates with enhanced career matching
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
    category: "academic",
    difficulty: "intermediate"
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
    category: "worklife",
    difficulty: "intermediate"
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
    category: "aptitude",
    difficulty: "intermediate"
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
    category: "interest",
    difficulty: "advanced"
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
    category: "personality",
    difficulty: "intermediate"
  },
  // New questions start here
  {
    id: 6,
    question: "Which industry trends are you most interested in following?",
    options: [
      "Digital transformation and technology integration",
      "Sustainable practices and environmental initiatives",
      "Global market expansion and international opportunities",
      "Workplace culture and employee experience innovations"
    ],
    category: "interest",
    difficulty: "advanced"
  },
  {
    id: 7,
    question: "What is your approach to professional networking?",
    options: [
      "I actively build and maintain a large professional network",
      "I focus on a smaller, high-quality network of key connections",
      "I network primarily online through professional platforms",
      "I prefer to let my work speak for itself rather than networking"
    ],
    category: "development",
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "How do you feel about relocating for career opportunities?",
    options: [
      "I'm willing to relocate anywhere for the right opportunity",
      "I prefer to stay in my current region but would consider moving",
      "I'll only relocate for exceptional opportunities",
      "I strongly prefer not to relocate and look for local opportunities"
    ],
    category: "mobility",
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "What role does salary play in your job decisions?",
    options: [
      "It's the primary factor in evaluating opportunities",
      "It's important but secondary to growth potential",
      "I prioritize work environment over compensation",
      "I seek a balance of fair compensation and meaningful work"
    ],
    category: "values",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "Which specialized career path within your field interests you most?",
    options: [
      "Research and development of new innovations",
      "Strategy and high-level planning",
      "Specialized technical implementation",
      "Training, teaching or mentoring others"
    ],
    category: "specialization",
    difficulty: "advanced"
  },
  {
    id: 11,
    question: "In the changing job market, how do you approach job security?",
    options: [
      "I focus on developing in-demand, transferable skills",
      "I prefer to work for established organizations with stability",
      "I diversify my income sources and professional activities",
      "I prioritize building a strong professional reputation"
    ],
    category: "planning",
    difficulty: "advanced"
  },
  {
    id: 12,
    question: "How do you handle workplace conflicts or disagreements?",
    options: [
      "I address issues directly with clear communication",
      "I seek compromise and common ground",
      "I involve a mediator or manager when necessary",
      "I try to understand all perspectives before responding"
    ],
    category: "interpersonal",
    difficulty: "advanced"
  },
  {
    id: 13,
    question: "What management style do you prefer to work under?",
    options: [
      "Hands-off leadership that provides autonomy",
      "Mentorship-focused with guidance and development",
      "Goal-oriented with clear metrics and expectations",
      "Collaborative leadership that values team input"
    ],
    category: "worklife",
    difficulty: "intermediate"
  },
  {
    id: 14,
    question: "How do you approach work-life balance?",
    options: [
      "I'm willing to prioritize work during important career stages",
      "I maintain strict boundaries between work and personal life",
      "I seek flexible arrangements that accommodate both",
      "I integrate work and life in a way that feels authentic"
    ],
    category: "values",
    difficulty: "advanced"
  },
  {
    id: 15,
    question: "Which aspect of professional development do you most value?",
    options: [
      "Gaining specialized expertise in a niche area",
      "Developing broad, versatile skill sets across domains",
      "Building leadership and people management capabilities",
      "Enhancing creative problem-solving abilities"
    ],
    category: "development",
    difficulty: "advanced"
  }
];

type Stage = 'after10th' | 'after12th' | 'afterGraduation' | null;

// Enhanced sample careers data with more diverse options
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
  {
    id: "2",
    title: "Content Strategist",
    category: "Creative",
    description: "Develop and manage content creation strategies for digital platforms, ensuring alignment with business goals and audience needs.",
    salary: "₹4L - ₹18L per annum",
    entranceExams: [],
    colleges: ["MICA", "Symbiosis", "XIC", "Delhi School of Communication"],
    recruiters: ["Marketing Agencies", "Media Houses", "Corporate Communication Departments"]
  },
  {
    id: "3",
    title: "Social Entrepreneur",
    category: "Social Impact",
    description: "Create innovative business solutions to address social and environmental challenges while generating sustainable income.",
    salary: "Varies widely based on venture success",
    entranceExams: [],
    colleges: ["TISS", "IRMA", "XLRI", "ISB"],
    recruiters: ["Self-employed", "NGOs", "Impact Investment Firms"]
  },
  {
    id: "4",
    title: "Ethical Hacker",
    category: "Technical",
    description: "Identify and fix security vulnerabilities in systems before malicious hackers can exploit them.",
    salary: "₹6L - ₹30L per annum",
    entranceExams: ["OSCP", "CEH", "CISSP"],
    colleges: ["IITs", "NITs", "IIIT", "Cybersecurity Certification Programs"],
    recruiters: ["IT Companies", "Banks", "Government Agencies", "Security Consulting Firms"]
  },
  {
    id: "5",
    title: "Urban Planner",
    category: "Government",
    description: "Develop comprehensive plans and programs for land use and growth of urban and rural communities.",
    salary: "₹5L - ₹20L per annum",
    entranceExams: ["GATE (AR/PL)", "CEPT Entrance"],
    colleges: ["SPA", "CEPT", "IIT Kharagpur", "JMI"],
    recruiters: ["Municipal Corporations", "Development Authorities", "Consulting Firms"]
  },
  {
    id: "6",
    title: "Financial Analyst",
    category: "Finance",
    description: "Analyze financial data and provide recommendations for business decisions and investment opportunities.",
    salary: "₹5L - ₹25L per annum",
    entranceExams: ["CFA", "FRM"],
    colleges: ["IIMs", "SRCC", "NMIMS", "FMS"],
    recruiters: ["Banks", "Investment Firms", "Corporate Finance Departments"]
  },
  {
    id: "7",
    title: "Healthcare Administrator",
    category: "Healthcare",
    description: "Manage healthcare facilities, systems and personnel to ensure efficient and quality service delivery.",
    salary: "₹6L - ₹30L per annum",
    entranceExams: ["NEET-PG", "PGDHM Entrance"],
    colleges: ["AIIMS", "TISS", "IIHMR", "NIHFW"],
    recruiters: ["Hospitals", "Clinics", "Healthcare Consulting Firms"]
  },
  {
    id: "8",
    title: "Digital Marketing Specialist",
    category: "Marketing",
    description: "Plan and execute online marketing strategies across various digital platforms to increase brand visibility and customer engagement.",
    salary: "₹4L - ₹20L per annum",
    entranceExams: [],
    colleges: ["MICA", "SIMC", "IIMC", "Digital Marketing Certificate Programs"],
    recruiters: ["Marketing Agencies", "E-commerce Companies", "Corporate Marketing Departments"]
  }
];

const PathCreatorPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { saveQuizResult } = useQuizResults();
  const [selectedStage, setSelectedStage] = useState<Stage>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendedCareers, setRecommendedCareers] = useState<Career[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [quizSummary, setQuizSummary] = useState<{
    strengths: string[];
    weaknesses: string[];
    recommendedPaths: string[];
    skills: SkillAssessment;
    personalityProfile: PersonalityProfile;
    nextSteps?: string[];
    emotionalGuidance?: string;
  } | null>(null);
  
  const [skillsData, setSkillsData] = useState<SkillAssessment>({} as SkillAssessment);
  const [careerMatchData, setCareerMatchData] = useState<Record<string, number>>({});
  const [topCareerMatch, setTopCareerMatch] = useState<string>("");
  const [isUsingML, setIsUsingML] = useState(false);
  
  // Set initial questions based on selected stage
  useEffect(() => {
    if (selectedStage) {
      const questionsForStage = getQuestionsForStage();
      console.log(`Loaded ${questionsForStage.length} questions for stage: ${selectedStage}`);
      setQuestions(questionsForStage);
      setCurrentQuestionIndex(0); // Reset index when loading new questions
    }
  }, [selectedStage]);
  
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
        return [...after10thQuestions];
      case 'after12th':
        return [...after12thQuestions];
      case 'afterGraduation':
        return [...afterGraduationQuestions];
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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleDynamicQuestionAdd = (newQuestion: Question) => {
    setQuestions(prev => [...prev, newQuestion]);
  };
  
  const handleQuizComplete = async () => {
    setIsAnalyzing(true);
    
    try {
      // Format questions and answers for analysis
      const questionAnswerPairs = Object.entries(answers).map(([qId, answer]) => {
        const question = questions.find(q => q.id === Number(qId));
        return {
          question: question?.question || "",
          answer
        };
      });
      
      // Use Perplexity AI to analyze responses
      const analysis = await analyzeQuizResponses(questionAnswerPairs, selectedStage || "unknown");
      
      // Apply ML enhancement to the AI analysis
      try {
        const enhancedCareerMatchScores = await enhanceCareerMatchScores(
          analysis.careerMatchScores, 
          selectedStage || "unknown",
          analysis.skillsAssessment
        );
        
        const enhancedSkills = await enhanceSkillsAssessment(
          analysis.skillsAssessment,
          selectedStage || "unknown"
        );
        
        // Update state with enhanced analysis results
        setSkillsData(enhancedSkills);
        setCareerMatchData(enhancedCareerMatchScores);
        setIsUsingML(true);
        
        // Find top career match from enhanced data
        const topMatch = Object.entries(enhancedCareerMatchScores)
          .sort(([, a], [, b]) => b - a)[0];
        if (topMatch) {
          setTopCareerMatch(topMatch[0]);
        }
        
        // Generate enhanced skills and strengths summary with education stage
        const summary = generateQuizSummary(answers, selectedStage);
        
        // Ensure the personalityProfile.type matches the expected union type
        let personalityType = analysis.personalityProfile?.type || "";
        
        // Map the string to one of the allowed values in PersonalityProfile
        let mappedType: "Creative" | "Analytical" | "Practical" | "Social" | "Enterprising" | "Conventional" | "Mixed" = "Mixed";
        
        if (personalityType.includes("Analytical") || personalityType.includes("logical") || 
            personalityType.includes("Problem-Solver")) {
          mappedType = "Analytical";
        } else if (personalityType.includes("Creative") || personalityType.includes("artistic")) {
          mappedType = "Creative";
        } else if (personalityType.includes("Practical") || personalityType.includes("Realistic")) {
          mappedType = "Practical";
        } else if (personalityType.includes("Social") || personalityType.includes("Helper")) {
          mappedType = "Social";
        } else if (personalityType.includes("Enterprising") || personalityType.includes("Leader")) {
          mappedType = "Enterprising";
        } else if (personalityType.includes("Conventional") || personalityType.includes("Organizer")) {
          mappedType = "Conventional";
        }
        
        // Create the enhanced summary with the properly typed personality profile
        const enhancedSummary = {
          strengths: analysis.strengths,
          weaknesses: analysis.weaknesses,
          recommendedPaths: analysis.recommendedPaths,
          skills: enhancedSkills, // Use the properly typed skills assessment
          personalityProfile: {
            type: mappedType,
            traits: analysis.personalityProfile?.traits || [],
            learningStyle: analysis.personalityProfile?.learningStyle || "",
            workEnvironmentPreference: analysis.personalityProfile?.workEnvironmentPreference || ""
          },
          nextSteps: summary.nextSteps,
          emotionalGuidance: summary.emotionalGuidance
        };
        
        setQuizSummary(enhancedSummary);
        
        // Get matched careers with scores based on user's answers and education stage
        let matchedCareers = getMatchedCareers(answers, allCareers, selectedStage);
        
        // If we have ML-enhanced career matches, update the matched careers with ML insights
        if (isUsingML) {
          // Adjust match scores based on ML-enhanced career match data
          matchedCareers = matchedCareers.map(career => ({
            ...career,
            matchScore: careerMatchData[career.title] || career.matchScore
          })).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        }
        
        // Ensure we always have at least 5 career matches
        if (matchedCareers.length < 5) {
          // Add more career options to reach minimum of 5
          const additionalCareers = allCareers
            .filter(c => !matchedCareers.some(mc => mc.id === c.id))
            .slice(0, 5 - matchedCareers.length)
            .map(career => ({
              ...career,
              matchScore: Math.floor(Math.random() * 10) + 20, // Random score between 20-30%
              matchReasons: [
                "This could be an alternative path based on your skills",
                "Consider exploring this field as it aligns with some of your preferences"
              ]
            }));
          
          // Combine and take top 5
          const combinedCareers = [...matchedCareers, ...additionalCareers];
          setRecommendedCareers(combinedCareers.slice(0, 5));
        } else {
          // Take top 5 matches
          setRecommendedCareers(matchedCareers.slice(0, 5));
        }
        
        // Save quiz results if user is logged in
        if (user) {
          saveQuizResult({
            educationStage: selectedStage || "unknown",
            strengths: analysis.strengths,
            weaknesses: analysis.weaknesses,
            recommendedPaths: analysis.recommendedPaths,
            skillsAssessment: enhancedSkills, // Use the properly typed skills assessment
            careerMatchScores: isUsingML ? careerMatchData : analysis.careerMatchScores,
            personalityProfile: {
              type: mappedType,
              traits: analysis.personalityProfile?.traits || [],
              learningStyle: analysis.personalityProfile?.learningStyle || "",
              workEnvironmentPreference: analysis.personalityProfile?.workEnvironmentPreference || ""
            }
          });
        }
        
        setQuizCompleted(true);
        
        let aiType = isUsingML ? "AI+ML-powered" : "AI-powered";
        toast({
          title: "Path Created! 🎉",
          description: `PathPilot ${aiType} analysis has prepared personalized career recommendations for you.`,
        });
      } catch (mlError) {
        console.error("Error enhancing with ML:", mlError);
        
        // Fallback to AI-only analysis
        setSkillsData(analysis.skillsAssessment as unknown as SkillAssessment);
        setCareerMatchData(analysis.careerMatchScores);
        
        // Find top career match from AI data
        const topMatch = Object.entries(analysis.careerMatchScores)
          .sort(([, a], [, b]) => b - a)[0];
        if (topMatch) {
          setTopCareerMatch(topMatch[0]);
        }
      }
    } catch (error) {
      console.error("Error analyzing quiz results:", error);
      
      // Fallback to the original logic if AI analysis fails
      const summary = generateQuizSummary(answers, selectedStage);
      setQuizSummary(summary);
      
      const matchedCareers = getMatchedCareers(answers, allCareers, selectedStage);
      setRecommendedCareers(matchedCareers.slice(0, 5));
      
      // Set default data for charts
      const defaultSkills: SkillAssessment = {
        analytical: 7, 
        creative: 5, 
        communication: 6, 
        technical: 8,
        leadership: 4,
        scientific: 6,
        entrepreneurial: 5,
        social: 7,
        critical_thinking: 8
      };
      
      setSkillsData(defaultSkills);
      
      setCareerMatchData({
        "Software Engineering": 75,
        "Data Science": 70,
        "UX Design": 60,
        "Business Analysis": 55,
        "Marketing": 40
      });
      
      // Save basic quiz results if user is logged in (even in error case)
      if (user) {
        saveQuizResult({
          educationStage: selectedStage || "unknown",
          strengths: summary.strengths,
          weaknesses: summary.weaknesses || ["Could benefit from more practical experience"],
          recommendedPaths: summary.recommendedPaths || ["Technology", "STEM fields"],
          skillsAssessment: defaultSkills,
          careerMatchScores: {
            "Software Engineering": 75,
            "Data Science": 70,
            "UX Design": 60,
            "Business Analysis": 55,
            "Marketing": 40
          }
        });
      }
      
      setQuizCompleted(true);
      
      toast({
        title: "Path Created!",
        description: "Your results have been prepared based on your responses.",
      });
    } finally {
      setIsAnalyzing(false);
    }
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
            <div className="py-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Create Your Education &amp; Career Path
                </h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Answer a series of personalized questions to discover your ideal education and career path. 
                  Our AI will adapt questions based on your responses to create a truly personalized experience.
                </p>
              </motion.div>
              <StageSelector onSelectStage={handleStageSelection} />
            </div>
          ) : !quizCompleted ? (
            <PathCreator 
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              onAnswerSelected={handleAnswerSelected}
              onNextQuestion={handleNextQuestion}
              onPrevQuestion={handlePrevQuestion}
              onComplete={handleQuizComplete}
              onDynamicQuestionAdd={handleDynamicQuestionAdd}
            />
          ) : (
            <div className="py-12">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Your Personalized Path Report
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Based on your unique responses, we've analyzed your strengths, interests, and 
                  potential career fits. Here's your personalized guidance.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                >
                  {/* Results Charts */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Your Results Visualization</h3>
                    <ResultCharts 
                      skillsData={skillsData} 
                      careerMatchData={careerMatchData} 
                    />
                  </div>
                </motion.div>
                
                {/* Career-specific mentor recommendations */}
                {topCareerMatch && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                  >
                    <RecommendedMentors careerCategory={topCareerMatch} />
                  </motion.div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                  >
                    {quizSummary && quizSummary.personalityProfile && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <User className="h-5 w-5 mr-2 text-pp-purple" />
                          Your Personality Profile
                        </h3>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <p className="font-medium text-purple-800 dark:text-purple-200">
                            {quizSummary.personalityProfile.type} Personality
                          </p>
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            <p className="mb-2"><span className="font-medium">Key Traits:</span> {quizSummary.personalityProfile.traits.join(", ")}</p>
                            <p className="mb-2"><span className="font-medium">Learning Style:</span> {quizSummary.personalityProfile.learningStyle}</p>
                            <p><span className="font-medium">Work Environment:</span> {quizSummary.personalityProfile.workEnvironmentPreference}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <StarHalf className="h-5 w-5 mr-2 text-pp-purple" />
                      Your Strengths
                    </h3>
                    {quizSummary && (
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
                    )}
                    
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                      Growth Areas
                    </h3>
                    {quizSummary && quizSummary.weaknesses && (
                      <ul className="space-y-2 mb-6">
                        {quizSummary.weaknesses.map((weakness, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0, transition: { delay: 0.5 + index * 0.1 } }}
                            className="flex items-center text-sm"
                          >
                            <div className="h-2 w-2 bg-amber-400 rounded-full mr-2"></div>
                            {weakness}
                          </motion.li>
                        ))}
                      </ul>
                    )}
                    
                    <h3 className="text-lg font-semibold mt-6 mb-4 flex items-center">
                      <Book className="h-5 w-5 mr-2 text-pp-purple" />
                      Recommended Career Paths
                    </h3>
                    {quizSummary && (
                      <ul className="space-y-2 mb-6">
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
                    )}
                    
                    {/* Emotional guidance section */}
                    {quizSummary && quizSummary.emotionalGuidance && (
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-medium text-blue-800 dark:text-blue-200 flex items-center mb-2">
                          <Heart className="h-4 w-4 mr-2" />
                          Personalized Guidance
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {quizSummary.emotionalGuidance}
                        </p>
                      </div>
                    )}
                    
                    {/* Next steps based on education stage */}
                    {quizSummary && quizSummary.nextSteps && (
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
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                  >
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-pp-purple" />
                      Top Career Matches
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
                          className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pp-purple dark:bg-pp-bright-purple text-white font-semibold text-sm mt-1">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <p className="font-medium text-sm md:text-base">{career.title}</p>
                                <span className="bg-pp-purple/10 text-pp-purple dark:bg-pp-purple/20 px-2 py-0.5 rounded text-xs font-medium">
                                  {career.matchScore}% Match
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{career.category}</p>
                              
                              <div className="flex items-center mt-1 mb-2">
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                  <div 
                                    className="bg-pp-bright-purple dark:bg-pp-saffron h-2 rounded-full"
                                    style={{ width: `${career.matchScore || 0}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              {/* Always include "Why this matches you:" after the 1st and 4th career */}
                              {(index === 0 || index === 3) && (
                                <div className="mt-2">
                                  <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Why this matches you:</p>
                                  <ul className="text-xs text-gray-500 dark:text-gray-400">
                                    {(career as any).matchReasons ? (career as any).matchReasons.map((reason: string, i: number) => (
                                      <li key={i} className="flex items-center mb-0.5">
                                        <Lightbulb className="h-3 w-3 mr-1 text-amber-500" />
                                        {reason}
                                      </li>
                                    )) : (
                                      <li className="flex items-center mb-0.5">
                                        <Lightbulb className="h-3 w-3 mr-1 text-amber-500" />
                                        Aligns with your skills and preferences
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <div className="mt-6">
                      <Button 
                        className="bg-pp-purple hover:bg-pp-bright-purple dark:bg-pp-saffron dark:hover:bg-amber-500 w-full flex items-center justify-center gap-2"
                        onClick={handleViewCareers}
                      >
                        <Compass className="h-4 w-4" />
                        Explore These Careers In Library
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedStage(null)}
                >
                  {t("createAnotherPath")}
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

export default PathCreatorPage;
