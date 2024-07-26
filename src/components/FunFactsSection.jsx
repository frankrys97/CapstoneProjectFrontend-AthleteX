
import { Container, Row, Col } from 'react-bootstrap';
import CountUp from 'react-countup'; 
import { useInView } from 'react-intersection-observer';


function FunfactSection() {

  const { ref: funfactRef, inView: funfactInView } = useInView({
    triggerOnce: true, // Avvia l'animazione solo una volta
    threshold: 0.1,    // Attiva quando il 10% della sezione è visibile
  });


  return (
    <div className='py-5 funfaction-container'>
      <Container>
            <Row className="row-cols-lg-4 row-cols-md-2 row-cols-sm-2 row-cols-1 mb-n6">

              <Col className="mb-6" data-aos="fade-up" data-aos-duration="2000" data-aos-offset="100" ref={funfactRef}>
                <div className="d-flex flex-column align-items-center">
                  <div className="number-funfacts">
                    { funfactInView && <CountUp end={10} duration={10}/>
}                  </div>
                  <h6 className='text-funfacts'>Anni di esperienza</h6>
                </div>
              </Col>


              <Col className="mb-6" data-aos="fade-up" data-aos-duration="2000" data-aos-offset="100" ref={funfactRef}>
                <div className="d-flex flex-column align-items-center">
                  <div className="number-funfacts">
                    { funfactInView && <CountUp end={150} duration={10}/>
}                  </div>
                  <h6 className='text-funfacts'>Società </h6>
                </div>
              </Col>


              <Col className="mb-6" data-aos="fade-up" data-aos-duration="2000" data-aos-offset="100" ref={funfactRef}>
                <div className="d-flex flex-column align-items-center">
                  <div className="number-funfacts">
                    { funfactInView && <CountUp end={450} duration={10}/>}
                  </div>
                  <h6 className='text-funfacts'>Allenatori</h6>
                </div>
              </Col>


              <Col className="mb-6" data-aos="fade-up" data-aos-duration="2000" data-aos-offset="100" ref={funfactRef}>
                <div className="d-flex flex-column align-items-center">
                  <div className="number-funfacts">
                    { funfactInView && <CountUp end={700} duration={10} prefix='+'/>}
                  </div>
                  <h6 className='text-funfacts'>Eventi creati</h6>
                </div>
              </Col>
            </Row>
      </Container>
    </div>
  );
}

export default FunfactSection;
