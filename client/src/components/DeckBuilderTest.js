import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { addDeck } from "../actions/deckActions";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { SnackbarProvider, useSnackbar } from "notistack";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  paper: {
    borderColor: "#0B98FF",
    border: "solid 2px",
    borderRadius: "15px"
  },
  card: {
    height: "100%"
  },
  media: {
    height: 150,
    backgroundPosition: "top"
  },
  desc: {
    minHeight: 80
  },
  cardTitle: {
    minHeight: 40
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

const FullScreenDialog = ({
  cards,
  currentName,
  open,
  closeDialog,
  currentCards,
  action,
  _id
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setRight(currentCards);
    setLeft(_.differenceBy(cards, currentCards, "_id"));
    setName(currentName);
  }, [currentCards, currentName, cards]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleClickLeft = (event, card) => {
    event.preventDefault();
    setRight(right.concat(card));
    setLeft(left.filter(item => item._id !== card._id));
  };

  const handleClickRight = (event, card) => {
    event.preventDefault();
    setLeft(left.concat(card));
    setRight(right.filter(item => item._id !== card._id));
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleClose = () => {
    setRight(currentCards);
    setLeft(_.differenceBy(cards, currentCards, "_id"));
    setName(currentName);
    setError("");
    closeDialog();
  };

  const handleSave = (event, name, cards) => {
    event.preventDefault();
    if (name === "") {
      return setError("You must give the deck a name");
    }
    if (cards.length === 0) {
      return setError(
        "You must add at least 1 card, even if a 1 card deck seems stupid"
      );
    } else {
      const deckData = {
        name: name,
        cards: cards,
        _id: _id
      };
      dispatch(action(deckData));
      setRight(currentCards);
      enqueueSnackbar(`Deck ${deckData.name} added`, {
        variant: "info"
      });
      setLeft(_.differenceBy(cards, currentCards, "_id"));
      setName(currentName);
      setError("");
      closeDialog();
    }
  };

  const customList = items => {
    return (
      <Paper className={classes.paper}>
        <List dense component="div" role="list">
          {items.map(value => {
            const labelId = `transfer-list-item-${value._id}-label`;

            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Paper>
    );
  };

  return (
    <div>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar
          className={classes.appBar}
          style={{
            background: "linear-gradient(to right bottom, #03FFE1, #0B98FF)"
          }}
        >
          <Toolbar>
            <IconButton
              onClick={handleClose}
              edge="start"
              color="inherit"
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Deck Builder
            </Typography>
            <form onSubmit={event => handleSave(event, name, right)}>
              <Button type="submit" color="inherit">
                Save
              </Button>
            </form>
          </Toolbar>
        </AppBar>
        <br />
        <Grid container spacing={2} justify="center" className={classes.root}>
          <Grid item xs={12} md={8}>
            <Typography align="center" variant="h6" color="error">
              {error}
            </Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="deckName"
              label="Deck Name"
              name="name"
              autoFocus
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </Grid>
          <Grid className={classes.paper} container md={5} xs={10} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2">My Cards</Typography>
            </Grid>
            {left.map(card => {
              return (
                <Grid item xs={3} key={card._id}>
                  <Card className={classes.card}>
                    <CardActionArea
                      onClick={event => handleClickLeft(event, card)}
                    >
                      <CardMedia
                        className={classes.media}
                        image={card.image}
                        title={card.name}
                      />
                      <CardContent>
                        <Typography
                          className={classes.cardTitle}
                          gutterBottom
                          variant="body2"
                          component="h4"
                        >
                          {card.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Mana: {card.mana}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
                ≫
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                ≪
              </Button>
            </Grid>
          </Grid>
          <Grid container md={5} xs={12} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2">Cards in Deck</Typography>
            </Grid>
            {right.map(card => {
              return (
                <Grid item xs={3} key={card._id}>
                  <Card className={classes.card}>
                    <CardActionArea
                      onClick={event => handleClickRight(event, card)}
                    >
                      <CardMedia
                        className={classes.media}
                        image={card.image}
                        title={card.name}
                      />
                      <CardContent>
                        <Typography
                          className={classes.cardTitle}
                          gutterBottom
                          variant="body2"
                          component="h4"
                        >
                          {card.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Mana: {card.mana}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    cards: state.cards.items
  };
};

const mapActionsToProps = { addDeck };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(FullScreenDialog);
