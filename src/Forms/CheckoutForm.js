import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      // Payment method created successfully. You can handle the payment here.
      console.log(result.paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cardElement">Card Details</label>
        <CardElement
          id="cardElement"
          options={{
            style: {
              base: {
                fontSize: '16px',
                fontFamily: '"Roboto", sans-serif',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#fa755a',
              },
            },
          }}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!stripe || isLoading}
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};


export default CheckoutForm;
