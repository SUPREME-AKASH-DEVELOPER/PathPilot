
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ParentZoneSection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t("parentZoneTitle")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {t("parentZoneExplainer")}
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center space-x-2">
                <span className="text-pp-purple">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{t("bilingualGuides")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-pp-purple">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{t("explainerVideos")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-pp-purple">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{t("commonQuestions")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-pp-purple">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{t("supportJourney")}</span>
              </li>
            </ul>
            <Button className="bg-pp-purple hover:bg-pp-bright-purple" asChild>
              <Link to="/parent-zone">
                <Users className="mr-2 h-4 w-4" />
                {t("visitParentZone")}
              </Link>
            </Button>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">{t("newCareerInfo")}</h3>
              <Button variant="link" className="text-pp-purple p-0">English</Button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t("hindiCareerInfo")}
            </p>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-md mb-4">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">{t("whatIsUiUx")}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("uiUxDescription")}
              </p>
            </div>
            
            <Button variant="outline" className="w-full" asChild>
              <Link to="/parent-zone/careers">{t("learnMore")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
