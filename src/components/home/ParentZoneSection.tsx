
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

export default function ParentZoneSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Parent Zone
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              We understand that career decisions are a family affair in India. Our Parent Zone provides resources in both English and Hindi to help parents understand modern career options and support their children's choices.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center space-x-2">
                <span className="text-pp-purple">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Bilingual career guides (Hindi/English)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-pp-purple">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Explainer videos on modern careers</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-pp-purple">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Addressing common questions & concerns</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-pp-purple">✓</span>
                <span className="text-gray-700 dark:text-gray-300">How to support your child's career journey</span>
              </li>
            </ul>
            <Button className="bg-pp-purple hover:bg-pp-bright-purple" asChild>
              <Link to="/parent-zone">
                <Users className="mr-2 h-4 w-4" />
                Visit Parent Zone
              </Link>
            </Button>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">नई युग की करियर की जानकारी</h3>
              <Button variant="link" className="text-pp-purple p-0">English</Button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              आज के डिजिटल युग में, बच्चों के लिए कई नए करियर विकल्प उपलब्ध हैं। हम आपको इन विकल्पों के बारे में सरल भाषा में जानकारी प्रदान करते हैं।
            </p>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-md mb-4">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">UI/UX डिज़ाइन क्या है?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                UI/UX डिज़ाइन एक ऐसा क्षेत्र है जहां कलात्मकता और तकनीक एक साथ आते हैं। डिज़ाइनर वेबसाइट और ऐप्स को उपयोगकर्ता के लिए सुविधाजनक और आकर्षक बनाते हैं।
              </p>
            </div>
            
            <Button variant="outline" className="w-full" asChild>
              <Link to="/parent-zone/careers">और जानें</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
