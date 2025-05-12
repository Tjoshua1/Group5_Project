import React, { createContext, useState } from 'react';

export const UsernameContext = createContext();

export const Logout = ({ children }) => {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });

  const logout = () => {
    setUsername('');
    localStorage.removeItem('username');
  };

  return (
    <UsernameContext.Provider value={{ username, setUsername, logout }}>
      {children}
    </UsernameContext.Provider>
  );
};
