import React, { Component } from 'react';
import AddNewDestination from './AddNewDestination';
import DestinationListService from "../services/DestinationListService";
// import EditDestination from './EditDestination'
import axios from 'axios';

class ListOfDestinations extends Component {
    constructor() {
        super()
        this.state = {
            travelItems: [],
            timeToUpdate: false,
            seeMore: false,
            theIndexToEdit: '',
            id: '',
            name: " ",
            dates: " ",
            thingstodo: " ",
        }
    }


    showEditPage = (ID) => {
        console.log('Clicked show edit page for: ' + ID)

    }
    editThisDestination = (passedIndex, travelObject) => {

        console.log('edit ELSE ELSE ELSE ')
        this.setState({
            seeMore: true,
            theIndexToEdit: passedIndex,
            id: travelObject.id,
            name: travelObject.name,
            dates: travelObject.dates,
            thingstodo: travelObject.thingstodo,
        })

        // console.log(passedIndex)
    }
    pushToDatabase = (event) => {
        event.preventDefault();
        let travelObj = {
            id: this.state.id,
            name: this.state.name,
            dates: parseInt(this.state.dates),
            thingstodo: this.state.thingstodo
        }
        console.log(travelObj)
        axios.patch(`http://localhost:8080/travel/${this.state.id}`, travelObj).then((res) => {
            console.log(res)

            this.setState({
                seeMore: false,
                theIndexToEdit: '',
                name: "",
                dates: "",
                thingsToDo: "",
            })
        }).catch((e) => { console.log(e) })
    }
    deleteFromDatabase = () => {
        console.log('clicked delete')
        axios.delete(`http://localhost:8080/travel/${this.state.id}`).then((res) => {
            console.log(res)

        }).catch((e) => { console.log(e) })
    }
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.name)
        console.log(event.target.value)
    }
    componentDidMount() {
        DestinationListService.getTravelItem().then((response) => {
            this.setState({
                travelItems: response.data
            })
        })
    }
    render() {
        return (
            <div className="destinationBigContainer">
                <h1>Destination Wish List</h1>
                {/* <AddNewDestination /> */}
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
                                (travelItem, index) =>
                                    <div key={index}>
                                        <tr key={travelItem.id}>
                                            <td>{travelItem.name}</td>
                                            <td>{travelItem.dates}</td>
                                            <td>{travelItem.thingstodo}</td>
                                        </tr>
                                        {this.state.seeMore === false ?
                                            <button className='seeMore' onClick={() => { this.editThisDestination(index, travelItem) }}>{this.state.seeMore ? this.state.theIndexToEdit === index ? 'Save' : 'Edit' : 'Edit ✎'}</button>

                                            : null}

                                        {/* <button onClick={()=>{this.showEditPage(travelItem.id)}}>✎</button> */}
                                        {this.state.seeMore
                                            ?
                                            this.state.theIndexToEdit === index
                                                ?
                                                <div>
                                                    
                                                    <form  onSubmit={this.pushToDatabase}>
                                                        <label>
                                                            <input typeof="text" name='name' onChange={this.handleChange} placeholder={travelItem.name} required />
                                                            <input typeof="text" name='dates' onChange={this.handleChange} placeholder="Possible Dates" />
                                                            <input typeof="text" name='thingstodo' onChange={this.handleChange} placeholder="Fun Things To Do" required />
                                                            <button typeof='submit'>Save</button>
                                                        </label>

                                                    </form>
                                                    <button onClick={this.deleteFromDatabase}>Delete</button>
                                                    
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