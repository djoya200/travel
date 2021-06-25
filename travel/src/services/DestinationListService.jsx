import axios from "axios"

const TRAVEL_URL = "http://localhost:8080/travel";
class DestinationListService {
    getTravelItem(){
        return axios.get(TRAVEL_URL)
    }
    postTravelItem(){
        return axios.post(TRAVEL_URL)
    }
}


export default new DestinationListService();
