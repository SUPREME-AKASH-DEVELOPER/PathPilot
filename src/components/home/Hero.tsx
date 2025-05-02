
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  
  return (
    <div className="relative bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              {t("navigateWithClarity")}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg md:max-w-none">
              {t("helpingEveryIndian")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                className="bg-pp-purple hover:bg-pp-bright-purple text-white px-8 py-6"
                asChild
              >
                <Link to="/quiz">{t("takeCareerQuiz")}</Link>
              </Button>
              <Button
                variant="outline"
                className="border-pp-purple text-pp-purple hover:text-pp-bright-purple px-8 py-6"
                asChild
              >
                <Link to="/library">{t("exploreCareers")}</Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-64 md:h-full"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full max-w-md">
                <img 
                  src="https://thumbs.dreamstime.com/b/confused-student-girl-thinking-future-career-plan-over-white-background-43759162.jpg" 
                  alt="Confused student thinking about career choices" 
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
