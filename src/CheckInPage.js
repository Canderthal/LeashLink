import Dogs from "./data/dogData";
import DogTrainingClasses from "./data/classData"//

import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Button, CardTitle, ListGroup, ListGroupItem} from "reactstrap";


const CheckInPage = () => {
  const [borderColors, setBorderColors] = useState(Array(Dogs.length).fill('lightblue'));
  const [selectedDog, setSelectedDog] = useState(null);



  const checkIn = (index) => {
    setBorderColors((prevColors) => {
      const currentColor = prevColors[index];
      // Toggle between light blue and another color
      const newColor = currentColor === 'lightblue' ? 'lightblue' : 'lightblue';
      const newColors = [...prevColors];
      newColors[index] = newColor;
      return newColors;
    });

    setSelectedDog(Dogs[index]);
  };


  const handleExit = (event) => {
    event.stopPropagation();
    setSelectedDog(null);
  }






  const appointments = (
    <ul>
      
      {Dogs.map((dog, index) => (
        <li
          key={index}
          onClick={() => checkIn(index)}
          style={{ borderColor: borderColors[index] }}
          className="privateAppointments"
        >
          <Container>
            <Row>
              <Col xs='1'>
                  date
              </Col>
              <Col xs='8'>
                {dog.name} - {dog.breed} - TYPE OF PRIVATE
              </Col>
              <Col>
                <Button className="startPrivateBtn">Start</Button>
              </Col>
              <Col>
                <Button className="dogInfoBtn">INFO</Button>
              </Col>
            </Row>
          </Container>
          {/* <Container>
            <Row>
              <Col sm="11" className="text-start">
                {dog.name}
              </Col>
            </Row>
            <Row>
              <Col>{dog.breed}, {dog.age} years old, {dog.gender}, Reactive: {dog.reactive ? 'Yes' : 'No'}</Col>
            </Row>
          </Container> */}
        </li>
      ))}
    </ul>
  );

  const classes = (
    <ul>
     
        <li>
          test content
        </li>
        <li>
          test content
        </li>
        <li>
          test content
        </li>
        <li>
          test content
        </li>
        <li>
          test content
        </li>


    </ul>
  );

  const [activeContent, setActiveContent] = useState('appointments');
  const handleScheduleSwitch = (content) => {
    setActiveContent(content)
  }


  return (
    <>
    <Container className="mt-5">
      <Row>
      {selectedDog && (
            <Col md='3' className="m-3">
              <Card style={{ textAlign: "left", border: "1px solid #ddd", borderRadius: "15px" }}>
                <CardBody className="text-left">
                  <CardTitle tag='h5'>
                    <Row>
                      <Col xs='9'>
                        {selectedDog.name}
                      </Col>
                      <Col>
                      <button onClick={(event) => handleExit(event)}>❌</button>
                      </Col>
                    </Row>
                  </CardTitle>
                  <ListGroup flush>
                    <ListGroupItem>
                      <p>Breed: {selectedDog.breed}</p>
                    </ListGroupItem>
                    <ListGroupItem>
                      <p>Age: {selectedDog.age}</p>
                    </ListGroupItem>
                    <ListGroupItem>
                      <p>Reactive: {selectedDog.reactive ? "Yes" : "No"}</p>
                    </ListGroupItem>
                    <ListGroupItem>
                    <p>Client #: <a href={`tel:${selectedDog.phoneNumber}`}>{selectedDog.phoneNumber}</a></p>
                    </ListGroupItem>
                    <ListGroupItem>
                      <p t>Email: <a href={`mailto:${selectedDog.email}`}>{selectedDog.email}</a></p>
                    </ListGroupItem>
                    <ListGroupItem>
                      <p>Private Focus:</p>
                      <p>{selectedDog.behaviorIssues}</p>
                    </ListGroupItem>
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
          )}

        <Col className="m-3 displayBox" style={{ border: "1px solid #ddd", borderRadius: "15px" }}>
          <Row className="m-3">
          <Col id="appointments" className="appointmentTitle" md="2" onClick={() => { handleScheduleSwitch('appointments')}} style={{ cursor: 'pointer'}}><p>Appointments</p></Col>
          <Col id="classes" className="appointmentTitle" md="2" onClick={() => handleScheduleSwitch('classes')} style={{ cursor: 'pointer' }}><p>Classes</p></Col>


          </Row>
          <hr></hr>
          
{activeContent==='appointments' ? appointments: classes}

        </Col>
      </Row>
    </Container>

    </>
  );
};

export default CheckInPage;