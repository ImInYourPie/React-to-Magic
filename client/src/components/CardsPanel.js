import React from "react";
import CardItem from "./CardItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { getCards } from "../actions/cardActions";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const CardPanel = props => {
  const classes = useStyles;
  let search = "";
  if (props.router.location.search) {
    let query = props.router.location.search;
    let filterino = new URLSearchParams(query);
    search = filterino.get("search");
  }

  const loading = useSelector(state => state.cards.loading);
  const [filter, setFilter] = React.useState(search);
  const cards = useSelector(state =>
    state.cards.items.filter(card =>
      card.name.toLowerCase().includes(filter.toLowerCase())
    )
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCards());
  }, []);

  React.useEffect(() => {
    if (filter === "") props.history.push(`/cards`);
    else props.history.push(`/cards?search=${filter}`);
  }, [filter]);

  const Panel = (
    <Grid container alignItems="center" direction="row" spacing={2}>
      <Grid item md={2} xs={4}>
        <Typography variant="h5">My Cards</Typography>
      </Grid>
      <Grid item md={10} xs={8}>
        <form>
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
      {loading && !!!cards.length && (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      )}
      {!!cards.length &&
        cards.map(card => {
          return (
            <Grid key={card._id} item md={3} xs={6}>
              <CardItem {...card} />
            </Grid>
          );
        })}
      {!!!cards.length && !loading && !!!filter.length && (
        <Grid item xs={12}>
          <Typography align="center" variant="h5">
            You have no cards in your collection. Add one!
          </Typography>
        </Grid>
      )}
      {!!!cards.length && !loading && !!filter.length && (
        <Grid item xs={12}>
          <Typography align="center" variant="h5">
            No cards were found
          </Typography>
        </Grid>
      )}
    </Grid>
  );

  return Panel;
};

export default withRouter(CardPanel);
