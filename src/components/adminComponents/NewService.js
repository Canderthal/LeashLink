import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import db from '../../firebase'



const AddServiceForm = () => {
  // Define state to track form inputs
  const [serviceType, setServiceType] = useState('Classes');
  const [classLevel, setClassLevel] = useState('open');
  const [className, setClassName] = useState('');
  const [trainer, setTrainer] = useState('');
  const [duration, setDuration] = useState(6);
  const [enrollmentSlots, setEnrollmentSlots] = useState(6);
  const [startTime, setStartTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [classCategory, setClassCategory] = useState("")
  const [serviceCategory, setServiceCategory] = useState('');
  const [classType, setClassType] = useState('')

  const [trainers, setTrainers] = useState([]);

  // Event handlers for form inputs
  const handleTypeChange = (e) => setServiceType(e.target.value);
  const handleLevelChange = (e) => setClassLevel(e.target.value);
  const handleNameChange = (e) => setClassName(e.target.value);
  const handleTrainerChange = (e) => setTrainer(e.target.value);
  const handleDurationChange = (value) => setDuration(Math.max(value, 1)); // Ensure duration is at least 1
  const handleSlotsChange = (value) => setEnrollmentSlots(Math.max(value, 1)); // Ensure slots is at least 1
  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleCostChange = (e) => setCost(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleNotesChange = (e) => setNotes(e.target.value);
  const handleClassTypeChange = (e) => setClassType(e.target.value);


  const fetchTrainers = async () => {
    try {
      const staffRef = collection(db, 'staff'); // Use db directly here
      const snapshot = await getDocs(staffRef);
      const staffMembers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Staff Members:', staffMembers);
      setTrainers(staffMembers);

    } catch (error) {
      console.error('Error fetching staff members:', error);
    }
  };


  useEffect(() => {
    fetchTrainers(); // Fetch trainers when the component mounts
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Service Type:', serviceType);
    console.log('Enrollment Slots:', enrollmentSlots);
    console.log('Duration:', duration);
    console.log('ClassLevel:', classLevel)
    console.log("startdate", {startDate: new Date(startDate)})
  
    try {
      // Update enrollment slots and duration based on service type
      let updatedEnrollmentSlots = serviceType === 'Private Lesson' ? 1 : enrollmentSlots;
      let updatedDuration = serviceType === 'Private Lesson' ? 1 : duration;
  
      if (serviceType === 'Private Lesson' && (enrollmentSlots === 6 && duration === 6)) {
        console.log('Setting default values');
        setClassLevel('open'); // Default value for class level
        updatedEnrollmentSlots = 1; // Default value for enrollment slots
        updatedDuration = 1; // Default value for duration
      }
  
      // Submit the form data to Firebase Firestore
      const collectionRef = collection(db, 'LeashLink', 'Services', serviceType, classType, classLevel);
  
      console.log("Enrollment slots: ", updatedEnrollmentSlots);
      await addDoc(collectionRef, {
        serviceType,
        classLevel,
        className,
        trainer,
        duration: updatedDuration,
        enrollmentSlots: updatedEnrollmentSlots,
        startTime,
        startDate: new Date(startDate), // Convert string to JavaScript Date object
        cost,
        description,
        notes,
      });
  
      // Reset form state after successful submission
      setServiceType('Classes');
      setClassLevel('open');
      setClassName('');
      setTrainer('');
      setDuration(6);
      setEnrollmentSlots(6);
      setStartTime('');
      setStartDate('');
      setCost('');
      setDescription('');
      setNotes('');
      setClassCategory('');
      setServiceCategory('');
  
      // Provide feedback to the user
      alert('Service added successfully!');
    } catch (error) {
      console.error('Error adding service:', error);
      // Handle error and provide feedback to the user
      alert('Failed to add service. Please try again later.');
    }
  };

  return (
    <Container className='mb-5'>
      <h2>Add New Service</h2>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="serviceType">Type of Service</Label>
              <Input type="select" name="serviceType" id="serviceType" value={serviceType} onChange={handleTypeChange}>
                <option value="">Select Service Type</option>
                <option value="Classes">Class</option>
                <option value="Private Lesson">Private Lesson</option>
                <option value="Events">Event</option>
              </Input>
            </FormGroup>
            {serviceType === 'Classes' && (
              <>
              <FormGroup>
                    <Label for="classLevel">Type of Class</Label>
                      <Input type="select" name="classType" id="classType" value={classType} onChange={handleClassTypeChange}>
                        <option value="">Select Class Type</option>
                        <option value="agility">Agility</option>
                        <option value="barnhunt">Barn Hunt</option>
                        <option value="obedience">Obedience</option>
                    </Input>
              </FormGroup>

              <FormGroup>
                <Label for="classLevel">Level of Class</Label>
                <Input type="select" name="classLevel" id="classLevel" value={classLevel} onChange={handleLevelChange}>
                  <option value="">Select Class Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value='masters'>Masters</option>
                </Input>
              </FormGroup>

              </>
            )}
            {serviceType === 'Private Lesson' && (
              <>
                <FormGroup>
                    <Label for="classLevel">Type of Private</Label>
                      <Input type="select" name="classType" id="classType" value={classType} onChange={handleClassTypeChange}>
                        <option value="">Select Class Type</option>
                        <option value="agility">Agility</option>
                        <option value="barnhunt">Barn Hunt</option>
                        <option value="behavioural">Behavioural</option>
                        <option value="obedience">Obedience</option>
                    </Input>
              </FormGroup>


              </>
            )}




            <FormGroup>
              <Label for="className">Class/Event Name</Label>
              <Input type="text" name="className" id="className" value={className} onChange={handleNameChange} />
            </FormGroup>

            <FormGroup>
              <Label for="trainer">Trainer</Label>
              <Input type="select" name="trainer" id="trainer" value={trainer} onChange={handleTrainerChange}>
                <option value="">Select Trainer</option>
                {trainers.map(trainer => (
                  <option key={trainer.id} value={trainer.name}>{trainer.name}</option>
                ))}
              </Input>
            </FormGroup>
            
            {(serviceType === "Classes" || serviceType === "Events") && (
              <>
            <FormGroup>
              <Label>Class Duration (weeks)</Label>
              <div>
                <Button color="secondary" onClick={() => handleDurationChange(duration - 1)}>-</Button>{' '}
                {duration}{' '}
                <Button color="secondary" onClick={() => handleDurationChange(duration + 1)}>+</Button>
              </div>
            </FormGroup>

            <FormGroup>
              <Label>Available Enrollment Slots</Label>
              <div>
                <Button color="secondary" onClick={() => handleSlotsChange(enrollmentSlots - 1)}>-</Button>{' '}
                {enrollmentSlots}{' '}
                <Button color="secondary" onClick={() => handleSlotsChange(enrollmentSlots + 1)}>+</Button>
              </div>
            </FormGroup>
            </>
            )}

          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="startTime">Class Start Time</Label>
              <Input type="time" name="startTime" id="startTime" value={startTime} onChange={handleStartTimeChange} />
            </FormGroup>
            <FormGroup>
              <Label for="startDate">Class Start Date</Label>
              <Input type="date" name="startDate" id="startDate" value={startDate} onChange={handleStartDateChange} />
            </FormGroup>

            <FormGroup>
              <Label for="cost">Cost</Label>
              <Input type="text" name="cost" id="cost" value={cost} onChange={handleCostChange} />
            </FormGroup>

            <FormGroup>
              <Label for="description">Class Description</Label>
              <Input type="textarea" name="description" id="description" value={description} onChange={handleDescriptionChange} />
            </FormGroup>

            <FormGroup>
              <Label for="notes">Special Notes</Label>
              <Input type="textarea" name="notes" id="notes" value={notes} onChange={handleNotesChange} />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit">Submit</Button>
      </form>
    </Container>
  );
};

export default AddServiceForm;
