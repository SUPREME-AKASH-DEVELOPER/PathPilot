
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
    
    // Show toast notification when language changes
    toast({
      title: language === 'english' ? "भाषा बदली गई" : "Language Changed",
      description: language === 'english' 
        ? "वेबसाइट की भाषा अब हिंदी में सेट है।" 
        : "The website language is now set to English."
    });
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
