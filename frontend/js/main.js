import React from 'react';
import moment from 'moment';
import $ from 'jquery';
moment().format();

export class Main extends React.Component {
    constructor(args) {
        super(...args);

        this.getLocation = this.getLocation.bind(this);
        this.getNextPass = this.getNextPass.bind(this);
        this.orderPizza = this.orderPizza.bind(this);

        this.state = {
            latitude: null,
            longitude: null,
            day: null,
            time: null,
            status: null
        };
        this.props = {};
    }

    getLocation() {
        this.setState({
            status: 'loading'
        });

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
                setTimeout(function(){
                    this.setState({
                        day: moment.unix(response).format("dddd MMMM DD, YYYY"),
                        time: moment.unix(response).format("HH:mm"),
                        status: 'loaded'
                    });
                }.bind(this), 3000);
        }.bind(this));
    }

    orderPizza() {
        console.log('pizza ordered, dawg');
    }

    render() {

        var message = (
            <div id="message-wrapper">
                <div id="ready-for-pizza">Ready for a pizza party?</div>
                <div className="pizza-button" onClick={this.getLocation}>Find the ISS!</div>
            </div>
        );

        if(this.state.status == 'loading') {
            message = (
                <div id="message-wrapper">
                    <div id="ready-for-pizza">Where is that pesky space station anywayz?</div>
                    <div id="spinning-pie"></div>
                </div>
            );
        }

        if(this.state.status == 'loaded') {
            message = (
                <div id="message-wrapper">
                    <div id="message-status">{'The ISS will pass over you on ' + this.state.day + ' at ' + this.state.time + '!'}</div>
                    <div className="pizza-button" onClick={this.orderPizza}>Click to order your pizza!</div>
                </div>
            );
        }

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
                    {message}
                </div>
            </div>
        );
    }
}

React.render(
    <Main />, 
    document.body
);