import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Questionnaire = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    mood: "",
    stress: "",
    urgency: ""
  });
  const navigate = useNavigate();

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const questions = [
    {
      id: "mood",
      title: "How would you describe your current mood?",
      options: [
        { value: "great", label: "Great - feeling positive and energetic" },
        { value: "good", label: "Good - generally okay" },
        { value: "neutral", label: "Neutral - not great, not terrible" },
        { value: "low", label: "Low - feeling down or sad" },
        { value: "very-low", label: "Very low - struggling significantly" }
      ]
    },
    {
      id: "stress",
      title: "What's your current stress level?",
      options: [
        { value: "minimal", label: "Minimal - very manageable" },
        { value: "low", label: "Low - some stress but coping well" },
        { value: "moderate", label: "Moderate - noticeable but manageable" },
        { value: "high", label: "High - feeling overwhelmed" },
        { value: "extreme", label: "Extreme - crisis level stress" }
      ]
    },
    {
      id: "urgency",
      title: "How urgent is your need for support?",
      options: [
        { value: "planning", label: "Planning ahead - building coping skills" },
        { value: "soon", label: "Within a few days - could use some guidance" },
        { value: "today", label: "Today - really need to talk to someone" },
        { value: "now", label: "Right now - need immediate support" },
        { value: "crisis", label: "Crisis - need emergency help" }
      ]
    }
  ];

  const handleAnswerChange = (value: string) => {
    const questionId = questions[step - 1].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getClassification = () => {
    const { mood, stress, urgency } = answers;
    
    // Crisis indicators
    if (urgency === "crisis" || (mood === "very-low" && stress === "extreme")) {
      return "Advanced";
    }
    
    // Intermediate indicators
    if (urgency === "now" || urgency === "today" || 
        (mood === "low" && stress === "high") ||
        (mood === "very-low" && stress === "high")) {
      return "Intermediate";
    }
    
    // Default to Beginner for all other cases
    return "Beginner";
  };

  const handleSubmit = () => {
    const classification = getClassification();
    // Store classification and redirect
    localStorage.setItem("userClassification", classification);
    navigate("/seeker-dashboard");
  };

  const currentQuestion = questions[step - 1];
  const currentAnswer = answers[currentQuestion.id as keyof typeof answers];

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/signup" className="inline-flex items-center space-x-2 text-primary hover:text-primary-glow transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Signup</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mt-4 mb-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Saamya</span>
          </div>
          <p className="text-muted-foreground">Help us understand how to best support you</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="border-0 shadow-medium">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-foreground">
              {currentQuestion.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <Label htmlFor={option.value} className="text-base leading-relaxed cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!currentAnswer}
                className="flex items-center space-x-2"
              >
                <span>{step === totalSteps ? "Complete" : "Next"}</span>
                {step < totalSteps && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Your responses help us connect you with the right level of support.
            <br />
            All information is kept confidential and secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;