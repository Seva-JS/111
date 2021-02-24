import React from "react";
import s from '../App.module.css'


export default class Serch extends React.Component {
    constructor() {
        super();
        this.state = {}


    }

    render() {
        return (
            <body className={s.App_header}>
            <div className={s.sqrt}>
                <div><input onChange={this.props.inputValue} className={s.input} id="myInput" type={'text'} placeholder={'Enter your town!'}>
                </input></div>
                <div className={s.body}>
                    <button onClick={this.props.request}>Click</button>
                </div>
                <div>{this.props.addWeatherToPage()}</div>
            </div>
            </body>

        )
    }
}