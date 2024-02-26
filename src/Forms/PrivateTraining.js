import { Container, Col, Row, Label, Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import db from '../firebase';
import { Formik, Field, Form, useFormikContext } from 'formik';
import { useNavigate } from "react-router-dom";





const ReactivityDetails = () => {

    const { values } = useFormikContext();
  
    return values.reactive ? (
      <Field className="intakeForm" as="textarea" name="reactiveDetails" placeholder="Reactivity Details" />
    ) : null;
  };
  
  const AggressionDetails = () => {
    const { values } = useFormikContext();
  
    return values.aggression ? (
      <Field className="intakeForm" as="textarea" name="aggressionDetails" placeholder="Aggression Details" />
    ) : null;
  };
  

const PrivateTrainingForm = ({ userRole, handleContentSwitch }) => {
  const [clientData, setClientData] = useState('test');
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(null);

  const [dogName, setDogName] = useState('');
  const [ownerName, setOwnerName] = useState('');


  useEffect(() => {
    if (userRole === "admin") {
      setClientData('clients');
    } else if (userRole === "test") {
      setClientData("testClients");
    } else {
      console.log("Nothing to display");
    }
  }, [userRole]);
    

    // const [reactive, setReactive] = useState(false);
    // const [aggression, setAggression] = useState(false); 
    const handleModalClose = () => {
      setShowModal(false)
      handleContentSwitch("clientMap");
  }

    const handleNew = async (values) => {
      try {
        const collectionRef = collection(db, clientData);
        const payload = {
          name: values.ownerName,
          phone: values.phone,
          email: values.email,
          dogs: [
            {
              name: values.dogName,
              breed: values.breed,
              age: values.age,
              reactive: values.reactive,
              aggression: values.aggression,
              reactiveDetails: values.reactiveDetails || '',
              aggressionDetails: values.aggressionDetails || '',
              trainingHistory: [
                {
                  privateFocus: values.privateFocus || '',
                  observations: values.observations || '',
                  homework: values.homework || '',
                },
              ],
            },
          ],
        };
        setOwnerName(values.ownerName);
        setDogName(values.dogName);

        await addDoc(collectionRef, payload);
    
        // If the above line is reached, it means the document was added successfully
        setShowModal(true);
        setSuccess(true);
      } catch (error) {
        // Handle errors by setting success to false
        console.error("Error adding document:", error);
        setSuccess(false);
      }
    };


    return (
        <Container className="m-5 Dashboard">
        <Formik
          initialValues={{
            ownerName: '',
            phone: '',
            email: '',
            dogName: '',
            breed: '',
            age: '',
            reactive: false,
            aggression: false,
          }}
          validate={(values) => {
            const errors = {};

            // Add validation logic here
            if (!values.ownerName) {
              errors.ownerName = 'Owner Name is required';
            }
            if (!values.phone) {
              errors.phone = 'Phone Num is required';
            }
            if (!values.email) {
              errors.email = 'Email is required';
            }
            if (!values.dogName) {
              errors.dogName = 'Dog Name is required';
            }

            return errors;
          }}
          onSubmit={(values) => handleNew(values)}
        >
          <Form>
            <Container>
              <Row>
                <Col>
                  {success === true && <h5>Client Added</h5>}
                  {success === false && <h5>ERROR</h5>}

                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>Owner Information</h4>
                </Col>
              </Row>

              <Row>                
                <Col className=" formGroup">
                  <Label htmlFor="ownerName" className="formTitles">Owner Name</Label>
                    <Field type="text" name="ownerName"  id="ownerName" placeholder="Owner Name"/>
                </Col>
             
                <Col className=" formGroup">
                  <Label htmlFor="phone" className="formTitles">Phone Num</Label>
                    <Field type="text" name="phone" placeholder="Phone Num" />

                </Col>

                <Col className=" formGroup">
                  <Label htmlFor="email" className="formTitles">Email</Label>
                    <Field type="text" name="email" placeholder="Email" />
                  
                </Col>
              </Row>
            </Container>

            <Container className="mt-5">
              <Row>
                <Col>
                  <h4>Dog Information</h4>
                </Col>
              </Row>

              <Row>
                <Col md='2' className="formGroup">
                  <Label htmlFor="dogName" className="formTitles">Dog name</Label>
                  <Field type="text" name="dogName" id='dogName' placeholder="Dog Name"
            />
                </Col>

                <Col md='2' className="formGroup">
                  <Label htmlFor="breed" className="formTitles">Breed</Label>
                  <Field type="text" name="breed" placeholder="Breed" />
                </Col>

                <Col md='2'className="formGroup">
                  <Label htmlFor="age" className="formTitles">Age</Label>
                  <Field type="text" name="age" placeholder="Age" />
                </Col>

              </Row>
              <Row className="mt-4">
                <Col>
                  <label className="formTitles">
                    <Field type="checkbox" name="reactive" />
                    Reactivity
                  </label>

                  <ReactivityDetails />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <label className="formTitles">
                    <Field type="checkbox" name="aggression" />
                    Aggression
                  </label>
                  <AggressionDetails />
                </Col>
              </Row>
            </Container>
      <Container className="mt-4 mb-3">
        <Row>
            <Col>
        <Label for='privateFocus' className="formTitles">Private Focus</Label>
        <Field name='privateFocus' as="textarea" className="intakeForm"></Field>          
            </Col>
        </Row>
        <Row>
            <Col>
                <Label for='observations'  className="formTitles">Observations</Label>
                <Field name='observations' as="textarea" className="intakeForm"></Field>
            </Col>
        </Row>
        <Row>
            <Col>
                <Label for='homework'  className="formTitles">Homework</Label>
                <Field name='homework' as="textarea" className="intakeForm"></Field>
            </Col>
        </Row>
      </Container>
      <Row>
        <Col className="d-flex justify-content-center">
            <Button type="submit" color='primary'>Submit</Button>
        </Col>
      </Row>
          </Form>
        </Formik>


        <Modal isOpen={showModal}>
          <ModalHeader toggle={handleModalClose}><p>Client Added</p></ModalHeader>
          <ModalBody>

            <h3>{ownerName} with {dogName} were successfully added</h3>
          </ModalBody>
        </Modal>
    </Container>
    )
}

export default PrivateTrainingForm;