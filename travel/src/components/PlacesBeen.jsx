import React, { Component } from 'react';
import PlacesBeenService from '../services/PlacesBeenService';
import PlacesBeenAddForm from './PlacesBeenAddForm';
import axios from 'axios';

class PlacesBeen extends Component {
    constructor() {
        super()
        this.state = {
            placesItems: [],
            timeToUpdate: false,
            seeMore: false,
            theIndexToEdit: '',
            id: '',
            name: " ",
            dates: " ",
            whattheydid: " ",
        }
    }

    showEditPage = (ID) => {
        console.log('Clicked show edit page for: ' + ID)

    }
    editThisDestination = (passedIndex, placesObject) => {

        console.log('edit ELSE ELSE ELSE ')
        this.setState({
            seeMore: true,
            theIndexToEdit: passedIndex,
            id: placesObject.id,
            name: placesObject.name,
            dates: placesObject.dates,
            whattheydid: placesObject.whattheydid,
        })

        // console.log(passedIndex)
    }
    pushToDatabase = (event) => {
        event.preventDefault();
        let placesObj = {
            id: this.state.id,
            name: this.state.name,
            dates: parseInt(this.state.dates),
            whattheydid: this.state.whattheydid
        }
        console.log(placesObj)
        axios.put(`http://localhost:8080/places`, placesObj).then((res) => {
            console.log(res)

            this.setState({
                seeMore: false,
                theIndexToEdit: '',
                name: "",
                dates: "",
                whattheydid: "",
            })
        }).catch((e) => { console.log(e) })
    }
    deleteFromDatabase = () => {
        console.log('clicked delete')
        axios.delete(`http://localhost:8080/places/${this.state.id}`).then((res) => {
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
        PlacesBeenService.getPlacesItem().then((response) => {
            this.setState({
                placesItems: response.data
            })
        })
    }
    render() {
        return (
            <div className="destinationBigContainer">
                <h1>Places I've Been</h1>
                <PlacesBeenAddForm />
                {this.state.timeToUpdate ? this.updatePlacesItem(this.state.placesItems) : null}
                <table>
                    <thead>
                        <tr>
                            <td>Place I've Been</td>
                            <td>Dates</td>
                            <td>Things I Did</td>
                        </tr>
                    </thead>
                    <div>
                        {
                            this.state.placesItems.map(
                                (placesItem, index) =>
                                    <div key={index}>
                                        <tr key={placesItem.id}>
                                            <td>{placesItem.name}</td>
                                            <td>{placesItem.dates}</td>
                                            <td>{placesItem.thingsdone}</td>
                                        </tr>
                                        {this.state.seeMore === false ?
                                            <button className='seeMore' onClick={() => { this.editThisDestination(index, placesItem) }}>{this.state.seeMore ? this.state.theIndexToEdit === index ? 'Save' : 'Edit' : 'Edit ✎'}</button>

                                            : null}

                                        {/* <button onClick={()=>{this.showEditPage(travelItem.id)}}>✎</button> */}
                                        {this.state.seeMore
                                            ?
                                            this.state.theIndexToEdit === index
                                                ?
                                                <div>

                                                    <form onSubmit={this.pushToDatabase}>
                                                        <label>
                                                            <input typeof="text" name='name' onChange={this.handleChange} placeholder={placesItem.name} required />
                                                            <input typeof="text" name='dates' onChange={this.handleChange} placeholder="Dates Visited" />
                                                            <input typeof="text" name='thingstodo' onChange={this.handleChange} placeholder="Fun Things I Did" required />
                                                            <button typeof='submit'>Save</button>
                                                        </label>

                                                    </form>
                                                    <button onClick={this.deleteFromDatabase}>Delete</button>

                                                </div>
                                                :
                                                null
                                          
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

export default PlacesBeen;