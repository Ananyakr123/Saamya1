// Add these imports at the top of your file
import { auth, db } from '../firebase/config.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";



const Signup = () => {
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async(e: React.FormEvent) => {
e.preventDefault()
    try {
      // Step 1: Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  

      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Role:", role);



      
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        role: role,
        Password: password,
        ...(role === "seeker" && { mentalHealthLevel: "easy" }),
      });
  
      console.log("User created successfully with UID:", user.uid);
      alert("Account created successfully! Redirecting...");
  
      // Step 3: Navigate after successful signup
      if (role === "seeker") {
        navigate("/questionnaire");
      } else if (role === "volunteer") {
        navigate("/volunteer-dashboard");
      } else if (role === "psychologist") {
        navigate("/psychologist-dashboard");
      }
    } catch (error: any) {
      console.error("Signup failed:", error);
      alert(`Signup failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary hover:text-primary-glow transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mt-4 mb-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Saamya</span>
          </div>
          <p className="text-muted-foreground">Start your wellness journey today</p>
        </div>

        {/* Signup Form */}
        <Card className="border-0 shadow-medium">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-foreground">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={(value) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seeker">Seeker</SelectItem>
                    <SelectItem value="volunteer">volunteer</SelectItem>
                    <SelectItem value="psychologist">Psychologist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit">Sign Up</Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:text-primary-glow font-medium">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;