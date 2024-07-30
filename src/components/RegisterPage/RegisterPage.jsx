import { useState, useEffect } from 'react';
import { Col, Container, Row, Form, Button, Modal, InputGroup, Navbar } from "react-bootstrap";
import { FaInfoCircle, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import logo from "../../assets/Esecutivi/Logo/svg/AthleteX - colore 1.svg";
import logo2 from "../../assets/Esecutivi/Logo/svg/AthleteX - colore 4.svg";
import axios from 'axios';
import "../../style/RegisterPage/RegisterPage.scss";
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../Footer.jsx';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
    userType: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");

  useEffect(() => {
    const checkAvailability = async () => {
      const newErrors = { ...errors };
      if (formData.username && !errors.username) {
        try {
          const response = await axios.get(`http://localhost:3001/users/check-username/${formData.username}`);
          setUsernameAvailable(!response.data);
          if (response.data) {
            newErrors.username = 'Username non disponibile.';
          } else {
            delete newErrors.username;
          }
        } catch (error) {
          console.error('Error checking username availability', error);
        }
      }
      if (formData.email && !errors.email) {
        try {
          const response = await axios.get(`http://localhost:3001/users/check-email/${formData.email}`);
          setEmailAvailable(!response.data);
          if (response.data) {
            newErrors.email = 'Email non disponibile.';
          } else {
            delete newErrors.email;
          }
        } catch (error) {
          console.error('Error checking email availability', error);
        }
      }
      setErrors(newErrors);
    };

    const handler = setTimeout(checkAvailability, 500);
    return () => clearTimeout(handler);
  }, [formData.username, formData.email, errors]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    const newErrors = { ...errors };

    // Validazione per nome e cognome
    if (name === 'name' || name === 'surname') {
      if (value.length < 3 || value.length > 50) {
        newErrors[name] = `Il ${name === 'name' ? 'nome' : 'cognome'} deve avere almeno 3 caratteri e massimo 50 caratteri.`;
      } else {
        delete newErrors[name];
      }
    }

    // Validazione per email
    if (name === 'email') {
      if (!validateEmail(value)) {
        newErrors.email = 'Email non valida.';
      } else {
        delete newErrors.email;
      }
    }

    // Validazione per username
    if (name === 'username') {
      if (value.length < 3 || value.length > 30) {
        newErrors.username = 'Lo username deve avere almeno 3 caratteri e massimo 30 caratteri.';
      } else {
        delete newErrors.username;
      }
    }

    // Validazione per password
    if (name === 'password') {
      if (!validatePassword(value)) {
        newErrors.password = 'La password deve contenere almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale.';
      } else {
        delete newErrors.password;
      }
    }

    // Validazione per conferma password
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        newErrors.confirmPassword = 'Le password non coincidono.';
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0 || !usernameAvailable || !emailAvailable) {
      console.log('Ci sono errori nel form');
      return;
    }

    setOverlayVisible(true);
    setOverlayMessage("Registrazione in corso...");
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/auth/register', formData);
      console.log(response.data);
      setOverlayMessage("Registrazione avvenuta con successo!");
      setFormData({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        userType: ''
      });
      setTimeout(() => navigate('/login'), 3000); // Naviga verso la pagina di login dopo 3 secondi
    } catch (error) {
      setOverlayMessage("Registrazione fallita. Riprova.");
      console.error('There was an error!', error);
    } finally {
      setLoading(false);
      setTimeout(() => setOverlayVisible(false), 3000); // Nascondi l'overlay dopo 3 secondi
    }
  };

  return (
    <>
      <Container fluid className="vh-100 d-flex align-items-center justify-content-center p-0 text-secondary register-container">
        <Row className="w-100 h-100 m-0">
          <Col md={3} className="left-column position-relative d-none d-md-block">
            <Navbar.Brand as={NavLink} to={"/"}>
              <img src={logo2} width="150" height="75" alt="AthleteX logo" />
            </Navbar.Brand>
            <h3 className="text-secondary position-absolute" style={{ top: "40%" }}>Crea la tua squadra in pochi click.</h3>
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
            <h1 className='page-title'>Benvenuto</h1>
            <Form onSubmit={handleSubmit} className="px-3 pb-3" style={{ width: '100%', maxWidth: '30rem' }}>
              <Form.Group controlId="name" className="mb-3 position-relative">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Inserisci il tuo nome"
                  required
                />
                {errors.name && formData.name && <p className="text-danger">{errors.name}</p>}
                {!errors.name && formData.name && <FaCheckCircle className="text-success position-absolute icon-success" />}
              </Form.Group>
              <Form.Group controlId="surname" className="mb-3 position-relative">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Inserisci il tuo cognome"
                  required
                />
                {errors.surname && formData.surname && <p className="text-danger">{errors.surname}</p>}
                {!errors.surname && formData.surname && <FaCheckCircle className="text-success position-absolute icon-success" />}
              </Form.Group>
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
                {errors.email && formData.email && <p className="text-danger">{errors.email}</p>}
                {!errors.email && formData.email && emailAvailable && <FaCheckCircle className="text-success position-absolute icon-success" />}
              </Form.Group>
              <Form.Group controlId="username" className="mb-3 position-relative">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Inserisci il tuo username"
                  required
                />
                {errors.username && formData.username && <p className="text-danger">{errors.username}</p>}
                {!errors.username && formData.username && usernameAvailable && <FaCheckCircle className="text-success position-absolute icon-success" />}
              </Form.Group>
              <Form.Group controlId="password" className="mb-3 position-relative">
                <Form.Label className='position-relative'>Password
                  <Button variant="link" className='p-0 position-absolute' style={{ right: '-40%', top: '-25%', zIndex: 9999 }} size='lg' onClick={() => setShowModal(true)}>
                    <FaInfoCircle />
                  </Button>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={showPassword ? "Inserisci la tua password" : "********"}
                    required
                  />
                  <Button size='sm' variant="link" className='p-0 border-0 position-absolute' style={{ right: formData.password && !errors.password ? "10%" : "5%", top: '20%', zIndex: 9999 }} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
                {errors.password && formData.password && <p className="text-danger">{errors.password}</p>}
                {formData.password && !errors.password && <FaCheckCircle className="text-success position-absolute icon-success" style={{ zIndex: 9999 }} />}
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="mb-3 position-relative">
                <Form.Label>Conferma Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={showPassword ? "Conferma la tua password" : "********"}
                  required
                />
                {errors.confirmPassword && formData.confirmPassword && formData.password && <p className="text-danger">{errors.confirmPassword}</p>}
                {formData.confirmPassword && !errors.confirmPassword && <FaCheckCircle className="text-success position-absolute icon-success" />}
              </Form.Group>
              <Form.Group controlId="userType" className="mb-4">
                <Form.Label>Tipo di Utente</Form.Label>
                <Form.Select name="userType" value={formData.userType} onChange={handleChange}>
                  <option value="" disabled>Seleziona il tipo di utente</option>
                  <option value="Coach">Coach</option>
                  <option value="Giocatore">Giocatore</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit" className="fw-semibold" disabled={loading}>
                Registrati
              </Button>
            </Form>
          </Col>
        </Row>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Regole della Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              <li>Almeno 8 caratteri</li>
              <li>Almeno una lettera maiuscola</li>
              <li>Almeno un numero</li>
              <li>Almeno un carattere speciale</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>Chiudi</Button>
          </Modal.Footer>
        </Modal>
      </Container>
      {overlayVisible && (
        <div className="overlay-wrapper">
            {loading && (
              <div className="loader">
                <div className="ball ball1"></div>
                <div className="ball ball2"></div>
                <div className="ball ball3"></div>
              </div>
            )}
            <div className="overlay-message">{overlayMessage}</div>
        </div>
      )}

      <div className='footer-wrapper'>
        <Footer />
      </div>
    </>
  );
};

export default RegisterPage;
