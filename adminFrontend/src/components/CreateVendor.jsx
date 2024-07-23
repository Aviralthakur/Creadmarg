import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import api from '../constant/api';

export default function CreateVendor() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    upi: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/vendors', formValues);
      alert('Vendor created successfully');
      setFormValues({
        name: '',
        email: '',
        upi: '',
      });
    } catch (error) {
      console.error('Error creating vendor:', error);
      alert('Failed to create vendor');
    }
  };

  return (
    <Container>
      <Box
        sx={{
          border: '1px solid grey', 
          borderRadius: '8px', 
          padding: '20px', 
          margin: '20px', 
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h4" gutterBottom>Create Vendor</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="UPI"
            name="upi"
            value={formValues.upi}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">Create Vendor</Button>
        </form>
      </Box>
    </Container>
  );
}
