
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Rocket, Lightbulb } from "lucide-react";

export default function CTASection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pp-bright-purple via-purple-600 to-purple-800 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-white opacity-10 blur-3xl"></div>
        </div>
        
        {/* Animated circles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-10 right-10 w-32 h-32 rounded-full border border-white/30"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          className="absolute bottom-10 left-10 w-48 h-48 rounded-full border border-white/20"
        ></motion.div>
        
        {/* Animated dots */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white opacity-30"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * 400 
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <Lightbulb className="h-8 w-8 text-white" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {t("readyToDiscover")}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/80">
            {t("takePersonalizedQuiz")}
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-white text-pp-purple hover:bg-gray-100 group"
              asChild
            >
              <Link to="/quiz">
                <Rocket className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                {t("startYourCareerQuiz")}
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 group"
              asChild
            >
              <Link to="/library">
                {t("browseCareerLibrary")}
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
