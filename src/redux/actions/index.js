export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const RECOGNIZE_USER = "RECOGNIZE_USER";

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