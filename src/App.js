import React from "react";
import Serch from "./Main/Serch";


export default class App extends React.Component {
    constructor() {

        super();
        this.state = {
            data: {},
            load: false,
            inputValue: ' '
        }


    }


    request = () => {

        let inputVal = document.getElementById("myInput").value;
        if (inputVal != "") {
            const api = 'd989440c836fbb9bdc5d22f6d5e7683f';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${api}`
            fetch(url, {
                origin: 'cors'
            }).then(resp => resp.json()).then(data => this.setState({
                data: {data},
                load: true,

            }))
        } else {
            alert('Введите город !')
        }


    }

    addWeatherToPage = () => {

        if (this.state.load === true) {
            let city = this.state.data.data.name
            let temp = this.KtoC(this.state.data.data.main.temp);

            return (
                <div>
                    <div> City: {city}</div>
                    <div> Temperature: {temp}°</div>


                </div>

            )

        }

    }

    KtoC = (K) => {
        return Math.floor(K - 273.15);
    }
    inputValue = (e) => {
        this.setState({
            inputValue: e.currentTarget.value
        })


    }

    render() {
        return (
            <div>
                <Serch
                    addWeatherToPage={this.addWeatherToPage}
                    request={this.request}
                    inputValue={this.inputValue}
                />
            </div>
        )

    }
}