import { Button, Col, Row } from "react-bootstrap";
import { Modal, Alert, Input, Select, DatePicker, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment/min/moment-with-locales';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from "react";
import { addEventToTeam, updateEventInTeam, deleteEventFromTeam, fetchTeamEvents } from "../../redux/actions";
import TeamPageLayout from "./TeamPageLayout";
import "./TeamPage.scss";
import { Link, useNavigate } from "react-router-dom";
import "moment/locale/it";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (team) {
      dispatch(fetchTeamEvents(team.id));
    }
  }, [dispatch, team]);

  const handleDateSelect = ({ start, end }) => {
    setShowModal(true);
    setEventDetails({
      ...eventDetails,
      startDate: moment(start).format('YYYY-MM-DD'),
      endDate: moment(end).format('YYYY-MM-DD'),
      startTime: moment(start).format('HH:mm'),
      endTime: moment(end).format('HH:mm'),
    });
  };

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
    if (!eventDetails.title || !eventDetails.startDate || !eventDetails.startTime || !eventDetails.endTime) {
      setErrors({ form: "Titolo, data di inizio, orario di inizio e orario di fine sono obbligatori" });
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
      dispatch(updateEventInTeam(team.id, editingEventId, event));
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

  const formattedEvents = events && events.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
    allDay: false,
    eventType: event.eventType,
    locationType: event.locationType,
    meetTime: event.meetTime,
    startTime: event.startTime,
    endTime: event.endTime,
    opponent: event.opponent,
    home: event.home,
    description: event.description,
  }));

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
          <div className="d-flex justify-content-end align-items-center mb-3">
            <Button onClick={() => navigate(`/team/${team.id}/add-event`)}>Aggiungi Evento</Button>
          </div>
          <Calendar
            localizer={localizer}
            messages={messages}
            events={formattedEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 400 }}
            locale="it"
            selectable
            onSelectSlot={handleDateSelect}
            onSelectEvent={handleEventClick}
            views={['month', 'week', 'day', 'agenda']}
            defaultView="month"
          />
        </Col>
      </Row>

      <Modal
        title={editingEventId ? "Modifica Evento" : "Aggiungi Evento"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleSave}
        footer={[
          <Button key="back" onClick={() => setShowModal(false)}>Annulla</Button>,
          <Button key="submit" type="primary" onClick={handleSave}>Salva</Button>,
          editingEventId && <Button key="delete" type="danger" onClick={handleDelete}>Elimina</Button>,
        ]}
      >
        <div>
          {errors.form && <Alert type="error" message={errors.form} />}
          <Select
            value={eventDetails.eventType}
            onChange={(value) => setEventDetails({ ...eventDetails, eventType: value })}
            placeholder="Seleziona il tipo di evento"
            style={{ width: "100%", marginBottom: 20 }}
          >
            <Select.Option value="MATCH">Partita</Select.Option>
            <Select.Option value="TRAINING">Allenamento</Select.Option>
          </Select>
          <Input
            value={eventDetails.title}
            onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
            placeholder="Titolo"
            style={{ width: "100%", marginBottom: 20 }}
          />
          <TextArea
            value={eventDetails.description}
            onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
            placeholder="Descrizione"
            style={{ width: "100%", marginBottom: 20 }}
          />
          <DatePicker
            value={eventDetails.startDate ? moment(eventDetails.startDate) : null}
            onChange={(date) => setEventDetails({ ...eventDetails, startDate: date.format('YYYY-MM-DD') })}
            placeholder="Data di inizio"
            style={{ width: "100%", marginBottom: 20 }}
          />
          <DatePicker
            value={eventDetails.endDate ? moment(eventDetails.endDate) : null}
            onChange={(date) => setEventDetails({ ...eventDetails, endDate: date.format('YYYY-MM-DD') })}
            placeholder="Data di fine"
            style={{ width: "100%", marginBottom: 20 }}
          />
          <TimePicker
            value={eventDetails.startTime ? moment(eventDetails.startTime, 'HH:mm') : null}
            onChange={(time) => setEventDetails({ ...eventDetails, startTime: time.format('HH:mm') })}
            placeholder="Ora di inizio"
            style={{ width: "100%", marginBottom: 20 }}
            format="HH:mm"
          />
          <TimePicker
            value={eventDetails.endTime ? moment(eventDetails.endTime, 'HH:mm') : null}
            onChange={(time) => setEventDetails({ ...eventDetails, endTime: time.format('HH:mm') })}
            placeholder="Ora di fine"
            style={{ width: "100%", marginBottom: 20 }}
            format="HH:mm"
          />
          <TimePicker
            value={eventDetails.meetTime ? moment(eventDetails.meetTime, 'HH:mm') : null}
            onChange={(time) => setEventDetails({ ...eventDetails, meetTime: time.format('HH:mm') })}
            placeholder="Ora di incontro"
            style={{ width: "100%", marginBottom: 20 }}
            format="HH:mm"
          />
          <Select
            value={eventDetails.locationType}
            onChange={(value) => setEventDetails({ ...eventDetails, locationType: value })}
            placeholder="Seleziona il tipo di location"
            style={{ width: "100%", marginBottom: 20 }}
          >
            <Select.Option value="GYM">Palestra</Select.Option>
            <Select.Option value="STADIUM">Stadio</Select.Option>
            <Select.Option value="TRAINING_FIELD">Campo di allenamento</Select.Option>
          </Select>
          {eventDetails.eventType === "TRAINING" && (
            <Select
              value={eventDetails.trainingType}
              onChange={(value) => setEventDetails({ ...eventDetails, trainingType: value })}
              placeholder="Tipo di allenamento"
              style={{ width: "100%", marginBottom: 20 }}
            >
              <Select.Option value="STRENGTH">Forza</Select.Option>
              <Select.Option value="TACTICS">Tattica</Select.Option>
              <Select.Option value="TECHNICAL">Tecnica</Select.Option>
              <Select.Option value="PRE_MATCH">Pre-Match</Select.Option>
            </Select>
          )}
          <Input
            type="number"
            value={eventDetails.duration}
            onChange={(e) => setEventDetails({ ...eventDetails, duration: e.target.value })}
            placeholder="Durata (minuti)"
            style={{ width: "100%", marginBottom: 20 }}
          />
          <Input
            value={eventDetails.opponent}
            onChange={(e) => setEventDetails({ ...eventDetails, opponent: e.target.value })}
            placeholder="Avversario"
            style={{ width: "100%", marginBottom: 20 }}
          />
          <Select
            value={eventDetails.home ? 'home' : 'away'}
            onChange={(value) => setEventDetails({ ...eventDetails, home: value === 'home' })}
            placeholder="Sede"
            style={{ width: "100%", marginBottom: 20 }}
          >
            <Select.Option value="home">Casa</Select.Option>
            <Select.Option value="away">Trasferta</Select.Option>
          </Select>
        </div>
      </Modal>
    </TeamPageLayout>
  );
};

export default CalendarPage;
