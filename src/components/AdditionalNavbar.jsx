import { useEffect, useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/Esecutivi/Logo/svg/AthleteX - colore 5.svg';
import '../style/AdditionalNavbar.scss';

const AdditionalNavbar = () => {

  const navigate = useNavigate();

  const handleRegisterPage = () => {
    navigate("/register");
  }
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 250) { 
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLoginPage = () => {
    navigate("/login");
  }

  return (
    <Navbar expand="lg" className={`additional-navbar ${show ? 'show' : ''} bg-secondary shadow-sm fixed-top`}>
      <Container >
        <Navbar.Brand as={NavLink} to={"/"}>
          <img src={logo} width="150" height="75" alt="AthleteX logo" />
        </Navbar.Brand>
          <Nav className="ms-auto d-flex gap-4">
            <Button variant="outline-primary" className="btn-acc d-none d-lg-block" onClick={handleLoginPage}>Accedi</Button>
            <Button variant="primary" className="btn-reg d-none d-lg-block"  onClick={handleRegisterPage}>Registrati</Button>
          </Nav>
      </Container>
    </Navbar>
  );
};

export default AdditionalNavbar;
