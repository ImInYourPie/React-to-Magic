import axios from "axios";

export const login = (userData, history) => dispatch => {
  dispatch({ type: "LOADING_UI" });
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
      dispatch({ type: "STOP_LOADING_UI" });
    })
    .then(() => history.push("/cards"))
    .catch(error => {
      dispatch({ type: "SET_ERRORS", payload: error.response.data });
      dispatch({ type: "STOP_LOADING_UI" });
    });
};

export const register = (userData, history) => dispatch => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post("/register", {
      username: userData.username,
      realName: userData.realname,
      password: userData.password,
      passwordConfirm: userData.confirmPassword
    })
    .then(() => {
      return true;
    })
    .then(() => {
      dispatch({ type: "STOP_LOADING_UI" });
      dispatch({ type: "CLEAR_ERRORS" });
      history.push("/login");
    })
    .catch(error => {
      dispatch({ type: "STOP_LOADING_UI" });
      console.log("error bruh");
      console.log(error.response);
      dispatch({ type: "SET_ERRORS", payload: error.response.data });
    });
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: "SET_UNAUTHENTICATED" });
  dispatch({ type: "CLEAR_ERRORS" });
  history.push("/login");
};

export const setAutorizationHeader = tokenData => {
  const token = `Bearer ${tokenData}`;
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = token;
};
