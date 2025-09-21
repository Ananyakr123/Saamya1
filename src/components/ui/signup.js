import React, { useState } from "react";
import { signup } from "../firebaseAuth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default role

  const handleSignup = async () => {
    try {
      const user = await signup(email, password, role);
      console.log("Signed up user:", user);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="volunteer">Volunteer</option>
        <option value="psychologist">Psychologist</option>
      </select>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
