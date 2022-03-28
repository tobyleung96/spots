import React from "react"
import { Form, Button } from "react-bootstrap"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Login() {
    return (
        <div>
            <Header />
            <div className="pageWrapperShortened">
                <div className="pageCentered">
                    <div className="loginBubble">
                        <div className="login--title">Login</div>
                        <Form className="login--form">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="form--label">Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="form--label">Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="outline-secondary" type="submit">
                                Submit
                            </Button>
                            </Form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        
    )
}