
import './App.css';
import Team from "./modules/Team";
import GameTimer from "./modules/GameTimer";
import {Container, Row, Col} from "react-bootstrap";

function App() {
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

export default App;
