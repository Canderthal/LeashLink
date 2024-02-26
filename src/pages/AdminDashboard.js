import { Container, Col, Row, Button} from "reactstrap";
import AddServiceForm from "../components/adminComponents/NewService";
import TrainerList from "../components/adminComponents/Trainers";
import { useState} from "react";
import { useSelector } from "react-redux";
import ClientDetails from "../components/ClientDetails";
import ClientMap from '../components/ClientMap';
import PrivateTrainingForm from "../Forms/PrivateTraining";


const AdminDashboard = () => {
    const [content, setContent] = useState('newService')
    const user = useSelector((state) => state.user.user)
    // 
    const [selectedClient, setSelectedClient] = useState(null)
    const [index, setIndex] = useState("");
    const [activeContent, setActiveContent] = useState('clientMap')

    const handleContentSwitch = (content) => {
        setActiveContent(content)
      }


    const handleSelectClient = (client, dogIndex) => {
        setSelectedClient(client)
        setIndex(parseInt(dogIndex))
        setActiveContent("SelectedClient")

    }

    

    return (
        <div className="profile-page">
            <Row className="profile-page">
                <Col md='2' className='profile-container fixed-left'>
                    <Row className="text-center mt-5"><h3>{user.profile.firstName}</h3></Row>
                    <Row className="text-center"><h4>{user.profile.role}</h4></Row>
                    <hr></hr>

                    <Row className="mt-5"><Button className='profileButtons' onClick={() => setActiveContent("newService")}>New Service</Button></Row>
                    <Row><Button className='profileButtons mt-1'  onClick={() => setActiveContent("trainer")}>Trainers</Button></Row>
                    <Row><Button className='profileButtons mt-1'  onClick={() => setActiveContent("clientMap")}>Clients</Button></Row>
                    <Row><Button className='profileButtons mt-1'  onClick={() => setActiveContent("newClient")}>Add Client</Button></Row>
                </Col>

                <Col md='8'>
                    {activeContent === 'newService' ? 
                    <AddServiceForm /> : 
                    activeContent === 'trainer' ? 
                    <TrainerList /> : 
                    activeContent === 'clientMap' ?
                    <Container className="">

                        <ClientMap onSelectDog={handleSelectClient} userRole={'admin'}/> 
                    </Container>:
                    activeContent === 'SelectedClient' ?
                    <ClientDetails client={selectedClient} index={index} userRole={'admin'}/> :
                    activeContent === 'newClient' ? <PrivateTrainingForm handleContentSwitch={handleContentSwitch} userRole={'admin'} /> : "Nothing Selected"}
                </Col>

            </Row>
        </div>
    )

}

export default AdminDashboard;