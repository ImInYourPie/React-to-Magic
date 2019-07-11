import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { deleteDeck } from "../actions/deckActions";
import { connect, useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const handleDelete = () => {
    dispatch(deleteDeck(props._id));
  };
  return (
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
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary" onClick={handleDelete}>
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
  );
}

const mapActionsToProps = { deleteDeck };

export default connect(
  null,
  mapActionsToProps
)(MediaCard);
