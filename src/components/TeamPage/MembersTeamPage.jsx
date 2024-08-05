import { Button, Col, Container, Row } from "react-bootstrap";
import { Dropdown, Space, Table, Modal, Select } from "antd";
import NavbarHomePage from "../HomePage/NavbarHomePage";
import SidebarTeamPage from "./SidebarTeamPage";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import tinycolor from "tinycolor2";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";
import { getPlayersOfTeam, removePlayerFromTeam } from "../../redux/actions";
import { useEffect, useState } from "react";
import "./TeamPage.scss";

const MembersTeamPage = () => {
  const positionOptions = [
    { label: "Portiere", value: "GOALKEEPER" },
    { label: "Difensore", value: "DEFENDER" },
    { label: "Centrocampista", value: "MIDFIELDER" },
    { label: "Attaccante", value: "STRIKER" },
  ];

  const generateJerseyNumberOptions = (players) => {
    const takenNumbers = new Set(players.map((player) => player.jerseyNumber));
    return Array.from({ length: 99 }, (_, i) => i + 1)
      .filter((num) => !takenNumbers.has(num))
      .map((num) => ({ label: num, value: num }));
  };

  const columns = (showDeleteConfirm, players, handleEdit, handleSave) => [
    {
      title: "Foto",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => (
        <img
          src={text}
          alt="Foto"
          className="rounded-circle"
          width="40"
          height="40"
        />
      ),
      width: 100,
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (text, record) =>
        editingRowId === record.id ? (
          <input
            type="text"
            value={editedValues.name || ""}
            onChange={(e) =>
              setEditedValues((prev) => ({ ...prev, name: e.target.value }))
            }
            autoFocus
            style={{ width: "100%" }}
          />
        ) : (
          <span>{text}</span>
        ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Cognome",
      dataIndex: "surname",
      key: "surname",
      width: 150,
      render: (text, record) =>
        editingRowId === record.id ? (
          <input
            type="text"
            value={editedValues.surname || ""}
            onChange={(e) =>
              setEditedValues((prev) => ({ ...prev, surname: e.target.value }))
            }
            autoFocus
            style={{ width: "100%" }}
          />
        ) : (
          <span>{text}</span>
        ),
      sorter: (a, b) => a.surname.localeCompare(b.surname),
    },
    {
      title: "Data di nascita",
      dataIndex: "birthDate",
      key: "birthDate",
      width: 150,
      render: (text, record) =>
        editingRowId === record.id ? (
          <input
            type="date"
            value={editedValues.birthDate || ""}
            onChange={(e) =>
              setEditedValues((prev) => ({
                ...prev,
                birthDate: e.target.value,
              }))
            }
            autoFocus
            style={{ width: "100%" }}
          />
        ) : (
          <span>{text ? new Date(text).toLocaleDateString() : "N/A"}</span>
        ),
      sorter: (a, b) => new Date(a.birthDate) - new Date(b.birthDate),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      render: (text, record) =>
        editingRowId === record.id ? (
          <input
            type="email"
            value={editedValues.email || ""}
            onChange={(e) =>
              setEditedValues((prev) => ({ ...prev, email: e.target.value }))
            }
            autoFocus
          />
        ) : (
          <span>{text}</span>
        ),
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Posizione",
      dataIndex: "position",
      key: "position",
      width: 150,
      render: (text, record) =>
        editingRowId === record.id ? (
          <Select
            value={editedValues.position || ""}
            onChange={(value) =>
              setEditedValues((prev) => ({ ...prev, position: value }))
            }
            autoFocus
            options={positionOptions.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            style={{ width: "100%" }}
          />
        ) : (
          <span>
            {positionOptions.find((option) => option.value === text)?.label ||
              "N/A"}
          </span>
        ),
      sorter: (a, b) => a.position.localeCompare(b.position),
    },
    {
      title: "Numero maglia",
      dataIndex: "jerseyNumber",
      key: "jerseyNumber",
      width: 100,
      render: (text, record) =>
        editingRowId === record.id ? (
          <Select
            value={editedValues.jerseyNumber || ""}
            onChange={(value) =>
              setEditedValues((prev) => ({ ...prev, jerseyNumber: value }))
            }
            autoFocus
            options={generateJerseyNumberOptions(players)}
            style={{ width: "100%" }}
          />
        ) : (
          <span>{text !== 0 ? text : "N/A"}</span>
        ),
      sorter: (a, b) => a.jerseyNumber - b.jerseyNumber,
    },
    {
      title: "Altezza",
      dataIndex: "height",
      key: "height",
      width: 150,
      render: (text, record) =>
        editingRowId === record.id ? (
          <input
            type="number"
            value={editedValues.height || ""}
            onChange={(e) =>
              setEditedValues((prev) => ({ ...prev, height: e.target.value }))
            }
            autoFocus
            style={{ width: "100%" }}
          />
        ) : (
          <span>{text !== 0 ? `${text} cm` : "N/A"}</span>
        ),
      sorter: (a, b) => a.height - b.height,
    },
    {
      title: "Peso",
      dataIndex: "weight",
      key: "weight",
      width: 150,
      render: (text, record) =>
        editingRowId === record.id ? (
          <input
            type="number"
            value={editedValues.weight || ""}
            onChange={(e) =>
              setEditedValues((prev) => ({ ...prev, weight: e.target.value }))
            }
            autoFocus
            style={{ width: "100%" }}
          />
        ) : (
          <span>{text !== 0 ? `${text} kg` : "N/A"}</span>
        ),
      sorter: (a, b) => a.weight - b.weight,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (text) => <span style={{width: "100%"}}>{text || "N/A"}</span>,
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Azione",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (text, record) => {
        const isEditing = editingRowId === record.id;
    
        const items = [
          {
            label: (
              <Button
                size="sm"
                variant="link"
                className="text-decoration-none"
                onClick={() => handleEdit(record)}
                disabled={isEditing} // Disabilita il pulsante se in modalità editing
              >
                Modifica
              </Button>
            ),
            key: "1",
          },
          {
            label: isEditing ? (
              <Button
                size="sm"
                variant="link"
                className="text-decoration-none"
                onClick={handleSave}
              >
                Salva
              </Button>
            ) : (
              <Button
                size="sm"
                variant="link"
                className="text-decoration-none"
                onClick={() => showDeleteConfirm(record.id)}
              >
                Elimina
              </Button>
            ),
            key: "2",
          },
          {
            label: isEditing ? (
              <Button
                size="sm"
                variant="link"
                className="text-decoration-none"
                onClick={() => setEditingRowId(null)} 
              >
                Annulla
              </Button>
            ) : null, 
            key: "3",
          },
        ].filter((item) => item.label);
    
        return (
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <a className="text-muted" onClick={(e) => e.preventDefault()}>
              <div className="text-center">
                <Space>
                  <BsThreeDots />
                </Space>
              </div>
            </a>
          </Dropdown>
        );
      },
    }
  ];
  

  const team = useSelector((state) => state.team.content);
  const players = useSelector((state) => state.team.players.players || []);
  const [refresh, setRefresh] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await apiClient.get(`teams/${team.id}/components`);
        dispatch(getPlayersOfTeam(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlayers();
  }, [refresh, team.id, dispatch]);

  const showDeleteConfirm = (playerId) => {
    Modal.confirm({
      title: "Conferma eliminazione",
      content: "Sei sicuro di voler eliminare questo giocatore?",
      onOk: () => handleDelete(playerId),
      okText: "Elimina",
      cancelText: "Annulla",
      okButtonProps: {
        style: { backgroundColor: "#fd4742", color: "#fff" },
      },
    });
  };

  const handleDelete = async (playerId) => {
    try {
      await apiClient.delete(`teams/${team.id}/components/${playerId}`);
      setRefresh(!refresh);
      dispatch(removePlayerFromTeam(playerId));
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingRowId(record.id);
    setEditedValues({
      name: record.name,
      surname: record.surname,
      birthDate: record.birthDate,
      email: record.email,
      position: record.position,
      jerseyNumber: record.jerseyNumber,
      height: record.height,
      weight: record.weight,
    });
  };

  const handleSave = async () => {
    try {
      await apiClient.put(
        `teams/${team.id}/components/${editingRowId}`,
        editedValues
      );
      setRefresh(!refresh);
      setEditingRowId(null);

    } catch (error) {
      console.error("Errore durante il salvataggio:", error);
    }
  };

  const getTextColor = (backgroundColor) => {
    const color = tinycolor(backgroundColor);
    const luminance = color.getLuminance();
    return luminance > 0.5 ? "#161832" : "#ffffff";
  };

  return (
    <div className="members-team-page">
      <NavbarHomePage />
      <Container fluid>
        <Row className="d-flex justify-content-between">
          <SidebarTeamPage />
          <Col md={11} className=" p-3 flex-grow-1 d-flex flex-column align-items-center h-100">
            <Row className="w-100">
              <Col>
                <h5 style={{ fontStyle: "italic" }} className="text-muted">
                  <span
                    style={{
                      color: team ? `${team.secondaryColor}` : "#fd4742",
                    }}
                  >
                    {team.name}
                  </span>{" "}
                  / Rosa
                </h5>
              </Col>
            </Row>

            <Row className="mt-5 w-100">
              <Col className="w-100">
                <div className="d-flex flex-column justify-content-between align-items-start gap-3 flex-sm-row align-items-sm-end">
                  <h5 className="text-dark mb-0">Membri</h5>
                  <div>
                    <Button
                      as={Link}
                      to={`/team/${team.name}/add-member`}
                      style={{
                        backgroundColor: team
                          ? `${team.secondaryColor}`
                          : "#fd4742",
                        color: getTextColor(
                          team ? `${team.secondaryColor}` : "#fd4742"
                        ),
                      }}
                      className="d-flex align-items-center gap-2 border border-0 rounded rounded-2 px-3 py-2 btn-add-member"
                    >
                      <AiOutlineUserAdd className="fs-4" />
                      <span>Aggiungi un membro</span>
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="w-100">
              <Col
                style={{
                  minHeight: "60vh",
                  maxHeight: "60vh"
                }}
              >
                <div style={{backgroundColor: "white"}}                 className="mt-4 rounded rounded-2 border border-1 p-4"
                >

               
                <div className="d-flex flex-column align-items-start justify-content-between flex-md-row align-items-md-center gap-3">
                  <h5>
                    {players && players.length === 0
                      ? "Nessun membro"
                      : players.length === 1
                      ? "1 Membro"
                      : `${players.length} Membri`}
                  </h5>
                  <div>
                    <Button
                      variant="link"
                      className="d-flex align-items-center gap-2 border border-1 rounded rounded-2 px-3 py-2 text-decoration-none"
                      style={{
                        color: team ? `${team.secondaryColor}` : "#fd4742",
                      }}
                    >
                      <IoSettingsOutline />
                      <span>Impostazioni</span>
                    </Button>
                  </div>
                </div>
                <div className="mt-3 d-flex">
                  <Table
                    columns={columns(
                      showDeleteConfirm,
                      players,
                      handleEdit,
                      handleSave
                    )}
                    dataSource={players}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 1300, y: 220 }}
                    size="small"
                  />
                </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MembersTeamPage;
