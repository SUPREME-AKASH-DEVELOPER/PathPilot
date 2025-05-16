
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-20 md:py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-pp-purple to-pp-bright-purple dark:from-pp-bright-purple dark:to-pp-saffron"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {t("navigateWithClarity")}
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {t("helpingEveryIndian")}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button asChild size="lg" className="bg-pp-purple hover:bg-pp-bright-purple dark:bg-pp-bright-purple dark:hover:bg-pp-purple">
            <Link to="/quiz" className="text-base flex items-center">
              {t("takeCareerQuiz")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link to="/careers" className="text-base">
              {t("exploreCareers")}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
