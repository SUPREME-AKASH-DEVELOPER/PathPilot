import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

type Language = 'english' | 'hindi';

// This would typically come from a translation file or API
export const translations = {
  english: {
    // Navigation
    "home": "Home",
    "quiz": "Quiz",
    "careers": "Careers",
    "library": "Library",
    "mentors": "Mentors",
    "getStarted": "Get Started",
    
    // Actions
    "search": "Search",
    "filter": "Filter",
    "save": "Save",
    "details": "Details",
    "shareProfile": "Share Profile",
    "viewDetails": "View Details",
    "bookSession": "Book Session",
    "contactMentor": "Contact Mentor",
    "exploreMore": "Explore More",
    "startOver": "Start Over",
    "submit": "Submit",
    "previous": "Previous",
    "next": "Next",
    
    // Quiz page
    "selectStage": "Select Your Current Educational Stage",
    "after10th": "After 10th Standard",
    "after12th": "After 12th Standard",
    "afterGraduation": "After Graduation",
    "chooseStageDescription": "We'll customize the career recommendations based on your current stage",
    "question": "Question",
    "of": "of",
    "quizCompleted": "Quiz completed!",
    "personalizedRecommendations": "Your personalized career recommendations are ready.",
    "thankYouQuiz": "Thank you for completing the quiz!",
    "basedOnResponses": "Based on your responses, here are some recommended paths:",
    "yourRecommendations": "Your Recommendations",
    "exploreCareersLibrary": "Explore Careers in Library",
    "takeAnotherQuiz": "Take Another Quiz",
    
    // Home page
    "navigateWithClarity": "Navigate Your Path With Clarity & Confidence",
    "helpingEveryIndian": "Helping every Indian student make informed career choices through personalized guidance, expert mentorship, and data-driven insights.",
    "takeCareerQuiz": "Take Career Quiz",
    "exploreCareers": "Explore Careers",
    "navigateYourFuture": "Navigate Your Future With Our Features",
    "comprehensiveTools": "Comprehensive tools and resources designed specifically for Indian students",
    "personalizedQuizEngine": "Personalized Quiz Engine",
    "quizDescription": "Take our interactive quiz to discover career paths aligned with your personality, interests, and strengths.",
    "aiCareerRecommendations": "AI Career Recommendations",
    "aiDescription": "Get AI-powered career suggestions personalized to your unique profile and educational stage.",
    "careerLibrary": "Career Library",
    "libraryDescription": "Explore 100+ India-specific careers with details on exams, colleges, and salary expectations.",
    "mentorConnect": "Mentor Connect",
    "mentorDescription": "Connect with verified mentors across various domains for guidance and insights.",
    "parentZone": "Parent Zone",
    "parentZoneDescription": "Bilingual resources to help parents understand modern career paths and support their children.",
    "trendsAndInsights": "Trends & Insights",
    "trendsDescription": "Stay updated with the latest career trends and job market insights for informed decision-making.",
    "makingDifference": "Making a Difference Across India",
    "studentsGuided": "Students Guided",
    "careerPaths": "Career Paths",
    "satisfactionRate": "Satisfaction Rate",
    "expertMentors": "Expert Mentors",
    "readyToDiscover": "Ready to Discover Your Perfect Career Path?",
    "takePersonalizedQuiz": "Take our personalized quiz and get AI-powered recommendations tailored specifically for you.",
    "startYourCareerQuiz": "Start Your Career Quiz",
    "browseCareerLibrary": "Browse Career Library",
    "parentZoneTitle": "Parent Zone",
    "parentZoneExplainer": "We understand that career decisions are a family affair in India. Our Parent Zone provides resources in both English and Hindi to help parents understand modern career options and support their children's choices.",
    "bilingualGuides": "Bilingual career guides (Hindi/English)",
    "explainerVideos": "Explainer videos on modern careers",
    "commonQuestions": "Addressing common questions & concerns",
    "supportJourney": "How to support your child's career journey",
    "visitParentZone": "Visit Parent Zone",
    "newCareerInfo": "Modern Career Information",
    "learnMore": "Learn More",
    "hindiCareerInfo": "In today's digital age, many new career options are available for children. We provide information about these options in simple language.",
    "whatIsUiUx": "What is UI/UX Design?",
    "uiUxDescription": "UI/UX Design is a field where creativity and technology come together. Designers make websites and apps user-friendly and attractive.",
    
    // Career Library
    "careerLibraryTitle": "Career Library",
    "exploreCareerPaths": "Explore Career Paths",
    "discoverOpportunities": "Discover opportunities across various domains",
    "filterBy": "Filter By",
    "domain": "Domain",
    "qualification": "Qualification",
    "salary": "Salary Range",
    "growth": "Growth Potential",
    "applyFilters": "Apply Filters",
    "resetFilters": "Reset",
    "searchCareers": "Search careers...",
    "noResults": "No results found",
    "tryAdjusting": "Try adjusting your search or filters",
    "avgSalary": "Avg. Salary",
    "reqQualification": "Req. Qualification",
    "viewAllDetails": "View All Details",
    
    // Mentors
    "mentorsPageTitle": "Connect with Mentors",
    "findGuidance": "Find guidance from professionals across various fields",
    "filterMentors": "Filter Mentors",
    "experience": "Experience",
    "industry": "Industry",
    "expertise": "Expertise",
    "availability": "Availability",
    "searchMentors": "Search mentors...",
    "yearsExp": "Years Experience",
    "sessions": "Sessions",
    "rating": "Rating",
    
    // Other common UI elements
    "quickLinks": "Quick Links",
    "resources": "Resources",
    "contactUs": "Contact Us",
    "aboutUs": "About Us",
    "careerQuizFooter": "Career Quiz",
    "careerLibraryFooter": "Career Library",
    "findMentors": "Find Mentors",
    "parentZoneFooter": "Parent Zone",
    "blog": "Blog",
    "faqs": "FAQs",
    "successStories": "Success Stories",
    "trends": "Trends & Insights",
    "languageChanged": "Language Changed",
    "languageChangedDesc": "The website language is now set to English."
  },
  hindi: {
    // Navigation
    "home": "होम",
    "quiz": "प्रश्नोत्तरी",
    "careers": "करियर",
    "library": "पुस्तकालय",
    "mentors": "सलाहकार",
    "getStarted": "शुरू करें",
    
    // Actions
    "search": "खोज",
    "filter": "फ़िल्टर",
    "save": "सहेजें",
    "details": "विवरण",
    "shareProfile": "प्रोफ़ाइल साझा करें",
    "viewDetails": "विवरण देखें",
    "bookSession": "सत्र बुक करें",
    "contactMentor": "सलाहकार से संपर्क करें",
    "exploreMore": "और एक्सप्लोर करें",
    "startOver": "फिर से शुरू करें",
    "submit": "जमा करें",
    "previous": "पिछला",
    "next": "अगला",
    
    // Quiz page
    "selectStage": "अपना वर्तमान शैक्षिक स्तर चुनें",
    "after10th": "10वीं के बाद",
    "after12th": "12वीं के बाद",
    "afterGraduation": "स्नातक के बाद",
    "chooseStageDescription": "हम आपके वर्तमान स्तर के आधार पर करियर की सिफारिशें अनुकूलित करेंगे",
    "question": "प्रश्न",
    "of": "का",
    "quizCompleted": "प्रश्नोत्तरी पूरी हुई!",
    "personalizedRecommendations": "आपकी व्यक्तिगत करियर सिफारिशें तैयार हैं।",
    "thankYouQuiz": "प्रश्नोत्तरी पूरी करने के लिए धन्यवाद!",
    "basedOnResponses": "आपके जवाबों के आधार पर, यहां कुछ अनुशंसित मार्ग हैं:",
    "yourRecommendations": "आपकी अनुशंसाएँ",
    "exploreCareersLibrary": "पुस्तकालय में करियर का अन्वेषण करें",
    "takeAnotherQuiz": "एक और प्रश्नोत्तरी लें",
    
    // Home page
    "navigateWithClarity": "स्पष्टता और आत्मविश्वास के साथ अपना रास्ता नेविगेट करें",
    "helpingEveryIndian": "हर भारतीय छात्र को व्यक्तिगत मार्गदर्शन, विशेषज्ञ सलाह और डेटा-संचालित अंतर्दृष्टि के माध्यम से सूचित करियर विकल्प बनाने में मदद करना।",
    "takeCareerQuiz": "करियर प्रश्नोत्तरी लें",
    "exploreCareers": "करियर एक्सप्लोर करें",
    "navigateYourFuture": "हमारी विशेषताओं के साथ अपने भविष्य का मार्गदर्शन करें",
    "comprehensiveTools": "विशेष रूप से भारतीय छात्रों के लिए डिज़ाइन किए गए व्यापक उपकरण और संसाधन",
    "personalizedQuizEngine": "व्यक्तिगत प्रश्नोत्तरी इंजन",
    "quizDescription": "अपने व्यक्तित्व, रुचियों और ताकतों के अनुरूप करियर पथ खोजने के लिए हमारी इंटरैक्टिव प्रश्नोत्तरी लें।",
    "aiCareerRecommendations": "AI करियर अनुशंसाएँ",
    "aiDescription": "अपनी अनूठी प्रोफ़ाइल और शैक्षिक स्तर के अनुसार AI-संचालित करियर सुझाव प्राप्त करें।",
    "careerLibrary": "करियर पुस्तकालय",
    "libraryDescription": "परीक्षाओं, कॉलेजों और वेतन अपेक्षाओं के विवरण के साथ 100+ भारत-विशिष्ट करियर का अन्वेषण करें।",
    "mentorConnect": "सलाहकार कनेक्ट",
    "mentorDescription": "मार्गदर्शन और अंतर्दृष्टि के लिए विभिन्न डोमेन में सत्यापित सलाहकारों से जुड़ें।",
    "parentZone": "पेरेंट ज़ोन",
    "parentZoneDescription": "द्विभाषी संसाधन जो माता-पिता को आधुनिक करियर विकल्पों को समझने और अपने बच्चों के विकल्पों का समर्थन करने में मदद करते हैं।",
    "trendsAndInsights": "ट्रेंड्स और इनसाइट्स",
    "trendsDescription": "सूचित निर्णय लेने के लिए नवीनतम करियर ट्रेंड्स और जॉब मार्केट इनसाइट्स से अपडेट रहें।",
    "makingDifference": "भारत भर में एक अंतर बनाना",
    "studentsGuided": "मार्गदर्शित छात्र",
    "careerPaths": "करियर मार्ग",
    "satisfactionRate": "संतुष्टि दर",
    "expertMentors": "विशेषज्ञ सलाहकार",
    "readyToDiscover": "अपना सही करियर पथ खोजने के लिए तैयार हैं?",
    "takePersonalizedQuiz": "हमारी व्यक्तिगत प्रश्नोत्तरी लें और विशेष रूप से आपके लिए तैयार AI-संचालित सिफारिशें प्राप्त करें।",
    "startYourCareerQuiz": "अपनी करियर प्रश्नोत्तरी शुरू करें",
    "browseCareerLibrary": "करियर पुस्तकालय ब्राउज़ करें",
    "parentZoneTitle": "पेरेंट ज़ोन",
    "parentZoneExplainer": "हम समझते हैं कि भारत में करियर के निर्णय एक पारिवारिक मामला है। हमारा पेरेंट ज़ोन माता-पिता को आधुनिक करियर विकल्पों को समझने और अपने बच्चों के विकल्पों का समर्थन करने के लिए अंग्रेजी और हिंदी दोनों में संसाधन प्रदान करता है।",
    "bilingualGuides": "द्विभाषी करियर गाइड (हिंदी/अंग्रेजी)",
    "explainerVideos": "आधुनिक करियर पर व्याख्यात्मक वीडियो",
    "commonQuestions": "सामान्य प्रश्नों और चिंताओं का समाधान",
    "supportJourney": "अपने बच्चे की करियर यात्रा का समर्थन कैसे करें",
    "visitParentZone": "पेरेंट ज़ोन देखें",
    "newCareerInfo": "नई युग की करियर की जानकारी",
    "learnMore": "और जानें",
    "hindiCareerInfo": "आज के डिजिटल युग में, बच्चों के लिए कई नए करियर विकल्प उपलब्ध हैं। हम आपको इन विकल्पों के बारे में सरल भाषा में जानकारी प्रदान करते हैं।",
    "whatIsUiUx": "UI/UX डिज़ाइन क्या है?",
    "uiUxDescription": "UI/UX डिज़ाइन एक ऐसा क्षेत्र है जहां कलात्मकता और तकनीक एक साथ आते हैं। डिज़ाइनर वेबसा���ट और ऐप्स को उपयोगकर्ता के लिए सुविधाजनक और आकर्षक बनाते हैं।",
    
    // Career Library
    "careerLibraryTitle": "करियर ���ुस्तकालय",
    "exploreCareerPaths": "करियर पथ का अन्वेषण करें",
    "discoverOpportunities": "विभिन्न डोमेन में अवसरों की खोज करें",
    "filterBy": "फ़िल्टर करें",
    "domain": "डोमेन",
    "qualification": "योग्यता",
    "salary": "वेतन सीमा",
    "growth": "विकास क्षमता",
    "applyFilters": "फ़िल्टर लागू करें",
    "resetFilters": "रीसेट",
    "searchCareers": "करियर खोजें...",
    "noResults": "कोई परिणाम नहीं मिला",
    "tryAdjusting": "अपनी खोज या फ़िल्टर समायोजित करें",
    "avgSalary": "औसत वेतन",
    "reqQualification": "आवश्यक योग्यता",
    "viewAllDetails": "सभी विवरण देखें",
    
    // Mentors
    "mentorsPageTitle": "सलाहकारों से जुड़ें",
    "findGuidance": "विभिन्न क्षेत्रों के पेशेवरों से मार्गदर्शन प्राप्त करें",
    "filterMentors": "सलाहकार फ़िल्टर करें",
    "experience": "अनुभव",
    "industry": "उद्योग",
    "expertise": "विशेषज्ञता",
    "availability": "उपलब्धता",
    "searchMentors": "सलाहकार खोजें...",
    "yearsExp": "वर्षों का अनुभव",
    "sessions": "सत्र",
    "rating": "रेटिंग",
    
    // Other common UI elements
    "quickLinks": "त्वरित लिंक",
    "resources": "संसाधन",
    "contactUs": "संपर्क करें",
    "aboutUs": "हमारे बारे में",
    "careerQuizFooter": "कैरियर प्रश्नोत्तरी",
    "careerLibraryFooter": "कैरियर लाइब्रेरी",
    "findMentors": "सलाहकार खोजें",
    "parentZoneFooter": "अभिभावक क्षेत्र",
    "blog": "ब्लॉग",
    "faqs": "अक्सर पूछे जाने वाले प्रश्न",
    "successStories": "सफलता की कहानियां",
    "trends": "रुझान और अंतर्दृष्टि",
    "languageChanged": "भाषा बदली गई",
    "languageChangedDesc": "वेबसाइट की भाषा अब हिंदी में सेट है।"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('english');

  // Translate function to get text in current language
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  // Show a toast notification when language changes
  useEffect(() => {
    toast({
      title: t('languageChanged'),
      description: t('languageChangedDesc'),
    });
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
