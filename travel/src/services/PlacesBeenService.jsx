import axios from "axios"

const PLACES_URL = "http://localhost:8080/places";
class PlacesBeenService {
    getPlacesItem(){
        return axios.get(PLACES_URL)
    }
    postPlacesItem(){

    }
    deletePlacesItem(){

    }
    editPlacesItem(){

    }
    patchPlacesItem(){
        
    }
}


export default new PlacesBeenService();