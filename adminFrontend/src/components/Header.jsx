import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Button color="inherit" component={Link} to="/create-employee">Create Employee</Button>
        <Button color="inherit" component={Link} to="/create-vendor">Create Vendor</Button>
        <Button color="inherit" component={Link} to="/send-email">Send Email</Button>
        <Button color="inherit" component={Link} to="/email-logs">Email Logs</Button>
        <Button color="inherit" component={Link} to="/employees">Employees</Button>
        <Button color="inherit" component={Link} to="/vendors">Vendors</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
