import React, { Component } from "react";
import CardsPanel from "./CardsPanel";
import CardForm from "./CardForm";
import CardsSearch from "./CardsSearch";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

export class CardsView extends Component {
  render() {
    return (
      <Grid>
        <CardForm />
        <Divider />
        <br />
        <CardsSearch />
        <CardsPanel />
      </Grid>
    );
  }
}

export default CardsView;
