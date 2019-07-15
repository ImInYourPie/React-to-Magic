import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CardsView from "./CardsView";
import DecksView from "./DecksView";
import Login from "./Login";
import Register from "./Register";
import AdminView from "./AdminView";
import { connect } from "react-redux";

const Main = ({ authenticated, user }) => {
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
  const PrivateAdminRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        user.userType === "admin" ? (
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
        <PrivateAdminRoute path="/admin" component={AdminView} />
        <Redirect to="/cards" />
      </Switch>
    </main>
  );
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  user: state.user.user
});

export default connect(mapStateToProps)(Main);
