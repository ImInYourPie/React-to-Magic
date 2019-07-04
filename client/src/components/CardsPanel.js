import React, { Component } from 'react'
import CardItem from "./CardItem";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { getCards } from "../actions/cardActions"

class CardPanel extends Component {

    componentDidMount() {
        try {
            this.props.getCards();
            console.log(this.props.getCards())
        } catch (error) {
            this.setState({ errorMessage: "Não foram encontradas cartas" })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.newCard)
        if (nextProps.newCard) this.props.cards.unshift(nextProps.newCard)
    }

    render() {
        if (this.props.cards.length) {
            return this.props.cards.map((card) => {
                return (
                    <Grid key={card._id} item xs={3}>
                        <CardItem {...card} />
                    </Grid>
                )
            })
        } else {
            return <Typography gutterBottom variant="h5" component="h2">
                You don't have any cards in your collection. Add one!
            </Typography>
        }
    }
}

const mapStateToProps = state => ({
    cards: state.cards.items,
    newCard: state.cards.item
})

export default connect(mapStateToProps, { getCards })(CardPanel);



