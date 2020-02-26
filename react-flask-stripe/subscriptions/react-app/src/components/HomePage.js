import React, {useState} from 'react';
import axios from 'axios';
// MUI Components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
// Util imports
import {makeStyles} from '@material-ui/core/styles';
// Components
import CardInput from './CardInput';
// Stripe
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '35vh auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 1em',
  },
});

function HomePage() {
  const classes = useStyles();
  // State
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitPay = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const res = await axios.post('http://localhost:5000/pay', {email: email});

    const clientSecret = res.data['client_secret'];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        console.log('You got 500$!');
      }
    }
  };

  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    if (status !== '') {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: email,
          },
        },
      });
      if (result.error) {
        console.log(result.error.message);
        // Show error in payment form
      } else {
        console.log('Hell yea, you got that sub money!');
      }
    } else {
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      });

      if (result.error) {
        console.log(result.error.message);
        // Show error in payment form
      } else {
        const payload = {
          email: email,
          payment_method: result.paymentMethod.id,
        };
        // Otherwise send paymentMethod.id to your server
        const res = await axios.post('http://localhost:5000/sub', payload);

        // eslint-disable-next-line camelcase
        const {client_secret, status} = res.data;

        if (status === 'requires_action') {
          setStatus(status);
          setClientSecret(client_secret);
          stripe.confirmCardPayment(client_secret).then(function(result) {
            if (result.error) {
              // Display error message in your UI.
              // The card was declined (i.e. insufficient funds, card has expired, etc)
              console.log(result.error.message);
            } else {
              // Show a success message to your customer
              console.log('Hell yea, you got that sub money!');
            }
          });
        } else {
          console.log('Hell yea, you got that sub money!');
        }
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <TextField
          label='Email'
          id='outlined-email-input'
          helperText={`Email you'll recive updates and receipts on`}
          margin='normal'
          variant='outlined'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <CardInput />
        <div className={classes.div}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitPay}>
            Pay
          </Button>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitSub}>
            Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default HomePage;
