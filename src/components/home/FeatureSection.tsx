
import { BookOpen, GraduationCap, Users, Briefcase, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FeatureSection() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: t("personalizedQuizEngine"),
      description: t("quizDescription"),
      color: "from-pp-purple to-pp-bright-purple"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: t("aiCareerRecommendations"),
      description: t("aiDescription"),
      color: "from-pp-saffron to-amber-400"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: t("careerLibrary"),
      description: t("libraryDescription"),
      color: "from-pp-teal to-pp-mint"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t("mentorConnect"),
      description: t("mentorDescription"),
      color: "from-blue-500 to-blue-400"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: t("parentZone"),
      description: t("parentZoneDescription"),
      color: "from-purple-500 to-purple-400"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: t("trendsAndInsights"),
      description: t("trendsDescription"),
      color: "from-green-500 to-green-400"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      {/* Background graphics */}
      <div className="absolute z-0 opacity-10 inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pp-purple blur-3xl"></div>
        <div className="absolute bottom-12 -left-24 w-72 h-72 rounded-full bg-pp-saffron blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("navigateYourFuture")}
          </h2>
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-pp-purple to-pp-bright-purple mx-auto rounded-full"></div>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("comprehensiveTools")}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              {/* Decorative gradient background that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300 ${feature.color}"></div>
              
              {/* Icon with gradient background */}
              <div className="mb-4 relative">
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white`}>
                  {feature.icon}
                </div>
                
                {/* Decorative dots */}
                <motion.div 
                  className="absolute -right-2 -bottom-2 w-6 h-6 grid grid-cols-2 gap-1"
                  initial={{ opacity: 0, rotate: -10 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <div className="w-2 h-2 rounded-full bg-pp-purple opacity-30"></div>
                  <div className="w-2 h-2 rounded-full bg-pp-purple opacity-60"></div>
                  <div className="w-2 h-2 rounded-full bg-pp-purple opacity-90"></div>
                  <div className="w-2 h-2 rounded-full bg-pp-purple"></div>
                </motion.div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-pp-purple dark:group-hover:text-pp-bright-purple transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
