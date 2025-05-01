
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote: "Path Piolet helped me discover my passion for design. Now I'm studying at NID and couldn't be happier!",
      name: "Priya Sharma",
      role: "UI/UX Design Student",
      location: "National Institute of Design"
    },
    {
      quote: "I was confused between engineering and medicine. The career quiz gave me clarity that medicine aligned better with my strengths.",
      name: "Rahul Gupta",
      role: "MBBS Student",
      location: "AIIMS Delhi"
    },
    {
      quote: "The mentor I connected with through Path Piolet guided me to pursue teaching instead of engineering, and it was the best decision I ever made.",
      name: "Anjali Verma",
      role: "B.Ed Student",
      location: "Delhi University"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Success Stories
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Hear from students who found their perfect career path with Path Piolet
        </p>
        
        <div className="relative">
          <div 
            className="overflow-hidden" 
            ref={testimonialsRef}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="min-w-full px-4"
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6">
                        {/* Placeholder for avatar */}
                        <div className="w-16 h-16 rounded-full bg-pp-bright-purple flex items-center justify-center text-white text-xl font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      
                      <blockquote className="mb-4">
                        <p className="text-xl italic text-gray-700 dark:text-gray-300">
                          "{testimonial.quote}"
                        </p>
                      </blockquote>
                      
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                        <div className="text-pp-purple">{testimonial.role}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 p-0 rounded-full ${index === activeIndex ? 'bg-pp-purple' : 'bg-gray-300 dark:bg-gray-600'}`}
              />
            ))}
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
