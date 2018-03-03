import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    BottomNavigation,
    BottomNavigationItem
} from 'material-ui/BottomNavigation';

const default_navigation = [
{
    label: 'Home',
    url: '/',
    icon: <i className="fa fa-home"></i>,
},
{
    label: 'Post',
    url: '/post',
    icon: <i className="fa fa-envelope-open"></i>,
},
{
    label: 'About',
    url: '/about',
    icon: <i className="fa fa-info"></i>,
}];

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: default_navigation
        }
    }

    render() {
        const nav_items = this.state.navigation.map((value, index) =>
            <BottomNavigationItem
                key={`bottom-navigation-item-${index}`}
                label={value.label}
                icon={value.icon}
                onClick={() => window.location = value.url}
            />
        );
        return (
            <BottomNavigation>
                {nav_items}
            </BottomNavigation>
        )
    }
}

export default NavigationBar;
