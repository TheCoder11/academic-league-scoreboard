import {Component} from "react";
import {Button, Container, Row} from "react-bootstrap";
import {serverName} from "../App";

class NewGame extends Component {

    constructor(props) {
        super(props);

        this.postButton = this.postButton.bind(this);
    }

    state = {
        team1name: "",
        team2name: "",
        minutes: "35"
    }

    postButton () {
        console.log("hello");
        fetch("http://" + serverName + ":8080/newgame", {
            method: "POST",
            body: JSON.stringify({
                team1name: this.state.team1name,
                team2name: this.state.team2name,
                minutes: parseInt(this.state.minutes)
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    render () {

        return (
            <Container>
                <Row><input type={"text"} value={this.state.team1name} onChange={event => {this.setState({team1name: event.target.value})}} placeholder={"Team 1 Name"} /></Row>
                <Row><input type={"text"} value={this.state.team2name} onChange={event => {this.setState({team2name: event.target.value})}} placeholder={"Team 2 Name"} /></Row>
                <Row><select value={this.state.minutes} onChange={event => {this.setState({minutes: event.target.value})}}>
                    <option>35 (Varsity)</option>
                    <option>25 (JV)</option>
                </select></Row>
                <Row><Button onClick={this.postButton}>Start New Game</Button></Row>
            </Container>
        )

    }

}

export default NewGame;