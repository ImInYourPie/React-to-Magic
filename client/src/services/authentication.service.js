import api from "./api";

export default {
    
    login(username, password){
        return api().post("/login", {username, password })
    }
}