import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import DeckBuilder from "./DeckBuilderTest";
import { getCards } from "../actions/cardActions";
import { addDeck } from "../actions/deckActions";
import { useDispatch, useSelector } from "react-redux";

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
  },
  button: {
    background: "linear-gradient(to right bottom, #03FFE1, #0B98FF)",
    color: "white"
  }
}));

const CardForm = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  let cards = [];

  console.log(cards);
  React.useEffect(() => {
    dispatch(getCards());
  }, []);

  // React.useEffect(() => {
  //   async function fetchCards() {
  //     const response = await dispatch(getCards());
  //     setCards(response);
  //     console.log(response);
  //     console.log(cards)
  //   };
  //   fetchCards()
  // }, [])

  const openDialog = async event => {
    event.preventDefault();
    cards = await dispatch(getCards());
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
              className={classes.button}
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
        currentCards={[]}
        cards={cards}
        open={open}
        action={addDeck}
        _id={""}
        currentName={""}
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

export default CardForm;
