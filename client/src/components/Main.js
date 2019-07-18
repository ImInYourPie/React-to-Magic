import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CardsView from "./CardsView";
import DecksView from "./DecksView";
import Login from "./Login";
import Register from "./Register";
import AdminView from "./AdminView";
import NotFoundPage from "./NotFoundPage";
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
          <Redirect to="/404" component={CardsView} />
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
        <Route exact path="/" component={CardsView} />
        <PrivateAdminRoute path="/admin" component={AdminView} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </main>
  );
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  user: state.user.user
});

export default connect(mapStateToProps)(Main);
