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
import DialogDelete from "./DialogDelete";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    height: "100%"
  },
  media: {
    height: 300
  },
  title: {}
});

function MediaCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCard(props._id));
  }

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Carta Magic"
        />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="body2"
            component="h2"
          >
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Mana: {props.mana}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Edit
          </Button>
          <Button size="small" color="primary" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

const mapActionsToProps = { deleteCard };

export default connect(
  null,
  mapActionsToProps
)(MediaCard);
