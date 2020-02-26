import React from 'react';
// Components
import HomePage from './HomePage';
// Styles
import '../index.scss';
// Stripe Imports
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// the key is located in the .env file
const stripePromise = loadStripe(process.env.PUB_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <HomePage />
    </Elements>
  );
}

export default App;
