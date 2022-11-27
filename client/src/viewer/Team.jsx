import {Component} from "react";
import {Card, ListGroup} from "react-bootstrap";
import {serverName} from "../App";

class Team extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team: props.team,
            name: "",
            points: 0,
            actions: []
        }

        this.getTeamInfo = this.getTeamInfo.bind(this);
    }

    getTeamInfo() {
        return fetch("http://" + serverName + ":8080/status")
            .then((response) => response.json())
            .then((responseJson) => {
                switch (this.state.team) {
                    case 1:
                        this.setState({
                            name: responseJson.team1.name,
                            points: responseJson.team1.score,
                            actions: responseJson.team1.actions
                        });
                        break;
                    case 2:
                        this.setState({
                            name: responseJson.team2.name,
                            points: responseJson.team2.score,
                            actions: responseJson.team2.actions
                        });
                        break;
                    default:
                }
            });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getTeamInfo(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <Card style={{ width: "18rem", margin: "auto"}}>
                    <Card.Header><h2>{this.state.points}</h2></Card.Header>
                    <ListGroup variant={"flush"}>
                    {this.state.actions.map((item) => (
                        <ListGroup.Item>{item}</ListGroup.Item>
                    ))}
                    </ListGroup>
                </Card>
            </div>
        )
    }

}

export default Team;