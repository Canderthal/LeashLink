import { Container, Col, Row, Button, Input } from "reactstrap";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../firebase"

const ClientDetails = ({ userRole, client, index }) => {
  const [clientData, setClientData] = useState('test');

  useEffect(() => {
    if (userRole === "admin") {
      setClientData('clients');
    } else if (userRole === "test") {
      setClientData("testClients");
    } else {
      console.log("Nothing to display");
    }
  }, [userRole]);



  const [isEditing, setIsEditing] = useState(false);
  const [editedTrainingHistory, setEditedTrainingHistory] = useState(
    client?.dogs?.[index]?.trainingHistory?.map((dog) => ({ ...dog })) || []
  );

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e, dogIndex, field) => {
    const updatedTrainingHistory = [...editedTrainingHistory];
    updatedTrainingHistory[dogIndex][field] = e.target.value;
    setEditedTrainingHistory(updatedTrainingHistory);
  };

  const handleSaveChanges = async () => {
    try {
      console.log("Trying To save data")
      const clientDocRef = doc(db, clientData, client.id);
  
      // Create a copy of the dogs array with the updated trainingHistory
      const updatedDogs = [...client.dogs];
      console.log("saving data")
      updatedDogs[index].trainingHistory = editedTrainingHistory;
  
      // Update the document with the modified 'dogs' array
      await updateDoc(clientDocRef, {
        dogs: updatedDogs,
      });
  
      setIsEditing(false);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  if (!client || index === undefined || !client.dogs || !client.dogs[index]) {
    return <p>No Client Selected</p>;
  }

  return (
    <Container className="Dashboard m-5">
      <Container className="Dashboard mb-5">
        <Row>
          <Col>
            <Row>
              <Col>
                <h5>
                  {client.dogs[index].name} - Owner: {client.name}
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  Breed: {client.dogs[index].breed} - Age: {client.dogs[index].age} Reactivity: {client.dogs[index].reactive} - Client Num:
                  <a href={`tel:${client.phone}`}>{client.phone}</a> - Email: <a href={`mailto:${client.email}`}>{client.email}</a>{" "}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Reactivity Details</h5>
            <p>{client.dogs[index].reactive ? client.dogs[index].reactiveDetails : "No Details"}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>Aggression Details</h5>
            <p>{client.dogs[index].aggression ? client.dogs[index].aggressionDetails : "No Details"}</p>
          </Col>
        </Row>
      </Container>
      <Container className="Dashboard">
        <Row>
          <Col>
            <Row>
                <Col xs="8" md='11'>
                <h5>Training history</h5>
                </Col>
                <Col>
                    <Button
                        onClick={isEditing ? handleSaveChanges : toggleEditing}
                        color={isEditing ? "success" : "warning"}
                        >
                        {isEditing ? "Save Changes" : "Edit"}
                    </Button>              
                </Col>
            </Row>

            {client.dogs[index].trainingHistory.map((dog, dogIndex) => (
              <div key={dogIndex}>
                {isEditing ? (
                  <>
                    <p>
                      Homework:
                    <Input
                        type="text"
                        value={editedTrainingHistory[dogIndex].homework}
                        onChange={(e) => handleEditChange(e, dogIndex, "homework")}
                    />
                    </p>
                    <p>
                      Observations:
                        <Input
                            type="text"
                            value={editedTrainingHistory[dogIndex].observations}
                            onChange={(e) => handleEditChange(e, dogIndex, "observations")}
                        />
                    </p>
                    <p>
                      Private Focus:
                        <Input
                            type="text"
                            value={editedTrainingHistory[dogIndex].privateFocus}
                            onChange={(e) => handleEditChange(e, dogIndex, "privateFocus")}
                        />
                    </p>
                  </>
                ) : (
                  <>
                    <p>Homework: {dog.homework}</p>
                    <p>Observations: {dog.observations}</p>
                    <p>Private Focus: {dog.privateFocus}</p>
                  </>
                )}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ClientDetails;
