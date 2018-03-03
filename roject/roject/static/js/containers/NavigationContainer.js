import React, { Component } from "react";
import ReactDOM from "react-dom";
import Paper from "material-ui/Paper";

import API from "../Api";
import NavigationBar from "../components/NavigationBar";

class NavigationContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Paper zDepth={1}>
                <NavigationBar />
            </Paper>
        );
    }
}

export default NavigationContainer;
