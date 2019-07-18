import React, { Component } from "react";
import CardsPanel from "./CardsPanel";
import CardForm from "./CardForm";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const CardsView = props => {
  return (
    <Grid>
      <CardForm />
      <Divider />
      <br />
      <CardsPanel router={props} />
    </Grid>
  );
};

export default CardsView;
