import { Button, Col, Container, Row } from "react-bootstrap"
import Img2 from "../assets/Esecutivi/Img2.png"
import HoverAnimatedImage from "./HoverAnimatedImage";
import { useNavigate } from "react-router-dom";


function SectionTwo() {

    const navigate = useNavigate();

    const handleRegisterPage = () => {
      navigate("/register");
    }
const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
}

    return (
        <Container className="my-5 p-5 overflow-hidden">
            <Row className="row-cols-lg-2 row-cols-1">
                <Col
                 data-aos="fade-right"
                 data-aos-duration="2000"
                 data-aos-offset="200"
                 >
                <div className="w-100">
                {/* <img className="img-fluid" src={img1} alt="Immagine 2" /> */}
                <HoverAnimatedImage src={Img2} alt="Immagine 2" animationType="reverse" />
                </div>
                </Col>
                <Col 
                data-aos="fade-left"
                data-aos-duration="2000"
                data-aos-offset="100"
                >
                    <div className="d-flex flex-column gap-4 ms-md-5 mt-4">
                    <div className="section-title-two">
                        <h4 className="sub-title">One App, One Team</h4>
                    </div>
                    <h2 className="text-secondary"> <span style={{fontStyle: "italic", fontWeight: "bold"}}> Tutte </span> le informazioni a portata <br /> di click!</h2>
                    <p style={{color: "#333333"}}>Tramite <span style={{fontStyle: "italic", fontWeight: "bold"}}>AthleteX</span> avrai la possibilità di consultare tutte le informazioni relative al tuo team, tutte le statistiche della squadra <br /> e dei tuoi giocatori</p>
                    <div className="d-flex flex-column flex-md-row gap-3 mt-3 align-items-center">
                        <Button variant="outline-primary" className="fw-semibold" onClick={handleRegisterPage}>Iscriviti</Button>
                        <Button variant="link" className="fw-semibold" onClick={scrollToTop} style={{textDecoration: "none"}}>Per saperne di più</Button>
                    </div>
                    </div>
                    </Col>
            </Row>
             </Container>
   )
}

export default SectionTwo