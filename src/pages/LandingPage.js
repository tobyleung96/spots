import React from "react";
import SpotsArrays from "../components/SpotsArraysWrapper";
import { Link, useNavigate } from "react-router-dom";
import convert from "color-convert/conversions";

export default function LandingPage() {
  const randomSpotsData = [
    [
      "rgb(" +
        convert.hsv
          .rgb([Math.floor(Math.random() * 255) + 1, 100, 100])
          .toString() +
        ")",
      "rgb(" +
        convert.hsv.rgb([Math.floor(Math.random() * 255) + 1, 100, 100]) +
        ")",
      "rgb(" +
        convert.hsv.rgb([Math.floor(Math.random() * 255) + 1, 100, 100]) +
        ")",
      "rgb(" +
        convert.hsv.rgb([Math.floor(Math.random() * 255) + 1, 100, 100]) +
        ")",
      "rgb(" +
        convert.hsv.rgb([Math.floor(Math.random() * 255) + 1, 100, 100]) +
        ")",
    ],
  ];

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
            <SpotsArrays spotsData={randomSpotsData} />
          </div>
          <div className="landingButtons">
            <div className="landingButton">
              <Link className="landingButtonInside" to="/login">
                Login
              </Link>
            </div>
            <div className="landingButton">
              <Link className="landingButtonInside" to="/register">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
