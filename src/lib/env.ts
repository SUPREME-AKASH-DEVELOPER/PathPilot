
// Environment variables utility
// Since we can't modify .gitignore, we're creating a local environment management system
// WARNING: In a production environment, you should use proper environment variable management

// Store sensitive data in this object
// This approach is only for development purposes
export const ENV = {
  // MongoDB connection details
  MONGODB_URI: "mongodb://localhost:27017",
  MONGODB_DB_NAME: "mentorship_app",
  
  // App secrets
  JWT_SECRET: "your_jwt_secret_key_here",
  
  // Google Gemini API
  GEMINI_API_KEY: "AIzaSyCwBEPts8OarwTet1h-khpoCcpDkzXNM7Y",
  GEMINI_MODEL: "gemini-2.0-flash",
  
  // Add other environment variables as needed
};

// Helper function to get environment variables with type safety
export function getEnv<T extends keyof typeof ENV>(key: T): typeof ENV[T] {
  return ENV[key];
}

// Helper to check if we're in development mode
export const isDev = () => {
  return import.meta.env.DEV || import.meta.env.MODE === 'development';
};

// Display a warning in development mode
if (isDev()) {
  console.warn(
    "⚠️ Using local environment configuration. In production, use proper environment variable management."
  );
}
