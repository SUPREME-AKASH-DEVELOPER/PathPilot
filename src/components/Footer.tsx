
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-pp-purple">Path Piolet</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Helping every Indian student choose the right path with clarity and confidence.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-pp-purple dark:hover:text-pp-bright-purple">About Us</Link></li>
              <li><Link to="/quiz" className="text-gray-600 dark:text-gray-400 hover:text-pp-purple dark:hover:text-pp-bright-purple">Career Quiz</Link></li>
              <li><Link to="/library" className="text-gray-600 dark:text-gray-400 hover:text-pp-purple dark:hover:text-pp-bright-purple">Career Library</Link></li>
              <li><Link to="/mentors" className="text-gray-600 dark:text-gray-400 hover:text-pp-purple dark:hover:text-pp-bright-purple">Find Mentors</Link></li>
              <li><Link to="/parent-zone" className="text-gray-600 dark:text-gray-400 hover:text-pp-purple dark:hover:text-pp-bright-purple">Parent Zone</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-pp-purple dark:hover:text-pp-bright-purple">Blog</Link></li>
              <li><Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-pp-purple dark:hover:text-pp-bright-purple">FAQs</Link></li>
              <li><Link to="/success-stories" className="text-gray-600 dark:text-gray-400 hover:text-pp-purple dark:hover:text-pp-bright-purple">Success Stories</Link></li>
              <li><Link to="/trends" className="text-gray-600 dark:text-gray-400 hover:text-pp-purple dark:hover:text-pp-bright-purple">Trends & Insights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Contact Us</h4>
            <address className="not-italic">
              <div className="flex items-center space-x-2 mb-2 text-gray-600 dark:text-gray-400">
                <MapPin size={18} />
                <span>Jabalpur – 482001, Madhya Pradesh 🇮🇳</span>
              </div>
              <div className="flex items-center space-x-2 mb-2 text-gray-600 dark:text-gray-400">
                <Phone size={18} />
                <span>+91 9301773547</span>
              </div>
              <div className="flex items-center space-x-2 mb-2 text-gray-600 dark:text-gray-400">
                <Mail size={18} />
                <span>career@pathpiolet.in</span>
              </div>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Path Piolet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
