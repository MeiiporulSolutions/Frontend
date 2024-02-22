import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

function AddExtraWardWithBed() {
  const [wardName, setWardName] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to add the extra ward with bed
      const response = await axios.post('/add', {
        wardName,
        bedNumber,
      });

      if (response.status === 201) {
        setMessage('Extra ward and bed added successfully.');
        setError(''); // Clear any previous error message
        setWardName(''); // Clear the input field for ward name
        setBedNumber(''); // Clear the input field for bed number
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred.');
      } else {
        setError('An error occurred.');
      }
    }
  };

  return (
    <div>
      <Typography variant="h4">Add Extra Ward with Bed</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Ward Name"
            type="text"
            value={wardName}
            onChange={(e) => setWardName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Bed Number"
            type="text"
            value={bedNumber}
            onChange={(e) => setBedNumber(e.target.value)}
          />
        </div>
        <Button variant="contained" type="submit" color="primary">
          Add Extra Ward with Bed
        </Button>
      </form>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
}

export default AddExtraWardWithBed;