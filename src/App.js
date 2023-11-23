// src/App.js
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import QuoteDetails from './components/QuoteDetails';
import Cart from './components/Cart';
import Payment from './components/Payment';

import PrivateRoute from './PrivateRoute';
import Container from './Container';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (username) => {
    console.log(username);
    setLoggedInUser(username);
    localStorage.setItem('loggedInUser', username);
    navigate('/');
  };

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route
          path="/"
          element={
            <Container loggedInUser={loggedInUser}>
              <Home />
            </Container>
          }
        />
        <Route
          path="/quotes/:id"
          element={
            <Container loggedInUser={loggedInUser}>
              <QuoteDetails />
            </Container>
          }
        />

        <Route
          path="/cart"
          element={
            <Container loggedInUser={loggedInUser}>
              <Cart />
            </Container>
          }
        />

        <Route
          path="/payment"
          element={
            <Container loggedInUser={loggedInUser}>
              <Payment />
            </Container>
          }
        />
      </Route>
      <Route path="/login" exact element={<Login onLogin={handleLogin} />} />
    </Routes>
  );
}

export default App;
