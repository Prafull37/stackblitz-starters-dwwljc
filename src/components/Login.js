// src/components/Login.js
import React, { useState } from 'react';
import posthog from 'posthog-js';

const hardcodedUsername = 'demoUser';
const hardcodedPassword = 'demoPassword';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState(hardcodedUsername);
  const [password, setPassword] = useState(hardcodedPassword);
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Hardcoded credentials for demonstration purposes

    if (username === hardcodedUsername && password === hardcodedPassword) {
      setError('');
      onLogin(username);
      posthog.identify(
        'distinct_id', // Replace 'distinct_id' with your user's unique identifier
        { username } // optional: set additional user properties
      );
      posthog.capture('user_loggedin', { username });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={styles.error}>{error}</div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: 'auto',
    marginTop: '100px',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default Login;
