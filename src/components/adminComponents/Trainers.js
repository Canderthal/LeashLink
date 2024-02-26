import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const TrainerList = () => {
  const [trainers, setTrainers] = useState([]);
  const [newTrainerName, setNewTrainerName] = useState('');

  // Function to fetch trainers from the database
  const fetchTrainers = async () => {
    try {
      const staffRef = collection(db, 'staff'); // Use db directly here
      const snapshot = await getDocs(staffRef);
      const staffMembers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrainers(staffMembers);

    } catch (error) {
      console.error('Error fetching staff members:', error);
    }
  };

  // Function to handle adding a new trainer
  const addTrainer = async () => {
    try {
      if (newTrainerName.trim() !== '') {
        // Check if the trainer already exists
        const existingTrainer = trainers.find(trainer => trainer.name === newTrainerName);
        if (existingTrainer) {
          alert('Trainer already exists!');
          return;
        }

        // Add new trainer to the staff collection
        const docRef = await addDoc(collection(db, 'staff'), { name: newTrainerName });
        // Update local state with the new trainer
        setTrainers([...trainers, { id: docRef.id, name: newTrainerName }]);
        setNewTrainerName('');
        alert("Successfully added trainer")
      } else {
        alert('Error: Please enter a valid trainer name.');
      }
    } catch (error) {
      console.error('Error adding trainer:', error);
    }
  };

  useEffect(() => {
    fetchTrainers(); // Fetch trainers when the component mounts
  }, []);

  return (

    <div>
      <h2>Trainers</h2>
      <ul>
        {trainers.map(trainer => (
          <li key={trainer.id}>
            <span>{trainer.name}</span>
            {/* Add edit and delete buttons here */}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={newTrainerName}
          onChange={e => setNewTrainerName(e.target.value)}
          placeholder="Enter trainer name"
        />
        <button onClick={addTrainer}>Add Trainer</button>
      </div>
    </div>
  );
};

export default TrainerList;
