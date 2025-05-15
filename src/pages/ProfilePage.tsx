
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { BookedSession, useBookedSessions } from "@/hooks/use-booked-sessions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MessageSquare, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { bookedSessions, cancelSession, isLoading } = useBookedSessions();
  const [activeTab, setActiveTab] = useState("upcoming");

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const filteredSessions = bookedSessions.filter(session => {
    if (activeTab === "upcoming") {
      return session.status === "upcoming";
    } else if (activeTab === "completed") {
      return session.status === "completed";
    } else {
      return session.status === "cancelled";
    }
  });

  const handleCancelSession = (sessionId: string) => {
    cancelSession(sessionId);
    toast({
      title: "Session cancelled",
      description: "The session has been cancelled successfully."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
            <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-pp-purple">
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="mt-4 md:mt-0"
                onClick={logout}
              >
                Sign Out
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">My Mentoring Sessions</h2>
            
            <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <Skeleton className="h-10 w-10 rounded-full" />
                              <div>
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-4 w-16 mt-1" />
                              </div>
                            </div>
                            <Skeleton className="h-6 w-20" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : filteredSessions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSessions.map((session) => (
                      <Card key={session.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-10 w-10 border border-pp-purple">
                                <AvatarImage src={session.mentorImage} alt={session.mentorName} />
                                <AvatarFallback>{session.mentorName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">{session.mentorName}</CardTitle>
                                <p className="text-sm text-gray-500">Mentor</p>
                              </div>
                            </div>
                            <Badge 
                              className={
                                session.status === 'upcoming' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : session.status === 'completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                              }
                            >
                              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center text-gray-700">
                              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{session.date}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{session.time} ({session.duration} min)</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{session.topic}</span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <span className="font-medium">Price:</span> {session.price}
                            </div>
                          </div>
                        </CardContent>
                        {session.status === "upcoming" && (
                          <CardFooter className="bg-gray-50 dark:bg-gray-800">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="flex items-center w-full">
                                  <X className="h-4 w-4 mr-2" /> Cancel Session
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Cancel this session?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel your session with {session.mentorName}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Keep Session</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleCancelSession(session.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Yes, Cancel
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </CardFooter>
                        )}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    {activeTab === "upcoming" ? (
                      <>
                        <p className="mb-4">You don't have any upcoming sessions.</p>
                        <Button 
                          onClick={() => navigate('/mentors')}
                          className="bg-pp-purple hover:bg-pp-bright-purple"
                        >
                          Find a Mentor
                        </Button>
                      </>
                    ) : activeTab === "completed" ? (
                      <p>You don't have any completed sessions yet.</p>
                    ) : (
                      <p>You don't have any cancelled sessions.</p>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
