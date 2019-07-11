import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  SET_ERRORS,
  LOADING_UI
} from "./types";
import axios from "axios";

export const login = (userData, history) => dispatch => {
  // dispatch({type: LOADING_UI});
  axios
    .post("/login", {
      username: userData.username,
      password: userData.password
    })
    .then(res => {
      setAutorizationHeader(res.data.token);
      console.log(res.data.user);
      dispatch({ type: "SET_USER", payload: res.data.user });
      const user = JSON.stringify(res.data.user);
      localStorage.setItem("user", user);
      console.log("then here")
    })
    .then(() => history.push("/cards"))
    .catch(error =>
      dispatch({ type: "SET_ERRORS", payload: error.response.data })
    );
};

export const register = (userData, history) => dispatch => {
  axios
    .post("/register", {
      username: userData.username,
      realName: userData.realname,
      password: userData.password,
      passwordConfirm: userData.confirmPassword
    })
    .then(() => {
      dispatch({type: "CLEAR_ERRORS"})
      history.push("/login")
    })
    .catch(error => {
      console.log("error bruh")
      console.log(error.response)
      dispatch({ type: "SET_ERRORS", payload: error.response.data });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: "SET_UNAUTHENTICATED" });
  dispatch({type: "CLEAR_ERRORS"})
};

export const setAutorizationHeader = tokenData => {
  const token = `Bearer ${tokenData}`;
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = token;
};
