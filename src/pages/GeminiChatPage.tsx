
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GeminiChat from "@/components/GeminiChat";

const GeminiChatPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="text-pp-purple dark:text-pp-bright-purple">AI Assistant</span>
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Ask any question and get instant answers from our Gemini-powered AI assistant
        </p>
        <GeminiChat />
      </main>
      <Footer />
    </div>
  );
};

export default GeminiChatPage;
