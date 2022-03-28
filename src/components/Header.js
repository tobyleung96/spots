import React from "react"
import { Container, Navbar } from "react-bootstrap"

export default function Header() {
    return (
        <header className="header">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand className="header--logo" href="/">S P O T S</Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    )
}