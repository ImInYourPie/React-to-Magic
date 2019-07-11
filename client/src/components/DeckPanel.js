import React, { Component } from "react";
import DeckItem from "./DeckItem";
import store from "../store";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getDecks } from "../actions/deckActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const DecksPanel = props => {
  const classes = useStyles;
  const loading = useSelector(state => state.decks.loading);
  const decks = useSelector(state => state.decks.items);
  const error = useSelector(state => state.decks.errors);
  const dispatch = useDispatch();
  if(!decks.length) dispatch(getDecks());
  

  const Panel = (
    <Grid container spacing={2}>
      {loading && !!!decks.length && (
        <Grid item xs={12}>
          <LinearProgress className={classes.progress} />
        </Grid>
      )}
      {

      }
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
