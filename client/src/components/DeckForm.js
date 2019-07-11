import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { addCard } from "../actions/cardActions";
import { PropTypes } from "prop-types";
import { Typography } from "@material-ui/core";
import DeckBuilder from "./DeckBuilder";
import store from "../store";
import { getCards } from "../actions/cardActions";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: "red"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const CardForm = props => {
  const classes = useStyles();
  let cards = [];
  const [open, setOpen] = React.useState(false);

  const openDialog = async event => {
    event.preventDefault();
    cards = await store.dispatch(getCards());
    console.log(cards);
    setOpen(true);
    console.log(open);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <br />
      <br />
      <form className={classes.container} autoComplete="off">
        <Grid container direction="row" spacing={1}>
          <Grid item md={10} />
          <Grid item md={2} xs={12}>
            <Button
              variant="contained"
              onClick={openDialog}
              fullWidth
              type="submit"
              color="primary"
            >
              Create Deck
              <AddIcon className={classes.rightIcon}>Send</AddIcon>
            </Button>
          </Grid>
        </Grid>
      </form>
      <br />
      <DeckBuilder
        sendData={props.getData}
        cards={cards}
        open={open}
        closeDialog={closeDialog}
      />
    </div>
  );
};

// CardForm.propTypes = {
//   addCard: PropTypes.func.isRequired
// }

// const mapDispatchToProps = dispatch => {
//   return { addCard: () => dispatch({type: "ADD_CARD"}) }
// }

export default connect(
  null,
  { addCard }
)(CardForm);
