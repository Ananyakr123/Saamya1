import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Questionnaire from "./pages/Questionnaire";
import SeekerDashboard from "./pages/SeekerDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import PsychologistDashboard from "./pages/PsychologistDashboard";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { queryHuggingFace } from "./firebase/huggingface.ts";
import { saveResponse } from "./firebase/firestore.ts";
const queryClient = new QueryClient();

const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const handleSubmit = async () => {
    try {
      const result = await queryHuggingFace(input);
      const text = JSON.stringify(result, null, 2);

      setResponse(text);

      // 🔥 Save to Firestore (replace "demoUser" with logged-in user UID later)
      await saveResponse("demoUser", input, text);
    } catch (err) {
      setResponse("Error: " + err);
    }
  };
  return(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter  >
        <Routes>
          <Route path="/" element={<Landing />} />
          
          <Route
              path="/test-ai"
              element={
                <div className="p-6 text-center">
                  <h1 className="text-3xl font-bold mb-4">Saamya AI</h1>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something..."
                    className="border p-2 w-full max-w-lg"
                  />
                  <button
                    onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Submit
                  </button>
                  <pre className="mt-4 text-left bg-gray-100 p-4 rounded">
                    {response}
                  </pre>
                </div>
              }
            />
   
             <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/seeker-dashboard" element={<SeekerDashboard />} />
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          <Route path="/psychologist-dashboard" element={<PsychologistDashboard />} />
          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
        </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>);
};

export default App;
