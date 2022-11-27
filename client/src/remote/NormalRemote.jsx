import {Col, Container, Row} from "react-bootstrap";
import TimeStopper from "./TimeStopper";
import PointAdder from "./PointAdder";


function NormalRemote () {
    return (
        <Container>
            <Row>
                <Col><TimeStopper /></Col>
            </Row>
            <Row>
                <Col>{this.state.team1name}</Col>
                <Col><PointAdder team={1}/></Col>
            </Row>
            <Row>
                <Col>{this.state.team2name}</Col>
                <Col><PointAdder team={2}/></Col>
            </Row>
        </Container>
    )
}