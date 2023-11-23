// src/components/Payment.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clearCart from '../utils';
const hardcodedCreditCard = '1234567812345678';

const Payment = () => {
  const [creditCardNumber, setCreditCardNumber] = useState(hardcodedCreditCard);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handlePayment = () => {
    // Simulate payment validation with a hardcoded credit card number

    if (creditCardNumber === hardcodedCreditCard) {
      // Payment successful

      // Show a full-page modal or use a library/modal component for a better user experience
      alert('Payment successful! Redirecting to Quote List page.');
      navigate('/'); // Redirect to Quote List page
      clearCart();
    } else {
      // Payment failed
      setErrorMessage('Invalid credit card number. Please try again.');
      navigate('/cart');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Payment</h2>
      <div>
        <label>Credit Card Number:</label>
        <input
          type="text"
          value={creditCardNumber}
          onChange={(e) => setCreditCardNumber(e.target.value)}
        />
      </div>
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      <button onClick={handlePayment} style={styles.paymentButton}>
        Pay Now
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    margin: 'auto',
    marginTop: '50px',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
  paymentButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
    marginTop: '20px',
  },
};

export default Payment;
