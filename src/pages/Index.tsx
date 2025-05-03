
import Hero from "@/components/home/Hero";
import FeatureSection from "@/components/home/FeatureSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import ParentZoneSection from "@/components/home/ParentZoneSection";
import CTASection from "@/components/home/CTASection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveFeature from "@/components/home/InteractiveFeature";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <InteractiveFeature />
        <FeatureSection />
        <StatsSection />
        <TestimonialSection />
        <ParentZoneSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
