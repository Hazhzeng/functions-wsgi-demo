import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
    constructor() {
        super();

        this.state = {
            title: "Awesome React"
        };

    }

    render() {
        const { title } = this.state;
        return (
            <h2 id='title'> Hello World </h2>
        );
    }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
