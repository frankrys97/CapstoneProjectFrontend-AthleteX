import { useSpring, animated } from "@react-spring/web";
import logo1 from "../assets/TeamLogos/logo1.png";
import logo2 from "../assets/TeamLogos/logo2.png";
import logo3 from "../assets/TeamLogos/logo3.svg";
import logo4 from "../assets/TeamLogos/logo4.svg";
import logo5 from "../assets/TeamLogos/logo5.svg";
import logo6 from "../assets/TeamLogos/logo6.png";
import logo7 from "../assets/TeamLogos/logo7.png";
import logo8 from "../assets/TeamLogos/logo8.png";
import logo9 from "../assets/TeamLogos/logo9.png";
import logo10 from "../assets/TeamLogos/logo10.png";
import "../style/TeamLogos.scss";
import { Col, Container, Row } from "react-bootstrap";

const immagini = [
  logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10,
];

function TeamsLogoSwiper() {
  const [styles, api] = useSpring(() => ({
    loop: true,
    from: { transform: 'translateX(0%)' },
    to: { transform: 'translateX(-100%)' },
    config: { duration: 500 },
    reset: true,
    onRest: () => api.start({ transform: 'translateX(0%)' }),
  }));

  return (
    <>
      <Container fluid className="mt-5">
        <Row className="row-cols-1">
          <Col className="text-center">
            <h2 className="text-secondary">10.000 Club si fidano di noi!</h2>
          </Col>
        </Row>
      </Container>
      <Container className="my-5">
        <div className="infinite-scroll-banner">
          <animated.div className="scrolling-content" style={styles}>
            {immagini.concat(immagini, immagini).map((immagine, indice) => (
              <img src={immagine} alt={`Logo ${indice + 1}`} className="img-fluid" key={indice} />
            ))}
          </animated.div>
        </div>
      </Container>
    </>
  );
}

export default TeamsLogoSwiper;