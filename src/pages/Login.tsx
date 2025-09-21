import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config.js"; // your firebase config file






const Login = () => {
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
  
      // fetch user role from Firestore
      const docSnap = await getDoc(doc(db, "users", uid));
      if (docSnap.exists()) {
        const userRole = docSnap.data().role; // renamed variable
  
        if (userRole === "seeker") navigate("/seeker-dashboard");
        else if (userRole === "volunteer") navigate("/volunteer-dashboard");
        else if (userRole === "psychologist") navigate("/psychologist-dashboard");
        else alert("Unknown role in database.");
      } else {
        alert("No role assigned. Please contact admin.");
      }
    } catch (err: any) {
      alert("Login failed: " + err.message);
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
          <p className="text-muted-foreground">Welcome back to your wellness journey</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-medium">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-foreground">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">I am a...</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seeker">Seeker (Looking for support)</SelectItem>
                    <SelectItem value="volunteer">Volunteer (Peer helper)</SelectItem>
                    <SelectItem value="psychologist">Psychologist (Professional)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="w-full" size="lg">
                Login
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:text-primary-glow font-medium">
                    Sign up here
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

export default Login;