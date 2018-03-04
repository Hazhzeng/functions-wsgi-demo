import React, { Component } from "react";
import ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import BlogContainer from "./containers/BlogContainer";
import CalendarContainer from "./containers/CalendarContainer";
import ChatboxContainer from "./containers/ChatboxContainer";

class ReactContent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <BlogContainer />
                <CalendarContainer />
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
