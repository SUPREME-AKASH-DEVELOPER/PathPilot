
import Hero from "@/components/home/Hero";
import FeatureSection from "@/components/home/FeatureSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import ParentZoneSection from "@/components/home/ParentZoneSection";
import CTASection from "@/components/home/CTASection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveFeature from "@/components/home/InteractiveFeature";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage(); // Add this to access translations
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <InteractiveFeature />
        <FeatureSection />
        <TestimonialSection />
        <ParentZoneSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
