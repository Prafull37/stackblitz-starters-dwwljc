// src/components/QuoteDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuoteDetails = () => {
  const [quoteDetails, setQuoteDetails] = useState(null);
  const [pricingBid, setPricingBid] = useState('');
  const [dollarValue, setDollarValue] = useState('million');
  const { id } = useParams();

  useEffect(() => {
    const fetchQuoteDetails = async () => {
      try {
        const response = await fetch(`https://api.quotable.io/quotes/${id}`);
        const data = await response.json();
        setQuoteDetails(data);
      } catch (error) {
        console.error('Error fetching quote details:', error);
      }
    };

    fetchQuoteDetails();
  }, [id]);

  const handleAddToCart = () => {
    // Add your logic here for handling the "Add to Cart" functionality
    const cartItem = {
      quoteId: quoteDetails._id,
      content: quoteDetails.content,
      author: quoteDetails.author,
      pricingBid,
      dollarValue,
    };

    // Open IndexedDB
    const openRequest = window.indexedDB.open('quoteCartDB', 1);

    openRequest.onupgradeneeded = function (event) {
      const db = event.target.result;
      db.createObjectStore('quoteCart', { keyPath: 'quoteId' });
    };

    openRequest.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(['quoteCart'], 'readwrite');
      const quoteCartStore = transaction.objectStore('quoteCart');

      const addRequest = quoteCartStore.add(cartItem);

      addRequest.onsuccess = function () {
        console.log('Quote added to cart:', cartItem);
      };

      addRequest.onerror = function (error) {
        console.error('Error adding quote to cart:', error);
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };

    openRequest.onerror = function (error) {
      console.error('Error opening IndexedDB:', error);
    };
  };

  return (
    <div style={styles.container}>
      {quoteDetails ? (
        <>
          <h2>Quote Details</h2>
          <p>{quoteDetails.content}</p>
          <p>- {quoteDetails.author}</p>
          <div>
            <label>Pricing Bid:</label>
            <input
              type="text"
              value={pricingBid}
              onChange={(e) => setPricingBid(e.target.value)}
            />
          </div>
          <div>
            <label>Dollar Value:</label>
            <select
              value={dollarValue}
              onChange={(e) => setDollarValue(e.target.value)}
            >
              <option value="million">Million</option>
              <option value="billion">Billion</option>
              <option value="trillion">Trillion</option>
              <option value="zillion">Zillion</option>
            </select>
          </div>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: 'auto',
    marginTop: '50px',
    textAlign: 'center',
  },
};

export default QuoteDetails;
