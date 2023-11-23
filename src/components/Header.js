// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clearCart from './utils';
import posthog from 'posthog-js';

const Header = ({ welcomeText }) => {
  console.log('HeaderText', welcomeText);
  const navigate = useNavigate();

  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Open IndexedDB
    const openRequest = window.indexedDB.open('quoteCartDB', 1);

    openRequest.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(['quoteCart'], 'readonly');
      const quoteCartStore = transaction.objectStore('quoteCart');

      const countRequest = quoteCartStore.count();

      countRequest.onsuccess = function () {
        setCartItemCount(countRequest.result);
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };

    openRequest.onerror = function (error) {
      console.error('Error opening IndexedDB:', error);
    };
  }, []);

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear user session)
    localStorage.removeItem('loggedInUser');
    clearCart();
    posthog.reset(true);
    // Redirect to the login page or home page
    navigate('/login');
  };

  // Assuming you have user details stored in local storage after login
  const loggedInUser = localStorage.getItem('loggedInUser');

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        {welcomeText}
      </Link>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>
              Home
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/cart" style={styles.navLink}>
              Cart
              {cartItemCount > 0 && (
                <span style={styles.cartBadge}>{cartItemCount}</span>
              )}
            </Link>
          </li>
          {loggedInUser && (
            <li style={styles.navItem}>
              <span style={styles.profile}>{loggedInUser}</span>
            </li>
          )}
          {loggedInUser && (
            <li style={styles.navItem}>
              <button onClick={handleLogout} style={styles.logoutButton}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
  },
  navItem: {
    marginLeft: '10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.2em',
    position: 'relative',
  },
  cartBadge: {
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: '50%',
    padding: '4px 8px',
    fontSize: '0.8em',
    position: 'absolute',
    top: '-10px',
    right: '-10px',
  },
  profile: {
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#fff',
    color: '#333',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '1em',
  },
};

export default Header;
