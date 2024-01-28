import { Container, Col, Row, Label, Button} from "reactstrap";
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import db from '../firebase'; // Import your Firebase configuration
import { Formik, Field, Form, useFormikContext } from 'formik';




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
  

const PrivateTrainingForm = (userRole) => {

  const [clientData, setClientData] = useState('test');

  if (userRole === "admin") {
    setClientData('clients');
  } else if (userRole === "test") {
    setClientData("testClients");
  } else {
      console.log("Nothing to display")
  }

    
    // const [reactive, setReactive] = useState(false);
    // const [aggression, setAggression] = useState(false); 
    const [success, setSuccess] = useState(null)

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
    

        await addDoc(collectionRef, payload);
    
        // If the above line is reached, it means the document was added successfully
        setSuccess(true);
      } catch (error) {
        // Handle errors by setting success to false
        console.error("Error adding document:", error);
        setSuccess(false);
      }
    };


    return (
        <Container className="mt-5">
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
                <Col className="m-1 formGroup">
                  <label htmlFor="ownerName" className="formTitles">Owner Name</label>
                    <Field type="text" name="ownerName" placeholder="Owner Name" />
                </Col>
             
                <Col className="m-1 formGroup">
                  <label htmlFor="phone" className="formTitles">Phone Num</label>
                    <Field type="text" name="phone" placeholder="Phone Num" />

                </Col>

                <Col className="m-1 formGroup">
                  <label htmlFor="email" className="formTitles">Email</label>
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
                <Col xs='2'>
                  <label htmlFor="dogName" className="formTitles">Dog Name</label>
                  <Field type="text" name="dogName" placeholder="Dog Name" />
                </Col>
                <Col xs='2'>
                  <label htmlFor="breed" className="formTitles">Breed</label>
                  <Field type="text" name="breed" placeholder="Breed" />
                </Col>
                <Col xs='2'>
                  <label htmlFor="age" className="formTitles">Age</label>
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
    </Container>
    )
}

export default PrivateTrainingForm;