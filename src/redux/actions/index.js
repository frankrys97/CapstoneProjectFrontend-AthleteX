import moment from "moment";
import apiClient from "../../utils/axiosConfig";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const RECOGNIZE_USER = "RECOGNIZE_USER";
export const CANCEL_TEAM_OF_PLAYER =  "CANCEL_TEAM_OF_PLAYER";
export const SET_TEAM = "SET_TEAM";
export const GET_PLAYERS_OF_TEAM = "GET_PLAYERS_OF_TEAM";
export const REMOVE_PLAYER_FROM_TEAM = "REMOVE_PLAYER_FROM_TEAM";
export const UPDATE_PLAYER_FROM_TEAM = "UPDATE_PLAYER_FROM_TEAM";
export const GET_PARTECIPATIONS_OF_TEAM = "GET_PARTECIPATIONS_OF_TEAM";
export const UPDATE_PLAYER_IN_TEAM = "UPDATE_PLAYER_IN_TEAM";
export const GET_EVENTS_OF_TEAM = 'GET_EVENTS_OF_TEAM';
export const ADD_EVENT_TO_TEAM = 'ADD_EVENT_TO_TEAM';
export const UPDATE_EVENT_IN_TEAM = 'UPDATE_EVENT_IN_TEAM';
export const DELETE_EVENT_FROM_TEAM = 'DELETE_EVENT_FROM_TEAM';
export const RESET_TEAM = 'RESET_TEAM';

export const resetTeam = () => ({
  type: RESET_TEAM,
});

export const fetchTeam = (teamId) => async (dispatch) => {
  try {
    const response = await apiClient.get(`/teams/${teamId}`);
    dispatch(setTeam(response.data));
  } catch (error) {
    console.error("Errore nel recupero del team:", error);
  }
}

export const fetchTeamEvents = (teamId) => async (dispatch) => {
  try {
    const response = await apiClient.get(`/teams/${teamId}/events`);
    const events = response.data.content.map(event => ({
      ...event,
      start: moment(`${event.startDate}T${event.startTime}`).toISOString(),
      end: moment(`${event.endDate}T${event.endTime}`).toISOString(),
    }));
    dispatch(getEventsOfTeam(events));
  } catch (error) {
    console.error("Errore nel recupero degli eventi del team:", error);
  }
};

export const addEventToTeam = (teamId, event) => async (dispatch) => {
  try {
    const response = await apiClient.post(`/teams/${teamId}/events`, event);
    
    dispatch({
      type: ADD_EVENT_TO_TEAM,
      payload: response.data,
    });

    dispatch(fetchTeamEvents(teamId));
  } catch (error) {
    console.error("Errore nell'aggiunta dell'evento:", error);
  }
};

export const updateEventInTeam = (teamId, eventId, updatedEvent) => async (dispatch) => {
  try {
    const response = await apiClient.put(`/teams/${teamId}/events/${eventId}`, updatedEvent);
    dispatch({
      type: UPDATE_EVENT_IN_TEAM,
      payload: response.data,
    });
    dispatch(fetchTeamEvents(teamId));
  } catch (error) {
    console.error("Errore nell'aggiornamento dell'evento:", error);
  }
};

export const deleteEventFromTeam = (teamId, eventId) => async (dispatch) => {
  try {
    await apiClient.delete(`/teams/${teamId}/events/${eventId}`);
    dispatch({
      type: DELETE_EVENT_FROM_TEAM,
      payload: eventId,
    });
  } catch (error) {
    console.error("Errore nell'eliminazione dell'evento:", error);
  }
};

export const getComponentsOfTeam = (teamId) => async (dispatch) => {
  try {
    const response = await apiClient.get(`/teams/${teamId}/components`);
    dispatch(getPlayersOfTeam(response.data));
  } catch (error) {
    console.error("Errore nel recupero dei giocatori del team:", error);
  }
};


export const login = (token) => ({
  type: LOGIN,
  payload: token,
});

export const logout = () => ({
  type: LOGOUT,
});

export const recognizeUser = (user) => ({
  type: RECOGNIZE_USER,
  payload: user,
});

export const cancelTeamOfPlayer = () => ({
  type: CANCEL_TEAM_OF_PLAYER,
});

export const setTeam = (team) => ({
  type: SET_TEAM,
  payload: team,
});

export const getPlayersOfTeam = (players) => ({
  type: GET_PLAYERS_OF_TEAM,
  payload: players,
});

export const getEventsOfTeam = (events) => ({
  type: GET_EVENTS_OF_TEAM,
  payload: events,
});

export const removePlayerFromTeam = (playerId) => ({
  type: REMOVE_PLAYER_FROM_TEAM,
  payload: playerId,
});

export const updatePlayerFromTeam = (team) => ({
  type: UPDATE_PLAYER_FROM_TEAM,
  payload: team,
});

export const getPartecipationsOfTeam = (partecipations) => ({
  type: GET_PARTECIPATIONS_OF_TEAM,
  payload: partecipations,
});

export const updatePlayerInTeam = (player) => ({
  type: UPDATE_PLAYER_IN_TEAM,
  payload: player,
});



