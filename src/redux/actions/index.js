export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const RECOGNIZE_USER = "RECOGNIZE_USER";
export const CANCEL_TEAM_OF_PLAYER =  "CANCEL_TEAM_OF_PLAYER";
export const SET_TEAM = "SET_TEAM";
export const GET_PLAYERS_OF_TEAM = "GET_PLAYERS_OF_TEAM";
export const GET_EVENTS_OF_TEAM = "GET_EVENTS_OF_TEAM";
export const REMOVE_PLAYER_FROM_TEAM = "REMOVE_PLAYER_FROM_TEAM";

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


