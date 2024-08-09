import { Col, Row, Button, Form, Spinner } from "react-bootstrap";
import TeamPageLayout from "./TeamPageLayout";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";
import { getPlayersOfTeam } from "../../redux/actions";
import { Select } from "antd";
import disegnoGiocatore from "../../assets/Esecutivi/disegno-giocatore.jpeg";
import tinycolor from "tinycolor2";
import { Bounce, toast, ToastContainer } from "react-toastify";

const CreatePlayerPage = () => {
  const team = useSelector((state) => state.team.content);
  const players = useSelector((state) => state.team.players.players || []);
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    birthDate: "",
    position: "",
    weight: "",
    height: "",
    jerseyNumber: null,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generateJerseyNumberOptions = () => {
    const takenNumbers = new Set(players.map((player) => player.jerseyNumber));
    return Array.from({ length: 99 }, (_, i) => i + 1)
      .filter((num) => !takenNumbers.has(num))
      .map((num) => ({ label: num, value: num }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value, name) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post(
        `/teams/${team.id}/components`,
        formValues
      );
      dispatch(getPlayersOfTeam([...players, response.data]));
      toast.success("Giocatore aggiunto con successo", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1500,
        theme: "light",
        transition: Bounce,
        });

      setFormValues({
        name: "",
        surname: "",
        birthDate: "",
        position: "",
        weight: "",
        height: "",
        jerseyNumber: null,
      });
      setTimeout(() => navigate("/members"), 1500);
    } catch (error) {
      console.error("Errore durante la creazione del giocatore:", error);
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
              }} to={`/team/${team.id}`}
              className="text-decoration-none"
            >
              {team.name} </Link>{" "}
            /{" "}
            <Link
              style={{ color: team ? `${team.secondaryColor}` : "#fd4742" }}
              className="text-decoration-none"
              to={`/members`}
            >
              Membri {" "}
            </Link>{" "}
            / Aggiungi membri
          </h5>
        </Col>
      </Row>
      <Row className="mt-3 w-100">
        <Col>
          <h5 className="text-dark mb-0">Aggiungi un membro</h5>
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
            <Form onSubmit={handleSubmit} className="w-50 p-3 flex-grow-1 z-2 ">
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={50}
                  placeholder="Inserisci il nome"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSurname">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  value={formValues.surname}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={50}
                  placeholder="Inserisci il cognome"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBirthDate">
                <Form.Label>Data di nascita</Form.Label>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={formValues.birthDate}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split("T")[0]}
                  placeholder="Inserisci la data di nascita"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPosition">
                <Form.Label>Posizione</Form.Label>
                <Select
                  style={{ width: "100%" }}
                  value={formValues.position}
                  onChange={(value) => handleSelectChange(value, "position")}
                  required
                  options={[
                    { label: "Portiere", value: "GOALKEEPER" },
                    { label: "Difensore", value: "DEFENDER" },
                    { label: "Centrocampista", value: "MIDFIELDER" },
                    { label: "Attaccante", value: "STRIKER" },
                  ]}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formWeight">
                <Form.Label>Peso (kg)</Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  value={formValues.weight}
                  onChange={handleChange}
                  min={0}
                  placeholder="Inserisci il peso"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formHeight">
                <Form.Label>Altezza (cm)</Form.Label>
                <Form.Control
                  type="number"
                  name="height"
                  value={formValues.height}
                  onChange={handleChange}
                  min={0}
                  placeholder="Inserisci l'altezza"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formJerseyNumber">
                <Form.Label>Numero Maglia</Form.Label>
                <Select
                  style={{ width: "100%" }}
                  value={formValues.jerseyNumber}
                  onChange={(value) =>
                    handleSelectChange(value, "jerseyNumber")
                  }
                  required
                  options={generateJerseyNumberOptions()}
                />
              </Form.Group>

              <Button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: team ? `${team.secondaryColor}` : "#fd4742",
                  color: getTextColor(
                    team ? `${team.secondaryColor}` : "#fd4742"
                  ),
                }}
                className="border border-0 rounded rounded-2 px-3 py-2 btn-add-member"
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Caricamento...
                  </>
                ) : (
                  "Aggiungi Membro"
                )}
              </Button>
            </Form>
            <div className="w-50 p-2 d-none d-md-block">
              <img
                src={disegnoGiocatore}
                alt="illustrazione giocatore"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  translate: "-10% -10%",
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </TeamPageLayout>
  );
};

export default CreatePlayerPage;
