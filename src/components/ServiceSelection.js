import AgilityButton from "./cards/AgilityButton";
import BarnHuntButton from "./cards/BarnHuntButton";
import ObedienceButton from "./cards/ObedienceButton";
import DayTrainingButton from "./cards/DayTrainingButton";
import OtherButton from "./cards/OtherButton";
import PrivateButton from "./cards/PrivateButton";

import { Row, Col, Container } from "reactstrap";

const ServiceSelection = ({ handleContentSwitch }) => {
    return (
    <Container className="mt-5 mb-5 text-center">
    <Row>
        <Col><AgilityButton onClick={() => handleContentSwitch("agility")} /></Col>
        <Col><BarnHuntButton onClick={() => handleContentSwitch("barnhunt")} /></Col>
        <Col><ObedienceButton onClick={() => handleContentSwitch("obedience")} /></Col>
    </Row>
    <Row className="mt-5">
        <Col><DayTrainingButton onClick={() => handleContentSwitch("dayTraining")}/></Col>
        <Col><OtherButton onClick={() => handleContentSwitch("other")}/></Col>
        <Col><PrivateButton onClick={() => handleContentSwitch("privates")}/></Col>

    </Row>
    </Container>
    )

}

export default ServiceSelection