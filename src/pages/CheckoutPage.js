import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { removeItemFromCart } from '../redux/slices/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutClientDetails from '../Forms/CheckoutClientDetails';
import Payment from '../components/Paymemt';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { removeAllItemsFromCart } from '../redux/slices/cartSlice';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.items);
    const [total, setTotal] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState("")
    const [selectedClasses, setSelectedClasses] = useState([]);
    const dispatch = useDispatch();

    const [registeredDog, setRegisteredDog] = useState('')
    const [registeredBreed, setRegisteredBreed] = useState('')
    const [userID, setUserID] = useState("")
    const [username, setUserName] = useState("")
    const [paymentComplete, setPaymentComplete] = useState(false)


    const notify = () => toast.warn('Item Removed from Cart', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    const regError = (error) => toast.error(error, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    useEffect(() => {
        // Calculate total cost whenever cart items change
        let newTotal = 0;
        cartItems.forEach(item => {
            const cost = parseFloat(item.cost);
            newTotal += cost;
        });
        setTotal(newTotal);
    }, [cartItems]);

    const taxAmount = total * 0.05;
    const totalWithTax = total + taxAmount;

    const handleRemoveItem = (itemId) => {
        dispatch(removeItemFromCart(itemId));
        notify();
    };

    const handleFormSubmit = (formDatas) => {
        // Handle form submission here if needed
        setFormData(formDatas);
        setFormSubmitted(true);
        setRegisteredBreed(formDatas.dogBreed);
        setRegisteredDog(formDatas.dogName);
        setUserID(formDatas.email);
        setUserName(formDatas.name); // Set the user's name
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


    const handleClassSelection = (classData) => {
        // Add the selected class to the state
        setSelectedClasses(prevSelectedClasses => [...prevSelectedClasses, classData]);
    };
    const handleCompleteRegistration = async () => {
        console.log("Handling Registration");
        const classesToRegister = cartItems.map(item => ({
            classId: item.id,
            userId: userID,
            breed: registeredBreed,
            dog: registeredDog,
            name: username // Pass the username
        }));
        
        // Register for each class
        try {
            // Register for each class
            for (const cls of classesToRegister) {
                await registerForClass(cls.classId, cls.userId, cls.breed, cls.dog, cls.name); // Await registerForClass
            }
            await updateUserProfile(userID, classesToRegister);
            // If all registrations are successful, set paymentComplete to true
            console.log("Registration complete for all classes."); 
            dispatch(removeAllItemsFromCart());
            setPaymentComplete(true); // Update paymentComplete state to true after completing all registrations
        } catch (error) {
            console.error("Error completing registration:", error.message);
            setPaymentComplete(false); // Set paymentComplete to false if there's an error
            // Handle error: Display a notification to the user or take appropriate action
        }
    };

    const registerForClass = async (classId, userId, registeredBreed, registeredDog, name) => {
        try {
            console.log("Starting to fill out classes");
    
            // Reference to the class document
            const classRef = doc(db, 'classes', classId);
    
            // Check if the class document exists
            const classSnap = await getDoc(classRef);
            if (!classSnap.exists()) {
                // Create the class document if it doesn't exist
                await setDoc(classRef, {
                    registrations: [{ userId, breed: registeredBreed, dog: registeredDog, name }]
                });
                console.log('Created new class document and registered user successfully.');
                return;
            }
    
            // Get the current registrations for the class
            const classData = classSnap.data();
            const registrations = classData.registrations || [];
    
            // Check if the user is already registered
            if (registrations.some(registration => registration.userId === userId)) {
                // User is already registered, handle accordingly (e.g., display a message or update the cart)
                console.log('User is already registered for this class.');
                regError("USER IS ALREADY REGISTERED")
                throw new Error("USER IS ALREADY REGISTERED")
                
                
            }
    
            // Add the new registration to the registrations array
            registrations.push({ userId, breed: registeredBreed, dog: registeredDog, name });
    
            // Update the class document with the new registrations array
            await setDoc(classRef, { registrations }, { merge: true });
            
            console.log('User registered successfully for the class.');
        } catch (error) {
            console.error('Error registering user for the class:', error.message);
            throw error;
        }
    };




    const updateUserProfile = async (userID, classesToRegister) => {
        // Update user's profile training history
        // You can implement the logic to update the user's training history here
        console.log(`Updating user's profile training history for user ${userID}`);
    
        // Update amount of slots left for the classes
        for (const cls of classesToRegister) {
            try {
                const classRef = doc(db, 'classes', cls.classId);
                const classSnap = await getDoc(classRef);
                if (classSnap.exists()) {
                    const classData = classSnap.data();
                    if (classData.slots > 0) {
                        // Decrease the amount of slots left
                        const updatedSlots = classData.slots - 1;
                        await setDoc(classRef, { slots: updatedSlots }, { merge: true });
                        console.log(`Updated slots left for class ${cls.classId}: ${updatedSlots}`);
                    } else {
                        console.log(`No slots left for class ${cls.classId}`);
                    }
                } else {
                    console.log(`Class document ${cls.classId} does not exist`);
                }
            } catch (error) {
                console.error(`Error updating class slots for class ${cls.classId}:`, error.message);
                // Handle error: Display a notification to the user or take appropriate action
            }
        }
    };

    return (
        <Container className='mb-5'>
        <ToastContainer />
        {!paymentComplete ? 
        <Row className='text-center mt-4'><h3>Checkout</h3></Row>
        :
        ""}
        {!formSubmitted && (
            <CheckoutClientDetails onFormSubmit={handleFormSubmit} />
        )}
        {!paymentComplete ?
            <Row className='mt-2 mb-5'>
                <Col className='checkoutItemsContainer '>
                    <h5 className='checkoutSummaryHeader'>Checkout Summary</h5>
                    <p className='checkoutSummary'>Cart Items: {cartItems.length}</p>
                    <p className='checkoutSummary'>Subtotal: {total.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}</p>
                    <p className='checkoutSummary'>Total + 5% GST: <span className='totalCost'>{totalWithTax.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}</span></p>

                    {cartItems.map(item => (
                        <Container key={item.id} className='cartListItem mt-4'>
                            <Row className="align-items-center">
                                <Col sm='10'>
                                    <p><span className='checkoutTrainer'>{item.className}</span> by {item.trainer}</p>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <button className='removeFromCartButton' onClick={() => handleRemoveItem(item.id)}>
                                        <FontAwesomeIcon className='trashCan' icon={faTrashCan} />
                                    </button>
                                </Col>
                            </Row>
                            <Row>
                                <p>{formatDate(item.startDate.toDate())}, @{addAMPM(item.startTime)}</p>
                                <p>Cost: ${item.cost}</p>
                            </Row>
                        </Container>
                    ))}
                </Col>
            </Row> :
            ""
            }
                {formSubmitted && !paymentComplete && (
                    <Row className='mt-2 mb-5'>
                        <Col className='checkoutItemsContainer'>
                            <Payment onClick={handleCompleteRegistration}  totalWithTax={totalWithTax} />
                        </Col>
                    </Row>
                )}

        {paymentComplete && ( // Render thank you message if payment is complete
            <Row className='mt-2 mb-5'>
                <Col className='text-center'>
                    <h3>Thank you for your purchase!</h3>
                    {/* You can customize this message further if needed */}
                </Col>
            </Row>
        )}
    </Container>
);
}

export default CheckoutPage;