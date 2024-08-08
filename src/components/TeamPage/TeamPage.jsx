import { Button, Col, Row } from "react-bootstrap";
import TeamPageLayout from "./TeamPageLayout";
import { useDispatch, useSelector } from "react-redux";
import "./TeamPage.scss";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTeam, fetchTeamEvents, getComponentsOfTeam } from "../../redux/actions";
import LogoLoading from "../../assets/Pittogramma/png/Pittogramma - colore 5.png";
import iconaScudetto from "../../assets/HomePage/Icona-scudetto.svg";


const TeamPage = () => {
  const team = useSelector((state) => state.team.content);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const players = useSelector((state) => state.team.players.players);
  const events = useSelector((state) => state.team.events);
  const [lastEvent, setLastEvent] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);

  const matches = events.filter((event) => event.eventType === "MATCH");

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadData = async () => {
      try {
        if (team.id) { 
          setLoading(true);

          await dispatch(fetchTeam(team.id));
          await dispatch(getComponentsOfTeam(team.id));
          await dispatch(fetchTeamEvents(team.id));
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati:", error);
      } finally {
        // setLoading(false); 

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    loadData();
  }, [dispatch, team.id]);

  useEffect(() => {
    if (events.length > 0) {
      const today = new Date();
      let closestPastEvent = null;
      let closestFutureEvent = null;
  
      events.forEach(event => {
        const eventDate = new Date(event.startDate);
  
        if (eventDate < today) {
          if (!closestPastEvent || eventDate > new Date(closestPastEvent.startDate)) {
            closestPastEvent = event;
          }
        }
  
        if (eventDate >= today) {
          if (!closestFutureEvent || eventDate < new Date(closestFutureEvent.startDate)) {
            closestFutureEvent = event;
          }
        }
      });
  
      setLastEvent(closestPastEvent);
      setNextEvent(closestFutureEvent);

    }
  }, [events]);
  

  const isDefaultAvatar =
  !team?.avatar || team?.avatar?.includes("https://ui-avatars.com/api/");

  function formatDateToReadableString(dateString) {
    const date = new Date(dateString);
  
    const daysOfWeek = [
      "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"
    ];
    const months = [
      "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
      "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ];
  
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${dayOfWeek} ${day} ${month} ${year}`;
  }

  return (
    loading ? (
      <div className="loading-container">
        <img src={LogoLoading} alt="Caricamento..." className="loading-logo" />
      </div>
    ) : (
      <TeamPageLayout>
        <Row className="w-100 mt-4" style={{ maxWidth: "900px" }}>
          <Col md={12} className="mb-4">
            <Row className="bg-white shadow" style={{ border: "1px solid #dee2e6", minHeight: "190px" }}>
              <Col md={4} className="bg-light d-flex justify-content-center align-items-center border">
                <div className="w-100 p-3" style={{ width: "100%", height: "150px", overflow: "hidden", margin: "0 auto" }}>
                  <img src={isDefaultAvatar ? iconaScudetto : team.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
              </Col>
              <Col md={8}>
                <div className="p-4 d-flex flex-column gap-3">
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">{team.name}</h4>
                    <Button onClick={() => navigate(`/team/${team.name}/settings`)} size="sm" variant="link" className="text-decoration-none text-muted btn-add-member" style={{color: `${team.secondaryColor}`}}>
                      <FaRegPenToSquare className="fs-5" style={{color: `${team.secondaryColor}`}} />
                    </Button>
                  </div>

                  <div className="w-100 d-flex flex-column flex-sm-row justify-content-between align-items-start">
                    <div>
                      <p className="mb-0" style={{ fontSize: "12px" }}><span className="text-muted">Sport:</span> Calcio</p>
                      <p className="mb-0" style={{ fontSize: "12px" }}><span className="text-muted">Paese:</span> {team.country}</p>
                      <p className="mb-0" style={{ fontSize: "12px" }}><span className="text-muted">Data fondazione:</span> {team.creationDate && team.creationDate.split("-").reverse().join("-")}</p>
                    </div>
                    <div>
                      <p className="mb-0" style={{ fontSize: "12px" }}><span className="text-muted">Telefono:</span> {`+${team.phone}`}</p>
                      <p className="mb-0" style={{ fontSize: "12px" }}><span className="text-muted">E-mail:</span> {team.email}</p>
                    </div>
                  </div>

                  <div className="w-100 d-flex flex-row justify-content-start gap-3">
                    <div className="d-flex flex-column justify-content-start align-items-start pe-3">
                      <p className={`mb-0 fw-semibold fs-4`}>{players && players.length}</p>
                      <p className={`mb-0 border-end pe-2`}>{players && players.length === 1 ? "Giocatore" : "Giocatori"}</p>
                    </div>
                    <div className="d-flex flex-column justify-content-start align-items-start pe-3">
                      <p className={`mb-0 fw-semibold fs-4`}>{events && events.length}</p>
                      <p className={`mb-0 border-end pe-2`}>{events && events.length === 1 ? "Evento" : "Eventi"}</p>
                    </div>
                    <div className="d-flex flex-column justify-content-start align-items-start pe-3">
                      <p className={`mb-0 fw-semibold fs-4`}>{matches && matches.length}</p>
                      <p className={`mb-0 border-end pe-2`}>{matches && matches.length === 1 ? "Partita" : "Partite"}</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="mt-4 justify-content-between row-cols-1 row-cols-md-2 g-3">
              <Col className="bg-white events-container shadow" style={{ border: "1px solid #dee2e6" }}>
                <div className="p-4 d-flex flex-column h-100">
                  <h5>Ultimo evento</h5>
                    { lastEvent ? (
                  <div className="d-flex flex-column">
                        
                    <p className="mb-0 text-muted">{lastEvent && formatDateToReadableString(lastEvent.startDate)}</p>
                    <p className="mb-0 text-muted">{lastEvent && lastEvent.eventType === "TRAINING" ? "Allenamento" : "Partita"}</p>

                    <h5 className="fs-6 mt-3">{lastEvent && lastEvent.title}</h5>
                  </div>
) : (
                    <p className="mb-0 text-muted">Nessun evento</p>
                  )}

                  <hr className="hr-line mt-auto"></hr>
                  <div className="d-flex justify-content-end align-items-center">
                    <Button onClick={() => navigate(`/calendar`)} variant="link" className="text-decoration-none p-0 go-calendar-btn" style={{ color: `${team.secondaryColor}`}}>Vai al calendario</Button>
                  </div>
                </div>
              </Col>
              <Col className="bg-white events-container shadow" style={{ border: "1px solid #dee2e6" }}>
              <div className="p-4 d-flex flex-column h-100">
                  <h5>Prossimo evento</h5>
                  { nextEvent ? (
                  <div className="d-flex flex-column">
                    <p className="mb-0 text-muted">{nextEvent && formatDateToReadableString(nextEvent.startDate)}</p>
                    <p className="mb-0 text-muted">{nextEvent && nextEvent.eventType === "TRAINING" ? "Allenamento" : "Partita"}</p>

                    <h5 className="fs-6 mt-3">{nextEvent && nextEvent.title}</h5>

                  </div>
                      
                  ) : (
                    <p className="mb-0 text-muted">Nessun evento</p>
                  )}
                  <hr className="hr-line mt-auto"></hr>
                  <div className="d-flex justify-content-end align-items-center">
                    <Button onClick={() => navigate(`/calendar`)} variant="link" className="text-decoration-none p-0 go-calendar-btn" style={{ color: `${team.secondaryColor}`}}>Vai al calendario</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </TeamPageLayout>
    )
  );
};

export default TeamPage;
