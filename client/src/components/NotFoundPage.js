import Grid from "@material-ui/core/Grid";
import React from "react";
import card from "../assets/404_alt.png";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";

const NotFoundPage = () => {
  return (
    <Grid container direction="row" alignItems="center" spacing={2}>
      <Grid item xs={12} />
      <Grid item xs={12} />
      <Grid item xs={12} />
      <Hidden xsDown>
        <Grid item xs={4}>
          <img src={card} alt="404card.png" />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={8}>
        <Typography variant="h2" align="center">
          404: Page not found!
        </Typography>
        <br />
        <Typography variant="h5" align="center">
          We are sorry to have to use this spell, but the page you are looking
          for doesn't exist!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;
