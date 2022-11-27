import {Col, Container, Row} from "react-bootstrap";
import GameTimer from "./GameTimer";
import Team from "./Team";
import {serverName} from "../App";
import {Component} from "react";

class Viewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isStarted: false,
        }

        this.getTeamInfo = this.getTeamInfo.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(this.getTeamInfo, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getTeamInfo() {
        return fetch("http://" + serverName + ":8080/status")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isStarted: responseJson.isStarted,
                });
            });
    }



    render() {
        if (!this.state.isStarted) {
            return (
                <Container>
                    <Row>
                        <h2 style={{color: "red",}}>The game has not started yet</h2>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container>
                    <Row style={{textAlign: "center"}}>
                        <Col><GameTimer /></Col>
                    </Row>
                    <Row style={{textAlign: "center"}}>
                        <Col><Team team={1} /></Col>
                        <Col><Team team={2} /></Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Viewer;