import React, { Component } from 'react'
import CardItem from "./CardItem";
import store from "../store"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { getCards } from "../actions/cardActions"
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
}));

class CardPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        try {
            this.props.getCards();
            console.log(this.props.fetching)
        } catch (error) {
            this.setState({ errorMessage: "Não foram encontradas cartas" })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.newCard)
        if (nextProps.newCard) this.props.cards.unshift(nextProps.newCard)
    }

    render() {
        const classes = useStyles;
        return (this.props.fetching ?
            <Grid item xs={12}>
                <CircularProgress className={classes.progress} /><Typography display="inline" align="center">Loading... </Typography>
            </Grid> : this.props.cards.map((card) => {
                return (<Grid key={card._id} item md={3}>
                    <CardItem {...card} />
                </Grid>)
            })
        )
    }
}

const mapStateToProps = state => {
    return({ cards: state.cards.items,
    newCard: state.cards.item,
    fetching: state.fetching
})
}

export default connect(mapStateToProps, { getCards })(CardPanel);



