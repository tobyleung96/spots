import React from "react"
import Logo from "./components/Logo"
import { Container, Row, Col, Button } from "react-bootstrap"
import Spot from "./components/Spot"
import GlobalSpotsHistory from "./components/GlobalSpotsHistory"


export default function LandingPage() {
    return (
        <div>
            <Row>
                <Logo />
            </Row>
            <Row>
                <Col>
                    <Spot />
                </Col>
                <Col>
                    <Spot />
                </Col>
                <Col>
                    <Spot />
                </Col>
                <Col>
                    <Spot />
                </Col>
                <Col>
                    <Spot />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button href="#Login">Login</Button>
                </Col>
                <Col>
                    <Button href="#Register">Register</Button>
                </Col>
            </Row>
            <Row>
                <GlobalSpotsHistory />
            </Row>
        </div>
    )
}
