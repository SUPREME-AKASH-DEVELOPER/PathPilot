import { useState, useEffect } from "react";
import StageSelector from "@/components/quiz/StageSelector";
import QuizQuestion, { Question } from "@/components/quiz/QuizQuestion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
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

// Enhanced quiz questions with more detailed options and difficulty levels for 10th grade
const after10thQuestions: Question[] = [
  {
    id: 1,
    question: "Which subject areas do you enjoy the most?",
    question_hi: "आपको कौन से विषय क्षेत्र सबसे अधिक पसंद हैं?",
    options: [
      "Mathematics and Physics",
      "Biology and Chemistry",
      "Literature and Languages",
      "Computers and Information Technology"
    ],
    options_hi: [
      "गणित और भौतिकी",
      "जीव विज्ञान और रसायन विज्ञान",
      "साहित्य और भाषाएँ",
      "कंप्यूटर और सूचना प्रौद्योगिकी"
    ],
    category: "academic",
    difficulty: "beginner"
  },
  {
    id: 2,
    question: "What are your strongest skills?",
    question_hi: "आपके सबसे मजबूत कौशल क्या हैं?",
    options: [
      "Problem-solving and logical thinking",
      "Memory and observation",
      "Communication and expression",
      "Design and creativity"
    ],
    options_hi: [
      "समस्या-समाधान और तार्किक सोच",
      "स्मृति और अवलोकन",
      "संचार और अभिव्यक्ति",
      "डिज़ाइन और रचनात्मकता"
    ],
    category: "skills",
    difficulty: "beginner"
  },
  {
    id: 3,
    question: "How do you prefer to solve problems?",
    question_hi: "आप समस्याओं को हल करने के लिए किस तरीके को पसंद करते हैं?",
    options: [
      "By analyzing data and finding patterns",
      "By discussing with others to find solutions",
      "By reading and researching for answers",
      "By trying different approaches until something works"
    ],
    options_hi: [
      "डेटा का विश्लेषण करके और पैटर्न खोजकर",
      "समाधान खोजने के लिए दूसरों के साथ चर्चा करके",
      "उत्तरों के लिए पढ़ने और शोध करके",
      "अलग-अलग दृष्टिकोणों को आजमाकर जब तक कुछ काम न करे"
    ],
    category: "aptitude",
    difficulty: "intermediate"
  },
  {
    id: 4,
    question: "What type of career environment appeals to you most?",
    question_hi: "किस प्रकार का कैरियर वातावरण आपको सबसे अधिक आकर्षित करता है?",
    options: [
      "Corporate office with a stable schedule",
      "Creative studio with flexible hours",
      "Laboratory or research facility",
      "Working outdoors or in varied locations"
    ],
    options_hi: [
      "स्थिर कार्यक्रम के साथ कॉर्पोरेट कार्यालय",
      "लचीले घंटों के साथ रचनात्मक स्टूडियो",
      "प्रयोगशाला या अनुसंधान सुविधा",
      "बाहरी या विभिन्न स्थानों पर काम करना"
    ],
    category: "worklife",
    difficulty: "beginner"
  },
  {
    id: 5,
    question: "Which stream are you most interested in pursuing after 10th?",
    question_hi: "10वीं के बाद आप किस स्ट्रीम का अध्ययन करने में सबसे अधिक रुचि रखते हैं?",
    options: [
      "Science (PCM - Physics, Chemistry, Mathematics)",
      "Science (PCB - Physics, Chemistry, Biology)",
      "Commerce with or without Mathematics",
      "Arts/Humanities"
    ],
    options_hi: [
      "विज्ञान (PCM - भौतिकी, रसायन विज्ञान, गणित)",
      "विज्ञान (PCB - भौतिकी, रसायन विज्ञान, जीव विज्ञान)",
      "वाणिज्य (गणित के साथ या बिना)",
      "कला/मानविकी"
    ],
    category: "interest",
    difficulty: "intermediate"
  },
  {
    id: 6,
    question: "What skills do others often compliment you on?",
    question_hi: "दूसरे लोग अक्सर आपके किन कौशलों की प्रशंसा करते हैं?",
    options: [
      "Analytical thinking and problem-solving",
      "Creativity and artistic abilities",
      "Communication and interpersonal skills",
      "Organization and attention to detail"
    ],
    options_hi: [
      "विश्लेषणात्मक सोच और समस्या-समाधान",
      "रचनात्मकता और कलात्मक क्षमताएं",
      "संचार और पारस्परिक कौशल",
      "संगठन और विवरण पर ध्यान"
    ],
    category: "personality",
    difficulty: "beginner"
  },
  {
    id: 7,
    question: "Which career field are you most drawn to?",
    question_hi: "आप किस करियर क्षेत्र की ओर सबसे अधिक आकर्षित होते हैं?",
    options: [
      "Computer Science related fields",
      "Life Sciences related fields",
      "Commerce and Economics related fields",
      "Humanities and Arts related fields"
    ],
    options_hi: [
      "कंप्यूटर विज्ञान से संबंधित क्षेत्र",
      "जीवन विज्ञान से संबंधित क्षेत्र",
      "वाणिज्य और अर्थशास्त्र से संबंधित क्षेत्र",
      "मानविकी और कला से संबंधित क्षेत्र"
    ],
    category: "interest",
    weight: 1.5, // Higher weight as this directly relates to career interest
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "What type of work would you find most satisfying?",
    question_hi: "किस प्रकार का काम आपको सबसे अधिक संतुष्टिदायक लगता है?",
    options: [
      "Building and creating new things",
      "Helping and serving others",
      "Analyzing and solving complex problems",
      "Leading teams and projects"
    ],
    options_hi: [
      "नई चीजों का निर्माण और सृजन करना",
      "दूसरों की मदद करना और सेवा करना",
      "जटिल समस्याओं का विश्लेषण और समाधान करना",
      "टीमों और परियोजनाओं का नेतृत्व करना"
    ],
    category: "worktype",
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "How do you handle pressure and stress?",
    question_hi: "आप दबाव और तनाव से कैसे निपटते हैं?",
    options: [
      "I stay calm and methodical in high-pressure situations",
      "I seek support and collaborate to reduce stress",
      "I become more focused and efficient under pressure",
      "I prefer to avoid high-stress environments when possible"
    ],
    options_hi: [
      "मैं उच्च दबाव वाली स्थितियों में शांत और व्यवस्थित रहता हूं",
      "मैं तनाव कम करने के लिए सहायता लेता हूं और सहयोग करता हूं",
      "दबाव में मैं अधिक केंद्रित और कुशल हो जाता हूं",
      "मैं जब संभव हो तो अधिक तनाव वाले वातावरण से बचना पसंद करता हूं"
    ],
    category: "personality",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "Which of these activities would you most enjoy as a hobby?",
    question_hi: "इनमें से कौन सी गतिविधि आप शौक के रूप में सबसे अधिक पसंद करेंगे?",
    options: [
      "Building electronic gadgets or programming",
      "Reading about science discoveries and experiments",
      "Creating art, music, or writing stories",
      "Organizing events or leading community activities"
    ],
    options_hi: [
      "इलेक्ट्रॉनिक गैजेट्स बनाना या प्रोग्रामिंग करना",
      "विज्ञान की खोजों और प्रयोगों के बारे में पढ़ना",
      "कला, संगीत बनाना या कहानियां लिखना",
      "कार्यक्रमों का आयोजन या सामुदायिक गतिविधियों का नेतृत्व करना"
    ],
    category: "interest",
    difficulty: "beginner"
  },
  {
    id: 11,
    question: "In a group project, which role do you naturally take on?",
    question_hi: "एक समूह परियोजना में, आप स्वाभाविक रूप से कौन सी भूमिका निभाते हैं?",
    options: [
      "The planner who organizes tasks and schedules",
      "The creative who comes up with innovative ideas",
      "The problem solver who figures out challenges",
      "The communicator who facilitates discussions"
    ],
    options_hi: [
      "योजनाकार जो कार्यों और समय-सारिणी को व्यवस्थित करता है",
      "रचनात्मक व्यक्ति जो नवीन विचार लाता है",
      "समस्या समाधानकर्ता जो चुनौतियों का समाधान निकालता है",
      "संचारक जो चर्चाओं को सुविधाजनक बनाता है"
    ],
    category: "teamwork",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "How important is salary vs. work satisfaction in your future career?",
    question_hi: "आपके भविष्य के करियर में वेतन बनाम कार्य संतोष कितनी महत्वपूर्ण है?",
    options: [
      "Salary is more important than day-to-day satisfaction",
      "Work satisfaction is more important than salary",
      "Both are equally important to me",
      "I care more about work-life balance than either"
    ],
    options_hi: [
      "दैनिक संतोष की तुलना में वेतन अधिक महत्वपूर्ण है",
      "वेतन की तुलना में कार्य संतोष अधिक महत्वपूर्ण है",
      "दोनों मेरे लिए समान रूप से महत्वपूर्ण हैं",
      "मैं दोनों की तुलना में कार्य-जीवन संतुलन के बारे में अधिक चिंतित हूं"
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
    question_hi: "आपकी 12वीं की स्ट्रीम के आधार पर, कौन सा क्षेत्र आपको सबसे अधिक रुचिकर लगता है?",
    options: [
      "Engineering and Technology",
      "Medical Sciences and Healthcare",
      "Business, Commerce, and Management",
      "Arts, Humanities, and Social Sciences"
    ],
    options_hi: [
      "इंजीनियरिंग और प्रौद्योगिकी",
      "चिकित्सा विज्ञान और स्वास्थ्य देखभाल",
      "व्यापार, वाणिज्य और प्रबंधन",
      "कला, मानविकी और सामाजिक विज्ञान"
    ],
    category: "academic",
    weight: 1.5, // Higher weight as this is a key decision point
    difficulty: "intermediate"
  },
  {
    id: 2,
    question: "What's your preferred work setting?",
    question_hi: "आपका पसंदीदा कार्य वातावरण क्या है?",
    options: [
      "Research and Development",
      "Customer-facing roles",
      "Creative and design environment",
      "Administrative and organizational roles"
    ],
    options_hi: [
      "अनुसंधान और विकास",
      "ग्राहक-सामना करने वाली भूमिकाएँ",
      "रचनात्मक और डिज़ाइन वातावरण",
      "प्रशासनिक और संगठनात्मक भूमिकाएँ"
    ],
    category: "worklife",
    difficulty: "beginner"
  },
  {
    id: 3,
    question: "How do you approach learning new skills?",
    question_hi: "आप नए कौशल सीखने के लिए किस दृष्टिकोण का उपयोग करते हैं?",
    options: [
      "Structured academic courses and degrees",
      "Hands-on experience and practical learning",
      "Self-study through books and online resources",
      "Mentorship and guided learning"
    ],
    options_hi: [
      "संरचित शैक्षणिक पाठ्यक्रम और डिग्री",
      "व्यावहारिक अनुभव और व्यावहारिक शिक्षा",
      "पुस्तकों और ऑनलाइन संसाधनों के माध्यम से आत्म-अध्ययन",
      "मेंटॉरशिप और मार्गदर्शित शिक्षा"
    ],
    category: "learning",
    difficulty: "intermediate"
  },
  {
    id: 4,
    question: "What aspect of a career is most important to you?",
    question_hi: "आपके लिए करियर का कौन सा पहलू सबसे महत्वपूर्ण है?",
    options: [
      "Financial stability and growth",
      "Job satisfaction and passion",
      "Work-life balance",
      "Social impact and contribution"
    ],
    options_hi: [
      "वित्तीय स्थिरता और विकास",
      "नौकरी की संतोषजनकता और जुनून",
      "कार्य-जीवन संतुलन",
      "सामाजिक प्रभाव और योगदान"
    ],
    category: "values",
    difficulty: "intermediate"
  },
  {
    id: 5,
    question: "How do you handle challenges?",
    question_hi: "आप चुनौतियों का सामना कैसे करते हैं?",
    options: [
      "Analyze them methodically and find logical solutions",
      "Seek advice from experts or mentors",
      "Use creative approaches and think outside the box",
      "Collaborate with others to find the best solution"
    ],
    options_hi: [
      "उन्हें विधिपूर्वक विश्लेषण करें और तार्किक समाधान खोजें",
      "विशेषज्ञों या मेंटर्स से सलाह लें",
      "रचनात्मक दृष्टिकोण अपनाएं और पारंपरिक सोच से बाहर सोचें",
      "सर्वश्रेष्ठ समाधान खोजने के लिए दूसरों के साथ सहयोग करें"
    ],
    category: "personality",
    difficulty: "intermediate"
  },
  {
    id: 6,
    question: "Which skills would you like to develop further?",
    question_hi: "आप किन कौशलों को और विकसित करना चाहेंगे?",
    options: [
      "Technical and specialized knowledge",
      "Leadership and management abilities",
      "Creative and innovative thinking",
      "Communication and interpersonal skills"
    ],
    options_hi: [
      "तकनीकी और विशेष ज्ञान",
      "नेतृत्व और प्रबंधन क्षमताएं",
      "रचनात्मक और नवोन्मेषी सोच",
      "संचार और पारस्परिक कौशल"
    ],
    category: "development",
    difficulty: "intermediate"
  },
  {
    id: 7,
    question: "What type of educational path are you considering?",
    question_hi: "आप किस प्रकार की शैक्षणिक पथ पर विचार कर रहे हैं?",
    options: [
      "Traditional university degree (Bachelor's)",
      "Professional certification or diploma",
      "Vocational training or skill-based programs",
      "Online courses and self-learning"
    ],
    options_hi: [
      "पारंपरिक विश्वविद्यालय की डिग्री (स्नातक)",
      "व्यावसायिक प्रमाणन या डिप्लोमा",
      "व्यावसायिक प्रशिक्षण या कौशल-आधारित कार्यक्रम",
      "ऑनलाइन पाठ्यक्रम और आत्म-शिक्षण"
    ],
    category: "education",
    difficulty: "beginner"
  },
  {
    id: 8,
    question: "Which broad career category aligns with your strengths?",
    question_hi: "आपकी ताकतों के साथ कौन सी व्यापक करियर श्रेणी मेल खाती है?",
    options: [
      "STEM (Science, Technology, Engineering, Math)",
      "Healthcare and Life Sciences",
      "Business and Finance",
      "Creative Arts and Communication"
    ],
    options_hi: [
      "STEM (विज्ञान, प्रौद्योगिकी, इंजीनियरिंग, गणित)",
      "स्वास्थ्य देखभाल और जीवन विज्ञान",
      "व्यापार और वित्त",
      "रचनात्मक कला और संचार"
    ],
    category: "alignment",
    weight: 1.3,
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "What kind of projects do you enjoy working on the most?",
    question_hi: "आप किस प्रकार की परियोजनाओं पर काम करना सबसे अधिक पसंद करते हैं?",
    options: [
      "Complex technical problems requiring deep analysis",
      "People-focused initiatives involving human interaction",
      "Data-driven projects with measurable outcomes",
      "Creative projects with design or artistic elements"
    ],
    options_hi: [
      "गहन विश्लेषण की आवश्यकता वाले जटिल तकनीकी समस्याएं",
      "मानव इंटरैक्शन शामिल करने वाली लोगों-केंद्रित पहलों",
      "मापने योग्य परिणामों के साथ डेटा-आधारित परियोजनाएं",
      "डिज़ाइन या कलात्मक तत्वों के साथ रचनात्मक परियोजनाएं"
    ],
    category: "worktype",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "How do you feel about taking risks in your career path?",
    question_hi: "आप अपने करियर पथ में जोखिम लेने के बारे में कैसा महसूस करते हैं?",
    options: [
      "I prefer stable, predictable career paths with clear advancement",
      "I'm comfortable with calculated risks for greater rewards",
      "I actively seek innovative paths, even with uncertainty",
      "I balance security with occasional, well-researched risks"
    ],
    options_hi: [
      "मैं स्पष्ट उन्नति के साथ स्थिर, पूर्वानुमानित करियर पथ पसंद करता हूं",
      "मैं अधिक पुरस्कार के लिए गणना किए गए जोखिमों के साथ सहज हूं",
      "मैं नवोन्मेषी पथों की सक्रिय रूप से तलाश करता हूं, भले ही अनिश्चितता हो",
      "मैं सुरक्षा को कभी-कभी, अच्छी तरह से शोध किए गए जोखिमों के साथ संतुलित करता हूं"
    ],
    category: "personality",
    difficulty: "advanced"
  },
  {
    id: 11,
    question: "When learning something new, what approach works best for you?",
    question_hi: "कुछ नया सीखते समय, आपके लिए कौन सा दृष्टिकोण सबसे अच्छा काम करता है?",
    options: [
      "Theoretical understanding before practical application",
      "Learning by doing and hands-on experimentation",
      "Watching demonstrations and following examples",
      "Discussion and questioning to develop understanding"
    ],
    options_hi: [
      "व्यावहारिक अनुप्रयोग से पहले सैद्धांतिक समझ",
      "करते हुए सीखना और व्यावहारिक प्रयोग",
      "प्रदर्शनों को देखना और उदाहरणों का पालन करना",
      "समझ विकसित करने के लिए चर्चा और प्रश्न पूछना"
    ],
    category: "learning",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "Which emerging technology field interests you the most?",
    question_hi: "आपको कौन सा उभरता हुआ प्रौद्योगिकी क्षेत्र सबसे अधिक रुचिकर लगता है?",
    options: [
      "Artificial Intelligence and Machine Learning",
      "Sustainable Technology and Renewable Energy",
      "Biotechnology and Genetic Engineering",
      "Digital Media and Virtual Reality"
    ],
    options_hi: [
      "कृत्रिम बुद्धिमत्ता और मशीन लर्निंग",
      "सतत प्रौद्योगिकी और नवीकरणीय ऊर्जा",
      "जैव प्रौद्योगिकी और आनुवंशिक इंजीनियरिंग",
      "डिजिटल मीडिया और आभासी वास्तविकता"
    ],
    category: "interest",
    difficulty: "advanced"
  },
  {
    id: 13,
    question: "In what kind of environment do you perform better?",
    question_hi: "आप किस प्रकार के वातावरण में बेहतर प्रदर्शन करते हैं?",
    options: [
      "Competitive environments that push me to excel",
      "Collaborative environments with shared goals",
      "Independent settings where I can self-direct",
      "Structured environments with clear expectations"
    ],
    options_hi: [
      "प्रतिस्पर्धात्मक वातावरण जो मुझे उत्कृष्टता की ओर धकेलता है",
      "साझा लक्ष्यों के साथ सहयोगात्मक वातावरण",
      "स्वतंत्र सेटिंग्स जहां मैं आत्म-निर्देशित हो सकता हूं",
      "स्पष्ट अपेक्षाओं के साथ संरचित वातावरण"
    ],
    category: "worklife",
    difficulty: "intermediate"
  },
  {
    id: 14,
    question: "What is your approach to long-term career planning?",
    question_hi: "आपकी दीर्घकालिक करियर योजना के लिए क्या दृष्टिकोण है?",
    options: [
      "I have a detailed 5-10 year plan with specific milestones",
      "I focus on building versatile skills for multiple opportunities",
      "I prioritize immediate growth and reassess periodically",
      "I follow my passions and let them guide my career path"
    ],
    options_hi: [
      "मेरे पास विशिष्ट मील के पत्थर के साथ एक विस्तृत 5-10 वर्ष की योजना है",
      "मैं कई अवसरों के लिए बहुपरकारी कौशल विकसित करने पर ध्यान केंद्रित करता हूं",
      "मैं तात्कालिक विकास को प्राथमिकता देता हूं और समय-समय पर पुनः मूल्यांकन करता हूं",
      "मैं अपने जुनून का पालन करता हूं और उन्हें मेरे करियर पथ का मार्गदर्शन करने देता हूं"
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
    question_hi: "आपके स्नातक विशेषज्ञता के आधार पर, कौन सा करियर पथ आपको आकर्षित करता है?",
    options: [
      "Advanced specialization through higher studies",
      "Entry-level job in your field",
      "Entrepreneurship or startup",
      "Competitive exams for government services"
    ],
    options_hi: [
      "उच्च अध्ययन के माध्यम से उन्नत विशेषज्ञता",
      "अपने क्षेत्र में प्रवेश स्तर की नौकरी",
      "उद्यमिता या स्टार्टअप",
      "सरकारी सेवाओं के लिए प्रतिस्पर्धी परीक्षाएं"
    ],
    category: "academic",
    difficulty: "intermediate"
  },
  {
    id: 2,
    question: "What kind of role would you excel in?",
    question_hi: "आप किस प्रकार की भूमिका में उत्कृष्टता प्राप्त करेंगे?",
    options: [
      "Technical specialist role",
      "Management and leadership",
      "Research and development",
      "Client-facing or service role"
    ],
    options_hi: [
      "तकनीकी विशेषज्ञ की भूमिका",
      "प्रबंधन और नेतृत्व",
      "अनुसंधान और विकास",
      "ग्राहक-सामना करने वाली या सेवा की भूमिका"
    ],
    category: "worklife",
    difficulty: "intermediate"
  },
  {
    id: 3,
    question: "How important is continuous learning to you?",
    question_hi: "आपके लिए निरंतर सीखना कितना महत्वपूर्ण है?",
    options: [
      "Very important - I want to always be developing new skills",
      "Important for career advancement only",
      "I prefer mastering one specific skill set deeply",
      "I value experience over formal learning"
    ],
    options_hi: [
      "बहुत महत्वपूर्ण - मैं हमेशा नए कौशल विकसित करना चाहता हूं",
      "केवल करियर उन्नति के लिए महत्वपूर्ण",
      "मैं एक विशिष्ट कौशल सेट में गहराई से महारत हासिल करना पसंद करता हूं",
      "मैं औपचारिक शिक्षा की तुलना में अनुभव को अधिक महत्व देता हूं"
    ],
    category: "aptitude",
    difficulty: "intermediate"
  },
  {
    id: 4,
    question: "Where do you see yourself in 5 years?",
    question_hi: "आप 5 वर्षों में खुद को कहाँ देखते हैं?",
    options: [
      "In a senior role in a large organization",
      "Running my own business or startup",
      "Completing advanced education (PhD, etc.)",
      "Working in a specialized niche in my field"
    ],
    options_hi: [
      "एक बड़े संगठन में वरिष्ठ भूमिका में",
      "अपना खुद का व्यवसाय या स्टार्टअप चलाना",
      "उन्नत शिक्षा (पीएचडी, आदि) पूरी करना",
      "अपने क्षेत्र में एक विशेषीकृत निचे में काम करना"
    ],
    category: "interest",
    difficulty: "advanced"
  },
  {
    id: 5,
    question: "How do you make important decisions?",
    question_hi: "आप महत्वपूर्ण निर्णय कैसे लेते हैं?",
    options: [
      "Based on data and logical analysis",
      "Considering future prospects and opportunities",
      "Following my passion and interests",
      "Balancing multiple factors including practical concerns"
    ],
    options_hi: [
      "डेटा और तार्किक विश्लेषण के आधार पर",
      "भविष्य की संभावनाओं और अवसरों पर विचार करते हुए",
      "अपने जुनून और रुचियों का पालन करते हुए",
      "व्यावहारिक चिंताओं सहित कई कारकों का संतुलन बनाते हुए"
    ],
    category: "personality",
    difficulty: "intermediate"
  },
  {
    id: 6,
    question: "Which industry trends are you most interested in following?",
    question_hi: "आप किन उद्योग प्रवृत्तियों का पालन करने में सबसे अधिक रुचि रखते हैं?",
    options: [
      "Digital transformation and technology integration",
      "Sustainable practices and environmental initiatives",
      "Global market expansion and international opportunities",
      "Workplace culture and employee experience innovations"
    ],
    options_hi: [
      "डिजिटल परिवर्तन और प्रौद्योगिकी एकीकरण",
      "सतत प्रथाएं और पर्यावरणीय पहलों",
      "वैश्विक बाजार का विस्तार और अंतरराष्ट्रीय अवसर",
      "कार्यस्थल संस्कृति और कर्मचारी अनुभव नवाचार"
    ],
    category: "interest",
    difficulty: "advanced"
  },
  {
    id: 7,
    question: "What is your approach to professional networking?",
    question_hi: "आपका पेशेवर नेटवर्किंग के प्रति क्या दृष्टिकोण है?",
    options: [
      "I actively build and maintain a large professional network",
      "I focus on a smaller, high-quality network of key connections",
      "I network primarily online through professional platforms",
      "I prefer to let my work speak for itself rather than networking"
    ],
    options_hi: [
      "मैं सक्रिय रूप से एक बड़ा पेशेवर नेटवर्क बनाता और बनाए रखता हूं",
      "मैं प्रमुख संबंधों के एक छोटे, उच्च-गुणवत्ता वाले नेटवर्क पर ध्यान केंद्रित करता हूं",
      "मैं मुख्य रूप से पेशेवर प्लेटफार्मों के माध्यम से नेटवर्किंग करता हूं",
      "मैं अपने काम को खुद बोलने देना पसंद करता हूं बजाय नेटवर्किंग के"
    ],
    category: "development",
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "How do you feel about relocating for career opportunities?",
    question_hi: "आप करियर के अवसरों के लिए स्थानांतरित होने के बारे में कैसा महसूस करते हैं?",
    options: [
      "I'm willing to relocate anywhere for the right opportunity",
      "I prefer to stay in my current region but would consider moving",
      "I'll only relocate for exceptional opportunities",
      "I strongly prefer not to relocate and look for local opportunities"
    ],
    options_hi: [
      "मैं सही अवसर के लिए कहीं भी स्थानांतरित होने के लिए तैयार हूं",
      "मैं अपने वर्तमान क्षेत्र में रहना पसंद करता हूं लेकिन स्थानांतरित होने पर विचार करूंगा",
      "मैं केवल असाधारण अवसरों के लिए स्थानांतरित होऊंगा",
      "मैं स्थानांतरित नहीं होना पसंद करता और स्थानीय अवसरों की तलाश करता हूं"
    ],
    category: "mobility",
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "What role does salary play in your job decisions?",
    question_hi: "आपके नौकरी के निर्णयों में वेतन की क्या भूमिका है?",
    options: [
      "It's the primary factor in evaluating opportunities",
      "It's important but secondary to growth potential",
      "I prioritize work environment over compensation",
      "I seek a balance of fair compensation and meaningful work"
    ],
    options_hi: [
      "यह अवसरों का मूल्यांकन करने में प्राथमिक कारक है",
      "यह महत्वपूर्ण है लेकिन विकास की संभावनाओं के मुकाबले द्वितीयक है",
      "मैं मुआवजे की तुलना में कार्य वातावरण को प्राथमिकता देता हूं",
      "मैं उचित मुआवजे और अर्थपूर्ण काम के बीच संतुलन की तलाश करता हूं"
    ],
    category: "values",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "Which specialized career path within your field interests you most?",
    question_hi: "आपके क्षेत्र में कौन सा विशेषीकृत करियर पथ आपको सबसे अधिक रुचिकर लगता है?",
    options: [
      "Research and development of new innovations",
      "Strategy and high-level planning",
      "Specialized technical implementation",
      "Training, teaching or mentoring others"
    ],
    options_hi: [
      "नई नवाचारों का अनुसंधान और विकास",
      "रणनीति और उच्च-स्तरीय योजना",
      "विशेषीकृत तकनीकी कार्यान्वयन",
      "अन्य लोगों को प्रशिक्षण, शिक्षण या मार्गदर्शन करना"
    ],
    category: "specialization",
    difficulty: "advanced"
  },
  {
    id: 11,
    question: "In the changing job market, how do you approach job security?",
    question_hi: "बदलते नौकरी के बाजार में, आप नौकरी की सुरक्षा के प्रति क्या दृष्टिकोण रखते हैं?",
    options: [
      "I focus on developing in-demand, transferable skills",
      "I prefer to work for established organizations with stability",
      "I diversify my income sources and professional activities",
      "I prioritize building a strong professional reputation"
    ],
    options_hi: [
      "मैं मांग में, स्थानांतरित करने योग्य कौशल विकसित करने पर ध्यान केंद्रित करता हूं",
      "मैं स्थिरता के साथ स्थापित संगठनों में काम करना पसंद करता हूं",
      "मैं अपनी आय के स्रोतों और पेशेवर गतिविधियों को विविधता देता हूं",
      "मैं एक मजबूत पेशेवर प्रतिष्ठा बनाने को प्राथमिकता देता हूं"
    ],
    category: "planning",
    difficulty: "advanced"
  },
  {
    id: 12,
    question: "How do you handle workplace conflicts or disagreements?",
    question_hi: "आप कार्यस्थल पर संघर्षों या असहमति को कैसे संभालते हैं?",
    options: [
      "I address issues directly with clear communication",
      "I seek compromise and common ground",
      "I involve a mediator or manager when necessary",
      "I try to understand all perspectives before responding"
    ],
    options_hi: [
      "मैं स्पष्ट संचार के साथ सीधे मुद्दों को संबोधित करता हूं",
      "मैं समझौता और सामान्य आधार खोजता हूं",
      "जब आवश्यक हो, मैं एक मध्यस्थ या प्रबंधक को शामिल करता हूं",
      "मैं प्रतिक्रिया देने से पहले सभी दृष्टिकोणों को समझने की कोशिश करता हूं"
    ],
    category: "interpersonal",
    difficulty: "advanced"
  },
  {
    id: 13,
    question: "What management style do you prefer to work under?",
    question_hi: "आप किस प्रबंधन शैली के तहत काम करना पसंद करते हैं?",
    options: [
      "Hands-off leadership that provides autonomy",
      "Mentorship-focused with guidance and development",
      "Goal-oriented with clear metrics and expectations",
      "Collaborative leadership that values team input"
    ],
    options_hi: [
      "स्वायत्तता प्रदान करने वाली हैंड्स-ऑफ नेतृत्व",
      "मार्गदर्शन और विकास के साथ मेंटॉरशिप-केंद्रित",
      "स्पष्ट मैट्रिक्स और अपेक्षाओं के साथ लक्ष्य-उन्मुख",
      "सहयोगात्मक नेतृत्व जो टीम के इनपुट को महत्व देता है"
    ],
    category: "worklife",
    difficulty: "intermediate"
  },
  {
    id: 14,
    question: "How do you approach work-life balance?",
    question_hi: "आप कार्य-जीवन संतुलन के प्रति क्या दृष्टिकोण रखते हैं?",
    options: [
      "I'm willing to prioritize work during important career stages",
      "I maintain strict boundaries between work and personal life",
      "I seek flexible arrangements that accommodate both",
      "I integrate work and life in a way that feels authentic"
    ],
    options_hi: [
      "मैं महत्वपूर्ण करियर चरणों के दौरान काम को प्राथमिकता देने के लिए तैयार हूं",
      "मैं काम और व्यक्तिगत जीवन के बीच सख्त सीमाएं बनाए रखता हूं",
      "मैं दोनों को समायोजित करने के लिए लचीले व्यवस्थाओं की तलाश करता हूं",
      "मैं काम और जीवन को एक ऐसे तरीके से एकीकृत करता हूं जो प्रामाणिक लगता है"
    ],
    category: "values",
    difficulty: "advanced"
  },
    {
    id: 15,
    question: "Which aspect of professional development do you most value?",
    question_hi: "आप पेशेवर विकास के किस पहलू को सबसे अधिक महत्व देते हैं?",
    options: [
      "Gaining specialized expertise in a niche area",
      "Developing broad, versatile skill sets across domains",
      "Building leadership and people management capabilities",
      "Enhancing creative problem-solving abilities"
    ],
    options_hi: [
      "एक विशेष क्षेत्र में विशेष विशेषज्ञता प्राप्त करना",
      "विभिन्न क्षेत्रों में व्यापक, बहुपरकारी कौशल सेट विकसित करना",
      "नेतृत्व और लोगों के प्रबंधन की क्षमताओं का निर्माण करना",
      "रचनात्मक समस्या-समाधान क्षमताओं को बढ़ाना"
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

const QuizPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState<Stage>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendedCareers, setRecommendedCareers] = useState<Career[]>([]);
  const [quizSummary, setQuizSummary] = useState<{
    strengths: string[];
    weaknesses: string[];
    recommendedPaths: string[];
    skills: SkillAssessment;
    personalityProfile: PersonalityProfile;
    nextSteps?: string[];
    emotionalGuidance?: string;
  } | null>(null);
  
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
        return after10thQuestions;
      case 'after12th':
        return after12thQuestions;
      case 'afterGraduation':
        return afterGraduationQuestions;
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
    const questions = getQuestionsForStage();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleQuizComplete = () => {
    // Generate enhanced skills and strengths summary with education stage
    const summary = generateQuizSummary(answers, selectedStage);
    setQuizSummary(summary);
    
    // Get matched careers with scores based on user's answers and education stage
    const matchedCareers = getMatchedCareers(answers, allCareers, selectedStage);
    
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
    
    setQuizCompleted(true);
    
    toast({
      title: "Quiz completed! 🎉",
      description: "PathPilot AI has analyzed your responses and prepared personalized career recommendations.",
    });
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
            <StageSelector onSelectStage={handleStageSelection} />
          ) : !quizCompleted ? (
            <QuizQuestion 
              questions={getQuestionsForStage()}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              onAnswerSelected={handleAnswerSelected}
              onNextQuestion={handleNextQuestion}
              onPrevQuestion={handlePrevQuestion}
              onComplete={handleQuizComplete}
            />
          ) : (
            <div className="py-12">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Your PathPilot AI Career Report
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Based on your unique responses, we've analyzed your strengths, interests, and 
                  potential career fits. Here's your personalized guidance.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                  
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
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
              
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedStage(null)}
                >
                  {t("takeAnotherQuiz")}
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

export default QuizPage;
