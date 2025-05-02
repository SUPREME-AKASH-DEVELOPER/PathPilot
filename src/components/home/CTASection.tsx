
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CTASection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-pp-bright-purple text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t("readyToDiscover")}
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          {t("takePersonalizedQuiz")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-pp-purple hover:bg-gray-100"
            asChild
          >
            <Link to="/quiz">{t("startYourCareerQuiz")}</Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white/10"
            asChild
          >
            <Link to="/library">{t("browseCareerLibrary")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
