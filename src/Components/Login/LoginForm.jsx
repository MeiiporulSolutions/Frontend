import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import video from '../Video/new.mp4';

const StyledContainer = styled(Container)({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

const StyledVideo = styled('video')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  zIndex: 1, // Place the form above the video
});

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for user or admin credentials
    if (username === 'user@gmail.com' && password === 'user123') {
      onLogin('user');
    } else if (username === 'admin' && password === 'admin123') {
      onLogin('admin');
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <StyledContainer>
      <StyledVideo autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </StyledVideo>
      <StyledForm onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Login Form
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>
          Login
        </Button>
        <Typography variant="body2" style={{ marginTop: '1rem' }}>
          Forgot password?
        </Typography>
      </StyledForm>
    </StyledContainer>
  );
};

export default LoginForm;
