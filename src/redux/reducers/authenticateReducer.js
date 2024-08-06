// src/redux/reducers/AuthenticateReducer.js

import { LOGIN, LOGOUT, RECOGNIZE_USER, CANCEL_TEAM_OF_PLAYER } from "../actions";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: "",
};

const authenticateReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case RECOGNIZE_USER:
      return {
        ...state,
        user: action.payload,
      };
      case CANCEL_TEAM_OF_PLAYER:
      return {
        ...state,
        user: {
          ...state.user,
          team: null
        }
      };
    default:
      return state;
  }
};

export default authenticateReducer;

