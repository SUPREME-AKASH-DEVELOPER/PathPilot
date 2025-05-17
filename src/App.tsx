
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import ProfilePage from '@/pages/ProfilePage';
import QuizPage from '@/pages/QuizPage';
import GeminiChatPage from '@/pages/GeminiChatPage';
import LibraryPage from '@/pages/LibraryPage';
import CareersPage from '@/pages/CareersPage';
import ParentZonePage from '@/pages/ParentZonePage';
import MentorsPage from '@/pages/MentorsPage';
import MentorDetailPage from '@/pages/MentorDetailPage';
import NotFound from '@/pages/NotFound';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/chat" element={<GeminiChatPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/parent" element={<ParentZonePage />} />
                <Route path="/mentors" element={<MentorsPage />} />
                <Route path="/mentors/:mentorId" element={<MentorDetailPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </AuthProvider>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
