import { useState } from 'react';
import { Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/Esecutivi/Logo/svg/AthleteX - colore 5.svg';
import './ThankYouPage.scss';

const ThankYouPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="thankyou-page">
            {/* Navbar */}
            <Navbar expand="lg" variant='light' className="bg-secondary w-100" style={{ height: '90px' }}>
                <Container>
                    <div className="d-flex align-items-center gap-3">

                    <Navbar.Brand as={NavLink} to={"/"}>
                        <img src={logo} width="150" height="75" alt="AthleteX logo" />
                    </Navbar.Brand>
                    <div onClick={handleCheckboxChange}>
                        <label className={`toggle ${isOpen ? 'open' : ''} d-lg-none`} htmlFor="checkbox">
                            <div id="bar1" className="bars"></div>
                            <div id="bar2" className="bars"></div>
                            <div id="bar3" className="bars"></div>
                        </label>
                    </div>
                    </div>
                    <Navbar.Collapse id="basic-navbar-nav" className={isOpen ? 'show' : ''}>
                        <Nav className="ms-auto d-flex gap-4">
                            <Button variant="outline-light" className="btn-acc" onClick={() => navigate("/login")}>Accedi</Button>
                            <Button variant="light" className="btn-reg" onClick={() => navigate("/register")}>Registrati</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Contenitore principale */}
            <Container fluid className="h-100 d-flex align-items-center justify-content-end thankyou-container">
                <Row className="justify-content-center" style={{zIndex: 99999}}>
                    <Col md={8}>
                    <div className='d-flex flex-column align-items-start justify-content-start ms-5'>

                        <h1 className='text-secondary' style={{fontWeight: "bold", fontStyle: "italic"}}> <span style={{fontSize: "4rem"}}>Grazie</span> <br />per la tua risposta!</h1>
                        <p>Capiamo che entrare a far parte di una squadra non sia una decisione facile.</p>
                        <div className="d-flex justify-content-center">
<button onClick={() => navigate("/")} className="button-home">
   <svg className="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
  Home
</button>
                    </div>


                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ThankYouPage;
