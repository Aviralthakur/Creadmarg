import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import api from '../constant/api';

export default function CreateEmployee() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    designation: '',
    ctc: '',
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
      await api.post('/employees', formValues);
      alert('Employee created successfully');
      setFormValues({
        name: '',
        email: '',
        designation: '',
        ctc: '',
      });
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Failed to create employee');
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
        <Typography variant="h4" gutterBottom>Create Employee</Typography>
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
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Designation</InputLabel>
            <Select
              name="designation"
              value={formValues.designation}
              onChange={handleChange}
              label="Designation"
            >
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Analyst">Analyst</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="CTC"
            type="number"
            name="ctc"
            value={formValues.ctc}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">Create Employee</Button>
        </form>
      </Box>
    </Container>
  );
}
