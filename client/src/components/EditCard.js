import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch } from "react-redux";

export default function FormDialog(props) {
  const [mana, setMana] = React.useState(props.card.mana);
  const [name, setName] = React.useState(props.card.name);
  const [description, setDescription] = React.useState(props.card.description);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setMana(props.card.mana);
    setName(props.card.name);
    setDescription(props.card.description);
  }, [props]);

  function handleClose() {
    setMana(props.card.mana);
    setName(props.card.name);
    setDescription(props.card.description);
    props.closeDialog();
  }

  const handleSave = async event => {
    console.log(props.card._id);
    event.preventDefault();
    const cardData = {
      _id: props.card._id,
      mana: mana,
      name: name,
      description: description
    };
    await dispatch(props.updateCard(cardData));
    props.closeDialog();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit {props.editType}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="standard-number"
            label="Mana"
            InputProps={{ inputProps: { min: 1, max: 9 } }}
            value={mana}
            onChange={event => setMana(event.target.value)}
            type="number"
            fullWidth
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true
            }}
            margin="dense"
          />
          <TextField
            variant="outlined"
            value={name}
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={event => setName(event.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            variant="outlined"
            value={description}
            margin="dense"
            id="name"
            label="Description"
            type="text"
            onChange={event => setDescription(event.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={event => handleSave(event)} color="primary">
            Update
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
