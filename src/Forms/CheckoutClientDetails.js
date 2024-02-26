import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase';

const CheckoutClientDetails = ({ onFormSubmit }) => {

    const user = useSelector(state => state.user.user);
    const [dogs, setDogs] = useState([]);

    const [formData, setFormData] = useState({
        name: user ? user.profile.firstName : '',
        email: user ? user.email : '',
        phoneNumber: user ? user.profile.phone : '',
        dogName: '',
        dogAge: '',
        dogBreed: ''
    });


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
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    
        // Find the selected dog from the dogs state
        const selectedDog = dogs.find(dog => dog.name === value);
        if (selectedDog) {
            setFormData(prevState => ({
                ...prevState,
                dogAge: selectedDog.age,
                dogBreed: selectedDog.breed
            }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(formData);
        // Handle form submission
        // Reset form after submission if needed
        setFormData({
            name: '',
            email: '',
            phoneNumber: '',
            dogName: '',
            dogAge: '',
            dogBreed: ''
        });
    };

    useEffect(() => {
        if (user && dogs.length > 0) {
            const firstDog = dogs[0];
            setFormData(prevState => ({
                ...prevState,
                dogName: firstDog.name,
                dogAge: firstDog.age,
                dogBreed: firstDog.breed
            }));
        }
    }, [user, dogs]);

    return (
        <Container>
            <h3>Client Information</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="phoneNumber">Phone Number</Label>
                    <Input type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </FormGroup>

                {user && user.profile.dogs ? 
                    <FormGroup>
                        <Label for="dogName">Dog's Name</Label>
                        <Input type="select" name="dogName" id="dogName" value={formData.dogName} onChange={handleChange}>
                            {dogs.map((dog, index) => (
                                <option key={index} value={dog.name}>{dog.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                :
                <FormGroup>
                    <Label for="dogName">Dog's Name</Label>
                    <Input type="text" name="dogName" id="dogName" value={formData.dogName} onChange={handleChange} />
                </FormGroup>
                    }

                <FormGroup>
                    <Label for="dogAge">Dog's Age</Label>
                    <Input type="text" name="dogAge" id="dogAge" value={formData.dogAge} onChange={handleChange} />

                </FormGroup>
                <FormGroup>
                    <Label for="dogBreed">Dog's Breed</Label>
                    <Input type="text" name="dogBreed" id="dogBreed" value={formData.dogBreed} onChange={handleChange} />
                </FormGroup>
                {user && user.dogs && (
                    <FormGroup>
                        <Label for="selectDog">Select Dog</Label>
                        <Input type="select" id="selectDog" name="selectDog" onChange={handleChange}>
                            <option value="">Select a dog</option>
                            {dogs.map((dog, index) => (
                                <option key={index} value={dog.name}>{dog.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                )}
                <Button color="primary">Check Out</Button>
            </Form>
        </Container>
    );
};

export default CheckoutClientDetails;
