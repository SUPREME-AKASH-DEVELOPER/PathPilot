
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Users } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Check if the path includes "mentors" to customize the error message
  const isMentorPath = location.pathname.includes('/mentors/');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center px-4">
        <h1 className="text-8xl font-bold text-pp-purple dark:text-pp-bright-purple mb-4">404</h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-6">
          {isMentorPath ? "Mentor not found" : "Oops! Page not found"}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {isMentorPath 
            ? "The mentor you're looking for doesn't exist or has been moved. Please choose from our available mentors."
            : "The page you're looking for doesn't exist or has been moved."
          }
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="bg-pp-purple hover:bg-pp-bright-purple w-full sm:w-auto" asChild>
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          {isMentorPath && (
            <Button variant="outline" className="w-full sm:w-auto" asChild>
              <Link to="/mentors" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                View All Mentors
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotFound;
