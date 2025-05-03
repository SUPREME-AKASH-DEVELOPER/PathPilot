
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Enhanced carousel items with more detailed information
const carouselItems = [
  {
    id: "item-1",
    image: "https://images.unsplash.com/photo-1530651788726-1dbf58eeef1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=882&q=80",
    title: "Discover Your Path",
    subtitle: "Career Exploration",
    time: "Learn More",
    description: "Explore potential career paths based on your interests and strengths"
  },
  {
    id: "item-2",
    image: "https://images.unsplash.com/photo-1559386484-97dfc0e15539?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
    title: "Find Your Passion",
    subtitle: "Skill Development",
    time: "Get Started",
    description: "Develop the skills you need to succeed in your chosen field"
  },
  {
    id: "item-3",
    image: "https://images.unsplash.com/photo-1533461502717-83546f485d24?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    title: "Build Your Future",
    subtitle: "Education Planning",
    time: "Explore Options",
    description: "Plan your educational journey to reach your career goals"
  }
];

export default function ImageCarousel() {
  const { t } = useLanguage();
  const [activeItem, setActiveItem] = useState("item-1");
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      const currentIndex = carouselItems.findIndex(item => item.id === activeItem);
      const nextIndex = (currentIndex + 1) % carouselItems.length;
      setActiveItem(carouselItems[nextIndex].id);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [activeItem, autoPlay]);

  // Handle manual navigation
  const handlePrevious = () => {
    setAutoPlay(false); // Disable autoplay when user interacts
    const currentIndex = carouselItems.findIndex(item => item.id === activeItem);
    const prevIndex = currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1;
    setActiveItem(carouselItems[prevIndex].id);
  };

  const handleNext = () => {
    setAutoPlay(false); // Disable autoplay when user interacts
    const currentIndex = carouselItems.findIndex(item => item.id === activeItem);
    const nextIndex = (currentIndex + 1) % carouselItems.length;
    setActiveItem(carouselItems[nextIndex].id);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("exploreCareerPaths") || "Explore Career Paths"}
          </h2>
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-pp-purple to-pp-bright-purple mx-auto rounded-full"></div>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("visuallyExplore") || "Visually explore different career options and find your perfect path"}
          </p>
        </motion.div>

        <div className="container mx-auto relative max-w-4xl">
          {/* Enhanced carousel with better controls */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <AnimatePresence mode="wait">
                {carouselItems.map((item) => (
                  activeItem === item.id && (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="aspect-[4/3]"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm mb-3 opacity-90">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm opacity-80">{item.subtitle}</span>
                          <span className="text-xs px-3 py-1 bg-pp-purple/60 backdrop-blur-sm rounded-full hover:bg-pp-purple/80 cursor-pointer transition-colors">
                            {item.time}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
            
            {/* Custom navigation arrows */}
            <button 
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
              onClick={handlePrevious}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-pp-purple dark:text-pp-bright-purple" />
            </button>
            
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-pp-purple dark:text-pp-bright-purple" />
            </button>
          </div>

          {/* Enhanced player-like info panel */}
          <motion.div 
            className="player bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-lg mx-auto mt-6 transform hover:shadow-xl transition-all duration-300"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="upper-part relative h-[60px] overflow-hidden px-4 py-2">
              <div className="play-icon flex items-center justify-center w-10 h-10 rounded-full bg-pp-purple/10 dark:bg-pp-purple/20">
                <svg width="20" height="20" fill="#9b87f5" stroke="#9b87f5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-play" viewBox="0 0 24 24">
                  <path d="M5 3l14 9-14 9V3z"/>
                </svg>
              </div>
              
              <div className="info-area absolute top-0 left-14 w-[calc(100%-60px)] transition-transform duration-500" 
                style={{ transform: `translateY(${-40 * (Number(activeItem.split('-')[1]) - 1)}px)` }}
              >
                {carouselItems.map(item => (
                  <div key={item.id} className="song-info h-[40px] py-1">
                    <div className="title text-gray-900 dark:text-white font-medium">
                      {item.title}
                    </div>
                    <div className="sub-line flex items-center justify-between">
                      <div className="subtitle text-gray-500 dark:text-gray-400">
                        {item.subtitle}
                      </div>
                      <div className="time text-pp-purple dark:text-pp-bright-purple text-xs font-medium">
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="px-4 pb-3">
              <div className="progress-bar h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                <motion.span 
                  className="progress block h-full bg-gradient-to-r from-pp-purple to-pp-bright-purple rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(Number(activeItem.split('-')[1]) / carouselItems.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
          
          {/* Enhanced selector dots */}
          <div className="flex justify-center mt-6 space-x-3">
            {carouselItems.map(item => (
              <button
                key={item.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeItem === item.id 
                    ? 'bg-pp-purple dark:bg-pp-bright-purple scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => {
                  setAutoPlay(false);
                  setActiveItem(item.id);
                }}
                aria-label={`View ${item.title}`}
              />
            ))}
          </div>
          
          {/* Auto-play toggle */}
          <div className="mt-4 text-center">
            <button 
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                autoPlay 
                  ? 'bg-pp-purple/20 text-pp-purple dark:bg-pp-bright-purple/20 dark:text-pp-bright-purple' 
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
              onClick={() => setAutoPlay(!autoPlay)}
              aria-label={autoPlay ? "Disable auto-play" : "Enable auto-play"}
            >
              {autoPlay ? "Auto-Play: On" : "Auto-Play: Off"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
