import React from "react";
import DatePicker from "material-ui/DatePicker";

class CalendarPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_date: null,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, date) {
        this.setState({
            selected_date: date
        });
    }

    render() {
        return (
            <DatePicker
                hintText="Choose a memory"
                container="inline"
                value={this.state.selected_date}
                onChange={this.handleChange}
            />
        )
    }
}

export default CalendarPanel;
