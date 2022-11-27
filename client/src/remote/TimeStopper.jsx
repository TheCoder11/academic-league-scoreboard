import {Component} from "react";
import {Badge, Button, Col, Row} from "react-bootstrap";
import {serverName} from "../App";

class TimeStopper extends Component {

    constructor(props) {
        super(props);

        this.toggleTime = this.toggleTime.bind(this);
        this.getStatus = this.getStatus.bind(this);
    }

    state = {
        playing: false
    }

    toggleTime () { // posts button press
        fetch("http://" + serverName + ":8080/changetime", {
            method: "POST",
            body: JSON.stringify({
                state: !(this.state.playing)
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    getStatus () { // changes state.playing depending on outcome
        return fetch("http://" + serverName + ":8080/status")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    playing: responseJson.playing
                });
            });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getStatus(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let badgebg = "failure";
        let text = "Stopped";
        if (this.state.playing) {
            badgebg = "success";
            text = "Running"
        }

        return (
            <div>
                <Button onClick={this.toggleTime}>Toggle Time</Button><Badge bg={badgebg}>{text}</Badge>
            </div>
        )
    }

}

export default TimeStopper;