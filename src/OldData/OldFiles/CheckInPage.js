import Dogs from "../OldData/dogData";
import DogTrainingClasses from "../OldData/classData"//
import AppointmentList from "./AppointmentList";
//import ClassList from "./components/ClassList";

import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, ListGroup, ListGroupItem,  Collapse, } from "reactstrap";

/////////////////////////////////////
// Open modal on small screens or card on larger screens

const CheckInPage = () => {
  const [borderColors, setBorderColors] = useState(Array(Dogs.length).fill('lightblue'));
  const [selectedDog, setSelectedDog] = useState(null);

  const ClassList = []; // Removed this when I reworked the app. Might revisit later


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

  const [activeContent, setActiveContent] = useState('appointments');
  const handleScheduleSwitch = (content) => {
    setActiveContent(content)
  }


  return (

    <Container className="mt-5">
      <Row>
      {selectedDog && (
            <Col md='3' className="m-3 mx-auto">
              <Card className="mx-auto" style={{ textAlign: "left", border: "1px solid #ddd", borderRadius: "15px" }}>
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
            <Col id="appointments" className="appointmentTitle" md="3" onClick={() => { handleScheduleSwitch('appointments')}} style={{ cursor: 'pointer'}}><p>Appointments</p></Col>
            <Col id="classes" className="appointmentTitle" md="3" onClick={() => handleScheduleSwitch('classes')} style={{ cursor: 'pointer' }}><p>Classes</p></Col>


          </Row>
          <hr></hr>
          
{activeContent==='appointments' ? <AppointmentList checkIn={checkIn} />: <ClassList /> }

        </Col>
      </Row>
    </Container>
  );
};

export default CheckInPage;