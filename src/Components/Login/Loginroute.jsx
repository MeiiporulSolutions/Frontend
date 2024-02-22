import React, { useState } from 'react';
import LoginForm from './LoginForm'; // Update the path
// import Dashboard from '../Dashboard/Dashboard'; // Update the path for your Dashboard component
import AdmitPatient from '../Admit/AdmitPatient';
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (userType) => {
    console.log(`Logged in as ${userType}`);
    setLoggedInUser(userType);
    // Add your additional login logic here if needed
  };

  const handleLogout = () => {
    console.log('Logged out');
    setLoggedInUser(null);
    // Add your additional logout logic here if needed
  };

  return (
    <div>
      {loggedInUser ? (
        <AdmitPatient user={loggedInUser} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
