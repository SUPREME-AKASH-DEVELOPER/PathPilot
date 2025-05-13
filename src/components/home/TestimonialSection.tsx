
import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TestimonialSection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Success Stories
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Read authentic experiences from students who found their career path with Path Piolet
        </p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-3xl mx-auto text-center"
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-pp-purple flex items-center justify-center text-white">
              <MessageSquareText className="h-8 w-8" />
            </div>
            
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Be the First to Share Your Story
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 max-w-lg">
              We believe in authentic experiences. This space is reserved for real students who have completed their career journey with us. After taking the quiz or booking a session with a mentor, you'll have the opportunity to share your experience.
            </p>
            
            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-pp-purple hover:bg-pp-bright-purple" asChild>
                <a href="/quiz">Take the Career Quiz</a>
              </Button>
              
              <Button variant="outline" asChild>
                <a href="/mentors">Find a Mentor</a>
              </Button>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <p>
                We're committed to transparency. All testimonials shown are from verified Path Piolet users.
              </p>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
