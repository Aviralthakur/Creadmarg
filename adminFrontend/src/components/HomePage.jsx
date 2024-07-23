import React, {useEffect} from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function HomePage() {


  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding={2} // Optional: Adds padding around the Box
      bgcolor="#f5f5f5" // Optional: Adds a background color to the Box
    >
      <Container maxWidth="sm"> {/* Set a maxWidth to control container width */}
        <Typography variant="h4" gutterBottom align="center">
          Welcome to the Admin Dashboard
        </Typography>
        <Typography variant="body1" align="center">
          Use the navigation bar to create and manage employees and vendors, send emails, and view email logs.
        </Typography>
      </Container>
    </Box>
  );
}
