import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Heart, MapPin, Users, Brain, Shield } from "lucide-react";
import { Link } from "react-router-dom";



import { useEffect } from "react";




const Landing = () => {

  useEffect(() => {
    document.title = "Saamya";   // or "" to remove
  }, []);







  return (


    <div className="min-h-screen bg-gradient-calm">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Saamya</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Confidential, Empathetic
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Mental Wellness </span>
            Support
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with AI support, caring volunteers, and professional psychologists. 
            Your mental health journey starts here, in a safe and understanding space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Get Support Now
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                I'm a Volunteer
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Psychologist Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">How Saamya Supports You</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Multiple pathways to mental wellness, tailored to your needs and comfort level
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Brain,
              title: "AI Chat Support",
              description: "24/7 intelligent conversations to help you process thoughts and feelings",
              color: "text-primary"
            },
            {
              icon: MessageCircle,
              title: "Volunteer Chat",
              description: "Connect with trained peer volunteers who understand your journey",
              color: "text-secondary-dark"
            },
            {
              icon: Users,
              title: "Expert Booking",
              description: "Schedule sessions with licensed mental health professionals",
              color: "text-accent-dark"
            },
            {
              icon: MapPin,
              title: "Nearby Experts",
              description: "Find qualified therapists and counselors in your area",
              color: "text-primary"
            }
          ].map((feature, index) => (
            <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up">
              <CardContent className="p-6 text-center">
                <feature.icon className={`h-12 w-12 ${feature.color} mx-auto mb-4`} />
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-6">About Saamya</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Saamya is designed specifically for young people, by people who understand the unique challenges 
              of youth mental health. Our platform combines the accessibility of AI, the warmth of peer support, 
              and the expertise of professional care.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: Shield,
                  title: "Confidential & Safe",
                  description: "Your privacy and safety are our top priorities"
                },
                {
                  icon: Heart,
                  title: "Youth-Centered",
                  description: "Built by and for young people who get it"
                },
                {
                  icon: Users,
                  title: "Community Driven",
                  description: "Peer support from people who've been there"
                }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <value.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gradient-secondary py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "Coming", label: "Soon" },
              { number: "Building", label: "Community" },
              { number: "24/7", label: "Vision" }
            ].map((stat, index) => (
              <div key={index} className="animate-gentle-bounce">
                <div className="text-4xl font-bold text-secondary-dark mb-2">{stat.number}</div>
                <div className="text-lg text-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Saamya</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Empowering youth mental wellness through technology and community
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 Saamya. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;