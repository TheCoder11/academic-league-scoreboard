import {Component} from "react";
import {serverName} from "../App";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";

class EditTime extends Component {

    constructor(props) {
        super(props);

        this.state = {
            minutes: "",
            seconds: "",
        }

        this.changeTime = this.changeTime.bind(this);
    }

    changeTime(negative) {
        let seconds = ((parseInt(this.state.minutes) * 60) + parseInt(this.state.seconds));
        if (negative) seconds = seconds * -1;

        fetch("http://" + serverName + ":8080/edittime", {
            method: "POST",
            body: JSON.stringify({
                seconds: seconds,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(() => {
                this.props.toggleEdit();
            });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={"auto"}>Minutes</Col>
                    <Col md={"auto"}><input type={"text"} value={this.state.minutes} onChange={event => {this.setState({minutes: event.target.value})}} /></Col>
                </Row>
                <Row>
                    <Col>Seconds</Col>
                    <Col><input type={"text"} value={this.state.seconds} onChange={event => {this.setState({seconds: event.target.value})}} /></Col>
                </Row>
                <Row><ButtonGroup>
                    <Button onClick={() => this.changeTime(false)}>Add Time</Button>
                    <Button onClick={() => this.changeTime(true)}>Remove Time</Button>
                </ButtonGroup></Row>
            </Container>
        );
    }

}

export default EditTime;