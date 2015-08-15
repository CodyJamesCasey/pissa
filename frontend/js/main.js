import React from 'react';
import moment from 'moment';
import $ from 'jquery';
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
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                this.getNextPass();
            }.bind(this));
        }
    }

    getNextPass() {
        $.post('iss', { lat: this.state.latitude, lon: this.state.longitude}, 
            function(response){
                this.setState({
                day: moment.unix(response).format("dddd MMMM DD, YYYY"),
                time: moment.unix(response).format("HH:mm")
            });
        }.bind(this));


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