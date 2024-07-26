import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import "../style/Swiper.scss";
import { EffectCoverflow, Pagination } from 'swiper/modules';
import coach1 from "../assets/Coach/coach1.jpeg"
import coach2 from "../assets/Coach/coach2.jpeg"
import coach3 from "../assets/Coach/coach3.jpg"
import coach4 from "../assets/Coach/coach4.jpg"
import coach5 from "../assets/Coach/coach5.jpg"
import { Container, Row, Col } from 'react-bootstrap';

function TestimonialSection() {
  return (
    <> 
    <Container fluid className="mb-3">
    <Row className="text-center">
      <Col>
        <h2 className="text-secondary">Cosa dicono i nostri clienti sui nostri servizi</h2>
        <p className="mb-0" style={{color: "#333333"}}>Organizza il tuo team e ottimizza le prestazioni con AthleteX</p>
      </Col>
    </Row>
    </Container>
   
    <Container fluid className=" py-5 mb-5 testimonial-section">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        loop={true} 
        initialSlide={2} 
        modules={[EffectCoverflow, Pagination]}
      >

        <SwiperSlide>
          <div className="text-center">
            <div className="testimonial-image mx-auto mb-3">
              <img src={coach1} alt="Allenatore 1" className="img-fluid" />
            </div>
            <p className="mb-3">&#34;AthleteX ha trasformato completamente il nostro modo di gestire le sessioni di allenamento. La facilità d&#39;uso e la possibilità di monitorare le prestazioni dei giocatori in tempo reale sono state inestimabili.&#34;</p>
            <h6 className="mb-0 text-primary">Marco Rossi</h6>
            <span>Allenatore Capo, FC Milano</span>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="text-center">
            <div className="testimonial-image mx-auto mb-3">
              <img src={coach2} alt="Allenatore 2" className="img-fluid" />
            </div>
            <p className="mb-3">&#34;Utilizziamo AthleteX per coordinare il nostro team ed è fantastico. Le funzionalità ci aiutano a rimanere organizzati e migliorare la nostra strategia di squadra.&#34;</p>
            <h6 className="mb-0 text-primary">Lucia Bianchi</h6>
            <span>Allenatrice Assistente, AS Roma</span>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="text-center">
            <div className="testimonial-image mx-auto mb-3">
              <img src={coach4} alt="Allenatore 4" className="img-fluid" />
            </div>
            <p className="mb-3">&#34;Con AthleteX, pianificare e gestire i nostri allenamenti non è mai stato così facile. L&#39;interfaccia intuitiva e le funzionalità robuste sono perfette per le nostre esigenze.&#34;</p>
            <h6 className="mb-0 text-primary">Francesco Neri</h6>
            <span>Direttore Tecnico, Napoli FC</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="text-center">
            <div className="testimonial-image mx-auto mb-3">
              <img src={coach3} alt="Allenatore 3" className="img-fluid" />
            </div>
            <p className="mb-3">&#34;AthleteX è una svolta per la gestione del calcio. Gli strumenti di analisi e reportistica ci hanno dato una visione più approfondita delle prestazioni dei giocatori e della dinamica di squadra.&#34;</p>
            <h6 className="mb-0 text-primary">Giovanni Verdi</h6>
            <span>Analista delle Prestazioni, Juventus FC</span>
          </div>
        </SwiperSlide>


        <SwiperSlide>
          <div className="text-center">
            <div className="testimonial-image mx-auto mb-3">
              <img src={coach5} alt="Allenatore 5" className="img-fluid" />
            </div>
            <p className="mb-3">&#34;AthleteX ci ha aiutato a semplificare la nostra comunicazione e migliorare la pianificazione tattica. È uno strumento indispensabile per qualsiasi squadra di calcio seria.&#34;</p>
            <h6 className="mb-0 text-primary">Luca Santini</h6>
            <span>Allenatore Capo, Inter Milan</span>
          </div>
        </SwiperSlide>

      </Swiper>
    </Container>
    </>
  );
}

export default TestimonialSection;
