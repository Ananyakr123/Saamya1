import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, User, Clock, LogOut, Video, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const PsychologistDashboard = () => {
  // Mock data for appointments
  const upcomingAppointments = [
    {
      id: 1,
      patientName: "Jordan M.",
      time: "2:00 PM",
      date: "Today",
      type: "Video Session",
      duration: "50 minutes",
      isUrgent: false
    },
    {
      id: 2,
      patientName: "Casey L.",
      time: "4:00 PM",
      date: "Today",
      type: "Follow-up Session",
      duration: "30 minutes",
      isUrgent: false
    },
    {
      id: 3,
      patientName: "Riley S.",
      time: "10:00 AM",
      date: "Tomorrow",
      type: "Initial Consultation",
      duration: "60 minutes",
      isUrgent: true
    }
  ];

  // Mock data for active sessions
  const activeSessions = [
    {
      id: 1,
      patientName: "Alex K.",
      startTime: "1:15 PM",
      status: "In Session",
      classification: "Intermediate"
    },
    {
      id: 2,
      patientName: "Taylor R.",
      startTime: "1:45 PM",
      status: "Waiting",
      classification: "Advanced"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <header className="bg-white shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Saamya</span>
              <Badge className="bg-accent text-accent-foreground">Psychologist</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Dr. Sarah Chen</span>
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Professional Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome to your practice dashboard. Manage your appointments and active sessions 
            with young people seeking mental health support.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">8</div>
              <div className="text-sm text-muted-foreground">Today's Sessions</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 text-secondary-dark mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">42</div>
              <div className="text-sm text-muted-foreground">Active Patients</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-accent-dark mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">2</div>
              <div className="text-sm text-muted-foreground">In Session Now</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground">Patient Satisfaction</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Sessions */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Active Sessions
            </h2>
            <Button variant="primary">
              Emergency Protocol
            </Button>
          </div>

          {activeSessions.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {activeSessions.map((session) => (
                <Card key={session.id} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold text-foreground">{session.patientName}</span>
                        <Badge className={session.status === "In Session" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}>
                          {session.status}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {session.classification}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                      <Clock className="h-4 w-4" />
                      <span>Started at {session.startTime}</span>
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="primary" size="sm" className="flex items-center space-x-2">
                        <Video className="h-4 w-4" />
                        <span>Join Session</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Notes</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-soft">
              <CardContent className="p-12 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Active Sessions</h3>
                <p className="text-muted-foreground">
                  No current active sessions. Your next appointment starts soon.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Upcoming Appointments
            </h2>
            <Button variant="secondary">
              View Full Schedule
            </Button>
          </div>

          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold text-foreground">{appointment.patientName}</span>
                        {appointment.isUrgent && (
                          <Badge className="bg-destructive text-destructive-foreground text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <span>({appointment.duration})</span>
                      </div>
                      <p className="text-muted-foreground">{appointment.type}</p>
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="primary" size="sm" className="flex items-center space-x-2">
                        <Video className="h-4 w-4" />
                        <span>Start Session</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <User className="h-6 w-6 text-primary" />
                  <span>Patient Records</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access and update patient files and session notes.
                </p>
                <Button variant="secondary" className="w-full">
                  View Records
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-accent-dark" />
                  <span>Schedule Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage your availability and appointment slots.
                </p>
                <Button variant="secondary" className="w-full">
                  Manage Schedule
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-secondary-dark" />
                  <span>Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Professional resources and youth mental health guidelines.
                </p>
                <Button variant="secondary" className="w-full">
                  View Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PsychologistDashboard;