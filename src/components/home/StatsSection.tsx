
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Trophy, Users, Star, Briefcase } from "lucide-react";

export default function StatsSection() {
  const { t } = useLanguage();
  
  const stats = [
    { 
      value: "10,000+", 
      label: t("studentsGuided"),
      icon: <Users className="h-6 w-6" />
    },
    { 
      value: "100+", 
      label: t("careerPaths"),
      icon: <Briefcase className="h-6 w-6" />
    },
    { 
      value: "85%", 
      label: t("satisfactionRate"),
      icon: <Star className="h-6 w-6" />
    },
    { 
      value: "50+", 
      label: t("expertMentors"),
      icon: <Trophy className="h-6 w-6" />
    }
  ];

  const countingAnimation = {
    initial: { opacity: 0, scale: 0.5 },
    animate: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
      }
    }),
  };

  return (
    <section className="bg-gradient-to-r from-pp-purple to-purple-600 text-white py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute top-0 left-0 w-full h-32 -mt-10 opacity-10" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff" fillOpacity="1" d="M0,224L40,202.7C80,181,160,139,240,144C320,149,400,203,480,208C560,213,640,171,720,170.7C800,171,880,213,960,213.3C1040,213,1120,171,1200,160C1280,149,1360,171,1400,181.3L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
        <svg className="absolute bottom-0 left-0 w-full h-32 -mb-5 opacity-10" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff" fillOpacity="1" d="M0,96L40,117.3C80,139,160,181,240,176C320,171,400,117,480,112C560,107,640,149,720,149.3C800,149,880,107,960,106.7C1040,107,1120,149,1200,160C1280,171,1360,149,1400,138.7L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          {t("makingDifference")}
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="initial"
              whileInView="animate"
              variants={countingAnimation}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20"
            >
              <motion.div 
                initial={{ rotate: 0 }}
                whileInView={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-pp-saffron text-white"
              >
                {stat.icon}
              </motion.div>
              
              <motion.div 
                className="text-4xl md:text-5xl font-bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              
              <motion.div 
                className="mt-2 text-pp-saffron"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
