import React, { Component } from "react";
import ReactDOM from "react-dom";

class TextHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: props.msg
        };
    }

    render() {
        return (
            <textarea value={this.state.msg} readOnly />
        );
    }
}

export default TextHolder;