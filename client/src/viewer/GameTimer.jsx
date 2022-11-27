import {Component} from "react";
import {serverName} from "../App";


class GameTimer extends Component {

    state = {
        secondsLeft: 0,
        playing: false
    }

    getTeamInfo() {
        console.log("http://" + serverName + ":8080/status");
        return fetch("http://" + serverName + ":8080/status")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    secondsLeft: responseJson.secondsLeft,
                    playing: responseJson.playing
                });
            });
    }

    pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getTeamInfo(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        let minutes = this.pad(Math.floor(this.state.secondsLeft / 60), 2);
        let seconds = this.pad(this.state.secondsLeft % 60, 2);
        let time = <h1 style={{fontSize: "70px"}}>{minutes}:{seconds}</h1>;
        if (!this.state.playing) {
            time = <h2 style={{color: "red", fontSize: "70px"}}>{minutes}:{seconds}</h2>
        }

        return (
            <p>{time}</p>
        );
    }
}

export default GameTimer;