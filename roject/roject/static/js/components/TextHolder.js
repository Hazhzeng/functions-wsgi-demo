import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Card, CardTitle, CardText } from "material-ui/Card";

class TextHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: props.msg
        };
    }

    render() {
        return (
            <Card>
                <CardTitle
                    title={this.state.msg}
                    subtitle={this.props.index}
                />
            </Card>
        );
    }
}

export default TextHolder;
