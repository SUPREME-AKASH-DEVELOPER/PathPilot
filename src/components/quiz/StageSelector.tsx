
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, GraduationCap, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type Stage = 'after10th' | 'after12th' | 'afterGraduation';

interface StageSelectorProps {
  onSelectStage: (stage: Stage) => void;
}

export default function StageSelector({ onSelectStage }: StageSelectorProps) {
  const { t } = useLanguage();

  const stages = [
    {
      id: 'after10th',
      title: t("after10th"),
      icon: <BookOpen className="h-8 w-8 text-pp-purple mb-2" />,
      delay: 0
    },
    {
      id: 'after12th',
      title: t("after12th"),
      icon: <GraduationCap className="h-8 w-8 text-pp-purple mb-2" />,
      delay: 0.1
    },
    {
      id: 'afterGraduation',
      title: t("afterGraduation"),
      icon: <Award className="h-8 w-8 text-pp-purple mb-2" />,
      delay: 0.2
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t("selectStage")}</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t("chooseStageDescription")}
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {stages.map((stage) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: stage.delay }}
          >
            <Card 
              className="hover:border-pp-purple hover:shadow-md cursor-pointer transition-all duration-300 h-full"
              onClick={() => onSelectStage(stage.id as Stage)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                {stage.icon}
                <h3 className="font-semibold text-xl mb-2">{stage.title}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
