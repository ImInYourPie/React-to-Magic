import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MuiLink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#0873BF"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttonProgress: {
    position: "absolute",
    top: "55%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  }
}));

function SignIn(props) {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const loading = useSelector(state => state.UI.loading);

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      username: username,
      password: password
    };
    console.log(userData);
    props.login(userData, props.history);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            error={props.errors}
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={props.errors}
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          {props.errors && (
            <Grid container justify="center">
              <Grid item>
                <Typography variant="body2" color="error">
                  {props.errors.error}
                </Typography>
              </Grid>
            </Grid>
          )}
          <div className={classes.wrapper}>
            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <Grid container justify="center">
            <Grid item align="center">
              <MuiLink component={Link} to="/register" variant="body2">
                {"Don't have an account? Register now!"}
              </MuiLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
  errors: state.UI.errors
});

const mapActionsToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SignIn);
