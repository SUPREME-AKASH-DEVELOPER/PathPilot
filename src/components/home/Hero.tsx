
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Rocket, Award, Sparkles } from "lucide-react";

export default function Hero() {
  const { t } = useLanguage();
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const, // Explicitly typed as literal "reverse"
      ease: "easeInOut"
    }
  };
  
  return (
    <div className="relative bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-10 w-36 h-36 rounded-full bg-pp-purple/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-pp-saffron/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-pp-teal/20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left z-10"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-block mb-4 px-3 py-1 bg-gradient-to-r from-pp-purple to-pp-bright-purple rounded-full text-white text-sm font-medium"
            >
              <span className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                {t("newWayToExplore")}
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              {t("navigateWithClarity")}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pp-purple to-pp-bright-purple dark:glow-text"> 
                {t("yourFuture")}
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg md:max-w-none"
            >
              {t("helpingEveryIndian")}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Button
                className="bg-pp-purple hover:bg-pp-bright-purple text-white px-8 py-6 group"
                asChild
              >
                <Link to="/quiz">
                  <Rocket className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                  {t("takeCareerQuiz")}
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-pp-purple text-pp-purple hover:text-pp-bright-purple px-8 py-6 group"
                asChild
              >
                <Link to="/library">
                  <Award className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  {t("exploreCareers")}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-64 md:h-full z-10"
          >
            <motion.div 
              animate={floatingAnimation}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full h-full max-w-md">
                <img 
                  src="/lovable-uploads/fd4dc9d2-b648-4027-aef2-be1793efaa7e.png" 
                  alt="Student with mind map of career possibilities" 
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
                
                {/* Decorative elements around the image */}
                <motion.div 
                  animate={{
                    rotate: [0, 360],
                    transition: { duration: 20, repeat: Infinity, ease: "linear" }
                  }}
                  className="absolute -top-5 -right-5 w-12 h-12 rounded-full bg-gradient-to-r from-pp-purple to-pp-bright-purple flex items-center justify-center text-white"
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -bottom-3 -left-3 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                  <div className="text-sm font-medium text-pp-purple dark:text-pp-bright-purple">
                    {t("findYourPath")}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
