import React, { Component } from 'react';
import axios from 'axios';

class AddNewDestination extends Component {
    constructor(){
        super()
        this.state={
            travelItems: [],
            name: " ",
            dates: " ",
            thingsToDo: " ",
        }
    }
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.name)
    }
    submitInfo = (event) => {
        event.preventDefault();
        window.location.reload(false)
        const newDest ={
            name: this.state.name,
            dates: this.state.dates,
            thingsToDo: this.state.thingsToDo
        }
        axios.post("http://localhost:8080/travel", newDest)
        .then(res => {
            console.log(res);
            console.log(res.newDest);
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submitInfo}>
                    <label>
                        <input typeof="text" name='name' onChange={this.handleChange} placeholder="Dream Destination" required/>
                        <input typeof="text" name='dates' onChange={this.handleChange} placeholder="Possible Dates" />
                        <input typeof="text" name='thingsToDo' onChange={this.handleChange} placeholder="Fun Things To Do" required/>
                    </label>
                    <button typeof='submit'>Add New Destination</button>
                </form>
            </div>
        );
    }
}

export default AddNewDestination;