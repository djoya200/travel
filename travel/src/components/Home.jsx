import React, { Component } from 'react';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            input: " ",
            city: " ",
            tempF: " ",
        }
    }
    componentDidMount() {
        console.log("I mounted!!!")
        this.callWeather()
    }
    callWeather = async () => {

        console.log("weather for city called")
        const query = this.state.input
        const url = `http://api.weatherapi.com/v1/current.json?key=5b38460b0d054bb883c40944212506&q=${query}&aqi=no`

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            this.setState({
                city: " ",
                tempF: " ",
            })
        }
        catch (err) {
            console.log("There was an error")
        }
    }
    handleChange = (event) => {
        event.preventDefault();
        console.log(this.state.input)
        this.setState({
            input: event.target.value
        })

    }

    render() {
        return (
            <div>
                <h1>Welcome to our Travel site "That Place" </h1>
                <text>Save Destinations and ideas of what to do while you are there.
                Search the current, historical and 14 day weather forcast at these destinations.
                </text>
                <h3>Search Weather In a City</h3>
                <form action=" " className="form" onSubmit={this.callWeather}>
                    <input type="text" name="input" placeholder="Search" onChange={this.handleChange} />
                    <button type="submit" className="button">Search</button>
                </form>
            </div>
        );
    }
}

export default Home;