import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { deleteDeck, updateDeck } from "../actions/deckActions";
import DialogDelete from "./DialogDelete";
import { useDispatch } from "react-redux";
import DeckBuilder from "./DeckBuilder";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 200
  }
});

function MediaCard(props) {
  const classes = useStyles;
  const [expanded, setExpanded] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const openDialog = event => {
    event.preventDefault();
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const openDeleteDialog = event => {
    console.log(props);
    event.preventDefault();
    setOpenDelete(true);
  };

  const closeDeleteDialog = () => {
    setOpenDelete(false);
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Cards: {props.cards.length}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" color="primary" onClick={openDialog}>
            Edit
          </Button>
          <Button size="small" color="primary" onClick={openDeleteDialog}>
            Delete
          </Button>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {props.cards.map(card => {
              return (
                <Grid key={card._id} item xs={12}>
                  <Typography variant="body2">{card.name}</Typography>
                </Grid>
              );
            })}
          </CardContent>
        </Collapse>
      </Card>
      <DialogDelete
        open={openDelete}
        closeDialog={closeDeleteDialog}
        delete={deleteDeck}
        item={props}
        name={props.name}
      />
      <DeckBuilder
        currentCards={props.cards}
        cards={props}
        open={open}
        action={updateDeck}
        _id={props._id}
        currentName={props.name}
        closeDialog={closeDialog}
      />
    </div>
  );
}

export default MediaCard;
