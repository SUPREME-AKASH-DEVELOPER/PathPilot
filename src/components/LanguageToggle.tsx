
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function LanguageToggle() {
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

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
