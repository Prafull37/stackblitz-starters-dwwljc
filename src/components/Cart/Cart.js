// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Open IndexedDB
    const openRequest = window.indexedDB.open('quoteCartDB', 1);

    openRequest.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(['quoteCart'], 'readonly');
      const quoteCartStore = transaction.objectStore('quoteCart');

      const getAllRequest = quoteCartStore.getAll();

      getAllRequest.onsuccess = function () {
        setCartItems(getAllRequest.result);
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };

    openRequest.onerror = function (error) {
      console.error('Error opening IndexedDB:', error);
    };
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.pricingBid),
      0
    );
  };

  const handlePayment = () => {
    // Add your payment logic here
    navigate('/payment');
  };

  return (
    <div style={styles.container}>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <ul style={styles.listContainer}>
            {cartItems.map((item) => (
              <li key={item.quoteId} style={styles.cartItem}>
                <p>{item.content}</p>
                <p>Pricing Bid: {item.pricingBid}</p>
                <p>Dollar Value: {item.dollarValue}</p>
              </li>
            ))}
          </ul>
          <div style={styles.totalContainer}>
            <p>Total Price to Pay: ${calculateTotalPrice().toFixed(2)}</p>
            <button onClick={handlePayment} style={styles.paymentButton}>
              Pay Now
            </button>

            <button onClick={handlePayment} style={styles.clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
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
  cartItem: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  totalContainer: {
    marginTop: '20px',
  },
  listContainer: {
    listStyleType: 'none',
  },
  paymentButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
    margin: '20px',
  },
  clearCart: {
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
    backgroundColor: 'red',
  },
};

export default Cart;
