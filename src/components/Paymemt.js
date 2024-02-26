// Payment.js
import React from 'react';
import { Container, Button } from 'reactstrap';
import CheckoutForm from '../Forms/CheckoutForm';

const Payment = ({ totalWithTax, onClick }) => {
    return (
        <Container>
            <h2>Stripe Checkout</h2>
            <h3>Total: <span>{totalWithTax.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}</span></h3>
            <CheckoutForm total={totalWithTax} />
            <Button onClick={onClick} className='mt-5'>Fake Pay</Button>
        </Container>
    );
};

export default Payment;
