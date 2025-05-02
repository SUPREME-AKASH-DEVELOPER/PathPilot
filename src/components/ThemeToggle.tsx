
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme}
      className="px-2 relative"
    >
      <Sun className={`h-5 w-5 transition-all ${theme === 'dark' ? 'scale-0 absolute' : 'scale-100'}`} />
      <Moon className={`h-5 w-5 transition-all ${theme === 'dark' ? 'scale-100' : 'scale-0 absolute'}`} />
      <span className="sr-only">
        {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
      
      {/* Animation effect when toggling */}
      {theme === 'dark' ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          className="absolute inset-0 rounded-full bg-pp-purple opacity-20"
        />
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          className="absolute inset-0 rounded-full bg-amber-300 opacity-20"
        />
      )}
    </Button>
  );
}
