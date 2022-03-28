import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import Spot from "../components/Spot"


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
                        <Button className="landingButton" variant="dark">Login</Button>
                        <Button className="landingButton" variant="dark">Register</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
