import React from 'react';
import MuiThemeProvider from "@material-ui/styles/ThemeProvider";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import muiTheme from './components/MuiTheme';
import Container from '@material-ui/core/Container';
import Main from "./components/Main";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import store from './store';
import { logoutUser } from './actions/userActions';

let token;
if(localStorage.token) token = localStorage.token;


axios.defaults.baseURL = "http://localhost:3000";


delete axios.defaults.headers.common['Authorization'];
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    const user = JSON.parse(localStorage.user);
    store.dispatch({ type: "SET_AUTHENTICATED" });
    store.dispatch({type: "SET_USER", payload: user})
    axios.defaults.headers.common['Authorization'] = token;
  }
}


function App() {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <div>
        <Navbar />
        <Container>
            <Main />
        </Container>
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}


export default App;
