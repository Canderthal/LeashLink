import React from 'react';
import { Formik, Field, Form, useFormikContext } from 'formik';
import { addDoc, collection } from 'firebase/firestore';
import db from '../firebase';
import { Container, Row, Col } from 'reactstrap';

const ReactivityDetails = () => {
  const { values } = useFormikContext();

  return values.reactive ? (
    <Field type="textarea" name="reactiveDetails" placeholder="Reactivity Details" />
  ) : null;
};

const AggressionDetails = () => {
  const { values } = useFormikContext();

  return values.aggression ? (
    <Field type="textarea" name="aggressionDetails" placeholder="Aggression Details" />
  ) : null;
};

const NewClient = () => {
  const handleNew = async (values) => {
    const collectionRef = collection(db, 'clients');
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
          // Add other dog properties as needed
        },
      ],
      // Add other client properties as needed
    };

    await addDoc(collectionRef, payload);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h4>Temp Intake info</h4>
        </Col>
      </Row>
      <Row className="mt-5">
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
                  <h4>Owner Information</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="ownerName">Owner Name</label>
                </Col>
                <Col>
                  <Field type="text" name="ownerName" placeholder="Owner Name" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="phone">Phone Num</label>
                </Col>
                <Col>
                  <Field type="text" name="phone" placeholder="Phone Num" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="email">Email</label>
                </Col>
                <Col>
                  <Field type="text" name="email" placeholder="Email" />
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col>
                  <h4>Dog Information</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="dogName">Dog Name</label>
                </Col>
                <Col>
                  <Field type="text" name="dogName" placeholder="Dog Name" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="breed">Breed</label>
                </Col>
                <Col>
                  <Field type="text" name="breed" placeholder="Breed" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="age">Age</label>
                </Col>
                <Col>
                  <Field type="text" name="age" placeholder="Age" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>
                    <Field type="checkbox" name="reactive" />
                    Reactivity
                  </label>
                </Col>
                <Col>
                  <ReactivityDetails />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>
                    <Field type="checkbox" name="aggression" />
                    Aggression
                  </label>
                </Col>
                <Col>
                  <AggressionDetails />
                </Col>
              </Row>
            </Container>
            <button type="submit">Add</button>
          </Form>
        </Formik>
      </Row>
    </Container>
  );
};

export default NewClient;