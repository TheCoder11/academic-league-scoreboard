import {Component} from "react";
import {serverName} from "../App";
import Popup from "reactjs-popup";
import {Button, Card, Container, ListGroup, Row} from "react-bootstrap";


class EditAction extends Component {

    constructor(props) {
        super(props);

        this.state = {
            action_list: [],
            team: props.team,
        }

        this.getItemList = this.getItemList.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    getItemList(team) {
        fetch("http://" + serverName + ":8080/status")
            .then((response) => response.json())
            .then((responseJson) => {
                if (team === 1) {
                    this.setState({
                        action_list: responseJson.team1.actions
                    });
                }
                else if (team === 2) {
                    this.setState({
                        action_list: responseJson.team2.actions
                    });
                }
            })
    }

    deleteItem(index) {
        fetch("http://" + serverName + ":8080/editaction", {
            method: "POST",
            body: JSON.stringify({
                team: this.props.team,
                index: index,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        this.getItemList(this.props.team);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getItemList(this.props.team), 1000);
        this.getItemList(this.props.team);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        return (
            <Container>
                <Row>Select an action to delete it</Row>
                <Row><ListGroup>
                    {this.state.action_list.map((key, index) =>
                        <ListGroup.Item onClick={() => this.deleteItem(index)}>{key}</ListGroup.Item>
                    )}
                </ListGroup></Row>
                <Row><Button onClick={this.props.toggleEdit}>Close Editor</Button></Row>
            </Container>
        )
    }
}

export default EditAction;