import { Card, Col, Row } from "react-bootstrap";
import {
  Modal,
  Alert,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment/min/moment-with-locales";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useEffect, useState } from "react";
import {
  addEventToTeam,
  updateEventInTeam,
  deleteEventFromTeam,
  fetchTeamEvents,
} from "../../redux/actions";
import TeamPageLayout from "./TeamPageLayout";
import "./TeamPage.scss";
import { Link, useNavigate } from "react-router-dom";
import "moment/locale/it";
import tinycolor from "tinycolor2";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./CalendarPage.scss";
import CustomCheckbox from "./CustomCheckbox";
import "./CustomCheckbox.scss";
import immagineAllenamento from "../../assets/Esecutivi/immagine-allenamento.jpeg";
import immaginePartita from "../../assets/Esecutivi/immagine-partita.jpg";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { MdOutlineEditCalendar } from "react-icons/md";
moment.locale("it");

moment.locale("it");
const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

const { TextArea } = Input;

const CalendarPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    eventType: "",
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    meetTime: null,
    locationType: "",
    opponent: "",
    home: "",
    duration: "",
    trainingType: "",
  });
  const [editingEventId, setEditingEventId] = useState(null);
  const [errors, setErrors] = useState({});
  const team = useSelector((state) => state.team.content);
  const events = useSelector((state) => state.team.events);
  const user = useSelector((state) => state.authenticate.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    ALL: true,
    MATCH: true,
    TRAINING: true,
  });

  useEffect(() => {
    if (team) {
      dispatch(fetchTeamEvents(team.id));
    }
  }, [dispatch, team]);

  const filterEvents = useCallback(() => {
    if (!events) return [];
    const filteredByType = filters.ALL
      ? events
      : events.filter((event) => filters[event.eventType]);

    return filteredByType.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, filters, searchTerm]);

  const [filteredEvents, setFilteredEvents] = useState([]);
  useEffect(() => {
    setFilteredEvents(filterEvents());
  }, [filterEvents]);

  const mapEvents = (events) => {
    return events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  };

  const handleEventClick = (event) => {
    setEditingEventId(event.id);
    setEventDetails({
      eventType: event.eventType,
      title: event.title,
      description: event.description,
      startDate: moment(event.start).format("YYYY-MM-DD"),
      endDate: moment(event.end).format("YYYY-MM-DD"),
      startTime: moment(event.start).format("HH:mm"),
      endTime: moment(event.end).format("HH:mm"),
      meetTime: event.meetTime,
      locationType: event.locationType,
      opponent: event.opponent,
      home: event.home,
      duration: event.duration,
      trainingType: event.trainingType || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (
      !eventDetails.title ||
      !eventDetails.description ||
      !eventDetails.startDate ||
      !eventDetails.startTime ||
      !eventDetails.endTime
    ) {
      setErrors({ form: "Tutti i campi obbligatori devono essere compilati" });
      return;
    }

    const event = {
      ...eventDetails,
      startDate: moment(eventDetails.startDate).format("YYYY-MM-DD"),
      endDate: moment(eventDetails.endDate).format("YYYY-MM-DD"),
      startTime: moment(eventDetails.startTime, "HH:mm").format("HH:mm"),
      endTime: moment(eventDetails.endTime, "HH:mm").format("HH:mm"),
      meetTime: eventDetails.meetTime
        ? moment(eventDetails.meetTime, "HH:mm").format("HH:mm")
        : null,
      locationType: eventDetails.locationType.toLowerCase(),
      duration: eventDetails.duration || "",
      trainingType:
        eventDetails.eventType === "TRAINING"
          ? eventDetails.trainingType
          : undefined,
    };

    if (editingEventId) {
      const currentEvent = events.find((ev) => ev.id === editingEventId);
      if (currentEvent.eventType !== event.eventType) {
        dispatch(deleteEventFromTeam(team.id, editingEventId));
        dispatch(addEventToTeam(team.id, event));
      } else {
        dispatch(updateEventInTeam(team.id, editingEventId, event));
      }
    } else {
      dispatch(addEventToTeam(team.id, event));
    }
    setShowModal(false);
    resetForm();
  };
  const handleDelete = () => {
    dispatch(deleteEventFromTeam(team.id, editingEventId));
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingEventId(null);
    setEventDetails({
      eventType: "",
      title: "",
      description: "",
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      meetTime: null,
      locationType: "",
      opponent: "",
      home: "",
      duration: "",
      trainingType: "",
    });
    setErrors({});
  };

  // const formattedEvents = filteredEvents.map(event => ({
  //   id: event.id,
  //   title: event.title,
  //   start: new Date(event.start),
  //   end: new Date(event.end),
  //   allDay: false,
  //   eventType: event.eventType,
  //   locationType: event.locationType,
  //   meetTime: event.meetTime,
  //   startTime: event.startTime,
  //   endTime: event.endTime,
  //   opponent: event.opponent,
  //   home: event.home,
  //   description: event.description,
  // }));

  const messages = {
    allDay: "Tutto il giorno",
    previous: "Precedente",
    next: "Successivo",
    today: "Oggi",
    month: "Mese",
    week: "Settimana",
    day: "Giorno",
    agenda: "Agenda",
    date: "Data",
    time: "Ora",
    event: "Evento",
    showMore: (total) => `+${total} più`,
  };

  const getTextColor = (backgroundColor) => {
    const color = tinycolor(backgroundColor);
    const luminance = color.getLuminance();
    return luminance > 0.5 ? "#161832" : "#ffffff";
  };

  const eventPropGetter = (event) => {
    const backgroundColor = event.eventType === "MATCH" ? `#fd4742` : "#2600ff";
    const textColor = getTextColor(backgroundColor);
    return {
      style: {
        backgroundColor,
        color: textColor,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
      },
    };
  };

  const handleFilterChange = (eventType) => {
    if (eventType === "ALL") {
      setFilters({
        ALL: !filters.ALL,
        MATCH: !filters.ALL,
        TRAINING: !filters.ALL,
      });
    } else {
      const newFilters = {
        ...filters,
        [eventType]: !filters[eventType],
        ALL: false,
      };

      if (newFilters.MATCH && newFilters.TRAINING) {
        newFilters.ALL = true;
      }

      setFilters(newFilters);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [fadeClass, setFadeClass] = useState("");

  const moveEvent = (draggedEvent, start, end) => {
    const formatTime = (time) => moment(time, "HH:mm:ss").format("HH:mm");
    setFadeClass("hidden");
    setIsLoading(true);

    const updatedEvent = {
      eventType: draggedEvent.eventType,
      title: draggedEvent.title,
      description: draggedEvent.description,
      startDate: moment(start).format("YYYY-MM-DD"),
      endDate: moment(end).format("YYYY-MM-DD"),
      startTime: moment(start).format("HH:mm"),
      endTime: moment(end).format("HH:mm"),
      meetTime: formatTime(draggedEvent.meetTime),
      locationType: draggedEvent.locationType,
      opponent: draggedEvent.opponent,
      home: draggedEvent.home,
      duration: draggedEvent.duration,
      ...(draggedEvent.eventType === "TRAINING" && {
        trainingType: draggedEvent.trainingType,
      }),
    };

    console.log("Payload inviato:", updatedEvent);

    dispatch(updateEventInTeam(team.id, draggedEvent.id, updatedEvent)).finally(
      () => {
        setIsLoading(false);
        setFadeClass("");
      }
    );
  };

  return (
    <TeamPageLayout>
      <Row className="w-100">
        <Col>
          <h5 style={{ fontStyle: "italic" }} className="text-muted">
            <Link
              style={{
                color: `${team.secondaryColor}`,
                textDecoration: "inherit",
              }}
              to={`/teams/${team.id}`}
            >
              {team.name}
            </Link>{" "}
            / Calendario
          </h5>
          <hr />
          <div className="d-flex flex-column flex-md-row justify-content-between justify-content-md-start align-items-center">
            <div className="d-flex gap-2">
              <CustomCheckbox
                id="all-events"
                checked={filters.ALL}
                onChange={() => handleFilterChange("ALL")}
                label="Tutti"
                boxClassName="checkbox-box-1"
                tickClassName="checkbox-tick-1"
              />

              <CustomCheckbox
                id="match-events"
                checked={filters.MATCH}
                onChange={() => handleFilterChange("MATCH")}
                label="Partite"
                boxClassName="checkbox-box-2"
                tickClassName="checkbox-tick-2"
              />
              <CustomCheckbox
                id="training-events"
                checked={filters.TRAINING}
                onChange={() => handleFilterChange("TRAINING")}
                label="Allenamenti"
                boxClassName="checkbox-box-3"
                tickClassName="checkbox-tick-3"
              />
            </div>
            <div className="mt-2 mt-md-0 ms-md-auto d-flex flex-column justify-content-center align-items-center flex-md-row align-item-md-center gap-2">
              <div className="position-relative">
                <input
                  type="text"
                  placeholder="Cerca eventi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control w-100"
                />
                <HiOutlineMagnifyingGlass className="search-icon" />
              </div>
              {user.userType === "COACH" && (
                //                 <Button
                //                   onClick={() => navigate(`/calendar/add-event`)}
                //                   style={{
                //                     backgroundColor: `${team.secondaryColor}`,
                //                     color: `${getTextColor(`${team.secondaryColor}`)}`,
                //                     borderRadius: "5px",
                //                     borderColor: `${team.secondaryColor}`,
                //                     fontFamily: "Montserrat",
                //                     fontStyle: "normal",
                //                   }}
                //                   className="px-3 py-3 btn-add-member fs-6 d-flex justify-content-center align-items-center gap-2"
                //                 >
                //                   <MdOutlineEditCalendar />
                // <span>Aggiungi un evento</span>
                //                 </Button>
                <button
                  type="button"
                  onClick={() => navigate(`/calendar/add-event`)}
                  className="button-dynamic px-3 py-2 rounded"
                  style={{
                    borderColor: team ? `${team.secondaryColor}` : "#fd4742",
                    backgroundColor: team
                      ? `${team.secondaryColor}`
                      : "#fd4742",
                    color: getTextColor(
                      team ? `${team.secondaryColor}` : "#fd4742"
                    ),
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    height: "37px",
                  }}
                >
                  <span
                    className="button__text"
                    style={{
                      color: getTextColor(
                        team ? `${team.secondaryColor}` : "#fd4742"
                      ),
                    }}
                  >
                    Aggiungi evento
                  </span>
                  <span
                    className="button__icon rounded"
                    style={{
                      backgroundColor: team
                        ? `${tinycolor(team.secondaryColor).darken(5)}`
                        : "#fd4742",
                    }}
                  >
                    <MdOutlineEditCalendar className="fs-5" />
                  </span>
                </button>
              )}
            </div>
          </div>
          <div
            className="mt-4 bg-white p-4 rounded border position-relative"
            style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }}
          >
            {isLoading && (
              <div className="loading-overlay">Caricamento in corso...</div>
            )}
            <div className={`calendar-container ${fadeClass}`}>
              <DndProvider backend={HTML5Backend}>
                {user.userType === "COACH" ? (
                  <DragAndDropCalendar
                    localizer={localizer}
                    events={mapEvents(filteredEvents)}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 400 }}
                    onSelectEvent={handleEventClick}
                    messages={messages}
                    eventPropGetter={eventPropGetter}
                    draggableAccessor={() => true}
                    onEventDrop={({ event, start, end }) =>
                      moveEvent(event, start, end)
                    }
                  />
                ) : (
                  <Calendar
                    localizer={localizer}
                    events={mapEvents(filteredEvents)}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 400 }}
                    onSelectEvent={handleEventClick}
                    messages={messages}
                    eventPropGetter={eventPropGetter}
                    draggableAccessor={() => true}
                    onEventDrop={({ event, start, end }) =>
                      moveEvent(event, start, end)
                    }
                  />
                )}
              </DndProvider>
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        title={
          user.userType === "COACH" ? "Modifica Evento" : "Dettagli Evento"
        }
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleSave}
        width={600}
        style={{ maxHeight: "80vh", overflowY: "auto" }}
        footer={
          user.userType === "COACH"
            ? [
                <Button key="delete" onClick={handleDelete} variant="danger">
                  Elimina
                </Button>,
                <Button key="cancel" onClick={() => setShowModal(false)}>
                  Annulla
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                  Salva
                </Button>,
              ]
            : null
        }
      >
        {user.userType === "COACH" ? (
          <Row className="row-cols-1 g-3">
            <Col>
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">
                <label>Tipo di Evento</label>
                <Select
                  value={eventDetails.eventType}
                  onChange={(value) =>
                    setEventDetails({ ...eventDetails, eventType: value })
                  }
                  disabled={user.userType === "PLAYER"}
                >
                  <Select.Option value="MATCH">Partita</Select.Option>
                  <Select.Option value="TRAINING">Allenamento</Select.Option>
                </Select>
              </div>
            </Col>
            <Col>
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">
                <label>Titolo</label>
                <Input
                  value={eventDetails.title}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, title: e.target.value })
                  }
                  disabled={user.userType === "PLAYER"}
                />
              </div>
            </Col>
            <Col>
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">
                <label>Descrizione</label>
                <TextArea
                  value={eventDetails.description}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      description: e.target.value,
                    })
                  }
                  disabled={user.userType === "PLAYER"}
                />
              </div>
            </Col>
            <Col>
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">
                <label>Data Inizio</label>
                <DatePicker
                  value={
                    eventDetails.startDate
                      ? moment(eventDetails.startDate, "YYYY-MM-DD")
                      : null
                  }
                  onChange={(date) =>
                    setEventDetails({
                      ...eventDetails,
                      startDate: date ? date.format("YYYY-MM-DD") : null,
                    })
                  }
                  disabled={user.userType === "PLAYER"}
                />
              </div>
            </Col>
            <Col>
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">
                <label>Data Fine</label>
                <DatePicker
                  value={
                    eventDetails.endDate
                      ? moment(eventDetails.endDate, "YYYY-MM-DD")
                      : null
                  }
                  onChange={(date) =>
                    setEventDetails({
                      ...eventDetails,
                      endDate: date ? date.format("YYYY-MM-DD") : null,
                    })
                  }
                  disabled={user.userType === "PLAYER"}
                />
              </div>
            </Col>
            <Col>
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">
                <label>Ora Inizio</label>
                <TimePicker
                  value={
                    eventDetails.startTime
                      ? moment(eventDetails.startTime, "HH:mm")
                      : null
                  }
                  onChange={(time) =>
                    setEventDetails({
                      ...eventDetails,
                      startTime: time ? time.format("HH:mm") : null,
                    })
                  }
                  disabled={user.userType === "PLAYER"}
                />
              </div>
            </Col>
            <Col>
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">
                <label>Ora Fine</label>
                <TimePicker
                  value={
                    eventDetails.endTime
                      ? moment(eventDetails.endTime, "HH:mm")
                      : null
                  }
                  onChange={(time) =>
                    setEventDetails({
                      ...eventDetails,
                      endTime: time ? time.format("HH:mm") : null,
                    })
                  }
                  disabled={user.userType === "PLAYER"}
                />
              </div>
            </Col>
            <Col>
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">
                <label>Ora di Incontro</label>
                <TimePicker
                  value={
                    eventDetails.meetTime
                      ? moment(eventDetails.meetTime, "HH:mm")
                      : null
                  }
                  onChange={(time) =>
                    setEventDetails({
                      ...eventDetails,
                      meetTime: time ? time.format("HH:mm") : null,
                    })
                  }
                  disabled={user.userType === "PLAYER"}
                />
              </div>
            </Col>
            <Col>
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">
                <label>Avversario</label>
                <Input
                  value={eventDetails.opponent}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      opponent: e.target.value,
                    })
                  }
                  disabled={user.userType === "PLAYER"}
                />
              </div>
            </Col>
            <Col>
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">
                <label>Casa/Trasferta</label>
                <Select
                  value={eventDetails.home === "true" ? "true" : "false"}
                  onChange={(value) =>
                    setEventDetails({ ...eventDetails, home: value })
                  }
                  disabled={user.userType === "PLAYER"}
                  style={{ width: "25%" }}
                >
                  <Select.Option value="true">Casa</Select.Option>
                  <Select.Option value="false">Trasferta</Select.Option>
                </Select>
              </div>
            </Col>
            <Col>
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">
                <label>Luogo</label>
                <Select
                  value={eventDetails.locationType}
                  onChange={(value) =>
                    setEventDetails({ ...eventDetails, locationType: value })
                  }
                  disabled={user.userType === "PLAYER"}
                >
                  <Select.Option value="GYM">Palestra</Select.Option>
                  <Select.Option value="STADIUM">Stadio</Select.Option>
                  <Select.Option value="TRAINING_FIELD">
                    Campo di allenamento
                  </Select.Option>
                </Select>
              </div>
            </Col>
            <Col>
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">
                <label>Durata</label>
                <Input
                  value={eventDetails.duration}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      duration: e.target.value,
                    })
                  }
                  disabled={user.userType === "PLAYER"}
                />
              </div>
            </Col>
            {eventDetails.eventType === "TRAINING" && (
              <Col>
                <div className="w-100 d-flex flex-column justify-content-start align-items-start">
                  <label>Tipo di Allenamento</label>
                  <Select
                    value={eventDetails.trainingType}
                    onChange={(value) =>
                      setEventDetails({ ...eventDetails, trainingType: value })
                    }
                    disabled={user.userType === "PLAYER"}
                  >
                    <Select.Option value="STRENGTH">Forza</Select.Option>
                    <Select.Option value="TACTICS">Tattico</Select.Option>
                    <Select.Option value="TECHNICAL">Tecnico</Select.Option>
                    <Select.Option value="PRE_MATCH">Pre-Match</Select.Option>
                  </Select>
                </div>
              </Col>
            )}
          </Row>
        ) : (
          <>
            <Card
              style={{
                width: "100%",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Card.Img
                variant="top"
                src={
                  eventDetails.eventType === "TRAINING"
                    ? immagineAllenamento
                    : immaginePartita
                }
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  aspectRatio: "16/9",
                }}
              />
              <Card.Body>
                <Card.Title>
                  {eventDetails.eventType === "TRAINING"
                    ? "Allenamento"
                    : "Partita"}
                </Card.Title>

                <div>
                  <p className="m-0 fw-semibold fs-6">Descrizione</p>
                  {eventDetails.description}
                  <p className="m-0 fw-semibold fs-6">Data inizio</p>
                  {eventDetails.startDate &&
                    eventDetails.startDate.split("-").reverse().join("-")}
                  <p className="m-0 fw-semibold fs-6">Data fine</p>
                  {eventDetails.endDate &&
                    eventDetails.endDate.split("-").reverse().join("-")}
                  <p className="m-0 fw-semibold fs-6">Luogo</p>
                  {eventDetails.locationType === "GYM"
                    ? "Palestra"
                    : eventDetails.locationType === "STADIUM"
                    ? "Stadio"
                    : "Campo di allenamento"}
                  <p className="m-0 fw-semibold fs-6">Durata</p>
                  {eventDetails.duration ? eventDetails.duration : "N/A"}
                  {eventDetails.eventType === "TRAINING" && (
                    <>
                      <p className="m-0 fw-semibold fs-6">
                        Tipo di allenamento
                      </p>
                      {eventDetails.trainingType === "STRENGTH"
                        ? "Forza"
                        : eventDetails.trainingType === "TACTICS"
                        ? "Tattico"
                        : eventDetails.trainingType === "TECHNICAL"
                        ? "Tecnico"
                        : "Pre-Match"}
                    </>
                  )}
                  {eventDetails.eventType === "MATCH" && (
                    <>
                      <p className="m-0 fw-semibold fs-6">Casa/Trasferta</p>
                      {eventDetails.home ? "Casa" : "Trasferta"}
                    </>
                  )}
                  {eventDetails.eventType === "MATCH" && (
                    <>
                      <p className="m-0 fw-semibold fs-6">Avversario</p>
                      {eventDetails.opponent ? eventDetails.opponent : "N/A"}
                    </>
                  )}
                </div>
              </Card.Body>
              <div
                style={{
                  backgroundColor: `${
                    eventDetails && eventDetails.eventType === "TRAINING"
                      ? "#2600ff"
                      : "#fd4742"
                  }`,
                  color: `${getTextColor(
                    `${
                      eventDetails && eventDetails.eventType === "TRAINING"
                        ? "#2600ff"
                        : "#fd4742"
                    }`
                  )}`,
                  width: "100%",
                  height: "70px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <div className="d-flex justify-content-around align-items-center h-100">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className="m-0 fw-semibold">Orario di inizio</p>
                    <p className="m-0">{eventDetails.startTime}</p>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className="m-0 fw-semibold">Orario di fine</p>
                    <p className="m-0">{eventDetails.endTime}</p>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className="m-0 fw-semibold">Orario d&apos;Incontro</p>
                    {eventDetails.meetTime && (
                      <p className="m-0">
                        {eventDetails.meetTime.substring(0, 5)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
        {errors.form && <Alert message={errors.form} type="error" showIcon />}
      </Modal>
    </TeamPageLayout>
  );
};

export default CalendarPage;
