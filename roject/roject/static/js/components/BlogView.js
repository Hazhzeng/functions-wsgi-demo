import React from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";

class BlogView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Sample Title",
            text: "Sample Text",
        };
    }

    render() {
        return (
            <Card>
                <CardTitle
                    title={this.state.title}
                />

                <CardText>
                    {this.state.text}
                </CardText>
            </Card>
        );
    }
}

export default BlogView;
