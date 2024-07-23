import React, { useState ,useEffect} from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import api from '../constant/api';

export default function SendEmail() {
  const [vendorEmail, setVendorEmail] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/send-email', { vendorEmail });
      alert('Email sent successfully');
      setVendorEmail('');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <Container style={{ margin: '20px' }}>
      <Box
        sx={{
          border: '1px solid grey',
          borderRadius: '8px',
          padding: '20px',
          margin: '20px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Send Email
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Vendor Email"
            type="email"
            value={vendorEmail}
            onChange={(e) => setVendorEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Send Email
          </Button>
        </form>
      </Box>
    </Container>
  );
}
