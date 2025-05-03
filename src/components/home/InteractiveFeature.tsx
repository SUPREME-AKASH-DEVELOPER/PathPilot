
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GalleryHorizontal, Star, Presentation, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

export default function InteractiveFeature() {
  const { t } = useLanguage();
  const [activeCard, setActiveCard] = useState(1);
  
  // Auto-cycle through cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev === 3 ? 1 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Enhanced floating animation
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };
  
  // Enhanced rotation animation
  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "linear"
    }
  };

  // Pulse animation
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  
  // Shimmer effect animation
  const shimmerAnimation = {
    x: [-100, 100],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "easeInOut"
    }
  };
  
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden relative">
      {/* Background decorative elements with enhanced animations */}
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
        
        {/* Additional decorative elements */}
        <motion.div 
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, duration: 8 }
          }}
          className="absolute top-[30%] left-[15%] h-24 w-24 bg-pp-bright-purple/10 rounded-full blur-xl"
        />
        <motion.div 
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, duration: 10, delay: 1 }
          }}
          className="absolute bottom-[20%] right-[15%] h-16 w-16 bg-pp-saffron/10 rounded-full blur-lg"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.p
            variants={itemVariants}
            className="text-pp-purple dark:text-pp-bright-purple font-medium mb-2"
          >
            {t("interactiveJourney") || "Interactive Journey"}
          </motion.p>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t("discoverYourPath") || "Discover Your Path"}
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-24 bg-gradient-to-r from-pp-purple to-pp-bright-purple mx-auto rounded-full"
          />
          <motion.p 
            variants={itemVariants}
            className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
          >
            {t("discoverPathDescription") || "Explore career options tailored to your strengths, interests, and aspirations with our interactive tools."}
          </motion.p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-10 items-center">
          {/* Interactive left panel with enhanced animations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <Card
              className={`relative p-6 border-0 overflow-hidden transition-all duration-300 ${
                activeCard === 1 ? "bg-gradient-to-br from-pp-purple/10 to-pp-bright-purple/5 shadow-lg dark:glass-effect" 
                : "bg-white/80 dark:bg-gray-800/60 shadow-md"
              }`}
            >
              <motion.div
                animate={activeCard === 1 ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pp-purple to-pp-bright-purple" />
                
                <motion.div variants={itemVariants} className="mb-6">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 bg-pp-purple/20 rounded-lg flex items-center justify-center text-pp-purple dark:text-pp-bright-purple mb-4"
                  >
                    <Presentation className="h-6 w-6" />
                  </motion.div>
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
                      whileHover={{ x: 5 }}
                      className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-pp-purple to-pp-bright-purple flex items-center justify-center text-white mr-3"
                      >
                        {item}
                      </motion.div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item === 1 ? (t("takeQuizStep") || "Take our personalized quiz") : 
                         item === 2 ? (t("discoverStep") || "Discover matching careers") : 
                         (t("connectStep") || "Connect with mentors")}
                      </p>
                    </motion.div>
                  ))}
                  <motion.a
                    href="/quiz" 
                    whileHover={{ scale: 1.03 }}
                    className="mt-6 inline-flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-pp-purple to-pp-bright-purple text-white rounded-lg font-medium transition-all duration-300"
                  >
                    {t("startNow") || "Start Now"}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </motion.a>
                </div>
              </motion.div>
              
              {/* Animated background elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {activeCard === 1 && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ duration: 1 }}
                      className="absolute top-0 right-0 h-24 w-24 bg-pp-bright-purple/10 rounded-full blur-xl"
                    />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="absolute bottom-0 left-0 h-20 w-20 bg-pp-purple/10 rounded-full blur-lg"
                    />
                  </>
                )}
              </div>
            </Card>
          </motion.div>
          
          {/* Center interactive image with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative mx-auto hidden sm:block"
          >
            <div className="relative h-[400px] w-full max-w-[300px] mx-auto">
              {/* Central connection line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 -ml-0.5 bg-gradient-to-b from-pp-purple via-pp-bright-purple to-pp-saffron">
                <motion.div 
                  animate={{ 
                    y: [0, 400, 0], 
                    backgroundColor: ["#7E69AB", "#9b87f5", "#F9A826", "#7E69AB"] 
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute w-3 h-3 rounded-full bg-pp-purple -left-1 transform"
                />
              </div>
              
              {/* Career match badge in center */}
              <motion.div 
                animate={pulseAnimation}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pp-purple to-pp-bright-purple opacity-20 blur-md"
                  />
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="relative px-4 py-2 backdrop-blur-md bg-black/30 text-white rounded-full font-medium border border-white/20 shadow-lg"
                  >
                    {t("careerMatch") || "Career Match"}
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Main image */}
              <motion.div
                animate={floatingAnimation}
                className="absolute top-[5%] left-1/2 -translate-x-1/2 z-10"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pp-purple to-pp-bright-purple rounded-full opacity-20 blur-md transform scale-110" />
                  <img
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2940&h=3000"
                    alt="Student exploring career options"
                    className="h-[120px] w-[120px] object-cover rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                </motion.div>
              </motion.div>
              
              {/* Icons along the path */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute top-[35%] left-1/2 -translate-x-1/2 z-10"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="h-10 w-10 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center"
                >
                  <Star className="h-5 w-5 text-pp-saffron" />
                </motion.div>
              </motion.div>
              
              <motion.div
                animate={floatingAnimation}
                className="absolute bottom-[5%] left-1/2 -translate-x-1/2 z-10"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pp-saffron to-amber-500 rounded-full opacity-20 blur-md transform scale-110" />
                  <div className="h-[80px] w-[80px] bg-gradient-to-br from-pp-saffron to-amber-500 rounded-full shadow-lg flex items-center justify-center text-white text-xl font-bold">
                    10+
                  </div>
                </motion.div>
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-[20%] -right-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <p className="text-xs font-medium text-gray-900 dark:text-white">
                  {t("percentMatch") || "98% match"}
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Interactive right panel with enhanced animations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <Card
              className={`relative p-6 border-0 overflow-hidden transition-all duration-300 ${
                activeCard === 3 ? "bg-gradient-to-br from-pp-saffron/10 to-amber-500/5 shadow-lg dark:glass-effect" 
                : "bg-white/80 dark:bg-gray-800/60 shadow-md"
              }`}
            >
              <motion.div
                animate={activeCard === 3 ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pp-saffron to-amber-500" />
                
                <motion.div variants={itemVariants} className="mb-6">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 bg-pp-saffron/20 rounded-lg flex items-center justify-center text-pp-saffron mb-4"
                  >
                    <Star className="h-6 w-6" />
                  </motion.div>
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
                      whileHover={{ x: 5 }}
                      className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 flex items-center justify-between"
                    >
                      <span className="text-gray-900 dark:text-gray-200 font-medium">{career.name}</span>
                      <motion.span 
                        whileHover={{ scale: 1.1 }}
                        className="px-2 py-1 bg-gradient-to-r from-pp-saffron to-amber-500 text-white rounded text-xs font-medium"
                      >
                        {career.score}
                      </motion.span>
                    </motion.div>
                  ))}
                  
                  <motion.div className="relative overflow-hidden mt-2">
                    <motion.div
                      initial={{ x: -100 }}
                      animate={{ x: 100 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    
                    <motion.a 
                      href="/library" 
                      whileHover={{ scale: 1.03 }}
                      className="inline-flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-pp-saffron to-amber-500 text-white rounded-lg font-medium transition-all duration-300 mt-4"
                    >
                      {t("exploreMore") || "Explore more careers"}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Animated background elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {activeCard === 3 && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ duration: 1 }}
                      className="absolute top-0 right-0 h-24 w-24 bg-pp-saffron/10 rounded-full blur-xl"
                    />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="absolute bottom-0 left-0 h-20 w-20 bg-amber-500/10 rounded-full blur-lg"
                    />
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
        
        {/* Path indicator dots */}
        <div className="flex justify-center mt-10">
          {[1, 2, 3].map((dot) => (
            <motion.button
              key={dot}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveCard(dot)}
              className={`mx-2 w-3 h-3 rounded-full transition-all duration-300 ${
                activeCard === dot 
                  ? 'bg-gradient-to-r from-pp-purple to-pp-bright-purple shadow-md shadow-pp-purple/30' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`View option ${dot}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

