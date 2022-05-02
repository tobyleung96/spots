import { React, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      console.log(user);
      navigate("/home");
    }
  }, [user, loading]);

  return (
    <div>
      <Header />
      <div className="pageWrapperShortened">
        <div className="pageCentered">
          <div className="loginBubble">
            <div className="login--title">Login</div>
            <input
              type="text"
              className="login--input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <input
              type="password"
              className="login--input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              className="login--button"
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
