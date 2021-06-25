import React, { Component } from 'react';
import AddNewDestination from './AddNewDestination';
import DestinationListService from "../services/DestinationListService";
import EditDestination from './EditDestination'
class ListOfDestinations extends Component {
    constructor() {
        super()
        this.state = {
            travelItems: [],
            timeToUpdate: false,
            seeMore: false,
            theIndexToEdit: '',
            name: " ",
            dates: " ",
            thingsToDo: " ",
        }
    }
    // get data from api

    componentDidMount() {
        DestinationListService.getTravelItem().then((response) => {
            this.setState({
                travelItems: response.data
            })
        })
    }
    showEditPage = (ID) => {
        console.log('Clicked show edit page for: ' + ID)

    }
    editThisDestination = (passedIndex) => {
        // if index in state == form index passed take form data and post it to DB

        if (passedIndex === this.state.theIndexToEdit) {
            this.setState({
                seeMore: false,
                theIndexToEdit: ''
            })

        } else {
            this.setState({
                seeMore: true,
                theIndexToEdit: passedIndex
            })
        }

    }
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.name)
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
                                travelItem =>
                                    <div>
                                        <tr key={travelItem.id}>
                                            <td>{travelItem.name}</td>
                                            <td>{travelItem.dates}</td>
                                            <td>{travelItem.thingstodo}</td>
                                        </tr>
                                        <button className='seeMore' onClick={() => { this.editThisDestination(travelItem) }}>{this.state.seeMore ? this.state.theIndexToEdit === travelItem ? 'Save' : 'Edit ✎' : 'Edit ✎'}</button>
                                        {/* <button onClick={()=>{this.showEditPage(travelItem.id)}}>✎</button> */}
                                        {this.state.seeMore
                                            ?
                                            this.state.theIndexToEdit === travelItem
                                                ?
                                                <div>
                                                    <text>form and DELETE button....</text>
                                                    <form >
                                                        <label>
                                                            <input typeof="text" name='name' onChange={this.handleChange} placeholder={travelItem.name} required />
                                                            <input typeof="text" name='dates' onChange={this.handleChange} placeholder="Possible Dates" />
                                                            <input typeof="text" name='thingsToDo' onChange={this.handleChange} placeholder="Fun Things To Do" required />
                                                        </label>

                                                    </form>
                                                </div>
                                                :
                                                null
                                            // <text>componet { travelItem.name + 
                                            //     travelItem.id}</text>
                                            : null}
                                    </div>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }
}

export default ListOfDestinations;