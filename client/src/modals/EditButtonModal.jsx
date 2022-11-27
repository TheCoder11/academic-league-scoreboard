import Popup from "reactjs-popup";
import {serverName} from "../App";
import {Button, Card, Container, ListGroup, Row} from "react-bootstrap";
import {Component} from "react";

class EditButtonModal extends Component {

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
                    this.state.action_list = responseJson.team1.actions;
                }
                else if (team === 2) {
                    this.state.action_list = responseJson.team2.actions;
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
    }

    render () {
        return (
            <Popup
                trigger={<Button>Edit Scores</Button>}
                modal
                nested
            >
                {close => (
                    <Card>
                        <Card.Header>Click on a score to delete:</Card.Header>
                        <ListGroup>
                            {this.state.action_list.map((key, index) =>
                                <ListGroup.Item onClick={() => this.deleteItem(index)}>{key}</ListGroup.Item>
                            )}
                        </ListGroup>
                        <Button onClick={close} variant={"primary"}>Close Modal</Button>
                    </Card>
                )}
            </Popup>
        )
    }
}

export default EditButtonModal;