import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { connect, useDispatch } from "react-redux";
import { deleteCard } from "../actions/cardActions";
import EditCard from "./EditCard";
import DialogDelete from "./DialogDelete";
import { updateCard } from "../actions/cardActions";

const useStyles = makeStyles({
  card: {
    height: "100%"
  },
  media: {
    height: 120,
    backgroundPosition: "top"
  },
  desc: {
    minHeight: 70
  },
  title: {
    minHeight: 40
  }
});

function MediaCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const openDialog = event => {
    event.preventDefault();
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const openDeleteDialog = event => {
    console.log(props)
    event.preventDefault();
    setOpenDelete(true);
  };

  const closeDeleteDialog = () => {
    setOpenDelete(false);
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.image}
            title={props.name}
          />
          <CardContent>
            <Typography
              className={classes.title}
              gutterBottom
              variant="body2"
              component="h4"
            >
              {props.name}
            </Typography>
            <Typography variant="body3" color="textSecondary" className={classes.desc} component="p">
              {props.description}
            </Typography>
            <Typography variant="body3" color="textSecondary" component="p">
              Mana: {props.mana}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={openDialog}>
              Edit
            </Button>
            <Button size="small" color="primary" onClick={openDeleteDialog}>
              Delete
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
      <EditCard
        open={open}
        closeDialog={closeDialog}
        card={props}
        updateCard={updateCard}
        editType={"Card"}
      />
      <DialogDelete
        open={openDelete}
        closeDialog={closeDeleteDialog}
        delete={deleteCard}
        item={props}
        name={props.name}
      />
    </div>
  );
}

const mapActionsToProps = { deleteCard };

export default connect(
  null,
  mapActionsToProps
)(MediaCard);
