import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CardsView from "./CardsView";
import DecksView from "./DecksView";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import store from "../store";
import { connect } from "react-redux";

const Main = ({ authenticated }) => {
  const PrivateUIRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" component={Login} />
        )
      }
    />
  );

  const PrivateAuthRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        !authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/cards" component={CardsView} />
        )
      }
    />
  );
  return (
    <main>
      <Switch>
        <PrivateAuthRoute path="/login" component={Login} />
        <PrivateAuthRoute path="/register" component={Register} />
        <PrivateUIRoute path="/cards" component={CardsView} />
        <PrivateUIRoute path="/decks" component={DecksView} />
        <Redirect to="/cards"/>
      </Switch>
    </main>
  );
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});


export default connect(
  mapStateToProps,
)(Main);
