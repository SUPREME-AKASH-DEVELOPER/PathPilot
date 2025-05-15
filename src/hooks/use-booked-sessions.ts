
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface BookedSession {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorImage: string;
  date: string;
  time: string;
  duration: string;
  topic: string;
  price: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export function useBookedSessions() {
  const { user } = useAuth();
  const [bookedSessions, setBookedSessions] = useState<BookedSession[]>([]);

  // Load booked sessions from localStorage when component mounts
  useEffect(() => {
    if (user) {
      const savedSessions = localStorage.getItem(`bookedSessions-${user.id}`);
      if (savedSessions) {
        setBookedSessions(JSON.parse(savedSessions));
      }
    }
  }, [user]);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    if (user && bookedSessions.length > 0) {
      localStorage.setItem(`bookedSessions-${user.id}`, JSON.stringify(bookedSessions));
    }
  }, [bookedSessions, user]);

  const addBookedSession = (session: BookedSession) => {
    setBookedSessions(prev => [...prev, session]);
  };

  const cancelSession = (sessionId: string) => {
    setBookedSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, status: 'cancelled' as const } 
          : session
      )
    );
  };

  return {
    bookedSessions,
    addBookedSession,
    cancelSession
  };
}
