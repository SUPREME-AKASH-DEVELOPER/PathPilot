
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StatsSection() {
  const { t } = useLanguage();
  
  const stats = [
    { value: "10,000+", label: t("studentsGuided") },
    { value: "100+", label: t("careerPaths") },
    { value: "85%", label: t("satisfactionRate") },
    { value: "50+", label: t("expertMentors") }
  ];

  return (
    <section className="bg-pp-purple text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("makingDifference")}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold">{stat.value}</div>
              <div className="mt-2 text-pp-saffron">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
