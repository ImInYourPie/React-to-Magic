import React, { Component } from "react";
import CardItem from "./CardItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { getCards } from "../actions/cardActions";


const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const CardPanel = props => {
  const classes = useStyles;
  const loading = useSelector(state => state.cards.loading);
  const cards = useSelector(state => state.cards.items);
  const dispatch = useDispatch();

  if(!cards.length) dispatch(getCards())

  const Panel = (
    <Grid container spacing={2}>
      {loading && !!!cards.length && (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      )}
      {!!cards.length &&
        cards.map(card => {
          return (
            <Grid key={card._id} item md={3} xs={12}>
              <CardItem {...card} />
            </Grid>
          );
        })}
      {!!!cards.length && !loading && (
        <Grid item xs={12}>
          <Typography align="center" variant="h5">You have no cards in your collection. Add one!</Typography>
        </Grid>
      )}
    </Grid>
  );

  return Panel;
}

export default CardPanel;
