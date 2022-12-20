import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    setProcessing(false);

    if (error) {
      setError(error.message);
    } else {
      setPaymentSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {paymentSuccess && <div style={{ color: 'green' }}>Payment Successful</div>}
      <CardElement />
      <button disabled={processing || paymentSuccess} type="submit">
        Pay
      </button>
    </form>
  );
};

const STRIPE_PUBLISHABLE_KEY = 'pk_test_1234567890';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentForm;


// This component renders a form that includes a CardElement, which is a pre-built form element provided by Stripe that allows the user to enter their credit card information. When the form is submitted, the component uses the stripe.createPaymentMethod method to create a payment method with the provided credit card information. If the payment method is successfully created, the component displays a "Payment Successful" message. If there is an error, it displays the error message.

// Note that this is just one way to implement a payment form using Stripe and React. There are many other ways you could design your payment form, and you may want to customize the behavior of the component based on your specific needs.