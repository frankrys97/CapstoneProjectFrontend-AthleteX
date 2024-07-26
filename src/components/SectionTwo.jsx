import { Button, Col, Container, Row } from "react-bootstrap"
import img1 from "../assets/Esecutivi/Img2.png"


function SectionTwo() {
const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
}

    return (
        <Container className="my-5 p-5">
            <Row className="row-cols-lg-2 row-cols-1">
                <Col
                 data-aos="fade-right"
                 data-aos-duration="2000"
                 data-aos-offset="200"
                 >
                <div className="w-100">
                <img className="img-fluid" src={img1} alt="Immagine 2" />
                </div>
                </Col>
                <Col 
                data-aos="fade-left"
                data-aos-duration="2000"
                data-aos-offset="100"
                >
                    <div className="d-flex flex-column align-items-start ms-5 mt-5">



                   
                <div className="d-flex flex-column gap-4">
                    <div className="section-title-two">
                        <h4 className="sub-title">One App, One Team</h4>
                    </div>
                    <h2> <span style={{fontStyle: "italic", fontWeight: "bold"}}> Tutte </span> le informazioni a portata <br /> di click!</h2>
                    <p>Tramite <span style={{fontStyle: "italic", fontWeight: "bold"}}>AthleteX</span> avrai la possibilità di consultare tutte le informazioni relative al tuo team, tutte le statistiche della squadra <br /> e dei tuoi giocatori</p>
                    <p></p>
                    </div>
                    <div className="d-flex gap-4 mt-5 align-items-center">
                        <Button variant="outline-primary">Iscriviti</Button>
                        <Button variant="link" onClick={scrollToTop} style={{textDecoration: "none"}}>Per saperne di più</Button>
                    </div>
                    </div>
                    </Col>
            </Row>
             </Container>
   )
}

export default SectionTwo