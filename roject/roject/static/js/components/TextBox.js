import React, { Component } from "react";
import ReactDOM from "react-dom";

class TextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            disabled: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ msg: event.target.value });
        if (event.target.value) {
            this.setState(Object.assign({}, { disabled: false }));
        } else {
            this.setState(Object.assign({}, { disabled: true }));
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.msg);
        this.setState({ msg: '', disabled: true });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="pure-form">
                <input type="text" value={this.state.msg} onChange={this.handleChange} className="pure-input-1-2" />
                <button type="submit" className="pure-button pure-button-active" disabled={this.state.disabled}>POST</button>
            </form>
        );
    }
}

export default TextBox;