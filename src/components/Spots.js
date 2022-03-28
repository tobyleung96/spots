import React from "react"
import { HuePicker } from "react-color"
import { Container, Row, Col, Button } from "react-bootstrap"
import Spot from "./Spot"
import HuePickerExample from "./HuePickerExample"
import GlobalSpotsHistory from "./GlobalSpotsHistory"
import PersonalSpotsHistory from "./PersonalSpotsHistory"

export default function Spots() {
    return (
        <Container className="main">
            <Row className="huePickers">
                <Col>
                    {/* <HuePicker direction="vertical" width="16px" height="200px"/> */}
                    <HuePickerExample />
                </Col>
                <Col>
                    <HuePicker direction="vertical" width="16px" height="200px" className="huePicker"/>
                </Col>
                <Col>
                    <HuePicker direction="vertical" width="16px" height="200px" className="huePicker"/>
                </Col>
                <Col>
                    <HuePicker direction="vertical" width="16px" height="200px" className="huePicker"/>
                </Col>
                <Col>
                    <HuePicker direction="vertical" width="16px" height="200px" className="huePicker"/>
                </Col>
            </Row>
            <Row className="mainSpots">
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
            <Row className="confirmButtonRow">
                <Col>
                    <Button as="input" type="submit" value="Submit" />{' '}
                </Col>
            </Row>
            <Row className="toggleButtonsRow">
                <Col>
                    <Button>
                        World
                    </Button>
                </Col>
                <Col>
                    <Button>
                        Personal
                    </Button>
                </Col>
            </Row>
            <GlobalSpotsHistory />
            <PersonalSpotsHistory />
            <Row>
                <HuePickerExample />
            </Row>
        </Container>
    )
}