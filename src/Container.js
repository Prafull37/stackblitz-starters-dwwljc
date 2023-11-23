import React from 'react';
import Header from './components/Header';

export default function Container({ children, loggedInUser, ...restProps }) {
  return (
    <div>
      <Header welcomeText={`Hello ${loggedInUser}`} {...restProps} />
      <div>{children}</div>
    </div>
  );
}
