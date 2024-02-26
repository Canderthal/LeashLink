import Obedience from '../../assets/Obedience.png';
import { Container, Col, Row, Button, Input, Card } from "reactstrap";
import { Link } from 'react-router-dom';

const ObedienceButton = ({ onClick }) => {
    return (

        <Card
        onClick={onClick}
        className='link'
            style={{
                width: '18rem',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
            }}
        >
            <img src={Obedience} className='classIcon'/>
            <h3 className='cardText'>Obedience</h3>
        </Card>


    )
}

export default ObedienceButton;