import api from "./api";

export default {
    
    getDecks(){
        return api().get("/decks");
    },

    postCard(mana, name, description, image){
        return api().post("/cards/post", {
            mana: mana,
            name: name,
            description: description
        })
    }
}