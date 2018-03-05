import React, { Component } from "react";
import ReactDOM from "react-dom";
import Paper from "material-ui/Paper";

import API from "../Api";
import TextBox from "../components/TextBox";
import TextHolder from "../components/TextHolder";

const style = {
    position: 'absolute',
    margin: '0 0 0 300px',
};

class ChatboxContainer extends Component {
    constructor() {
        super();
        this.state = {
            msg_history: [],
        };
    }

    handleSubmit(message) {
        const last_update = API.postmsg(message);
        this.setState((prevState) => {
            return {
                msg_history: prevState.msg_history.concat([{
                    msg_content: message,
                    msg_update: 'todo_last_update',
                }])
            }
        });
    }

    render() {
        const msg_histories = this.state.msg_history.map((value, index) => (
            <TextHolder
                key={`key_${index}`}
                msg_content={value.msg_content}
                msg_update={value.msg_update}
            />
        ));
        return (
            <Paper zDepth={2} style={style}>
                {msg_histories}
                <TextBox handleSubmit={this.handleSubmit.bind(this)} />
            </Paper>
        );
    }
}

export default ChatboxContainer;
