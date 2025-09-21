import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Clock, User, LogOut, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const VolunteerDashboard = () => {
  // Mock data for seekers requesting support
  const chatRequests = [
    {
      id: 1,
      name: "Alex",
      urgency: "moderate",
      topic: "Anxiety about upcoming exams",
      timeWaiting: "5 minutes",
      classification: "Beginner"
    },
    {
      id: 2,
      name: "Jamie",
      urgency: "low",
      topic: "Feeling stressed about social situations",
      timeWaiting: "12 minutes",
      classification: "Beginner"
    },
    {
      id: 3,
      name: "Sam",
      urgency: "moderate",
      topic: "Need someone to talk to about family issues",
      timeWaiting: "3 minutes",
      classification: "Beginner"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "moderate": return "bg-accent text-accent-foreground";
      case "low": return "bg-secondary text-secondary-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "high": return <AlertCircle className="h-4 w-4" />;
      case "moderate": return <Clock className="h-4 w-4" />;
      case "low": return <MessageCircle className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <header className="bg-white shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Saamya</span>
              <Badge className="bg-secondary text-secondary-foreground">Volunteer</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Ready to help!</span>
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
            Volunteer Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thank you for being part of our caring community. Your support makes a real difference 
            in someone's wellness journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">24</div>
              <div className="text-sm text-muted-foreground">Chats This Month</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-secondary-dark mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">4.9</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-accent-dark mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Active Requests</div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Requests */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Seekers Requesting Support
            </h2>
            <Button variant="primary">
              Refresh Requests
            </Button>
          </div>

          <div className="space-y-4">
            {chatRequests.map((request) => (
              <Card key={request.id} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold text-foreground">{request.name}</span>
                        <Badge className={`text-xs ${getUrgencyColor(request.urgency)} flex items-center space-x-1`}>
                          {getUrgencyIcon(request.urgency)}
                          <span>{request.urgency}</span>
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {request.classification}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{request.topic}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Waiting for {request.timeWaiting}</span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="primary" size="sm" className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>Start Chat</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {chatRequests.length === 0 && (
            <Card className="border-0 shadow-soft">
              <CardContent className="p-12 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Active Requests</h3>
                <p className="text-muted-foreground">
                  Great! There are no seekers waiting for support right now. 
                  We'll notify you when someone needs help.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-primary" />
                  <span>Volunteer Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access training materials and guidelines for effective peer support.
                </p>
                <Button variant="secondary" className="w-full">
                  View Resources
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MessageCircle className="h-6 w-6 text-accent-dark" />
                  <span>Chat History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Review your previous conversations and support sessions.
                </p>
                <Button variant="secondary" className="w-full">
                  View History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VolunteerDashboard;