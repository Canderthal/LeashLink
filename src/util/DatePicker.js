import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const DatePicker = ({ setSelectedDate }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDateLocal] = useState(new Date()); // Set to current date by default

  const handlePrevWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() - 7);
    setStartDate(newStartDate);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() + 7);
    setStartDate(newStartDate);
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setSelectedDateLocal(day); // Also update local state if needed
  };

  const renderDays = () => {
    const startDay = new Date(startDate);
    const today = new Date();

    const days = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDay);
      currentDate.setDate(startDay.getDate() + i);
      const isToday = currentDate.toDateString() === today.toDateString();
      const isSelected = selectedDate && currentDate.toDateString() === selectedDate.toDateString();

      days.push(
        <button
          key={currentDate.toISOString()}
          className={`date-picker-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDayClick(currentDate)}
        >
          {currentDate.toLocaleDateString('en-US', { weekday: 'short' })}
          <br />
          {currentDate.getDate()}
        </button>
      );
    }

    return days;
  };

  return (
    <Container fluid className="date-picker-container">
      <Row className="justify-content-center align-items-center">
        <Col xs="auto" className="text-center">
          <button className="dateButton" onClick={handlePrevWeek}>
            <FontAwesomeIcon icon={faArrowLeft} className='faIcon'/>
          </button>
        </Col>
        <Col xs="auto" className="text-center">
          <h5>{startDate.toLocaleDateString('en-US', { month: 'long' })}</h5>
        </Col>
        <Col xs="auto" className="text-center">
          <button className="dateButton" onClick={handleNextWeek}>
            <FontAwesomeIcon icon={faArrowRight } className='faIcon' />
          </button>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col xs="auto" className="text-center">
          {renderDays()}
        </Col>
      </Row>
      <Row className='text-center'>
        <p>Appointments Available on {selectedDate ? selectedDate.toDateString() : ''}</p>
      </Row>
    </Container>
  );
};
  
  export default DatePicker;

