import React from "react";
import Spot from "../components/Spot";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="pageWrapper">
      <div className="pageCentered">
        <div className="landingContent">
          <div className="landingLogo">
            <div className="logo--title">
              <span className="logo--title1">S </span>
              <span className="logo--title2">P </span>
              <span className="logo--title3">O </span>
              <span className="logo--title4">T </span>
              <span className="logo--title5">S</span>
            </div>
            <span className="logo--subtitle">The Color Diary</span>
          </div>
          <div className="landingDots">
            <Spot />
            <Spot />
            <Spot />
            <Spot />
            <Spot />
          </div>
          <div className="landingButtons">
            <div className="landingButton">
              <Link to="/login">Login</Link>
            </div>
            <div className="landingButton">
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
