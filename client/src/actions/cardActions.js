import { GET_CARDS, ADD_CARD } from "./types";
import CardsService from "../services/cards.service";


export const getCards = () => dispatch => {
    dispatch({type: "FETCH_CARDS"})
    CardsService.getCards()
    .then((res) => {
        dispatch({type: "GET_CARDS", payload: res.data })
    }).catch((error) => {
        dispatch({type: "FETCH_CARDS_ERROR", payload: error})
    })
    // CardsService.getCards()
    //     .then(data => {
    //         dispatch({
    //             type: GET_CARDS,
    //             payload: data.data
    //         })
    //     }
    //     )
}

export const addCard = (cardData) => dispatch => {
    CardsService.postCard(cardData.mana, cardData.name, cardData.description)
        .then(data => {
            dispatch({
            type: ADD_CARD,
            payload: data.data.card
        })}
        )
}