import React from "react";
import Serch from "./Main/Serch";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      load: false,
      inputValue: " ",
    };

    async function req (props) {
      debugger;
      try {
       
        let inputVal =props;
        let cutVal = inputVal.trim();
        const api = "d989440c836fbb9bdc5d22f6d5e7683f";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cutVal}&appid=${api}`;
        let response = await fetch(url);
        let data = await response.json(); 
        console.log(data)
      } catch (e) {
        alert(e);
      }
    }
    this.req = req;
  }

  addWeatherToPage = () => {
    if (this.state.load === true) {
      let city = this.state.data.name;
      let temp = this.KtoC(this.state.data.main.temp);
      let minTemp = this.KtoC(this.state.data.main.temp_min);
      let maxTemp = this.KtoC(this.state.data.main.temp_max);
      let pressure = this.pressureCout(this.state.data.main.pressure);

      return (
        <div>
          <div> City: {city}</div>
          <div>
            {" "}
            Temperature:
            <ul>
              <li>Now: {temp}°</li>
              <li>Min: {minTemp}°</li>
              <li>Max: {maxTemp}°</li>
            </ul>
            <div>Pressure: {pressure} mm Hg</div>
          </div>
        </div>
      );
    }
  };
  pressureCout = (P) => {
    return Math.floor(P / 1.3333);
  };

  KtoC = (K) => {
    return Math.floor(K - 273.15);
  };
  inputValue = (e) => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div>
        <Serch
          addWeatherToPage={this.addWeatherToPage}
          req={this.req}
          val={this.state.inputValue}
          inputValue={this.inputValue}
        />
      </div>
    );
  }
}
