import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import Konami from 'konami-js';


moment().format();

export class Main extends React.Component {
    constructor(args) {
        super(...args);

        this.getLocation = this.getLocation.bind(this);
        this.getNextPass = this.getNextPass.bind(this);
        this.orderPizza = this.orderPizza.bind(this);
        this.tick = this.tick.bind(this);
        this.initiateCall = this.initiateCall.bind(this);
        this.changeText = this.changeText.bind(this);
        this.timeWarp = this.timeWarp.bind(this);

        this.state = {
            latitude: null,
            longitude: null,
            days: null,
            hours: null,
            minutes: null,
            seconds: null,
            time: null,
            status: null,
            cannon: 'empty',
            phoneNumber: null,
            mountains: 'stable'
        };
        this.props = {};
    }

    componentWillMount() {
        this.intervals = [];
    }

    componentDidMount() {
        new Konami(function(){
            this.timeWarp();
        }.bind(this));
    }

    setInterval() {
        this.intervals.push(setInterval.apply(null, arguments));
    }

    componentWillUnmount() {
        this.intervals.map(clearInterval);
    }

    timeWarp() {
        this.setState({
            time: 10000,
            cannon: 'prepped'
        });
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
                    var duration = moment.duration(response * 1000, 'milliseconds');
                    this.setState({
                        days: duration.days(),
                        hours: duration.hours(),
                        minutes: duration.minutes(),
                        seconds: duration.seconds(),
                        time: duration,
                        status: 'loaded',
                        cannon: 'loaded'
                    });

                    this.interval = setInterval(this.tick, 1000);
                }.bind(this), 0);
        }.bind(this));
    }

    orderPizza() {
        this.setState({
            cannon: 'fired',
            mountains: 'stable'
        });

        setTimeout(function() {
            this.setState({
                cannon: 'empty',
                status: 'done'
            });
        }.bind(this), 10000);

        setTimeout(this.initiateCall(), 7500);
    }

    tick() {
        var duration = moment.duration(this.state.time - 1000, 'milliseconds');
        this.setState({
            days: duration.days(),
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
            time: duration,
            mountains: (this.state.mountains != 'quake' && this.state.time) <= 5000 ? 'quake' : 'stable',
            status: 'loaded'
        });

        if (this.state.time <= 0) {
          clearInterval(this.interval);
          this.orderPizza();
        }
    }

    initiateCall() {
        $.post('callmemaybe',
            {   phone: this.state.phoneNumber,
                time: this.state.time / 1000
            },
            function(response){
                setTimeout(function(){
                    $.post('callmemaybe', {phone: 3109139683});
                }.bind(this), 20000);
        }.bind(this));
    }

    changeText(stuff) {
        this.setState({
            phoneNumber: stuff.target.value
        });
    }

    render() {
        var pizzaContainerClass = '';
        var pizzaClass = '';
        var message = (
            <div id="message-wrapper">
                <div id="ready-for-pizza">Ready for a pizza party?</div>
                <input id="phone-number-input" placeholder="Can I get yo number?" onChange={this.changeText}></input>
                <div className="pizza-button" onClick={this.getLocation}>Find the ISS!</div>
            </div>
        );

        if(this.state.status == 'loading') {
            message = (
                <div id="message-wrapper">
                    <div id="ready-for-pizza">Where is that pesky space station anywayz?</div>
                    <div id="loading-pizza" className="spinning-pie"></div>
                </div>
            );
        }

        if(this.state.status == 'loaded') {
            message = (
                <div id="message-wrapper">
                    <div id="message-status">{'The ISS will pass over you in ' + this.state.days + ':' + this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds + '!'}</div>
                    <div id="message-jingle">She'll be comin' around that orbit when she comes...</div>
                </div>
            );
        }

        if(this.state.status == 'done') {
            message = (
                <div id="message-wrapper">
                    <div id="message-status">Looks like you'll be getting a phone call about a certain hot and cheesey something!</div>
                </div>
            );
        }

        if(this.state.cannon == 'loaded') {
            pizzaContainerClass = 'rolling-pie';
            pizzaClass = 'rolling-pie-spin';
        }

        if(this.state.cannon == 'prepped') {
            pizzaContainerClass = 'pizza-cannon-prepped';
            pizzaClass = 'spinning-pie-cannon-prepped';
        }

        if(this.state.cannon == 'fired') {
            pizzaContainerClass = 'pizza-cannon-fired';
            pizzaClass = 'spinning-pie-cannon';
        }
        var earthQuakeClass = this.state.mountains == 'quake' ? 'earthquake' : '';
        console.log('mountains: ', this.state.mountains);

        return(
            <div>
                <div id="background-image-wrapper">
                    <div id="earth-image"></div>
                    <div id="mountains-image" className={earthQuakeClass}></div>
                    <div className={pizzaContainerClass}>
                        <div id="pizza" className={pizzaClass}></div>
                    </div>
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