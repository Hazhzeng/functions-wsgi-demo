import React, { Component } from "react";
import ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import ChatboxContainer from "./containers/ChatboxContainer";
import NavigationContainer from "./containers/NavigationContainer";

class ReactContent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <NavigationContainer />
                <ChatboxContainer />
            </div>
        )
    }
}

const App = () => (
    <MuiThemeProvider>
        <ReactContent />
    </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("app"));
