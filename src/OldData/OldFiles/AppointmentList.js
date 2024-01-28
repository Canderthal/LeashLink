import { Container, Col, Row } from "reactstrap";
import Dogs from "../OldData/dogData";

const AppointmentList = ({checkIn}) => {
    return (
    <ul>
      {Dogs.map((dog, index) => (
        <li
            key={index}
            onClick={() => checkIn(index)}
        //   style={{ borderColor: borderColors[index] }}
          className="privateAppointments"
        >
          <Container>
            <Row>
              <Col>
                  <h5>Jan 01</h5>
              </Col>

              <Col xs='12' md='6'>
                {dog.name} - {dog.breed} - Private Lesson
              </Col>

              <Col xs='3'lg='1'>
                <button className="startPrivateBtn">Start</button>
              </Col>
              <Col xs='3' lg='1'>
                <button className="dogInfoBtn">INFO</button>
              </Col>
            </Row>
          </Container>
        </li>
      ))}
    </ul>
    )
};


export default AppointmentList;