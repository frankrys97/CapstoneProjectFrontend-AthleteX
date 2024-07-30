import { Button, Col, Container, Row } from "react-bootstrap";
import "../style/HeroSection.scss";
import { useNavigate } from "react-router-dom";
function HeroSection() {
  const navigate = useNavigate();

  const handleRegisterPage = () => {
    navigate("/register");
  }
  return (
    <Container className="hero-container">
      <Row className="justify-content-center align-items-center text-center">
        <Col>
        <div className="d-flex flex-column align-items-center justify-content-center gap-4">

          <h1> <span className="fw-bold">Il </span>  <span style={{fontStyle: "italic", fontWeight: "bold"}}> software gestionale </span> <span className="fw-bold">n°1</span>  <br /> per gestire la tua squadra!</h1>
          <p className="fs-5">Semplifica il lavoro e la comunicazioni <br /> all&#39;interno del tuo team</p>

       
          <div className="d-flex flex-column flex-md-row gap-3 mt-5"  >
            <Button variant="outline-light" className="btn-reg" onClick={handleRegisterPage}>Iscrivi una squadra</Button>
            <Button variant="light" className="btn-acc">Unisciti ad una squadra</Button>
          </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HeroSection;
