// src/components/QuoteList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('https://api.quotable.io/quotes?limit=40');
        const data = await response.json();
        setQuotes(data.results);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Quote List</h2>
      {quotes.map((quote) => (
        <div key={quote._id} style={styles.card}>
          <p>{quote.content}</p>
          <p>- {quote.author}</p>
          <Link to={`/quotes/${quote._id}`} style={styles.detailsButton}>
            View Details
          </Link>
        </div>
      ))}
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
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  detailsButton: {
    display: 'block',
    marginTop: '8px',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default QuoteList;
