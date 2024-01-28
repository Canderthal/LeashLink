import { Container, Col, Row, Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Label} from "reactstrap";
import { useState, useEffect } from "react";
import { onSnapshot, collection, doc, updateDoc, getDocs } from "firebase/firestore";
import db from "../firebase";





const ClientMap = ({ onSelectDog, userRole}) => {
  const [clientData, setClientData] = useState("test");

  useEffect(() => {
    if (userRole === "admin") {
      setClientData('clients');
    } else if (userRole === "test") {
      setClientData("test");
    } else {
      console.log("Nothing to display");
    }
  }, [userRole]); // changin from userRole to empty array


    
    const [DBClient, setDBClient] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [originalData, setOriginalData] = useState([]);


    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [editedClient, setEditedClient] = useState({
        name: '',
        phone: '',
        email: '',
        dogs: [],
      });
    

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, clientData), (snapshot) => {
          const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setDBClient(data);
          setOriginalData(data);
        });
    
        return () => {
          unsubscribe();
        };
      }, [clientData]);
    
      const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
    
        if (term === '') {
          setDBClient(originalData);
          return;
        }
    
        const filteredClients = originalData.filter((client) => {
            const termLength = term.length;
          
            // Check if the search term has at least two characters
            if (termLength >= 3) {
              const match =
                client.name.toLowerCase().includes(term) ||
                client.phone.toLowerCase().includes(term) ||
                client.email.toLowerCase().includes(term) ||
                client.dogs.some((dog) => dog.name.toLowerCase().includes(term));
          
              return match;
            }

          });
        setDBClient(filteredClients);
      };
    
    const handleEditClick = (client) => {
        setSelectedClient(client);
        setEditedClient(client);
        setShowModal(true);
    }

    const handleDeleteClick = () => {
        {/*Need to add*/}
    }

    const handleViewClick = (client, dogIndex) => {
        onSelectDog(client, dogIndex);


    }

    const handleModalClose = () => {
        setShowModal(false)
    }

    const handleSaveChanges = async () => {
        try {
          // Update the document with the editedClient data
          await updateDoc(doc(db, clientData, selectedClient.id), {
            name: editedClient.name,
            phone: editedClient.phone,
            email: editedClient.email,
            dogs: editedClient.dogs,
          });
      
          // Refresh the client data
          const querySnapshot = await getDocs(collection(db, clientData));
          const updatedData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setDBClient(updatedData);
      
          // Close the modal
          setShowModal(false);
          setSelectedClient(null);
          setEditedClient({
            name: '',
            phone: '',
            email: '',
            dogs: [],
          });
        } catch (error) {
          console.error('Error updating document:', error);
          // Handle error appropriately, e.g., show an error message to the user
        }
      };

      const handleDogInputChange = (e, index, property) => {
        const { value } = e.target;
        setEditedClient((prev) => {
          const updatedDogs = [...prev.dogs];
          updatedDogs[index] = { ...updatedDogs[index], [property]: value };
          return { ...prev, dogs: updatedDogs };
        });
      };
      
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedClient((prev) => ({
          ...prev,
          [name]: value,
        }));
      };


    return (
    <Container className="Dashboard">

    <Row>
        <Col xs='9'>
            <Input onChange={handleSearch}
            value={searchTerm}
            placeholder="Search..." />
        </Col>

    </Row>

    <Row>
    <Table size="sm" hover responsive striped className="mt-3">
<thead>
<tr>

<th>
Dog Name
</th>
<th>
Owner
</th>
<th>
Breed
</th>
<th>
Reactivity
</th>

</tr>
</thead>
<tbody>
{DBClient.map((client) => (
client.dogs.map((dog, index) => (
<tr key={`${client.id}-${index}`}>
<td>{dog.name}</td>
<td>{client.name}</td>
<td>{dog.breed}</td>

<td>{dog.reactive? "yes" : "no"}</td>
<td>
  {/* Add your buttons here */}
  <Button className="m-1" color="primary" size="sm" onClick={() => handleEditClick(client)}>
    Edit
  </Button>
  <Button className="m-1" color="info" size="sm" onClick={() => handleViewClick(client, index)}>
    View
  </Button>
  {/* 
  <Button className="m-1" size="sm" onClick={() => handleViewClick(client, index)}>
    Start
  </Button>

  Need to add the start private that will launch a new lesson with exisiting client
  */}

</td>
</tr>
))
))}


</tbody>
</Table>
    </Row>

    <Modal isOpen={showModal}>
        <ModalHeader toggle={handleModalClose}>
                    <Col>Client Details</Col>
        </ModalHeader>
        <ModalBody>
            <h5>Owner Details</h5>
            <Label for="name">Owner Name</Label>
            <Input
                type="text"
                name="name"
                id="name"
                value={editedClient.name}
                onChange={handleInputChange}
            ></Input>
            <Label for='phone'>Phone Number</Label>
            <Input 
                type='text'
                name='phone'
                value={editedClient.phone}
                onChange={handleInputChange}
            ></Input>
             <Label for="email">Email</Label>
            <Input
                type="text"
                name="email"
                id="email"
                value={editedClient.email}
                onChange={handleInputChange}
            />

            <hr></hr>
            <h5>Dog Details</h5>
                {editedClient.dogs.map((dog, index) => (
                    <>
                        <Label for={`dogName${index}`}>Dog Name </Label>
                        <Input
                            type="text"
                            name={`dogName${index}`}
                            value={dog.name}
                            onChange={(e) => handleDogInputChange(e, index, 'name')}
                        />

                        <Label for={`dogBreed${index}`}>Dog Breed</Label>
                        <Input
                        className="mb-3"
                            type="text"
                            name={`dogBreed${index}`}
                            value={dog.breed}
                            onChange={(e) => handleDogInputChange(e, index, 'breed')}
                        />
                    </>
                ))}

        </ModalBody>
        <ModalFooter>
        <Button /*color="danger"   Uncomment when delete is setup*/ size="sm" onClick={() => handleDeleteClick(editedClient)}>
            DELETE
        </Button>
        <Button color="success" size="sm" onClick={handleSaveChanges}>Save</Button>


        </ModalFooter>
    </Modal>
</Container>
    )
}

export default ClientMap;