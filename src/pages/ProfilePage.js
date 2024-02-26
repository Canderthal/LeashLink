import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import LoginMenu from './LoginPage';
import PrivateLessons from '../components/serviceSelections/PrivateLessons';
import UserDogs from '../components/UserDogs';
import { logoutUser } from '../redux/userActions';
import { useDispatch } from 'react-redux';

const ProfilePage = () => {
    const user = useSelector((state) => state.user.user);
    const [content, setContent] = useState("dogs")
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <div className="profile-page">
            {user && user.profile ? (
                <Row className='profile-page'>
                    {/* Left column used like a nav. */}
                    <Col md='2' className='profile-container fixed-left'>
                        <Container className='text-center mt-5'>
                            <Row className='mt-5'>
                                <h3 style={{ color: 'white' }}>{user.profile.firstName}</h3>
                            </Row>
                            <hr></hr>
                            <Row className='mt-2'>
                                <Button className='profileButtons' onClick={() => setContent("dogs")}>Dogs</Button>
                            </Row>
                            <Row className='mt-2'>
                                <Button className='profileButtons' onClick={() => setContent("trainingHistory")}>Training History</Button>
                            </Row>
                            <Row>
                                <Button className='profileButtons' onClick={() => setContent("logout")}>Logout</Button>
                            </Row>
                        </Container>
                    </Col>

                    {/* Right column */}
                    <Col md='8'>
                        <Container>
                            {content === 'dogs' ? <UserDogs /> : ""}
                        </Container>
                    </Col>
                </Row>
            ) : (
                <LoginMenu />
            )}
        </div>
    );
};

export default ProfilePage;