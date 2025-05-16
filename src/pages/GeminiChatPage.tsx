
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GeminiChat from "@/components/GeminiChat";
import { useLanguage } from "@/contexts/LanguageContext";

const GeminiChatPage: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="text-pp-purple dark:text-pp-bright-purple">
            {language === 'english' ? "AI Assistant" : "AI सहायक"}
          </span>
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          {language === 'english' 
            ? "Ask any question and get instant answers from our PathPilot AI assistant"
            : "कोई भी प्रश्न पूछें और हमारे PathPilot AI सहायक से तुरंत उत्तर प्राप्त करें"}
        </p>
        <GeminiChat />
      </main>
      <Footer />
    </div>
  );
};

export default GeminiChatPage;
