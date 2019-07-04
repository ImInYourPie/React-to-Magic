import api from "./api";

export default {
    
    getCards(){
        return api().get("/cards");
    },

    postCard(mana, name, description, image){
        return api().post("/cards/post", {
            mana: mana,
            name: name,
            description: description
        })
    }
}