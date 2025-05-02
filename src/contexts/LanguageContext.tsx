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
    
    // Other common UI elements
    "quickLinks": "Quick Links",
    "resources": "Resources",
    "contactUs": "Contact Us",
    "aboutUs": "About Us",
    "careerQuiz": "Career Quiz",
    "careerLibrary": "Career Library",
    "findMentors": "Find Mentors",
    "parentZone": "Parent Zone",
    "blog": "Blog",
    "faqs": "FAQs",
    "successStories": "Success Stories",
    "trends": "Trends & Insights",
    "languageChanged": "Language Changed",
    "languageChangedDesc": "The website language is now set to English.",
    "noResults": "No results found",
    "tryAdjusting": "Try adjusting your search or filters"
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
    
    // Other common UI elements
    "quickLinks": "त्वरित लिंक",
    "resources": "संसाधन",
    "contactUs": "संपर्क करें",
    "aboutUs": "हमारे बारे में",
    "careerQuiz": "कैरियर प्रश्नोत्तरी",
    "careerLibrary": "कैरियर लाइब्रेरी",
    "findMentors": "सलाहकार खोजें",
    "parentZone": "अभिभावक क्षेत्र",
    "blog": "ब्लॉग",
    "faqs": "अक्सर पूछे जाने वाले प्रश्न",
    "successStories": "सफलता की कहानियां",
    "trends": "रुझान और अंतर्दृष्टि",
    "languageChanged": "भाषा बदली गई",
    "languageChangedDesc": "वेबसाइट की भाषा अब हिंदी में सेट है।",
    "noResults": "कोई परिणाम नहीं मिला",
    "tryAdjusting": "अपनी खोज या फ़िल्टर समायोजित करें"
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
