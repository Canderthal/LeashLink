import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button, UncontrolledCollapse } from 'reactstrap';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Add items to cart
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/cartSlice'; 
import DatePicker from '../../util/DatePicker';

const PrivateLessons = () => {
    const dispatch = useDispatch();
    const [classes, setClasses] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [classType, setClassType] = useState('agility');

    const notify = () => toast.success('Private Lesson added to cart', {
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
                const selectedDateWithoutTime = new Date(selectedDate);
                selectedDateWithoutTime.setHours(0, 0, 0, 0);
                const endOfDay = new Date(selectedDateWithoutTime);
                endOfDay.setHours(23, 59, 59, 999); // Set end of day time

                const classRef = query(
                    collection(db, 'LeashLink', 'Services', 'Private Lesson', classType, 'open'),
                    where('startDate', '>=', selectedDateWithoutTime),
                    where('startDate', '<=', endOfDay)
                );
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
    }, [classType, selectedDate]);

    const handleClassTypeSelect = (level) => {
        setClassType(level);
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
        dispatch(addItemToCart(classData));
        notify();
    };

    const handleDateSelection = (date) => {
        setSelectedDate(date);
    };

    return (
        <Container className='trainingClassesContainer'>
            <ToastContainer />
            <DatePicker setSelectedDate={setSelectedDate} />
            <Row className='text-center'>
                <h2>Private Lessons available on {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
            </Row>

            <Row className='text-center mt-3'>
                <Col>
                    <Button onClick={() => handleClassTypeSelect("agility")} color={classType === "agility" ? 'primary' : 'secondary'}>Agility</Button>
                </Col>
                <Col>
                    <Button onClick={() => handleClassTypeSelect("obedience")} color={classType === "obedience" ? 'primary' : 'secondary'}>Obedience</Button>
                </Col>
                <Col>
                    <Button onClick={() => handleClassTypeSelect("barnhunt")} color={classType === "barnhunt" ? 'primary' : 'secondary'}>Barn Hunt</Button>
                </Col>
                <Col>
                    <Button onClick={() => handleClassTypeSelect("behavioural")} color={classType === "behavioural" ? 'primary' : 'secondary'}>Behavioural</Button>
                </Col>
            </Row>

            {classes.length === 0 ? (
                <Row className='text-center m-5'>
                    <h4>No appointments available for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h4>
                </Row>
            ) : (
                <ul>
                    {classes.map((classData) => (
                        <li key={classData.id} className='classDisplay'>
                            <Row>
                                <Col sm='10'><h5>{classData.className}</h5></Col>
                                <Col className='text-center'><h3>$<b>{classData.cost}</b></h3></Col>
                            </Row>
                            <p className='classInfo'>{formatDate(classData.startDate.toDate())} @<b>{addAMPM(classData.startTime)}</b></p>
                            <p className='classInfo'>Duration: {classData.duration} weeks</p>
                            {classData.notes ? (
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
                                            <button className='registerButton' onClick={() => handleAddToCart(classData)}>Add to Cart</button>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <Row>
                                    <Col sm='10'>
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
                                        <button className='registerButton' onClick={() => handleAddToCart(classData)}>Add to Cart</button>
                                    </Col>
                                </Row>
                            )}
                            <div>
                                <UncontrolledCollapse toggler={'toggler' + classData.id}>
                                    <Card>
                                        <CardBody>
                                            <p>Instructor: {classData.trainer}</p>
                                            {classData.description}
                                        </CardBody>
                                    </Card>
                                </UncontrolledCollapse>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
}

export default PrivateLessons;
