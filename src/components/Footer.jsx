import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../style/Footer.scss';

import logo from "../assets/Esecutivi/Logo/svg/AthleteX - colore 5.svg";

const Footer = () => {
  return (
    <footer className="footer-bg">
      <Container fluid className="text-center text-md-left">
        <Row>
          <Col md={12} className="text-center mb-4">
            <img src={logo} alt="Logo" className="footer-logo mb-5" />
            <p className="footer-description">
              AthleteX è un&#39;azienda dedicata a fornire le migliori soluzioni per il miglioramento delle performance degli atleti. La nostra missione è aiutare ogni atleta a raggiungere il massimo delle proprie capacità.
            </p>
          </Col>
          <Col md={12} className="text-center mb-4">
            <div className="footer-social-icons">
              <a href="https://facebook.com" className="social-icon" data-aos="fade-left" data-aos-delay="200">
                <FaFacebook  className='icons' />
              </a>
              <a href="https://twitter.com" className="social-icon" data-aos="fade-left" data-aos-delay="400">
                <FaTwitter  className='icons'/>
              </a>
              <a href="https://instagram.com" className="social-icon" data-aos="fade-left" data-aos-delay="600">
                <FaInstagram  className='icons'/>
              </a>
              <a href="https://linkedin.com" className="social-icon" data-aos="fade-left" data-aos-delay="800">
                <FaLinkedin className='icons' />
              </a>
            </div>
          </Col>
          <Col md={12}>
            <hr className="footer-separator" />
            <p className="footer-rights">
              &copy; {new Date().getFullYear()} AthleteX. Tutti i diritti riservati.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
