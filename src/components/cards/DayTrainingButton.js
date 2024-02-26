import DayTraining from '../../assets/DayTraining.png';
import { Container, Col, Row, Button, Input, Card } from "reactstrap";
import { Link } from 'react-router-dom';

const DayTrainingButton = ({ onClick }) => {
    return (

        <Card className='link'
            onClick={onClick}
            style={{
                width: '18rem',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
            }}
        >
            <img src={DayTraining} className='classIcon'/>
            <h3 className='cardText'>DayTraining</h3>
        </Card>

    )
}

export default DayTrainingButton;