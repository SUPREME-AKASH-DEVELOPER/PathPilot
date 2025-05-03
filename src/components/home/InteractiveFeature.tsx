
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GalleryHorizontal, Star, Presentation } from "lucide-react";

export default function InteractiveFeature() {
  const { t } = useLanguage();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Floating animation for objects
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  };
  
  // Rotation animation for stars
  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  };
  
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={rotateAnimation}
          className="absolute top-10 right-[20%] w-64 h-64 rounded-full bg-pp-purple/5 blur-[100px]"
        />
        <motion.div 
          animate={{
            ...rotateAnimation,
            transition: { ...rotateAnimation.transition, duration: 25 }
          }}
          className="absolute -bottom-20 left-[30%] w-80 h-80 rounded-full bg-pp-saffron/5 blur-[100px]"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            {t("discoverYourPath") || "Discover Your Path"}
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-pp-purple to-pp-bright-purple mx-auto rounded-full mt-4"
          />
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-10 items-center">
          {/* Interactive left panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative p-6 lg:col-span-1"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pp-purple to-pp-bright-purple" />
            
            <motion.div variants={itemVariants} className="mb-6">
              <div className="w-12 h-12 bg-pp-purple/10 rounded-lg flex items-center justify-center text-pp-purple dark:text-pp-bright-purple mb-4">
                <Presentation className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t("startYourJourney") || "Start Your Journey"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("exploreOptionsDescription") || "Take our career quiz and discover paths that match your strengths and interests."}
              </p>
            </motion.div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <motion.div 
                  key={item}
                  variants={itemVariants}
                  className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-pp-purple/20 flex items-center justify-center text-pp-purple dark:text-pp-bright-purple mr-3">
                    {item}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {item === 1 ? (t("takeQuizStep") || "Take our personalized quiz") : 
                     item === 2 ? (t("discoverStep") || "Discover matching careers") : 
                     (t("connectStep") || "Connect with mentors")}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Center interactive image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative mx-auto lg:col-span-1"
          >
            <div className="relative h-[400px] w-full max-w-[300px] mx-auto">
              {/* Main circular backdrop */}
              <motion.div 
                animate={floatingAnimation}
                className="absolute inset-0 bg-gradient-to-br from-pp-purple/20 to-pp-bright-purple/20 rounded-full backdrop-blur-sm"
              />
              
              {/* Main image */}
              <motion.div
                animate={floatingAnimation}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2940&h=3000"
                  alt="Student exploring career options"
                  className="h-[280px] w-[280px] object-cover rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                />
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute top-[15%] -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 border border-gray-100 dark:border-gray-700"
              >
                <GalleryHorizontal className="h-5 w-5 text-pp-purple dark:text-pp-bright-purple" />
              </motion.div>
              
              <motion.div
                animate={rotateAnimation}
                className="absolute top-[30%] -right-2"
              >
                <Star className="h-7 w-7 text-pp-saffron" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-[20%] -right-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <p className="text-xs font-medium text-gray-900 dark:text-white">
                  {t("careerMatch") || "98% match"}
                </p>
              </motion.div>
              
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  transition: { duration: 4, repeat: Infinity, repeatType: "reverse" }
                }}
                className="absolute bottom-[10%] -left-2 w-8 h-8 bg-gradient-to-br from-pp-saffron to-amber-500 rounded-full flex items-center justify-center text-white text-xs"
              >
                <span>10+</span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Interactive right panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative p-6 lg:col-span-1"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pp-saffron to-amber-500" />
            
            <motion.div variants={itemVariants} className="mb-6">
              <div className="w-12 h-12 bg-pp-saffron/10 rounded-lg flex items-center justify-center text-pp-saffron mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t("topCareerOptions") || "Top Career Options"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("topCareersDescription") || "Explore these trending fields that offer excellent growth potential."}
              </p>
            </motion.div>
            
            <div className="space-y-3">
              {[
                { name: t("dataScience") || "Data Science", score: "92%" },
                { name: t("uiDesign") || "UI/UX Design", score: "88%" },
                { name: t("sustainability") || "Environmental Science", score: "85%" },
              ].map((career, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex items-center justify-between"
                >
                  <span className="text-gray-900 dark:text-gray-200">{career.name}</span>
                  <span className="px-2 py-1 bg-pp-purple/10 text-pp-purple dark:bg-pp-purple/20 dark:text-pp-bright-purple rounded text-xs font-medium">
                    {career.score}
                  </span>
                </motion.div>
              ))}
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="mt-4 text-center"
              >
                <a 
                  href="/library" 
                  className="inline-flex items-center text-pp-purple dark:text-pp-bright-purple hover:text-pp-bright-purple transition-colors"
                >
                  <span className="mr-1">{t("exploreMore") || "Explore more careers"}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
