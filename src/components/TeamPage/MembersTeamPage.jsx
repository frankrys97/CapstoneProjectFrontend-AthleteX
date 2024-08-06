import { Button, Col, Row, Spinner } from "react-bootstrap";
import { Dropdown, Space, Table, Select, Modal, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoCloudUploadOutline, IoSettingsOutline } from "react-icons/io5";
import tinycolor from "tinycolor2";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";
import {
  cancelTeamOfPlayer,
  getPlayersOfTeam,
  removePlayerFromTeam,
  updatePlayerInTeam,
} from "../../redux/actions";
import { useEffect, useRef, useState } from "react";
import "./TeamPage.scss";
import TeamPageLayout from "./TeamPageLayout";
import { FcUpload } from "react-icons/fc";

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

  const [showModalInput, setShowModalInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [editingPlayerId, setEditingPlayerId] = useState(null);

  const handleOpenModalInput = (playerId) => {
    setEditingPlayerId(playerId);
    setShowModalInput(true);
  };

  const handleCloseModalInput = () => {
    setShowModalInput(false);
    setSelectedFile(null);
    setErrors({});
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleClickInput = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setSelectedFile(e.dataTransfer.files[0]);
  };

  const handleUploadAvatar = async () => {
    if (!selectedFile) {
      setErrors({ avatar: "Seleziona un file prima di caricare." });
      return;
    }
    setLoadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      const response = await apiClient.patch(
        `teams/${team.id}/components/${editingPlayerId}/avatar`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(updatePlayerInTeam(response.data));
      setRefresh(!refresh);
      setShowModalInput(false);
      setSelectedFile(null);
      setEditingPlayerId(null);
    } catch (error) {
      console.error("Errore durante il caricamento dell'avatar:", error);
      setErrors({ avatar: "Errore durante il caricamento dell'avatar." });
    } finally {
      setLoadingAvatar(false);
    }
  };

  const columns = (showDeleteConfirm, players, handleEdit, handleSave) => {
    const commonColumns = [
      {
        title: "Foto",
        dataIndex: "avatar",
        key: "avatar",
        render: (text, record) => (
          <div
            className="d-flex justify-content-center"
            onClick={() => handleOpenModalInput(record.id)}
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
          >
            <img src={text} alt="Foto" className="rounded-circle w-100 h-100" />
          </div>
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
                setEditedValues((prev) => ({
                  ...prev,
                  surname: e.target.value,
                }))
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
        sorter: (a, b) => {
          const positionA =
            positionOptions.find((option) => option.value === a.position)
              ?.label || "";
          const positionB =
            positionOptions.find((option) => option.value === b.position)
              ?.label || "";
          return positionA.localeCompare(positionB);
        },
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
        render: (text) => (
          <span style={{ width: "100%" }}>{text || "N/A"}</span>
        ),
        sorter: (a, b) => a.status.localeCompare(b.status),
      },
    ];

    if (user.userType === "COACH") {
      commonColumns.push({
        title: "Azione",
        key: "operation",
        fixed: "right",
        width: 70,
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
                  disabled={isEditing}
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
      });
    }

    return commonColumns;
  };

  const user = useSelector((state) => state.authenticate.user);
  const team = useSelector((state) => state.team.content);
  const players = useSelector((state) => state.team.players.players || []);
  const [refresh, setRefresh] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const showLeaveConfirm = () => {
    Modal.confirm({
      title: "Conferma abbandono",
      content: "Sei sicuro di voler abbandonare la squadra?",
      onOk: handleLeave,
      okText: "Abbandona",
      cancelText: "Annulla",
      okButtonProps: {
        style: { backgroundColor: "#fd4742", color: "#fff" },
      },
    });
  };

  const handleLeave = async () => {
    const userId = user.id;
    try {
      await apiClient.patch(`teams/me/leave`);
      setRefresh(!refresh);
      dispatch(removePlayerFromTeam(userId));
      dispatch(cancelTeamOfPlayer());
      navigate("/homepage");
    } catch (error) {
      console.error(error);
    }
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
    <TeamPageLayout>
      <Modal
        title="Carica immagine del profilo"
        open={showModalInput}
        onCancel={handleCloseModalInput}
        footer={[
          <Button
            key="cancel"
            onClick={handleCloseModalInput}
            className="px-4 py-2 rounded "
            style={{
              backgroundColor: `transparent`,
              color: `${getTextColor("#ffffff")}`,
              borderColor: `${team.secondaryColor}`,
            }}
          >
            Annulla
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleUploadAvatar}
            className="px-4 py-2 rounded ms-3"
            style={{
              backgroundColor: `${team.secondaryColor}`,
              borderColor: `${team.secondaryColor}`,
              color: `${getTextColor(`${team.secondaryColor}`)}`,
            }}
          >
            {loadingAvatar ? <Spinner size="small" /> : "Convalida"}
          </Button>,
        ]}
      >
        {errors.avatar && (
          <Alert
            message={errors.avatar}
            type="error"
            showIcon
            className="mb-3"
          />
        )}
        <div
          className="drag-drop-area"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClickInput}
          style={{
            border: "2px dashed #ccc",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <IoCloudUploadOutline className="fs-2" />
          <p>Trascina qui la tua immagine o clicca per selezionarla.</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {selectedFile && (
            <div className="mt-3">
              <FcUpload className="fs-3" />
              {selectedFile.name}
            </div>
          )}
        </div>
      </Modal>
      <Row className="w-100">
        <Col>
          <h5 style={{ fontStyle: "italic" }} className="text-muted">
          <Link
              style={{
                color: team ? `${team.secondaryColor}` : "#fd4742",
              }} to={`team/${team.id}`}
              className="text-decoration-none"
            >
              {team.name} </Link>{" "}
            / Rosa
          </h5>
        </Col>
      </Row>

      <Row className="mt-5 w-100">
        <Col className="w-100">
          <div className="d-flex flex-column justify-content-between align-items-start gap-3 flex-sm-row align-items-sm-end">
            <h5 className="text-dark mb-0">Membri</h5>
            {user && user.userType === "COACH" ? (
              <Button
                as={Link}
                to={`/team/${team.name}/add-member`}
                style={{
                  backgroundColor: team ? `${team.secondaryColor}` : "#fd4742",
                  color: getTextColor(
                    team ? `${team.secondaryColor}` : "#fd4742"
                  ),
                }}
                className="d-flex align-items-center gap-2 border border-0 rounded rounded-2 px-3 py-2 btn-add-member"
              >
                <AiOutlineUserAdd className="fs-4" />
                <span>Aggiungi un membro</span>
              </Button>
            ) : (
              <Button
                style={{
                  backgroundColor: team ? `${team.secondaryColor}` : "#fd4742",
                  color: getTextColor(
                    team ? `${team.secondaryColor}` : "#fd4742"
                  ),
                }}
                className="d-flex align-items-center gap-2 border border-0 rounded rounded-2 px-3 py-2 btn-add-member"
                onClick={showLeaveConfirm}
              >
                <AiOutlineUserAdd className="fs-4" />
                <span>Abbandona la squadra</span>
              </Button>
            )}
          </div>
        </Col>
      </Row>

      <Row className="w-100">
        <Col style={{ minHeight: "60vh", maxHeight: "60vh" }}>
          <div
            style={{ backgroundColor: "white" }}
            className="mt-4 rounded rounded-2 border border-1 p-4"
          >
            <div className="d-flex flex-column align-items-start justify-content-between flex-md-row align-items-md-center gap-3">
              <h5>
                {players && players.length === 0
                  ? "Nessun membro"
                  : players.length === 1
                  ? "1 Membro"
                  : `${players.length} Membri`}
              </h5>
              <Button
                variant="link"
                className="d-flex align-items-center gap-2 border border-1 rounded rounded-2 px-3 py-2 text-decoration-none"
                style={{
                  color: team ? `${team.secondaryColor}` : "#fd4742",
                }}
                as={Link}
                to={`/team/${team.name}/settings`}
              >
                <IoSettingsOutline />
                <span>Impostazioni</span>
              </Button>
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
    </TeamPageLayout>
  );
};

export default MembersTeamPage;
