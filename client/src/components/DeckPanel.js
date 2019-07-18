import React from "react";
import DeckItem from "./DeckItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { getDecks } from "../actions/deckActions";
import { LinearProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getCards } from "../actions/cardActions";
import TextField from "@material-ui/core/TextField";
import queryString from "query-string";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const DecksPanel = props => {
  const classes = useStyles;
  console.log(props.router);
  let search = "";
  if (props.router.location.search) {
    let query = props.router.location.search;
    let filterino = new URLSearchParams(query);
    search = filterino.get("search");
  }
  console.log(search);
  const loading = useSelector(state => state.decks.loading);
  const [filter, setFilter] = React.useState(search);
  const decks = useSelector(state =>
    state.decks.items.filter(deck =>
      deck.name.toLowerCase().includes(filter.toLowerCase())
    )
  );
  const cards = useSelector(state => state.cards.items);
  const error = useSelector(state => state.decks.errors);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getDecks());
    dispatch(getCards());
  }, []);

  React.useEffect(() => {
    if (filter === "") props.history.push(`/decks`);
    else props.history.push(`/decks?search=${filter}`);
  }, [filter]);

  // React.useEffect(() => {
  //   const params = new URLSearchParams(props.router.location.search);
  // }, [props.router.location.search]);

  const Panel = (
    <Grid container direction="row" alignItems="center" spacing={2}>
      <Grid item xs={4} md={2}>
        <Typography variant="h5">My Decks</Typography>
      </Grid>
      <Grid item xs={8} md={10}>
        <form onSubmit={event => event.preventDefault()}>
          <TextField
            id="standard-name"
            label="Search"
            fullWidth
            variant="outlined"
            value={filter}
            onChange={event => setFilter(event.target.value)}
            className={classes.textField}
            margin="dense"
          />
        </form>
      </Grid>
      {loading && !!!decks.length && (
        <Grid item xs={12}>
          <LinearProgress className={classes.progress} />
        </Grid>
      )}
      {!!decks.length &&
        decks.map(deck => {
          return (
            <Grid key={deck._id} item md={3} xs={12}>
              <DeckItem {...deck} />
            </Grid>
          );
        })}
      {!!!decks.length && !loading && !!!filter.length && (
        <Grid item xs={12}>
          <Typography align="center" variant="h5">
            You have no decks in your collection. Add one!
          </Typography>
        </Grid>
      )}
      {!!!decks.length && !loading && !!filter.length && (
        <Grid item xs={12}>
          <Typography align="center" variant="h5">
            No decks were found
          </Typography>
        </Grid>
      )}
    </Grid>
  );

  return Panel;
};

export default withRouter(DecksPanel);
