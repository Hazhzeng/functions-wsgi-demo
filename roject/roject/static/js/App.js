import React, { Component } from "react";
import ReactDOM from "react-dom";

import ChatboxContainer from "./containers/ChatboxContainer";

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <ChatboxContainer />
            </div>
        )
    }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;