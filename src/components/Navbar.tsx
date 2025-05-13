
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  // Track scrolling to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("quiz"), href: "/quiz" },
    { name: t("careers"), href: "/careers" },
    { name: t("library"), href: "/library" },
    { name: t("mentors"), href: "/mentors" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-white dark:bg-gray-900"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex flex-shrink-0 items-center"
              aria-label="Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-pp-purple dark:text-pp-bright-purple"
              >
                PathPilot
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-pp-purple/10 text-pp-purple dark:bg-pp-bright-purple/20 dark:text-pp-bright-purple"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
            
            {/* Auth buttons for desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={logout}
                    className="text-pp-purple dark:text-pp-bright-purple hover:bg-pp-purple/10 dark:hover:bg-pp-bright-purple/20"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/login" className="flex items-center gap-1">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                  <Button asChild variant="default" size="sm" className="bg-pp-purple hover:bg-pp-purple/90 dark:bg-pp-bright-purple dark:hover:bg-pp-bright-purple/90">
                    <Link to="/signup" className="flex items-center gap-1">
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2"
              >
                <span className="sr-only">
                  {mobileMenuOpen ? t("closeMenu") : t("openMenu")}
                </span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        } bg-white dark:bg-gray-900 shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                location.pathname === link.href
                  ? "bg-pp-purple/10 text-pp-purple dark:bg-pp-bright-purple/20 dark:text-pp-bright-purple"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Auth buttons for mobile */}
          {isAuthenticated ? (
            <div className="flex flex-col space-y-1 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Signed in as {user?.name}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="justify-start px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-1 pt-2 border-t border-gray-200 dark:border-gray-700">
              <Link
                to="/login"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-pp-purple dark:text-pp-bright-purple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="h-5 w-5 mr-2" />
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-pp-purple dark:text-pp-bright-purple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
