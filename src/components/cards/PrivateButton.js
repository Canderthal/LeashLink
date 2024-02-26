import Private from '../../assets/PrivateLessons.png';
import { Container, Col, Row, Button, Input, Card } from "reactstrap";
import { Link } from 'react-router-dom';

const PrivateButton = ({ onClick }) => {
    return (

            <Card
            className='link'
            onClick={onClick}
                style={{
                    width: '18rem',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                }}
            >
                <img src={Private} className='classIcon'/>
                <h3 className='cardText'>Privates</h3>
            </Card>


    )
}

export default PrivateButton;