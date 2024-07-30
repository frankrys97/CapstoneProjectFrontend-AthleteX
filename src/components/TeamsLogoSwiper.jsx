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

function TeamsLogoSwiper() {
  const [styles, api] = useSpring(() => ({
    loop: true,
    from: { transform: 'translateX(0%)' },
    to: { transform: 'translateX(-50%)' },
    config: { duration: 10000 },
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
          <div className="scrolling-wrapper">
            <img src={logo1} alt="Logo 1" className="img-fluid" />
            <img src={logo2} alt="Logo 2" className="img-fluid" />
            <img src={logo3} alt="Logo 3" className="img-fluid" />
            <img src={logo4} alt="Logo 4" className="img-fluid" />
            <img src={logo5} alt="Logo 5" className="img-fluid" />
            <img src={logo6} alt="Logo 6" className="img-fluid" />
            <img src={logo7} alt="Logo 7" className="img-fluid" />
            <img src={logo8} alt="Logo 8" className="img-fluid" />
            <img src={logo9} alt="Logo 9" className="img-fluid" />
            <img src={logo10} alt="Logo 10" className="img-fluid" />
            <img src={logo1} alt="Logo 1" className="img-fluid" />
            <img src={logo2} alt="Logo 2" className="img-fluid" />
            <img src={logo3} alt="Logo 3" className="img-fluid" />
            <img src={logo4} alt="Logo 4" className="img-fluid" />
            <img src={logo5} alt="Logo 5" className="img-fluid" />
            <img src={logo6} alt="Logo 6" className="img-fluid" />
            <img src={logo7} alt="Logo 7" className="img-fluid" />
            <img src={logo8} alt="Logo 8" className="img-fluid" />
            <img src={logo9} alt="Logo 9" className="img-fluid" />
            <img src={logo10} alt="Logo 10" className="img-fluid" />
            <img src={logo1} alt="Logo 1" className="img-fluid" />
            <img src={logo2} alt="Logo 2" className="img-fluid" />
            <img src={logo3} alt="Logo 3" className="img-fluid" />
            <img src={logo4} alt="Logo 4" className="img-fluid" />
            <img src={logo5} alt="Logo 5" className="img-fluid" />
            <img src={logo6} alt="Logo 6" className="img-fluid" />
            <img src={logo7} alt="Logo 7" className="img-fluid" />
            <img src={logo8} alt="Logo 8" className="img-fluid" />
            <img src={logo9} alt="Logo 9" className="img-fluid" />
            <img src={logo10} alt="Logo 10" className="img-fluid" />
          </div>
        </animated.div>
      </div>
      </Container>
    </>
  );
}

export default TeamsLogoSwiper;
