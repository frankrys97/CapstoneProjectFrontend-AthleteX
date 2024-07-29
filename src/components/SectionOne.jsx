import { Button, Col, Container, Row } from "react-bootstrap"
import img1 from "../assets/Esecutivi/Img1.png"
import HoverAnimatedImage from "./HoverAnimatedImage"
import { useNavigate } from "react-router-dom";


function SectionOne() {

    const navigate = useNavigate();

    const handleRegisterPage = () => {
      navigate("/register");
    }
    return (
        <Container className="my-5 p-5">
            <Row className="row-cols-lg-2 row-cols-1">
                <Col 
                data-aos="fade-right"
                data-aos-duration="2000"
                data-aos-offset="100"
                >
                    <div className="mt-4">



                   
                <div className="d-flex flex-column gap-4">
                    <div className="position-relative section-title-one">
                        <h4 className="sub-title">Sport Management</h4>
                    </div>
                    <h2 className="text-secondary"> <span style={{fontStyle: "italic", fontWeight: "bold"}}> Gestisci </span> il tuo team!</h2>
                    <p style={{color: "#333333"}}>L&#39;organizzazione di una squadra di calcio dovrebbe  essere sempre <br /> un&#39;esperienza piacevole ed alla portata di <span style={{fontStyle: "italic", fontWeight: "bold"}}> tutti</span>.</p>
                    <p style={{color: "#333333"}}>AthleteX è la soluzione easy  per l&#39;organizzazione della <br /> tua squadra.</p>
                    </div>
                    <div className="d-flex flex-column flex-md-row gap-4 mt-5">
                        <Button variant="outline-primary" className="fw-semibold" onClick={handleRegisterPage}> Iscrivi una squadra</Button>
                        <Button variant="primary" className="fw-semibold text-secondary">Unisciti ad una squadra</Button>
                    </div>
                    </div>
                    </Col>
                <Col
                 data-aos="fade-left"
                 data-aos-duration="2000"
                 data-aos-offset="200"
                 >
                <div className="w-100 mt-5 mt-lg-0">
                {/* <img className="img-fluid" src={img1} alt="Immagine 1" /> */}
                <HoverAnimatedImage src={img1} alt="Immagine 1" />
                </div>
                </Col>
            </Row>
             </Container>
   )
}

export default SectionOne