
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Lightbulb, BookOpen, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function ParentZoneSection() {
  const { t } = useLanguage();
  
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: 0.1 * i,
        duration: 0.5
      } 
    })
  };
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-pp-purple/5 dark:bg-pp-purple/10"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-pp-saffron/5 dark:bg-pp-saffron/10"></div>
        
        {/* Dots pattern */}
        <div className="absolute left-1/2 top-20 grid grid-cols-5 gap-4">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-pp-purple/30"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{
                duration: 3,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-pp-purple/20 to-pp-bright-purple/20 dark:from-pp-purple/30 dark:to-pp-bright-purple/30 rounded-full text-pp-purple dark:text-pp-bright-purple text-sm font-medium mb-4">
              {t("forParents")}
            </span>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t("parentZoneTitle")}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pp-purple to-pp-bright-purple rounded-full mb-6"></div>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {t("parentZoneExplainer")}
            </p>
            
            <ul className="space-y-4 mb-6">
              {[
                t("bilingualGuides"),
                t("explainerVideos"),
                t("commonQuestions"),
                t("supportJourney"),
              ].map((item, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  variants={listItemVariants}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-pp-purple to-pp-bright-purple flex items-center justify-center text-white text-sm">
                    ✓
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </motion.li>
              ))}
            </ul>
            
            <Button 
              className="bg-pp-purple hover:bg-pp-bright-purple group" 
              asChild
            >
              <Link to="/parent-zone">
                <Users className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                <span>{t("visitParentZone")}</span>
                <motion.span
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  className="absolute bottom-0 left-0 h-0.5 bg-white"
                />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pp-purple to-pp-bright-purple flex items-center justify-center text-white">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{t("newCareerInfo")}</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-pp-purple p-0">English</Button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t("hindiCareerInfo")}
            </p>
            
            <motion.div 
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white dark:bg-gray-700 p-4 rounded-md mb-6 border border-gray-100 dark:border-gray-600 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-800 dark:text-white">{t("whatIsUiUx")}</h4>
                <motion.div 
                  whileHover={{ rotate: 90 }}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center"
                >
                  <Play className="h-4 w-4 text-pp-purple dark:text-pp-bright-purple" />
                </motion.div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("uiUxDescription")}
              </p>
            </motion.div>
            
            <div className="flex flex-col space-y-2">
              <motion.div
                whileHover={{ y: -2 }}
                className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <BookOpen className="h-5 w-5 text-pp-purple mr-3" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{t("recentAdditionParent")}</span>
              </motion.div>
              
              <Button 
                variant="outline" 
                className="w-full border-pp-purple text-pp-purple hover:bg-pp-purple/10 dark:border-pp-bright-purple dark:text-pp-bright-purple" 
                asChild
              >
                <Link to="/parent-zone">{t("learnMore")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
