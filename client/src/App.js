import React from "react";
import MuiThemeProvider from "@material-ui/styles/ThemeProvider";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import muiTheme from "./components/MuiTheme";
import Container from "@material-ui/core/Container";
import Main from "./components/Main";
import axios from "axios";
import jwtDecode from "jwt-decode";
import store from "./store";
import { logoutUser } from "./actions/userActions";
import { SnackbarProvider } from "notistack";
import { makeStyles } from "@material-ui/core/styles";

let token;
if (localStorage.token) token = localStorage.token;

axios.defaults.baseURL = "http://localhost:3000";

delete axios.defaults.headers.common["Authorization"];
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    const user = JSON.parse(localStorage.user);
    store.dispatch({ type: "SET_AUTHENTICATED" });
    store.dispatch({ type: "SET_USER", payload: user });
    axios.defaults.headers.common["Authorization"] = token;
  }
}

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: "yellow"
  },
  error: {
    backgroundColor: "blue"
  },
  warning: {
    backgroundColor: "green"
  },
  info: {
    backgroundColor: "#ffffff"
  },
  container: {
    minHeight: "100%",
    position: "relative"
  },
  main: {
    paddingBottom: "60px",
    padding: "10px"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    height: "60px"
  }
}));

function App() {
  const classes = useStyles;
  return (
    <SnackbarProvider
      maxSnack={1}
      classes={{
        variantInfo: classes.info
      }}
    >
      <MuiThemeProvider theme={muiTheme}>
        <div className={classes.container}>
          <Navbar />
          <Container className={classes.main}>
            <Main />
          </Container>
          <Footer className={classes.footer} />
        </div>
      </MuiThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
