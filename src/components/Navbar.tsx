
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, 
  X,
  GraduationCap,
  BookOpen,
  Users,
  Briefcase,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="mr-2 h-4 w-4" /> },
    { name: "Quiz", path: "/quiz", icon: <GraduationCap className="mr-2 h-4 w-4" /> },
    { name: "Careers", path: "/careers", icon: <Briefcase className="mr-2 h-4 w-4" /> },
    { name: "Library", path: "/library", icon: <BookOpen className="mr-2 h-4 w-4" /> },
    { name: "Mentors", path: "/mentors", icon: <Users className="mr-2 h-4 w-4" /> }
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-pp-purple text-2xl font-bold">Path Pilot</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 dark:text-gray-200 hover:text-pp-purple dark:hover:text-pp-bright-purple px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <LanguageToggle />
            <Button variant="default" className="ml-4 bg-pp-purple hover:bg-pp-bright-purple">
              Get Started
            </Button>
          </div>
          
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-pp-purple dark:hover:text-pp-bright-purple focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 dark:text-gray-200 hover:text-pp-purple dark:hover:text-pp-bright-purple block px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <div className="flex items-center justify-between p-2">
              <LanguageToggle />
              <Button variant="default" className="bg-pp-purple hover:bg-pp-bright-purple">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
