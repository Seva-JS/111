import React from "react";
import Serch from "./Main/Search";
import s from "./App.module.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      load: false,
      inputValue: "",
      satusCod:''
    };
  }

  request = (e) => {
    if (e.key === "Enter") {
      try {
        this.rec();
      } catch (error) {
        alert(error);
      }
    }
  };
  rec = () => {
    let inputVal = this.state.inputValue;
    let cutVal = inputVal.trim();
    if (cutVal !== "") {
      const api = "16231cb764f891b525cd2b445ebfb729";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cutVal}&appid=${api}`;
      fetch(url, {
        origin: "cors",
      })
        .then((resp) => resp.json())
        .then((data) =>
          this.setState({
            data: data,
            load: true,
            inputVal: " ",
            satusCod:data.cod

          })
        );
    } else {
      alert("Enter your town!");
    }
  }
  addWeatherToPage = () => {
    if (this.state.load === true) {
      if(this.state.satusCod !=='404'){
      let city = this.state.data.name;
      let region = this.state.data.sys.country;
      let temp = this.KtoC(this.state.data.main.temp);
      let minTemp = this.KtoC(this.state.data.main.temp_min);
      let maxTemp = this.KtoC(this.state.data.main.temp_max);
      let pressure = this.pressureCout(this.state.data.main.pressure);
      let icone = this.state.data.weather[0].icon;
      let url = `http://openweathermap.org/img/wn/${icone}@2x.png`;
      let weatherStatus = this.state.data.weather[0].main;
      

      return (
        <div>
          <div className={s.infoBoard}>
            <div>Region:{region}</div>
            <div>City: {city}</div>
          </div>
          <div>
            Temperature:
            <ul>
              <li>Now: {temp}°</li>
              <li>Min: {minTemp}°</li>
              <li>Max: {maxTemp}°</li>
            </ul>
            <div className={s.stBlock}>
              <h2> {weatherStatus}</h2>
              <img alt="ERR:Img cant download" src={url} />
            </div>
            <div> Pressure: {pressure} mm Hg</div>
          </div>
        </div>
      );
      
    }else{
      alert('Wrong town!')
      this.setState({
        data: '',
            load: false,
            inputVal: " ",
            satusCod:''
      });
    }}
  };
  pressureCout = (P) => {
    return Math.floor(P / 1.3333);
  };

  KtoC = (K) => {
    return Math.floor(K - 273.15);
  };
  inputValue = (e) => {
    let regexp = e.currentTarget.value.replace(/\d/g, "");
    this.setState({
      inputValue: regexp,
    });
  };

  render() {
    return (
      <div>
        <Serch
          addWeatherToPage={this.addWeatherToPage}
          request={this.request}
          state={this.state}
          inputValue={this.inputValue}
        />
      </div>
    );
  }
}
