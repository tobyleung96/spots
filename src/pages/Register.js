import { React, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [user, loading]);

  return (
    <div>
      <Header />
      <div className="pageWrapperShortened">
        <div className="pageCentered">
          <div className="loginBubble">
            <div className="login--title">Register</div>
            <input
              type="text"
              className="login--input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
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
            <button className="login--button" onClick={register}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
