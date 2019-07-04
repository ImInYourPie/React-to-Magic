import { GET_CARDS, ADD_CARD } from "./types";
import CardsService from "../services/cards.service";

export const getCards = () => dispatch => {
    CardsService.getCards()
        .then(data => {
            console.log(data)
            dispatch({
                type: GET_CARDS,
                payload: data.data
            })
        }
        )
}

export const addCard = (cardData) => dispatch => {
    CardsService.postCard(cardData.mana, cardData.name, cardData.description)
        .then(data => {
            console.log(data.data.card)
            dispatch({
            type: ADD_CARD,
            payload: data.data.card
        })}
        )
}