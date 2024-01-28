import { Container, Col, Row, Button} from "reactstrap";
import {getDocs, collection, query, where} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import db from "../firebase"
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import ClientMap from "../components/ClientMap";
import ClientDetails from "../components/ClientDetails";
import PrivateTrainingForm from "../Forms/PrivateTraining";


export const Dashboard = () => {
    const [selectedClient, setSelectedClient] = useState(null)
    const [content, setActiveContent] = useState("ClientMap"); // use default dash unless client details are viewed
    const [index, setIndex] = useState("");
    const [loading, setLoading] = useState(false)


    const [userRole, setUserRole] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            setLoading(true);
            const userEmail = currentUser.email; // Use email as a unique identifier
            try {
                
                const userDocRef = collection(db, "users");
                const querySnapshot = await getDocs(
                query(userDocRef, where("email", "==", userEmail))
            );
    
                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    const userRoleFromFirestore = userData.role;
                    setUserRole(userRoleFromFirestore);

                    setLoading(false)
                } else {
                setUserRole(null);
                }
            } catch (error) {
              console.error("Error fetching user role:", error);
              setUserRole(null);
              setLoading(false)
            }
          } else {
            setUserRole(null);
          }
        });
    
        return () => unsubscribe();
      }, []);


    const handleContentSwitch = (content) => {
        setActiveContent(content)
      }


    const handleSelectClient = (client, dogIndex) => {
        setSelectedClient(client)
        setIndex(parseInt(dogIndex))
        setActiveContent("SelectedClient")

    }
    return (
        <>
        {userRole === "admin" || userRole === 'test' ? 
            <Container className="Dashboard mt-4">
                <Row>
                    
                    <Col>
                        <Button className="m-1" color='success'  onClick={() => { handleContentSwitch('ClientMap')}} style={{ cursor: 'pointer'}}>Clients</Button>
                        <Button className="m-1" color='success'  onClick={() => { handleContentSwitch('SelectedClient')}} style={{ cursor: 'pointer'}}>Selected Client</Button>
                        <Button className="m-1" color="info" onClick={() => { handleContentSwitch('NewClient')}} style={{ cursor: 'pointer'}}>+ Add Client</Button>
                    </Col>
                </Row>
                {content === 'ClientMap' ? (
                    <ClientMap  onSelectDog={handleSelectClient} userRole={userRole} />
                ) : content === 'SelectedClient' ? (
                    <ClientDetails client={selectedClient} index={index} userRole={userRole}/>
                ) : (
                    <PrivateTrainingForm userRole={userRole} />
                )}

            </Container>
            : loading ?
            <h1>Loading....</h1> :
            <h5>Please contact James for a role</h5>
}
        </>
    );
                }
    
export default Dashboard;