import React, { Component } from "react";
import ReactDOM from "react-dom";

class FormContainer extends Component {
    constructor() {
        super();

        this.state = {
            seo_title: ""
        };

    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        const { seo_title } = this.state;
        return (
            <p>Hello React</p>
        );
    }
}

export default FormContainer;