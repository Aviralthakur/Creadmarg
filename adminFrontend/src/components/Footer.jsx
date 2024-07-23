// src/components/Footer.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        marginTop:"auto", 
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} Credmarg. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
