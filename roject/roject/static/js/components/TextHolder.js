import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Card, CardTitle, CardText } from "material-ui/Card";

class TextHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg_content: props.msg_content,
            msg_update: props.msg_update,
        };
    }

    render() {
        return (
            <Card>
                <CardTitle
                    title={this.state.msg_content}
                    subtitle={this.state.msg_update}
                />
            </Card>
        );
    }
}

export default TextHolder;
