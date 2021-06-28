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
    editThisDestination = (passedIndex, travelObject) => {
        console.log('clicked edit')
        console.log(passedIndex)
        console.log(travelObject)
        // if index in state == form index passed take form data and post it to DB
        // var indexInQuestion = travelObject.id
        // this.setState({
        //     theIndexToEdit: indexInQuestion
        // })

        if (passedIndex === this.state.theIndexToEdit) {
            console.log('edit IF IF IF ')
            this.setState({
                seeMore: false,
                theIndexToEdit: '',
                name: "",
                dates: "",
                thingsToDo: "",
            })
            // push to axios call funx to 

        } else {
            console.log('edit ELSE ELSE ELSE ')
            this.setState({
                seeMore: true,
                theIndexToEdit: passedIndex,
                name: travelObject.name,
                dates: travelObject.dates,
                thingsToDo: travelObject.thingsToDo,
            })
        }
        // console.log(passedIndex)
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
            <div className="destinationBigContainer">
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
                    <div>
                        {
                            this.state.travelItems.map(
                               ( travelItem, index )=>
                                    <div>
                                        <tr key={travelItem.id}>
                                            <td>{travelItem.name}</td>
                                            <td>{travelItem.dates}</td>
                                            <td>{travelItem.thingstodo}</td>
                                        </tr>
                                        <button className='seeMore' onClick={() => { this.editThisDestination(index, travelItem) }}>{this.state.seeMore ? this.state.theIndexToEdit === index ? 'Save' : 'Edit ✎' : 'Edit ✎'}</button>
                                        {/* <button onClick={()=>{this.showEditPage(travelItem.id)}}>✎</button> */}
                                        {this.state.seeMore
                                            ?
                                            this.state.theIndexToEdit === index
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
                    </div>
                </table>

            </div>
        );
    }
}

export default ListOfDestinations;