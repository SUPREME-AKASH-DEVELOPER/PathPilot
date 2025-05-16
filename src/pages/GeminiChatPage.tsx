
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GeminiChat from "@/components/GeminiChat";

const GeminiChatPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">AI Assistant</h1>
        <GeminiChat />
      </main>
      <Footer />
    </div>
  );
};

export default GeminiChatPage;
