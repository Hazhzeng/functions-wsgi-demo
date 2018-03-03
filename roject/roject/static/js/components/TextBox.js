import React, { Component } from "react";
import ReactDOM from "react-dom";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
            <form onSubmit={this.handleSubmit}>
                <TextField id="text-box-0" type="text" value={this.state.msg} onChange={this.handleChange}/>
                <RaisedButton type="submit" label="POST" disabled={this.state.disabled}/>
            </form>
        );
    }
}

export default TextBox;
