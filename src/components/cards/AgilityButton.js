import Agility from '../../assets/Agility.png';
import { Container, Col, Row, Button, Input, Card } from "reactstrap";
import { Link } from 'react-router-dom';

const AgilityButton = ({ onClick }) => {
    return (

            <Card
                className='link' onClick={onClick}
                style={{
                    width: '18rem',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                }}
            >
                <img src={Agility} className='classIcon' alt="agility"/>
                <h3 className='cardText'>Agility</h3>
            </Card>


    )
}

export default AgilityButton;

