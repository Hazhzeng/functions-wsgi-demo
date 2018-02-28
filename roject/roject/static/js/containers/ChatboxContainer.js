import React, { Component } from "react";
import ReactDOM from "react-dom";

import API from "../Api";
import TextBox from "../components/TextBox";
import TextHolder from "../components/TextHolder";

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
            <TextHolder key={`key_${index}`} msg={text} />
        ));
        return (
            <div>
                {msg_histories}
                <TextBox handleSubmit={this.handleSubmit.bind(this)} />
            </div>
        );
    }
}

export default ChatboxContainer;