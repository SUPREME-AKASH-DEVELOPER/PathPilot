
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

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
  const [isLoading, setIsLoading] = useState(true);

  // Load booked sessions from localStorage when component mounts or user changes
  useEffect(() => {
    const loadSessions = () => {
      setIsLoading(true);
      if (user) {
        try {
          const savedSessions = localStorage.getItem(`bookedSessions-${user.id}`);
          if (savedSessions) {
            setBookedSessions(JSON.parse(savedSessions));
            console.log(`Loaded sessions for user ${user.id}:`, JSON.parse(savedSessions));
          } else {
            console.log(`No sessions found for user ${user.id}`);
            setBookedSessions([]);
          }
        } catch (error) {
          console.error('Error loading booked sessions:', error);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not load your booked sessions.'
          });
          setBookedSessions([]);
        }
      } else {
        console.log('No user logged in, clearing sessions');
        setBookedSessions([]);
      }
      setIsLoading(false);
    };

    loadSessions();
  }, [user]);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    if (user && bookedSessions.length > 0) {
      try {
        localStorage.setItem(`bookedSessions-${user.id}`, JSON.stringify(bookedSessions));
        console.log(`Saved sessions for user ${user.id}:`, bookedSessions);
      } catch (error) {
        console.error('Error saving booked sessions:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not save your session booking.'
        });
      }
    }
  }, [bookedSessions, user]);

  const addBookedSession = (session: BookedSession) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication required',
        description: 'Please log in to book a session.'
      });
      return;
    }
    
    setBookedSessions(prev => {
      const newSessions = [...prev, session];
      return newSessions;
    });
    
    toast({
      title: 'Session booked',
      description: 'Your session has been booked successfully.'
    });
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
    isLoading,
    addBookedSession,
    cancelSession
  };
}
