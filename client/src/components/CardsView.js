import React, { Component } from 'react'
import CardsPanel from "./CardsPanel";
import CardForm from "./CardForm";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

export class CardsView extends Component {
    render() {
        return (
            <div>
                <CardForm/>
                <Divider/>
                <br></br>
                <Grid container spacing={2} direction="row">
                <CardsPanel/>
                </Grid>
            </div>
        )
    }
}

export default CardsView
