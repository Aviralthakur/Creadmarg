import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import api from '../constant/api';

export default function EmailLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await api.get('/email-logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching email logs:', error);
      }
    }
    fetchLogs();
  }, []);


  return (
    <Container style={{ margin: '20px' }}>
      <Typography variant="h4" gutterBottom>Email Logs</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Sent At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map(log => (
              <TableRow key={log.id}>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>{log.sentAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
