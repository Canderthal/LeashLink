import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Card, CardTitle, CardBody, CardSubtitle} from 'reactstrap';
import { collection, getDoc, doc, getDocs, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const UserDogs = () => {
    const user = useSelector(state => state.user.user);
    const [dogs, setDogs] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedDog, setSelectedDog] = useState(null);
    const [editedDogName, setEditedDogName] = useState('');
    const [editedDogBreed, setEditedDogBreed] = useState('');
    const [editedDogAge, setEditedDogAge] = useState('');
    const [newDogName, setNewDogName] = useState('');
    const [newDogBreed, setNewDogBreed] = useState(''); 
    const [newDogAge, setNewDogAge] = useState("")

    useEffect(() => {
        const fetchUserDogs = async () => {
            try {
                if (user) {
                    const dogsCollectionRef = collection(db, 'users', user.email, 'dogs');
                    const querySnapshot = await getDocs(dogsCollectionRef);
                    const dogsData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setDogs(dogsData);
                }
            } catch (error) {
                console.error('Error fetching user dogs:', error);
            }
        };
    
        // Call the fetchUserDogs function here
        fetchUserDogs();
    }, [user, addModalOpen, editModalOpen]);

    const toggleEditModal = (dog) => {
        setSelectedDog(dog);
        setEditedDogName(dog.name);
        setEditedDogBreed(dog.breed);
        setEditedDogAge(dog.age)
        setEditModalOpen(prevState => !prevState); // Toggle editModalOpen based on previous state
    };

    const toggleAddModal = () => {
        setAddModalOpen(prevState => !prevState); // Toggle addModalOpen based on previous state
    };

    const handleEditDog = async () => {
        try {
            
            const dogRef = doc(db, 'users', user.email, 'dogs', selectedDog.id);
    

            const dogDoc = await getDoc(dogRef);
            if (dogDoc.exists()) {

                await updateDoc(dogRef, {
                    breed: editedDogBreed,
                    name: editedDogName,
                    age: editedDogAge,
                    // Include other fields you want to update
                });
    
                console.log('Dog document updated successfully.');
    
                setEditModalOpen(false);
            } else {
                console.log('Dog document does not exist');
            }
        } catch (error) {
            console.error('Error updating dog details:', error);
        }
    };


    const handleAddDog = async () => {
        try {
            // Construct the path to add a new dog document in Firestore
            const dogsCollectionRef = collection(db, 'users', user.email, 'dogs');
            
            // Add the new dog document with the provided data
            await addDoc(dogsCollectionRef, {
                name: newDogName,
                breed: newDogBreed,
                age: newDogAge
                // Include other fields you want to add
            });
    
            // Close the add modal
            setAddModalOpen(false);
    
            // Refetch the user's dogs after adding a new dog
            
        } catch (error) {
            console.error('Error adding new dog:', error);
        }
    };


    return (
        <Container className='trainingClassesContainer m-5'>
            <Row className='text-center'>
                <h2 className='userDogTitle'>User Dogs</h2>
            </Row>
            <Row className='text-center'>
                <Col>
                    <Button color="primary" onClick={toggleAddModal}>Add Dog</Button>
                </Col>

            </Row>
            <Row className='mt-5 justify-content-center'>
                {dogs.map(dog => (
                    <Col key={dog.id} md={3} className='m-2'>
                        <Container className='usersDogContainer'>
                            <Row className='text-center'>
                                <h3>{dog.name}</h3>
                            </Row>
                            <Row  className='text-center'>
                                <h5>{dog.breed}</h5>
                            </Row>
                            <Row className='text-center'>
                                <Col>
                                    <button onClick={() => toggleEditModal(dog)}>Edit Details</button>
                                </Col>

                            </Row>
                        </Container> 
                    </Col>
                ))}
            </Row>

            {/* Edit Dog Modal */}
            <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
                <ModalHeader toggle={toggleEditModal}>Edit Dog Details</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="editedDogName">Name</Label>
                            <Input type="text" id="editedDogName" value={editedDogName} onChange={(e) => setEditedDogName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="editedDogBreed">Breed</Label>
                            <Input type="text" id="editedDogBreed" value={editedDogBreed} onChange={(e) => setEditedDogBreed(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="editedDogAge">Age</Label>
                            <Input type="text" id="editedDogAge" value={editedDogAge} onChange={(e) => setEditedDogAge(e.target.value)} />
                        </FormGroup>
                        <Button color="primary" onClick={handleEditDog}>Save Changes</Button>
                    </Form>
                </ModalBody>
            </Modal>

            {/* Add Dog Modal */}
            <Modal isOpen={addModalOpen} toggle={toggleAddModal}>
                <ModalHeader toggle={toggleAddModal}>Add New Dog</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="newDogName">Name</Label>
                            <Input type="text" id="newDogName" value={newDogName} onChange={(e) => setNewDogName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="newDogBreed">Breed</Label>
                            <Input type="text" id="newDogBreed" value={newDogBreed} onChange={(e) => setNewDogBreed(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="newDogAge">Age</Label>
                            <Input type="text" id="newDogAge" value={newDogAge} onChange={(e) => setNewDogAge(e.target.value)} />
                        </FormGroup>
                        <Button color="primary" onClick={handleAddDog}>Add Dog</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </Container>
    );
};

export default UserDogs;
