import React, { Component } from "react";
import ReactDOM from "react-dom";

class TextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ msg: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.msg);
        this.setState({ msg: '' });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="pure-form">
                <input type="text" value={this.state.msg} onChange={this.handleChange} className="pure-input-1-2" />
                <button type="submit" className="pure-button pure-button-active">POST</button>
            </form>
        );
    }
}

export default TextBox;