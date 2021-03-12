import React from "react";
import s from "../App.module.css";

export default class Serch extends React.Component {
  render() {
    return (
      <body className={s.App_header}>
        <div className={s.sqrt}>
          <div>
            <input
              onChange={this.props.inputValue}
              className={s.input}
              type={"text"}
              placeholder={"Enter your town"}
              onKeyPress={(e) => {
                this.props.request(e);
              }}
            ></input>
          </div>
          <div className={s.body}></div>
          <div>{this.props.addWeatherToPage()}</div>
        </div>
      </body>
    );
  }
}
