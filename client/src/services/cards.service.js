import api from "./api";

export default {
    
    getCards(){
        return api().get("/cards");
    }
}