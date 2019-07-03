import React, { Component } from 'react'
import CardsService from "../services/cards.service";
import CardItem from "./CardItem";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class CardPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            errorMessage: ""
        }
    }

    async componentDidMount() {
        try {
            const returnedCards = await CardsService.getCards();
            this.setState({ cards: returnedCards.data })
            console.log(this.state.cards)
        } catch (error) {
            this.setState({ errorMessage: "Não foram encontradas cartas" })
        }
    }

    render() {
        if (this.state.cards.length) {
            return this.state.cards.map((card) => {
                console.log(card); return (
                    <Grid key={card._id} item lg={2}>
                        <CardItem {...card} />
                    </Grid>
                )
            })
        } else {
            return <Typography gutterBottom variant="h5" component="h2">
                {this.state.errorMessage}
            </Typography>
        }
    }
}

export default CardPanel



