import axios from "axios"

const TRAVEL_URL = "http://localhost:8080/travel";
class DestinationListService {
    getTravelItem(){
        return axios.get(TRAVEL_URL)
    }
    postTravelItem(){
        
    }
    deleteTravelItem(){

    }
    editTravelItem(){

    }
}


export default new DestinationListService();
