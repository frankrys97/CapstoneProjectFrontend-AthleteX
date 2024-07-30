// src/redux/reducers/AuthenticateReducer.js

import { LOGIN, LOGOUT, RECOGNIZE_USER } from "../actions";

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
    default:
      return state;
  }
};

export default authenticateReducer;

