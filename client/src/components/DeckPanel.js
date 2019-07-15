import React from "react";
import DeckItem from "./DeckItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { getDecks } from "../actions/deckActions";
import { LinearProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getCards } from "../actions/cardActions";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const DecksPanel = props => {
  const classes = useStyles;
  const loading = useSelector(state => state.decks.loading);
  const decks = useSelector(state => state.decks.items);
  const cards = useSelector(state => state.cards.items);
  const error = useSelector(state => state.decks.errors);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getDecks());
    dispatch(getCards());
  }, []);

  const Panel = (
    <Grid container spacing={2}>
      {loading && !!!decks.length && (
        <Grid item xs={12}>
          <LinearProgress className={classes.progress} />
        </Grid>
      )}
      {}
      {!!decks.length &&
        decks.map(deck => {
          return (
            <Grid key={deck._id} item md={3} xs={12}>
              <DeckItem {...deck} />
            </Grid>
          );
        })}
      {!!!decks.length && !loading && (
        <Grid item xs={12}>
          <Typography align="center" variant="h5">
            You have no decks in your collection. Create one!
          </Typography>
        </Grid>
      )}
    </Grid>
  );

  return Panel;
};

export default DecksPanel;
