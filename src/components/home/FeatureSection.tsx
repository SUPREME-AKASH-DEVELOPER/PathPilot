
import { BookOpen, GraduationCap, Users, Briefcase, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function FeatureSection() {
  const features = [
    {
      icon: <GraduationCap className="h-8 w-8 text-pp-purple" />,
      title: "Personalized Quiz Engine",
      description:
        "Take our interactive quiz to discover career paths aligned with your personality, interests, and strengths."
    },
    {
      icon: <Award className="h-8 w-8 text-pp-purple" />,
      title: "AI Career Recommendations",
      description:
        "Get AI-powered career suggestions personalized to your unique profile and educational stage."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-pp-purple" />,
      title: "Career Library",
      description:
        "Explore 100+ India-specific careers with details on exams, colleges, and salary expectations."
    },
    {
      icon: <Users className="h-8 w-8 text-pp-purple" />,
      title: "Mentor Connect",
      description:
        "Connect with verified mentors across various domains for guidance and insights."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-pp-purple" />,
      title: "Parent Zone",
      description:
        "Bilingual resources to help parents understand modern career paths and support their children."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-pp-purple" />,
      title: "Trends & Insights",
      description:
        "Stay updated with the latest career trends and job market insights for informed decision-making."
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Navigate Your Future With Our Features
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive tools and resources designed specifically for Indian students
          </p>
        </div>
        
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
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
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
