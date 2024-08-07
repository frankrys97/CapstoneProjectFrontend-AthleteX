import { Col, Row } from "react-bootstrap";
import { Modal, Alert, Input, Select, DatePicker, TimePicker, Checkbox, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment/min/moment-with-locales';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCallback, useEffect, useState } from "react";
import { addEventToTeam, updateEventInTeam, deleteEventFromTeam, fetchTeamEvents } from "../../redux/actions";
import TeamPageLayout from "./TeamPageLayout";
import "./TeamPage.scss";
import { Link, useNavigate } from "react-router-dom";
import "moment/locale/it";
import tinycolor from "tinycolor2";

moment.locale('it');
const localizer = momentLocalizer(moment);

const { TextArea } = Input;

const CalendarPage = () => {
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
    trainingType: ""
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

  // Fetch events on team change
  useEffect(() => {
    if (team) {
      dispatch(fetchTeamEvents(team.id));
    }
  }, [dispatch, team]);

  // Event filtering function with useCallback to optimize
  const filterEvents = useCallback(() => {
    if (!events) return [];
    if (filters.ALL) return events;

    return events.filter((event) => filters[event.eventType]);
  }, [events, filters]);

  // Create filtered events whenever events or filters change
  const [filteredEvents, setFilteredEvents] = useState([]);
  useEffect(() => {
    setFilteredEvents(filterEvents());
  }, [filterEvents]);

  const handleEventClick = (event) => {
    setEditingEventId(event.id);
    setEventDetails({
      eventType: event.eventType,
      title: event.title,
      description: event.description,
      startDate: moment(event.start).format('YYYY-MM-DD'),
      endDate: moment(event.end).format('YYYY-MM-DD'),
      startTime: moment(event.start).format('HH:mm'),
      endTime: moment(event.end).format('HH:mm'),
      meetTime: event.meetTime,
      locationType: event.locationType,
      opponent: event.opponent,
      home: event.home,
      duration: event.duration,
      trainingType: event.trainingType || ""
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!eventDetails.title || !eventDetails.description || !eventDetails.startDate || !eventDetails.startTime || !eventDetails.endTime) {
      setErrors({ form: "Tutti i campi obbligatori devono essere compilati" });
      return;
    }

    const event = {
      ...eventDetails,
      startDate: moment(eventDetails.startDate).format('YYYY-MM-DD'),
      endDate: moment(eventDetails.endDate).format('YYYY-MM-DD'),
      startTime: moment(eventDetails.startTime, 'HH:mm').format('HH:mm'),
      endTime: moment(eventDetails.endTime, 'HH:mm').format('HH:mm'),
      meetTime: eventDetails.meetTime ? moment(eventDetails.meetTime, 'HH:mm').format('HH:mm') : null,
      locationType: eventDetails.locationType.toLowerCase(),
      duration: eventDetails.duration || "",
      trainingType: eventDetails.eventType === "TRAINING" ? eventDetails.trainingType : undefined
    };

    if (editingEventId) {
      const currentEvent = events.find(ev => ev.id === editingEventId);
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
      trainingType: ""
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
    const backgroundColor = event.eventType === 'MATCH' ? `${team.secondaryColor}` : 'blue';
    const textColor = getTextColor(backgroundColor);
    return {
      style: {
        backgroundColor,
        color: textColor,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
      },
    };
  };

  const handleFilterChange = (eventType) => {
    if (eventType === "ALL") {
      setFilters({
        ALL: true,
        MATCH: true,
        TRAINING: true,
      });
    } else {
      const newFilters = {
        ...filters,
        ALL: false,
        [eventType]: !filters[eventType],
      };
      if (!newFilters.MATCH && !newFilters.TRAINING) {
        newFilters.ALL = true;
        newFilters.MATCH = true;
        newFilters.TRAINING = true;
      }
      setFilters(newFilters);
    }
  };

  return (
    <TeamPageLayout>
      <Row className="w-100">
        <Col>
          <h5 style={{ fontStyle: "italic" }} className="text-muted">
            <Link style={{ color: `${team.secondaryColor}`, textDecoration: "inherit" }} to={`/teams/${team.id}`}>
              {team.name}
            </Link>{" "}
            / Calendario
          </h5>
          <hr />
          <div className="d-flex justify-content-end align-items-center">
            <Checkbox
              checked={filters.ALL}
              onChange={() => handleFilterChange("ALL")}
            >
              Tutti gli eventi
            </Checkbox>
            <Checkbox
              checked={filters.MATCH}
              onChange={() => handleFilterChange("MATCH")}
            >
              Partite
            </Checkbox>
            <Checkbox
              checked={filters.TRAINING}
              onChange={() => handleFilterChange("TRAINING")}
            >
              Allenamenti
            </Checkbox>
            {user.userType === "COACH" && (
              <Button onClick={() => navigate(`/team/${team.id}/add-event`)} className="ml-3">
                Aggiungi Evento
              </Button>
            )}
          </div>
          <div className="mt-4">
            <Calendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={handleEventClick}
              eventPropGetter={eventPropGetter}
              messages={messages}
            />
          </div>
        </Col>
      </Row>

      <Modal
        title={editingEventId ? "Modifica Evento" : "Dettagli Evento"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleSave}
        width={600}  // Imposta una larghezza più ridotta
        style={{ maxHeight: "60vh", overflowY: "auto" }}  // Imposta l'altezza massima con scroll
        footer={user.userType === "COACH" ? [
          <Button key="delete" onClick={handleDelete} variant="danger"> {/* Usa "variant" per React Bootstrap */}
            Elimina
          </Button>,
          <Button key="cancel" onClick={() => setShowModal(false)}>
            Annulla
          </Button>,
          <Button key="submit" type="primary" onClick={handleSave}>
            Salva
          </Button>
        ] : null}
      >
        <Row className="row-cols-1 g-3">
          <Col >
           <div className="w-100 d-flex flex-column justify-content-start align-items-start">
           <label>Tipo di Evento</label>
            <Select
              value={eventDetails.eventType}
              onChange={(value) => setEventDetails({ ...eventDetails, eventType: value })}
              disabled={user.userType === "PLAYER"}
            >
              <Select.Option value="MATCH">Partita</Select.Option>
              <Select.Option value="TRAINING">Allenamento</Select.Option>
            </Select>
           </div>
          </Col>
          <Col >
          <div className="w-100 d-flex flex-column justify-content-start align-items-start">

            <label>Titolo</label>
            <Input
              value={eventDetails.title}
              onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
              disabled={user.userType === "PLAYER"}
            />
          </div>
          </Col>
          <Col >
          <div className="w-100 d-flex flex-column justify-content-start align-items-start">

            <label>Descrizione</label>
            <TextArea
              value={eventDetails.description}
              onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
              disabled={user.userType === "PLAYER"}
            />
          </div>
          </Col>
          <Col >
          <div className="w-100 d-flex flex-column justify-content-start align-items-start">

            <label>Data Inizio</label>
            <DatePicker
              value={eventDetails.startDate ? moment(eventDetails.startDate, 'YYYY-MM-DD') : null}
              onChange={(date) => setEventDetails({ ...eventDetails, startDate: date ? date.format('YYYY-MM-DD') : null })}
              disabled={user.userType === "PLAYER"}
            />
          </div>
          </Col>
          <Col >
          <div className="w-100 d-flex flex-column justify-content-start align-items-start">

            <label>Data Fine</label>
            <DatePicker
              value={eventDetails.endDate ? moment(eventDetails.endDate, 'YYYY-MM-DD') : null}
              onChange={(date) => setEventDetails({ ...eventDetails, endDate: date ? date.format('YYYY-MM-DD') : null })}
              disabled={user.userType === "PLAYER"}
            />
          </div>
          </Col>
          <Col >
          <div className="w-100 d-flex flex-column justify-content-start align-items-start">

            <label>Ora Inizio</label>
            <TimePicker
              value={eventDetails.startTime ? moment(eventDetails.startTime, 'HH:mm') : null}
              onChange={(time) => setEventDetails({ ...eventDetails, startTime: time ? time.format('HH:mm') : null })}
              disabled={user.userType === "PLAYER"}
            />
          </div>
          </Col>
          <Col >
          <div className="w-100 d-flex flex-column justify-content-start align-items-start">

            <label>Ora Fine</label>
            <TimePicker
              value={eventDetails.endTime ? moment(eventDetails.endTime, 'HH:mm') : null}
              onChange={(time) => setEventDetails({ ...eventDetails, endTime: time ? time.format('HH:mm') : null })}
              disabled={user.userType === "PLAYER"}
            />
          </div>
          </Col>
              <Col >
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">

                <label>Avversario</label>
                <Input
                  value={eventDetails.opponent}
                  onChange={(e) => setEventDetails({ ...eventDetails, opponent: e.target.value })}
                  disabled={user.userType === "PLAYER"}
                />
              </div>
              </Col>
              <Col >
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">

                <label>Casa/Trasferta</label>
                <Select
                  value={eventDetails.home}
                  onChange={(value) => setEventDetails({ ...eventDetails, home: value })}
                  disabled={user.userType === "PLAYER"}
                  style={{ width: "25%" }}
                >
                  <Select.Option value="true">Casa</Select.Option>
                  <Select.Option value="false">Trasferta</Select.Option>
                </Select>
              </div>
              </Col>
              <Col >
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">

                <label>Luogo</label>
                <Select
                  value={eventDetails.locationType}
                  onChange={(value) => setEventDetails({ ...eventDetails, locationType: value })}
                  disabled={user.userType === "PLAYER"}
                >
                  <Select.Option value="GYM">Palestra</Select.Option>
                  <Select.Option value="STADIUM">Stadio</Select.Option>
                  <Select.Option value="TRAINING_FIELD">Campo di allenamento</Select.Option>
                </Select>
              </div>
              </Col>
              <Col >
              <div className="w-100 d-flex flex-column justify-content-start align-items-start">

                <label>Durata</label>
                <Input
                  value={eventDetails.duration}
                  onChange={(e) => setEventDetails({ ...eventDetails, duration: e.target.value })}
                  disabled={user.userType === "PLAYER"}
                />
              </div>
              </Col>
          {eventDetails.eventType === "TRAINING" && (
              <Col >
                         <div className="w-100 d-flex flex-column justify-content-start align-items-start">

                <label>Tipo di Allenamento</label>
                <Select
                  value={eventDetails.trainingType}
                  onChange={(value) => setEventDetails({ ...eventDetails, trainingType: value })}
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
        {errors.form && (
          <Alert message={errors.form} type="error" showIcon />
        )}
      </Modal>
    </TeamPageLayout>
  );
};

export default CalendarPage;
