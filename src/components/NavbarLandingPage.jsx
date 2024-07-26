import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import logo from "../assets/Esecutivi/Logo/svg/AthleteX - colore 1.svg"

function NavbarLandingPage () {
    return (
        <Navbar expand="lg" className="bg-transparent border-bottom border-3 border-white position-absolute top-0 w-100">
        <Container>
          <Navbar.Brand as={NavLink} to={"/"}>
            <img src={logo} width="150" height="75" alt="AthleteX logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex gap-4">
            <Button variant="outline-light" className="btn-acc">Accedi</Button>
            <Button variant="light" className="btn-reg">Registrati</Button>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    )

}

export default NavbarLandingPage