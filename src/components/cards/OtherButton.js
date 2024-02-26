import Other from '../../assets/Other.png';
import { Container, Col, Row, Button, Input, Card } from "reactstrap";
import { Link } from 'react-router-dom';

const OtherButton = ({ onClick }) => {
    return (

            <Card
            className='link'
            onClick={onClick}
                style={{
                    width: '18rem',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                }}
            >
                <img src={Other} className='classIcon'/>
                <h3 className='cardText'>Other</h3>
            </Card>

    )
}

export default OtherButton;