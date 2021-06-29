import React, { Component } from 'react';
import axios from 'axios';

class PlacesBeenAddForm extends Component {
    constructor(){
        super()
        this.state={
            placesItems: [],
            name: " ",
            dates: " ",
            whattheydid: " ",
        }
    }
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.name)
    }
    // window.location.reload(false)
    submitInfo = (event) => {
        event.preventDefault();
    
        const newDest ={
            name: this.state.name,
            dates: parseInt(this.state.dates),
            whattheydid: this.state.whattheydid
        }
        console.log(newDest);
        axios.post("http://localhost:8080/places", newDest)
        .then(res => {
            console.log(res);
            // console.log(res.newDest);
            window.alert("Great, we have saved this to the Places You've Been!");
            this.clearForm()
        }).catch((err)=>{
            console.log('err ', err)
        })
    }
    clearForm = () => {
        console.log("this clear form called")
        this.setState({
            name: " ",
            dates: " ",
            whattheydid: " "
        })
        window.location.reload(false)
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submitInfo}>
                    <label>
                        <input typeof="text" name='name' onChange={this.handleChange} placeholder="City Visited" required/>
                        <input typeof="text" name='dates' onChange={this.handleChange} placeholder="Dates" />
                        <input typeof="text" name='thingsToDo' onChange={this.handleChange} placeholder="Fun Things I Did" required/>
                    </label>
                    <button typeof='submit'>Add Past Location</button>
                </form>
            </div>
        );
    }
}


export default PlacesBeenAddForm;