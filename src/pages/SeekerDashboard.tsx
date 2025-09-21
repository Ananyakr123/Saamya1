import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AiChat from "@/components/ui/AiChat";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Bot, Calendar, MapPin, Users, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { queryHuggingFace, generateChatReply } from "../firebase/huggingface.ts";
import { saveResponse } from "../firebase/firestore.ts";






const SeekerDashboard = () => {
  const [classification, setClassification] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [aiInput, setAiInput] = useState<string>("");
  const [showChat, setShowChat] = useState<boolean>(false);


  useEffect(() => {
    // Get classification from storage or default to Beginner
    const savedClassification = localStorage.getItem("userClassification") || "Beginner";
    setClassification(savedClassification);
  }, []);


  const handleSubmit = async (input: string) => {
    try {
      const result = await queryHuggingFace(input);
      const text = generateChatReply(input, result);
      setResponse(text);
  
      // Save to Firestore
      await saveResponse("demoUser", input, text); // replace demoUser with real UID
    } catch (err) {
      setResponse("Error: " + err);
    }
  };


  const getClassificationColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-secondary text-secondary-foreground";
      case "Intermediate": return "bg-accent text-accent-foreground";
      case "Advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getClassificationDescription = (level: string) => {
    switch (level) {
      case "Beginner":
        return "You're doing well! Let's build some helpful coping skills and connect you with peer support.";
      case "Intermediate":
        return "You could benefit from professional guidance. We'll help you connect with qualified psychologists.";
      case "Advanced":
        return "We want to make sure you get the best possible care. Let's connect you with professional experts right away.";
      default:
        return "We're here to support you on your wellness journey.";
    }
  };

  const renderSupportOptions = () => {
    switch (classification) {
      case "Beginner":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MessageCircle className="h-6 w-6 text-secondary-dark" />
                  <span>Chat with Volunteer</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Connect with a trained peer volunteer who understands what you're going through.
                </p>
                <Button variant="secondary" className="w-full">
                  Start Volunteer Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Bot className="h-6 w-6 text-primary" />
                  <span>Chat with AI Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="my-6 text-center">
                  <h2 className="text-xl font-bold mb-2">AI Support Chat</h2>
                  <Button className="mt-2" onClick={() => setShowChat(true)}>Open Chat</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "Intermediate":
        return (
          <div className="grid md:grid-cols-1 gap-6">
            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-accent-dark" />
                  <span>Book Psychologist Session</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Schedule a session with one of our licensed mental health professionals who can provide personalized guidance.
                </p>
                <Button variant="primary" className="w-full">
                  Book Session Now
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "Advanced":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span>Find Nearby Experts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Locate qualified mental health professionals in your area for in-person support.
                </p>
                <Button variant="primary" className="w-full">
                  Find Local Experts
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-accent-dark" />
                  <span>Platform Experts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Connect with our network of specialized mental health professionals online.
                </p>
                <Button variant="primary" className="w-full">
                  View Platform Experts
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
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
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Welcome back!</span>
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
        {/* Classification Result */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Wellness Dashboard
          </h1>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="text-lg text-muted-foreground">Support Level:</span>
            <Badge className={`text-lg px-4 py-2 font-semibold ${getClassificationColor(classification)}`}>
              {classification}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {getClassificationDescription(classification)}
          </p>
        </div>

        {/* Support Options */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Your Recommended Support Options
          </h2>
          {renderSupportOptions()}
        </div>

        <Dialog open={showChat} onOpenChange={setShowChat}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>AI Support</DialogTitle>
            </DialogHeader>
            <AiChat userId="demoUser" />
          </DialogContent>
        </Dialog>

        {/* Additional Resources */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Additional Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Wellness Tips</h3>
                <p className="text-sm text-muted-foreground">Daily tips for mental wellness</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-30 ">
              <CardContent className="p-6 text-center ">
                <Users className="h-8 w-8 text-secondary-dark mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 ">Community</h3>
                <p className="text-sm text-muted-foreground">Join supportive group discussions</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-accent-dark mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">Monitor your wellness journey</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeekerDashboard;