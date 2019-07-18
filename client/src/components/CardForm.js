import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { addCard } from "../actions/cardActions";
import { SnackbarProvider, useSnackbar } from "notistack";

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

function CardForm(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = React.useState({
    mana: 1,
    name: "",
    description: ""
  });
  const [nameError, setNameError] = React.useState(false);
  const [descError, setDescError] = React.useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitCard = e => {
    e.preventDefault();

    if (values.name === "") {
      setNameError(true);
      console.log(nameError);
    }
    if (values.description === "") {
      setDescError(true);
    } else {
      try {
        const cardData = {
          mana: values.mana,
          name: values.name,
          description: values.description
        };
        props.addCard(cardData);
        enqueueSnackbar(`Card ${cardData.name} added`, {
          variant: "info"
        });

        setValues({ ...values, mana: 1, name: "", description: "" });
        setNameError(false);
        setDescError(false);
      } catch (error) {}
    }
  };

  return (
    <div>
      <br />
      <br />
      <form onSubmit={submitCard} noValidate autoComplete="off">
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={2}>
            <TextField
              id="standard-number"
              label="Mana"
              InputProps={{ inputProps: { min: 1, max: 9 } }}
              value={values.mana}
              onChange={handleChange("mana")}
              type="number"
              fullWidth
              variant="outlined"
              required
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
            />
          </Grid>
          <Grid item md={3} xs={10}>
            <TextField
              id="standard-name"
              label="Name"
              fullWidth
              variant="outlined"
              required
              error={nameError}
              helperText={nameError ? "You must fill this field" : ""}
              value={values.name}
              onChange={handleChange("name")}
              margin="dense"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              id="standard-name"
              label="Description"
              required
              fullWidth
              variant="outlined"
              error={descError}
              helperText={descError ? "You must fill this field" : ""}
              value={values.description}
              onChange={handleChange("description")}
              margin="dense"
            />
          </Grid>

          <Grid item md={2} xs={12}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth
              type="submit"
            >
              Add Card
              <AddIcon className={classes.rightIcon}>Send</AddIcon>
            </Button>
          </Grid>
        </Grid>
      </form>
      <br />
    </div>
  );
}

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
