import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MuiLink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { register, login } from "../actions/userActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSnackbar } from "notistack";

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
    marginTop: theme.spacing(3)
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

function SignUp(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [realname, setRealname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyRealname, setEmptyRealname] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyConfirmPass, setEmptyConfirmPass] = useState(false);
  const [confirmPassError, setConfirmPassError] = useState(false);
  const loading = useSelector(state => state.UI.loading);
  // const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async event => {
    event.preventDefault();
    !username ? setEmptyUsername(true) : setEmptyUsername(false);
    !realname ? setEmptyRealname(true) : setEmptyRealname(false);
    !password ? setEmptyPassword(true) : setEmptyPassword(false);
    !confirmPassword ? setEmptyConfirmPass(true) : setEmptyConfirmPass(false);
    if (password !== confirmPassword) return setConfirmPassError(true);
    else if (username && password && realname && confirmPassword) {
      const userData = {
        username: username,
        realname: realname,
        password: password,
        confirmPassword: confirmPassword
      };
      props.register(userData, props.history);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                helperText={emptyUsername ? "Fill in this field" : ""}
                error={emptyUsername || props.errors}
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="realname"
                label="Real Name"
                name="realname"
                helperText={emptyRealname ? "Fill in this field" : ""}
                error={emptyRealname || props.errors}
                value={realname}
                onChange={event => setRealname(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                helperText={emptyPassword ? "Fill in this field" : ""}
                error={props.errors || emptyPassword || confirmPassError}
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                helperText={
                  emptyConfirmPass
                    ? "Fill in this field"
                    : "" || confirmPassError
                    ? "Passwords don't match"
                    : ""
                }
                error={props.errors || emptyConfirmPass || confirmPassError}
                id="passwordConfirm"
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          {props.errors && (
            <Grid container justify="center" spacing={5}>
              <Grid item>
                <Typography variant="body2" color="error">
                  {props.errors.usernameExistsError}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="error">
                  {props.errors.error}
                </Typography>
              </Grid>
            </Grid>
          )}
          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <Grid container justify="center">
            <Grid item>
              <MuiLink component={Link} to="/login" variant="body2">
                Already have an account? Login now
              </MuiLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  errors: state.UI.errors
});

const mapActionsToProps = {
  register,
  login
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SignUp);
