import React, { Component } from 'react';

class WeatherSearchRendered extends Component {
    constructor(){
        super()
        this.state = {
            city: "",
            tempF:"",
        }
    }
    componentDidMount(){
        console.log("I JUST MOUNTEDDDDDDDDDDD")
        this.setState({
            city: this.props.city,
            tempF: this.props.tempF
        })
    }
    render() {
        return (
            <div className="currentWeather">
                <div>
                <text>City Name: {this.state.city}</text>
                </div>
                <div>
                <text>Temp in F: {this.state.tempF}</text>
                </div>
            </div>
        );
    }
}

export default WeatherSearchRendered;