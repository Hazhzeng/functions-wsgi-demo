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
            <div>
                <input value={this.state.msg} readOnly />
            </div>
        );
    }
}

export default TextHolder;