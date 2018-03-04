import React, { Component } from "react";
import ReactDOM from "react-dom";
import Paper from "material-ui/Paper";

import BlogView from "../components/BlogView";

const style = {
    position: 'absolute',
    margin: '100px 0 0 300px',
};

class BlogContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Paper zDepth={2} style={style}>
                <BlogView />
            </Paper>
        );
    }
}

export default BlogContainer;
