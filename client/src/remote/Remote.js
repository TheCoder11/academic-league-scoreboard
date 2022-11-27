import {Component} from "react";
import NewGame from "./NewGame";
import {Button, Col, Container, Row} from "react-bootstrap";
import PointAdder from "./PointAdder";
import TimeStopper from "./TimeStopper";
import {serverName} from "../App";
import EditAction from "./EditAction";
import BaseComponent from "bootstrap/js/src/base-component";
import EditTime from "./EditTime";

class Remote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isStarted: false,
            secondsLeft: 0,
            team1name: "",
            team2name: "",
            editingActions: false,
            editingTime: false,
            team: 1,
        }

        this.getTeamInfo = this.getTeamInfo.bind(this);
        this.endGame = this.endGame.bind(this);
        this.setTime = this.setTime.bind(this);
        this.toggleEditingTime = this.toggleEditingTime.bind(this);
        this.toggleEditingActions = this.toggleEditingActions.bind(this);
    }

    getTeamInfo() {
        return fetch("http://" + serverName + ":8080/status")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isStarted: responseJson.isStarted,
                    team1name: responseJson.team1.name,
                    team2name: responseJson.team2.name,
                    secondsLeft: responseJson.secondsLeft,
                });
            });
    }

    endGame() {
        return fetch("http://" + serverName + ":8080/endgame", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    setTime (desired) { // posts button press
        fetch("http://" + serverName + ":8080/changetime", {
            method: "POST",
            body: JSON.stringify({
                state: desired
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    toggleEditingActions() {
        console.log("action");
        this.setState({
            editingActions: !this.state.editingActions,
        });
    }

    toggleEditingTime() {
        console.log("time");
        this.setState({
            editingTime: !this.state.editingTime,
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getTeamInfo(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        if (!this.state.isStarted) {
            return <NewGame />
        } else if (this.state.editingActions) {
            return <EditAction team={this.state.team} toggleEdit={this.toggleEditingActions} />;
        } else if (this.state.editingTime) {
            return <EditTime toggleEdit={this.toggleEditingTime} />;
        } else {
            return (
                <Container>
                    <Row>
                        <Col><TimeStopper /></Col>
                        <Col><Button onClick={() => {
                            this.setTime(false);
                            this.toggleEditingTime();
                        }}>Edit Time</Button></Col>
                    </Row>
                    <Row>
                        <Col>{this.state.team1name}</Col>
                        <Col><PointAdder team={1}/></Col>
                        <Col><Button onClick={() => {
                            this.setState({
                                team: 1,
                            });
                            this.toggleEditingActions();
                        }
                        }>Edit Previous Scores</Button> </Col>
                    </Row>
                    <Row>
                        <Col>{this.state.team2name}</Col>
                        <Col><PointAdder team={2}/></Col>
                        <Col><Button onClick={() => {
                            this.setState({
                                team: 2,
                            });
                            this.toggleEditingActions();
                        }}>Edit Previous Scores</Button> </Col>
                    </Row>
                    {this.state.secondsLeft === 0 ? (
                        <Row>
                            <Col><Button onClick={this.endGame}>End Game</Button></Col>
                        </Row>
                    ) : (
                        <span></span>
                    )}

                </Container>
            )
        }
    }

}

export default Remote;