import {Component} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import {serverName} from "../App";

class PointAdder extends Component {

    constructor(props) {
        super(props);

        this.postButton = this.postButton.bind(this);
    }

    postButton (points) {
        fetch("http://" + serverName + ":8080/addaction", {
            method: "POST",
            body: JSON.stringify({
                team: this.props.team,
                points: points
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    render () {
        return (
            <ButtonGroup aria-label={"Button-Group-" + this.props.team}>
                <Button onClick={() => this.postButton(-1)}>-1</Button>
                <Button onClick={() => this.postButton(0)}>0</Button>
                <Button onClick={() => this.postButton(1)}>1</Button>
                <Button onClick={() => this.postButton(3)}>3</Button>
                <Button onClick={() => this.postButton(5)}>5</Button>
            </ButtonGroup>
        )
    }
}

export default PointAdder;