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
    // window.location.reload(false)
    submitInfo = (event) => {
        event.preventDefault();
    
        const newDest ={
            name: this.state.name,
            dates: this.state.dates,
            thingstodo: this.state.thingsToDo
        }
        console.log(newDest);
        axios.post("http://localhost:8080/travel", newDest)
        .then(res => {
            console.log(res);
            // console.log(res.newDest);
            window.alert("Great, we have saved this to your Future Destinations!");
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
            thingstodo: " "
        })
        window.location.reload(false)
        console.log(this.state)
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