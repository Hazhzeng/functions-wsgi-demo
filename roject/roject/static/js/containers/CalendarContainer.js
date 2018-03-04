import React, { Component } from "react";
import ReactDOM from "react-dom";
import Drawer from "material-ui/Drawer";

import NavigationBar from "../components/NavigationBar";
import CalendarPanel from "../components/CalendarPanel";

class CalendarContainer extends Component {
    constructor() {
        super();
        this.state = {
            calendar_open: true,
            calendar_docked: true,
        };
    }

    render() {
        return (
            <Drawer
                open={this.state.calendar_open}
                docked={this.state.calendar_docked}
            >
                <CalendarPanel />
                <NavigationBar />
            </Drawer>
        );
    }
}

export default CalendarContainer;
