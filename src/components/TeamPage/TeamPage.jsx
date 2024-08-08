import { Button, Col, Row } from "react-bootstrap";
import TeamPageLayout from "./TeamPageLayout";
import { useDispatch, useSelector } from "react-redux";
import "./TeamPage.scss";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTeam, fetchTeamEvents, getComponentsOfTeam } from "../../redux/actions";
import LogoLoading from "../../assets/Pittogramma/png/Pittogramma - colore 5.png";

const TeamPage = () => {
  const team = useSelector((state) => state.team.content);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const players = useSelector((state) => state.team.players.players);
  const events = useSelector((state) => state.team.events);

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
        }, 2000);
      }
    };

    loadData();
  }, [dispatch, team.id]);

  return (
    loading ? (
      <div className="loading-container">
        <img src={LogoLoading} alt="Caricamento..." className="loading-logo" />
      </div>
    ) : (
      <TeamPageLayout>
        <Row className="w-100 mt-4" style={{ maxWidth: "900px" }}>
          {/* Sezione informazioni sul team */}
          <Col md={12} className="mb-4">
            <Row className="bg-white" style={{ border: "1px solid #dee2e6", minHeight: "190px" }}>
              <Col md={4} className="bg-light d-flex justify-content-center align-items-center">
                <div className="w-100 p-3" style={{ width: "100%", height: "150px", overflow: "hidden", margin: "0 auto" }}>
                  <img src={team.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
              </Col>
              <Col md={8}>
                <div className="p-4 d-flex flex-column gap-3">
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">{team.name}</h4>
                    <Button onClick={() => navigate(`/team/${team.name}/settings`)} size="sm" variant="link" className="text-decoration-none text-muted btn-add-member">
                      <FaRegPenToSquare className="fs-5" />
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

            <Row className="mt-4 justify-content-between row-cols-1 row-cols-md-2">
              <Col className="bg-white" style={{ border: "1px solid #dee2e6", maxWidth: "440px" }}>
                <div className="p-4">
                  <h5>Ultimo evento</h5>
                  <p>Martedì 6 Agosto 2024 22:00</p>
                  <p>Allenamento</p>
                </div>
              </Col>
              <Col className="bg-white" style={{ border: "1px solid #dee2e6", maxWidth: "440px" }}>
                <div className="p-4">
                  <h5>Prossimo evento</h5>
                  <p>Sabato 10 Agosto 2024 10:00</p>
                  <p>Allenamento</p>
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
