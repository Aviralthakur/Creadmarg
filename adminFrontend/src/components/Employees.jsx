import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography as MuiTypography } from '@mui/material';
import api from '../constant/api';
import EditEmployeeDialog from './EditEmployeeDialog';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (employeeToDelete) {
        await api.delete(`/employees/${employeeToDelete.email}`);
        alert('Employee deleted successfully');
        fetchEmployees();
        setOpenConfirmDialog(false);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
      setOpenConfirmDialog(false);
    }
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentEmployee(null);
  };

  const handleUpdate = async (updatedEmployee) => {
    try {
      await api.put(`/employees/${updatedEmployee.email}`, updatedEmployee);
      alert('Employee updated successfully');
      fetchEmployees();
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee');
    }
  };

  return (
    <Container style={{ margin: '20px' }}>
      <Typography variant="h4" gutterBottom>Employees</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>CTC</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(emp => (
              <TableRow key={emp.email}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.designation}</TableCell>
                <TableCell>{emp.ctc}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                      setEmployeeToDelete(emp);
                      setOpenConfirmDialog(true);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openDialog && (
        <EditEmployeeDialog
          employee={currentEmployee}
          onClose={handleCloseDialog}
          onUpdate={handleUpdate}
        />
      )}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <MuiTypography>Are you sure you want to delete the employee {employeeToDelete?.name}?</MuiTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
