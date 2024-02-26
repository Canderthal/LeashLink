import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, ListGroup, ListGroupItem, Button, UncontrolledCollapse, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//add items to cart
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/cartSlice'; 



const ObedienceClasses = () => {

    const dispatch = useDispatch();
    const [classes, setClasses] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState('beginner'); 


    const notify = () => toast.success('Class added to cart', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    useEffect(() => {
        const fetchClasses = async () => {
          try {
            let classRef;
              classRef = collection(db, 'LeashLink', 'Services', 'Classes', "obedience", selectedLevel);
              const snapshot = await getDocs(classRef);
              const classesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setClasses(classesData);
          } catch (error) {
            console.error('Error fetching classes:', error);
          }
        };
        fetchClasses();
      }, [selectedLevel]);




    
    const handleLevelSelect = (level) => {
        setSelectedLevel(level);
    };

    const formatDate = (date) => {
        const options = { month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const day = date.getDate();
        const suffix = ["th", "st", "nd", "rd"][day % 10 > 3 ? 0 : (day - (day % 10) !== 10) * day % 10];
        return formattedDate.replace(/\d+/, (day) => `${day}${suffix}`);
      };

    const addAMPM = (time) => {
        const hour = parseInt(time.split(':')[0]);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        return `${time} ${ampm}`;
    };

    const handleAddToCart = (classData) => {
        dispatch(addItemToCart(classData)); // Dispatch addItemToCart action with classData
        notify()

        
      };

    return (
        <Container className='trainingClassesContainer'>
            <ToastContainer />
            <Row className='text-center'>
                <h2>Obedience Classes</h2>
            </Row>

            <Row className='text-center mt-3'>
                <Col>
                  <Button onClick={() => handleLevelSelect("beginner")} color={selectedLevel === "beginner" ? 'primary' : 'secondary'}>Puppy</Button>
                </Col>
                <Col>
                  <Button onClick={() => handleLevelSelect("intermediate")} color={selectedLevel === "intermediate" ? 'primary' : 'secondary'}>Beginner</Button>
                </Col>
                <Col>
                  <Button onClick={() => handleLevelSelect("advanced")} color={selectedLevel === "advanced" ? 'primary' : 'secondary'}>Intermediate</Button>
                </Col>
              </Row>
              <ul>
              {classes.map((classData) => (
                <li key={classData.id} className='classDisplay'>
                  <Row>
                    <Col sm='10'><h5>{classData.className}</h5></Col>
                    <Col><h3>$<b>{classData.cost}</b></h3></Col>
                  </Row>
                        <p className='classInfo'>{formatDate(classData.startDate.toDate())} @<b>{addAMPM(classData.startTime)}</b></p>
                        <p className='classInfo'>Duration: {classData.duration} weeks</p>

                      {classData.notes ?
                      <>
                      <Row>
                        <Col sm='9' className='specialNotes mb-3'>
                          {classData.notes}
                        </Col>
                        </Row>
                        <Row>
                          <Col sm='8'>
                              <Button
                                color="primary"
                                id={'toggler' + classData.id}
                                style={{
                                  marginBottom: '1rem'
                                }}
                              >
                                Class Description
                              </Button>
                          </Col>
                        <Col>
                            {`${classData.enrollmentSlots}/6 Spots Remaining`}
                            <button className='registerButton' onClick={() => handleAddToCart(classData)}>Add to Cart</button>

                          </Col>
                        </Row>

                      </> 
                      :
                      <Row>
                        <Col sm='8'>
                          <Button
                            color="primary"
                            id={'toggler' + classData.id}
                            style={{
                              marginBottom: '1rem'
                            }}
                          >
                            Class Description
                        </Button>
                        </Col>
                        <Col>
                        <div>
                            <Col>
                              {`${classData.enrollmentSlots}/6 Spots Remaining`}
                              <button className='registerButton' onClick={() => handleAddToCart(classData)}>Add to Cart</button>
                            </Col>
                          </div>
                        </Col>
                      </Row>
                        }
                  <div>
                    {/* <button id={'toggler' + classData.id}>test</button> */}
                    <UncontrolledCollapse toggler={'toggler' + classData.id}>
                      <Card>
                        <CardBody>
                            <p>Instuctor: {classData.trainer}</p>

                          
                          {classData.description}
                        </CardBody>
                      </Card>
                    </UncontrolledCollapse>
                  </div>
                </li>
              ))}
            </ul>
        </Container>

    )
}

export default ObedienceClasses