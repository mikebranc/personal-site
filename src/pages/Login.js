import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import "../login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/edit");
  }, [user, loading, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    logInWithEmailAndPassword(email, password);
  };

  return (
    <div className="loginWrapper">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="michaelBranconier">Michael Branconier</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="loginInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="loginInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submitButton">
          Go
        </button>
      </form>
    </div>
  );
}
