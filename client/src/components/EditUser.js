import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

export default function FormDialog(props) {
  const [username, setUsername] = React.useState(props.user.username);
  const [realname, setRealname] = React.useState(props.user.realName);
  const [usertype, setUsertype] = React.useState(props.user.userType);
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.user.user);

  React.useEffect(() => {
    setUsername(props.user.username);
    setRealname(props.user.realName);
    setUsertype(props.user.userType);
  }, [props]);

  function handleClose() {
    setUsername(props.user.username);
    setRealname(props.user.realName);
    setUsertype(props.user.userType);
    props.closeDialog();
  }

  const handleSave = async event => {
    if (usertype === "default" && loggedUser.username === props.user.username) {
      return setError(
        "You can't remove yourself from administrative privileges"
      );
    } else if (
      username === props.user.username &&
      realname === props.user.realName &&
      usertype === props.user.userType
    ) {
      props.closeDialog();
    } else {
      console.log(props.user._id);
      event.preventDefault();
      const userData = {
        _id: props.user._id,
        username: username,
        realName: realname,
        userType: usertype
      };
      setError(null);
      await dispatch(props.updateUser(userData));
      props.closeDialog();
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Edit user: {props.editType}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" align="center" color="error">
            {error}
          </Typography>
          <br />
          <TextField
            id="standard"
            label="Username"
            value={username}
            onChange={event => setUsername(event.target.value)}
            type="text"
            fullWidth
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true
            }}
            margin="dense"
          />
          <TextField
            autoFocus
            variant="outlined"
            value={realname}
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={event => setRealname(event.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <Select
            value={usertype}
            onChange={event => setUsertype(event.target.value)}
            input={
              <OutlinedInput
                labelWidth="Usertype"
                name="Usertype"
                margin="dense"
                id="outlined-simple"
                fullWidth
              />
            }
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"default"}>Default</MenuItem>
          </Select>
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
