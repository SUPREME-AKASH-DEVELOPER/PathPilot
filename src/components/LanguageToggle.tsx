
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type LanguageContent = {
  english: Record<string, string>;
  hindi: Record<string, string>;
}

// This would typically come from a translation file or API
const translations: LanguageContent = {
  english: {
    "home": "Home",
    "quiz": "Quiz",
    "careers": "Careers",
    "library": "Library",
    "mentors": "Mentors",
    "getStarted": "Get Started",
    "search": "Search",
    "filter": "Filter",
    "save": "Save",
    "details": "Details"
  },
  hindi: {
    "home": "होम",
    "quiz": "प्रश्नोत्तरी",
    "careers": "करियर",
    "library": "पुस्तकालय",
    "mentors": "सलाहकार",
    "getStarted": "शुरू करें",
    "search": "खोज",
    "filter": "फ़िल्टर",
    "save": "सहेजें",
    "details": "विवरण"
  }
};

// Create a global context for language
export const currentLanguage = {
  value: 'english',
  translations
};

export default function LanguageToggle() {
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  useEffect(() => {
    // Update the global language context
    currentLanguage.value = language;
    
    // In a real app, this would update all the text on the page
    // For now we just show a toast notification
    toast({
      title: language === 'english' ? "Language Changed" : "भाषा बदली गई",
      description: language === 'english' ? 
        "The website language is now set to English." : 
        "वेबसाइट की भाषा अब हिंदी में सेट है।",
    });
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="px-2"
    >
      {language === 'english' ? 'हिंदी' : 'English'}
    </Button>
  );
}
