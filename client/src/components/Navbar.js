import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { typography } from "@material-ui/system";
import Grid from "@material-ui/core/Grid";
import { logoutUser } from "../actions/userActions";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

const Navbar = ({ authenticated, user, logoutUser }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const handleLogout = () => {
    logoutUser();
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!authenticated && (
        <MenuItem>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
        </MenuItem>
      )}
      {!authenticated && (
        <MenuItem>
          <Button component={Link} to="/register" color="inherit">
            Register
          </Button>
        </MenuItem>
      )}
      {authenticated && (
        <MenuItem>
          <Button component={Link} to="/cards" color="inherit">
            My Cards
          </Button>
        </MenuItem>
      )}
      {authenticated && (
        <MenuItem>
          <Button component={Link} to="/decks" color="inherit">
            My Decks
          </Button>
        </MenuItem>
      )}
      {authenticated && (
        <MenuItem>
          <Button>Olá {user.username}</Button>
        </MenuItem>
      )}
      {authenticated && (
        <MenuItem>
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </MenuItem>
      )}
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            React to Magic
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {user.userType === "admin" && (
              <Button component={Link} to="/decks" color="inherit">
                Admin Panel
              </Button>
            )}
            {authenticated && (
              <Button component={Link} to="/cards" color="inherit">
                My Cards
              </Button>
            )}
            {authenticated && (
              <Button component={Link} to="/decks" color="inherit">
                My Decks
              </Button>
            )}
            {authenticated && (
              <Button color="inherit">
                <AccountCircle /> {user.username}
              </Button>
            )}
            {authenticated && (
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            )}
            {!authenticated && (
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
            )}
            {!authenticated && (
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="Show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  user: state.user.user
});

const mapActionsToProps = { logoutUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Navbar);
