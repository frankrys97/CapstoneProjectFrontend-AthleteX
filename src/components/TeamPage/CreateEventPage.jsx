import { Col, Row, Button, Form, Spinner } from "react-bootstrap";
import TeamPageLayout from "./TeamPageLayout";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addEventToTeam } from "../../redux/actions";
import { Select } from "antd";
import tinycolor from "tinycolor2";
import disegnoGiocatore from "../../assets/Esecutivi/disegno-calendario.jpeg";
import { Bounce, toast, ToastContainer } from "react-toastify";

const CreateEventPage = () => {
  const team = useSelector((state) => state.team.content);
  const [formValues, setFormValues] = useState({
    eventType: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    meetTime: "",
    locationType: "",
    opponent: "",
    home: "",
    duration: "",
    trainingType: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value, name) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    if (name === "startTime") {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
        endTime: value ? getDefaultEndTime(value) : "",
        meetTime: value ? getDefaultMeetTime(value) : "",
      }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getDefaultEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(":");
    let endTime = new Date();
    endTime.setHours(+hours + 1);
    endTime.setMinutes(+minutes);
    return endTime.toTimeString().slice(0, 5);
  };

  const getDefaultMeetTime = (startTime) => {
    const [hours, minutes] = startTime.split(":");
    let meetTime = new Date();
    meetTime.setHours(+hours - 1);
    meetTime.setMinutes(+minutes);
    return meetTime.toTimeString().slice(0, 5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      dispatch(addEventToTeam(team.id, formValues));
      toast.success("Evento aggiunto con successo", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });

      setFormValues({
        eventType: "",
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        meetTime: "",
        locationType: "",
        opponent: "",
        home: null,
        duration: "",
        trainingType: "",
      });
      setTimeout(() => {
        navigate("/calendar");
      }, 2000);
    } catch (error) {
      console.error("Errore durante la creazione dell'evento:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTextColor = (backgroundColor) => {
    const color = tinycolor(backgroundColor);
    const luminance = color.getLuminance();
    return luminance > 0.5 ? "#161832" : "#ffffff";
  };

  return (
    <TeamPageLayout>
      <ToastContainer></ToastContainer>
      <Row className="w-100">
        <Col>
          <h5 style={{ fontStyle: "italic" }} className="text-muted">
            <Link
              style={{
                color: team ? `${team.secondaryColor}` : "#fd4742",
              }}
              to={`/team/${team.id}`}
              className="text-decoration-none"
            >
              {team.name} /
            {" "}
            </Link>{" "}
            <Link
              style={{ color: team ? `${team.secondaryColor}` : "#fd4742" }}
              className="text-decoration-none"
              to={`/calendar`}
            >
              Eventi 
            </Link>{" "}
            / Crea evento
          </h5>
        </Col>
      </Row>
      <Row className="mt-3 w-100">
        <Col>
          <h5 className="text-dark mb-0">Crea un evento</h5>
        </Col>
      </Row>

      <Row className="mt-3 w-100">
        <Col>
          <div
            style={{
              minHeight: "400px",
              maxWidth: "950px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #f0f0f2",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.20)",
            }}
            className="d-flex align-items-center gap-3 p-3 p-md-0 mx-auto"
          >
            <Form onSubmit={handleSubmit} className="w-50 p-3 flex-grow-1 z-2">
              <Form.Group className="mb-3" controlId="formEventType">
                <Form.Label className="fs-6" style={{ fontWeight: 500 }}>
                  Tipo di evento
                </Form.Label>
                <Select
                  style={{ width: "100%" }}
                  value={formValues.eventType}
                  onChange={(value) => handleSelectChange(value, "eventType")}
                  options={[
                    { label: "", value: "" },
                    { label: "Partita", value: "MATCH" },
                    { label: "Allenamento", value: "TRAINING" },
                  ]}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label className="fs-6" style={{ fontWeight: 500 }}>
                  Titolo
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={100}
                  placeholder="Inserisci il titolo"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label className="fs-6" style={{ fontWeight: 500 }}>
                  Descrizione
                </Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={500}
                  placeholder="Inserisci la descrizione"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStartDate">
                <Form.Label className="fs-6" style={{ fontWeight: 500 }}>
                  Data inizio
                </Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formValues.startDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEndDate">
                <Form.Label className="fs-6" style={{ fontWeight: 500 }}>
                  Data fine
                </Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={formValues.endDate}
                  onChange={handleChange}
                  required
                  min={formValues.startDate}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStartTime">
                <Form.Label className="fs-6" style={{ fontWeight: 500 }}>
                  Orario inizio
                </Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  value={formValues.startTime}
                  onChange={handleTimeChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEndTime">
                <Form.Label className="fs-6" style={{ fontWeight: 500 }}>
                  Orario fine
                </Form.Label>
                <Form.Control
                  type="time"
                  name="endTime"
                  value={formValues.endTime}
                  onChange={handleTimeChange}
                  required
                  min={formValues.startTime}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMeetTime">
                <Form.Label className="fs-6" style={{ fontWeight: 500 }}>
                  Orario incontro
                </Form.Label>
                <Form.Control
                  type="time"
                  name="meetTime"
                  value={formValues.meetTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLocationType">
                <Form.Label className="fs-6" style={{ fontWeight: 500 }}>
                  Luogo
                </Form.Label>
                <Select
                  style={{ width: "100%" }}
                  value={formValues.locationType}
                  onChange={(value) => handleSelectChange(value, "locationType")}
                  options={[
                    { label: "", value: "" },
                    { label: "Palestra", value: "GYM" },
                    { label: "Stadio", value: "STADIUM" },
                    { label: "Campo di allenamento", value: "TRAINING_FIELD" },
                  ]}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formOpponent">
                <Form.Label className="fs-6" style={{ fontWeight: 500 }}>
                  Avversario
                </Form.Label>
                <Form.Control
                  type="text"
                  name="opponent"
                  value={formValues.opponent}
                  onChange={handleChange}
                  placeholder="Inserisci l'avversario"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formhome">
                <Form.Label className="fs-6" style={{ fontWeight: 500 }}>
                  Casa/Trasferta
                </Form.Label>
                <Select
                  style={{ width: "100%" }}
                  value={formValues.home}
                  onChange={(value) => handleSelectChange(value, "home")}
                  options={[
                    { label: "", value: "" },
                    { label: "Casa", value: true },
                    { label: "Trasferta", value: false },
                  ]}
                />
              </Form.Group>

              {formValues.eventType === "TRAINING" && (
                <Form.Group className="mb-3" controlId="formTrainingType">
                  <Form.Label className="fs-6" style={{ fontWeight: 500 }}>
                    Tipo di allenamento
                  </Form.Label>
                  <Select
                    style={{ width: "100%" }}
                    value={formValues.trainingType}
                    onChange={(value) =>
                      handleSelectChange(value, "trainingType")
                    }
                    options={[
                      { label: "", value: "" },
                      { label: "Forza", value: "STRENGTH" },
                      { label: "Tattico", value: "TACTICS" },
                      { label: "Tecnico", value: "TECHNICAL" },
                      { label: "Pre-Match", value: "PRE_MATCH" },
                    ]}
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3" controlId="formDuration">
                <Form.Label className="fs-6" style={{ fontWeight: 500 }}>
                  Durata (in minuti)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="duration"
                  value={formValues.duration}
                  onChange={handleChange}
                  required
                  min={1}
                  placeholder="Inserisci la durata in minuti"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: team ? `${team.secondaryColor}` : "#fd4742",
                  color: team ? getTextColor(team.secondaryColor) : "#ffffff",
                  borderColor: team ? `${team.secondaryColor}` : "#fd4742",
                }}
                className="px-3 py-2 btn-add-member rounded rounded-1"
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Crea evento"
                )}
              </Button>
            </Form>
            <div className="w-50 p-2 d-none d-md-block">
              <img
                src={disegnoGiocatore}
                alt="illustrazione calendario"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </TeamPageLayout>
  );
};

export default CreateEventPage;
