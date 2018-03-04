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

    handleSubmit(value) {
        API.postmsg(value);
        this.setState((prevState) => {
            return {
                msg_history: prevState.msg_history.concat([value])
            }
        });
    }

    render() {
        const msg_histories = this.state.msg_history.map((text, index) => (
            <TextHolder key={`key_${index}`} msg={text} index={index}/>
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
