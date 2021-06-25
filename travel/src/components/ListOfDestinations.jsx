import React, { Component } from 'react';
import AddNewDestination from './AddNewDestination';
import DestinationListService from "../services/DestinationListService";

class ListOfDestinations extends Component {
    constructor(){
        super()
        this.state={
            travelItems: [],
            timeToUpdate: false,
        }
    }
    // get data from api
    
    componentDidMount(){
        DestinationListService.getTravelItem().then((response)=>{
            this.setState({
                travelItems : response.data
            })
        })
    }
    render() {
        return (
            <div>
                <h1>Destination Wish List</h1>
                {this.state.timeToUpdate ? this.updateTravelItem(this.state.travelItems) : null}
                <table>
                    <thead>
                        <tr>
                            <td>Destination Name</td>
                            <td>Dates</td>
                            <td>Things To Do</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.travelItems.map(
                                travelItem=>
                                <tr key = {travelItem.id}>
                                    <td>{travelItem.name}</td>
                                    <td>{travelItem.dates}</td>
                                    <td>{travelItem.thingsToDo}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }
}

export default ListOfDestinations;