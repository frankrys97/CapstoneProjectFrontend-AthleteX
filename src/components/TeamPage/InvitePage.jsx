import { useState, useEffect } from "react";
import { Button, Col, Row, Form, Spinner } from "react-bootstrap";
import { Table } from "antd";
import TeamPageLayout from "./TeamPageLayout";
import apiClient from "../../utils/axiosConfig";
import { useSelector, useDispatch } from "react-redux";
import disegnoPartecipazione from "../../assets/Esecutivi/disegno-squadra.jpeg";
import { getPartecipationsOfTeam } from "../../redux/actions";
import tinycolor from "tinycolor2";
import { Link, useNavigate } from "react-router-dom";

const InvitePage = () => {
  const team = useSelector((state) => state.team.content);
  const partecipations = useSelector((state) => state.team.partecipations);
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    surname: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchPartecipations = async () => {
      try {
        const response = await apiClient.get(`/partecipations/${team.id}`);
        console.log(response);
        dispatch(getPartecipationsOfTeam(response.data.content));
      } catch (error) {
        console.error(
          "Errore durante il recupero delle partecipazioni:",
          error
        );
      }
    };
    fetchPartecipations();
  }, [team.id, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.post(`/partecipations/${team.id}`, formValues);
      setFormValues({
        email: "",
        name: "",
        surname: "",
      });
      const response = await apiClient.get(`/partecipations/${team.id}`);
      dispatch(getPartecipationsOfTeam(response.data.content));
      navigate(`/team/${team.id}`);
    } catch (error) {
      console.error("Errore durante l'invito:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: "30%",
    },
    // {
    //   title: "Nome",
    //   dataIndex: "name",
    //   key: "name",
    //   sorter: (a, b) => a.name.localeCompare(b.name),
    // },
    // {
    //   title: "Cognome",
    //   dataIndex: "surname",
    //   key: "surname",
    //   sorter: (a, b) => a.surname.localeCompare(b.surname),
    // },
    {
      title: "Stato",
      dataIndex: "statusOfPartecipation",
      key: "statusOfPartecipation",
      sorter: (a, b) => a.status.localeCompare(b.status),
      width: "20%",
      render: (text) => (text === "PENDING" ? "In attesa" : text === "ACCEPTED" ? "Accettato" : "Rifiutato"),
    },
  ];

  const getTextColor = (backgroundColor) => {
    const color = tinycolor(backgroundColor);
    const luminance = color.getLuminance();
    return luminance > 0.5 ? "#161832" : "#ffffff";
  };

  return (
    <TeamPageLayout>
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
              {team.name}{" "}
            </Link>{" "}
            <span className="text-muted">/ Partecipazioni</span>
          </h5>
        </Col>
      </Row>
      <Row className="mt-3 w-100">
        <Col>
          <h5 className="text-dark mb-0 ">Invita un membro</h5>
        </Col>
      </Row>

      <Row className="mt-3 w-100">
        <Col>
          <div
            style={{
              minHeight: "400px",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #f0f0f2",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.20)",
            }}
            className="d-flex align-items-center gap-3 p-3 p-md-0"
          >
            <Form onSubmit={handleSubmit} className="w-50 p-3 flex-grow-1 z-2">
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                  placeholder="Inserisci l'email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
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
                  placeholder="Inserisci il cognome"
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
                  "Invita Membro"
                )}
              </Button>
            </Form>
            <div className="w-50 p-2 d-none d-md-block">
              <img
                src={disegnoPartecipazione}
                alt="illustrazione partecipazione"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="w-100 mt-4">
        <Col>
          <div
            style={{
              backgroundColor: "white",
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 4px",
            }}
            className="rounded rounded-2 border border-1 p-4"
          >
            <h5>
              {partecipations.length === 0
                ? "Nessun invito"
                : partecipations.length === 1
                ? "1 Invito"
                : `${partecipations.length} Inviti`}
            </h5>
            <Table
              columns={columns}
              dataSource={partecipations}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              size="small"
              scroll={{ x: 1300, y: 220 }}
            />
          </div>
        </Col>
      </Row>
    </TeamPageLayout>
  );
};

export default InvitePage;
