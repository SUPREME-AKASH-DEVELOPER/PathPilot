import React, { createContext, useContext, useState } from 'react';

interface LanguageContextProps {
  language: 'english' | 'hindi';
  setLanguage: (language: 'english' | 'hindi') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  const translations = {
    english: {
      indexTitle: "Empowering Futures Together",
      indexSubtitle: "Discover a world of opportunities with personalized guidance for students, parents, and mentors.",
      exploreCareers: "Explore Careers",
      findMentors: "Find Mentors",
      accessLibrary: "Access Library",
      parentZone: "Parent Zone",
      theme: "Theme",
      language: "Language",
      search: "Search",
      home: "Home",
      quiz: "Quiz",
      careers: "Careers",
      library: "Library",
      mentors: "Mentors",
      login: "Login",
      signup: "Sign Up",
      profile: "Profile",
      logout: "Logout",
      careersPageTitle: "Career Library",
      careerLibraryTitle: "Unlock Your Potential: Explore Diverse Career Paths",
      exploreCareerPaths: "Explore thousands of career paths and find the perfect fit for your future",
      careerPaths: "Career Paths",
      noResults: "No results found",
      tryAdjusting: "Try adjusting your search or filters.",
      resetFilters: "Reset Filters",
      noSavedCareers: "No saved careers yet",
      startSaving: "Start saving careers that interest you!",
      careerDetails: "Career Details",
      description: "Description",
      salaryRange: "Salary Range",
      keyEntranceExams: "Key Entrance Exams",
      recommendedColleges: "Recommended Colleges",
      topRecruiters: "Top Recruiters",
      save: "Save",
      saved: "Saved",
      close: "Close",
      filterByCategory: "Filter by Category",
      allCategories: "All Categories",
      technical: "Technical",
      medical: "Medical",
      government: "Government",
      education: "Education",
      finance: "Finance",
      creative: "Creative",
      marketing: "Marketing",
      aviation: "Aviation",
      science: "Science",
      engineering: "Engineering",
      hospitality: "Hospitality",
      other: "Other",
      
      // Chatbot translations
      pathPilotAssistant: "PathPilot Assistant",
      chatPlaceholder: "Ask about colleges, careers, exams...",
      sendMessage: "Send",
      chatbotGreeting: "Hello! I'm your PathPilot AI assistant. How can I help you with career guidance, college recommendations, or entrance exam information today?"
    },
    hindi: {
      indexTitle: "एक साथ भविष्य को सशक्त बनाना",
      indexSubtitle: "छात्रों, अभिभावकों और सलाहकारों के लिए व्यक्तिगत मार्गदर्शन के साथ अवसरों की दुनिया की खोज करें।",
      exploreCareers: "करियर एक्सप्लोर करें",
      findMentors: "सलाहकार खोजें",
      accessLibrary: "लाइब्रेरी एक्सेस करें",
      parentZone: "अभिभावक क्षेत्र",
      theme: "थीम",
      language: "भाषा",
      search: "खोज",
      home: "होम",
      quiz: "क्विज़",
      careers: "कैरियर",
      library: "पुस्तकालय",
      mentors: "सलाहकार",
      login: "लॉगिन",
      signup: "साइन अप करें",
      profile: "प्रोफ़ाइल",
      logout: "लॉग आउट",
      careersPageTitle: "कैरियर लाइब्रेरी",
      careerLibraryTitle: "अपनी क्षमता को अनलॉक करें: विविध कैरियर पथों का अन्वेषण करें",
      exploreCareerPaths: "हजारों कैरियर पथों का अन्वेषण करें और अपने भविष्य के लिए सही फिट खोजें",
      careerPaths: "कैरियर पथ",
      noResults: "कोई परिणाम नहीं मिला",
      tryAdjusting: "अपनी खोज या फ़िल्टर समायोजित करने का प्रयास करें।",
      resetFilters: "फ़िल्टर रीसेट करें",
      noSavedCareers: "कोई सहेजा हुआ करियर नहीं",
      startSaving: "अपनी रुचि के करियर को बचाना शुरू करें!",
      careerDetails: "कैरियर विवरण",
      description: "विवरण",
      salaryRange: "वेतन सीमा",
      keyEntranceExams: "मुख्य प्रवेश परीक्षाएँ",
      recommendedColleges: "अनुशंसित कॉलेज",
      topRecruiters: "शीर्ष भर्तीकर्ता",
      save: "बचाना",
      saved: "बचाया गया",
      close: "बंद करें",
      filterByCategory: "श्रेणी के अनुसार फ़िल्टर करें",
      allCategories: "सभी श्रेणियाँ",
      technical: "तकनीकी",
      medical: "चिकित्सा",
      government: "सरकारी",
      education: "शिक्षा",
      finance: "वित्त",
      creative: "रचनात्मक",
      marketing: "विपणन",
      aviation: "विमानन",
      science: "विज्ञान",
      engineering: "इंजीनियरिंग",
      hospitality: "अतिथि सत्कार",
      other: "अन्य",
      
      // Chatbot translations
      pathPilotAssistant: "पथपाइलट सहायक",
      chatPlaceholder: "कॉलेजों, करियर, परीक्षाओं के बारे में पूछें...",
      sendMessage: "भेजें",
      chatbotGreeting: "नमस्ते! मैं आपका पथपाइलट AI सहायक हूँ। आज मैं आपकी करियर मार्गदर्शन, कॉलेज सिफारिशों, या प्रवेश परीक्षा जानकारी के साथ कैसे मदद कर सकता हूँ?"
    }
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
