import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, ListGroup, ListGroupItem, Button, UncontrolledCollapse, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import SportClasses from './serviceSelections/SportClasses';
import ObedienceClasses from './serviceSelections/ObedienceClasses';
import PrivateLessons from './serviceSelections/PrivateLessons';
import NoService from './NoServices';

//add items to cart
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/slices/cartSlice';
import DatePicker from '../util/DatePicker';


const TrainingClasses = ({ classType, handleContentSwitch }) => {

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log('SelectedDate: ', selectedDate)
  


  //setting up class registration//
  const [registering, setRegistering] = useState(true) 
  {/* Switch to default false after building */}

  const notify = () => toast.success('Class added successfully!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  return (
    <>


        {/* <ToastContainer /> */}
    <Container className='trainingClassesContainer mb-5'>
      <Row className='text-end'>
        <Col>
          <Button style={{backgroundColor: "#5b6af5b5"}} onClick={() => handleContentSwitch(null)}>Back</Button>
          
        </Col>
      </Row>
      {classType === 'agility' ? <SportClasses classType={'agility'} /> : 
      classType === 'barnhunt' ? <SportClasses classType={'barnhunt'} /> : 
      classType === 'obedience' ? <ObedienceClasses /> :
      classType === 'privates' ? <PrivateLessons /> :

      <NoService />
    }

          </Container>
    </>
  );
};

export default TrainingClasses;

