
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TestimonialSection() {
  const { t } = useLanguage();
  
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
    },
    {
      quote: "The career counseling sessions helped me understand that I could combine my love for technology and healthcare in biomedical engineering.",
      name: "Vikram Singh",
      role: "Biomedical Engineering Student",
      location: "IIT Bombay"
    },
    {
      quote: "I discovered my passion for psychology through Path Piolet's career library. Now I'm on my way to becoming a clinical psychologist.",
      name: "Neha Kapoor",
      role: "Psychology Student",
      location: "University of Delhi"
    }
  ];

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
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg h-full flex flex-col">
                      <div className="flex flex-col items-center text-center flex-grow">
                        <div className="mb-6">
                          {/* Avatar */}
                          <div className="w-16 h-16 rounded-full bg-pp-bright-purple flex items-center justify-center text-white text-xl font-bold">
                            {testimonial.name.charAt(0)}
                          </div>
                        </div>
                        
                        <blockquote className="mb-4 flex-grow">
                          <p className="text-lg italic text-gray-700 dark:text-gray-300">
                            "{testimonial.quote}"
                          </p>
                        </blockquote>
                        
                        <div className="mt-auto">
                          <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                          <div className="text-pp-purple">{testimonial.role}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2 py-4">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === 0 ? "bg-pp-purple" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
