import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
import { connect } from "react-redux";
import { addCard } from "../actions/cardActions"
import { PropTypes } from "prop-types";


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: "red"
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

function CardForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    mana: 1,
    name: '',
    description: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitCard = (e) => {
    e.preventDefault();
    const cardData = {
      mana: values.mana,
      name: values.name,
      description: values.description
    }
    console.log(cardData)
    props.addCard(cardData);

  }

  return (
    <div>
      <h2>Add a Card</h2>
      <form className={classes.container} onSubmit={submitCard} autoComplete="off">
        <Grid container direction="row" spacing={1} justify="space-around" alignItems="center">
          <Grid item md={3}>
            <TextField
              id="standard-number"
              label="Mana"
              InputProps={{ inputProps: { min: 1, max: 9 } }}
              value={values.mana}
              onChange={handleChange('mana')}
              type="number"
              fullWidth
              variant="outlined"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="dense"
            />
            </Grid>
            <Grid item md={3}>
            <TextField
              id="standard-name"
              label="Name"
              fullWidth
              variant="outlined"
              className={classes.textField}
              value={values.name}
              onChange={handleChange('name')}
              margin="dense"
            />
            </Grid>
            <Grid item md={3}>
            <TextField
              id="standard-name"
              label="Description"
              required
              fullWidth
              variant="outlined"
              className={classes.textField}
              value={values.description}
              onChange={handleChange('description')}
              margin="dense"
            />
            </Grid>
            
          <Grid item md={2} alignItems="right">
            <Button variant="contained" fullWidth type="submit" color="primary">
              Add Card
              <AddIcon className={classes.rightIcon}>Send</AddIcon>
            </Button>
          </Grid>
        </Grid>
      </form>
      <br></br>
    </div>
  );
}

// CardForm.propTypes = {
//   addCard: PropTypes.func.isRequired
// }

// const mapDispatchToProps = dispatch => {
//   return { addCard: () => dispatch({type: "ADD_CARD"}) }
// }

export default connect(null, { addCard })(CardForm)