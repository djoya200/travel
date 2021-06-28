import React, { Component } from 'react';
import WeatherSearchRendered from './WeatherSearchRendered';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            input: " ",
            city: " ",
            tempF: " ",
            searchDone: false,
        }
    }
    handleChange = (event) => {
        event.preventDefault();
        console.log(this.state.input)
        this.setState({
            input: event.target.value,
            searchDone: false
        })
    }

    callCurrentWeather = async (event) => {
        event.preventDefault();
        console.log("weather for city called")
        console.log(this.state.input)
        const query = this.state.input
        const url = `http://api.weatherapi.com/v1/current.json?key=5b38460b0d054bb883c40944212506&q=${query}&aqi=no`

       
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            console.log(url)
            this.setState({
                city: data.location.name,
                tempF: data.current.temp_f,
                searchDone: true
            })
        }
        catch (err) {
            console.log("There was an error" + err)
          
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome to That Place </h1>
                {/* <text>Save Destinations and ideas of what to do while you are there.
                Search the current, historical and 14 day weather forcast at these destinations.
                </text> */}
                <h3>Search Current Weather In a City</h3>
                <form action=" " className="form" onSubmit={this.callCurrentWeather}>
                    <input type="text" name="query" className="input" placeholder="Search" onChange={this.handleChange} />
                    <button type="submit" className="button" >Search</button>
                </form>
                {this.state.searchDone
                    ?
                    <WeatherSearchRendered city={this.state.city} tempF={this.state.tempF} />
                    : null
                }
            </div>
        );
    }
}

export default Home;