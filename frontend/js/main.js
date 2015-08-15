import React from 'react';
import moment from 'moment';
moment().format();

export class Main extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            latitude: null,
            longitude: null,
            day: null,
            time: null
        };
        this.props = {};
    }

    componentDidMount() {
        this.getLocation();
        this.getNextPass();
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            }.bind(this));
        }
    }

    getNextPass() {
        //TODO call api to get actual value
        var unixTimestamp = 1439674710;

        this.setState({
            day: moment.unix(unixTimestamp).format("dddd MMMM DD, YYYY"),
            time: moment.unix(unixTimestamp).format("HH:mm")
        });
    }

    orderPizza() {
        console.log('pizza ordered, dawg');
    }

    render() {

        return(
            <div>
                <div id="background-image-wrapper">
                    <div id="earth-image"></div>
                    <div id="mountains-image"></div>
                    <div id="pizza-image"></div>
                </div>
                <div id="background-image-glass"></div>
                <div id="content">
                    <div id="message-background"></div>
                    <div id="message-wrapper">
                        <div id="message-status">{'The ISS will pass over you on ' + this.state.day + ' at ' + this.state.time + '!'}</div>
                        <div id="pizza-button" onClick={this.orderPizza}>Click to order your pizza!</div>
                    </div>
                </div>
            </div>
        );
    }
}

React.render(
    <Main />, 
    document.body
);