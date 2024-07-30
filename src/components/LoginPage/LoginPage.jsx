import { useState, useRef, useEffect } from 'react';
import { Col, Container, Row, Form, Button, InputGroup, Navbar, Alert, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from "../../assets/Esecutivi/Logo/svg/AthleteX - colore 1.svg";
import logo2 from "../../assets/Esecutivi/Logo/svg/AthleteX - colore 4.svg";
import axios from 'axios';
import "../../style/RegisterPage/RegisterPage.scss";
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../Footer.jsx';
import { CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/index.js';


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false); // Stato per gestire lo spinner
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:3001/auth/login', formData);
    
      console.log(response.data.accessToken);
      dispatch(login(response.data.accessToken));
      
      setFormData({
        email: '',
        password: ''
      });
      setLoading(false); 
      navigate('/');
    } catch (error) {
      setError('Email o password non corretti.');
      setShake(true);
      setFormData({
        email: '',
        password: ''
      });
      setLoading(false); 
      setTimeout(() => setShake(false), 500); 
      console.error('There was an error!', error);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <Container fluid className="vh-100 d-flex align-items-center justify-content-center p-0 text-secondary login-container">
        <Row className="w-100 h-100 m-0">
          <Col md={3} className="left-column position-relative d-none d-md-block">
            <Navbar.Brand as={NavLink} to={"/"}>
              <img src={logo2} width="150" height="75" alt="AthleteX logo" />
            </Navbar.Brand>
            <h3 className="text-secondary position-absolute" style={{ top: "45%" }}>Accedi al tuo profilo!</h3>
          </Col>
          <Col className='d-block d-md-none p-0'>
            <Navbar expand="lg" className="bg-primary border-bottom border-3 border-white">
              <Container fluid>
                <Navbar.Brand as={NavLink} to={"/"}>
                  <img src={logo} width="100" height="50" alt="AthleteX logo" />
                </Navbar.Brand>
              </Container>
            </Navbar>
          </Col>
          <Col md={9} className="d-flex flex-column align-items-center justify-content-center right-column" style={{ backgroundColor: "#f0f0f2" }}>
            <h1>Accedi</h1>
            <CSSTransition in={shake} timeout={300} classNames="shake" nodeRef={formRef}>
              <Form ref={formRef} onSubmit={handleSubmit} className="px-3 pb-3" style={{ width: '100%', maxWidth: '30rem' }}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group controlId="email" className="mb-3 position-relative">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Inserisci la tua email"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3 position-relative">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={showPassword ? "Inserisci la tua password" : "********"}
                      required
                    />
                    <Button size='sm' variant="link" className='p-0 border-0 position-absolute' style={{ right: "5%", top: '20%', zIndex: 9999 }} onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>
                
                <Button variant="primary" type="submit" className="fw-semibold" disabled={loading} style={{ minWidth: '150px', height: '50px' }}>
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Loading...</span>
                    </>
                  ) : (
                    'Accedi'
                  )}
                </Button>
              </Form>
            </CSSTransition>
          </Col>
        </Row>
      </Container>
      <div className='footer-wrapper'>
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;
