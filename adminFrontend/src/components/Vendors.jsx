import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography as MuiTypography } from '@mui/material';
import api from '../constant/api';
import EditVendorDialog from './EditVendorDialog';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await api.get('/vendors');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (vendorToDelete) {
        await api.delete(`/vendors/${vendorToDelete.email}`);
        alert('Vendor deleted successfully');
        fetchVendors();
        setOpenConfirmDialog(false); 
      }
    } catch (error) {
      console.error('Error deleting vendor:', error);
      alert('Failed to delete vendor');
      setOpenConfirmDialog(false); 
    }
  };

  const handleUpdate = async (updatedVendor) => {
    try {
      await api.put(`/vendors/${updatedVendor.email}`, updatedVendor);
      alert('Vendor updated successfully');
      fetchVendors();
      setSelectedVendor(null);
    } catch (error) {
      console.error('Error updating vendor:', error);
      alert('Failed to update vendor');
    }
  };

  return (
    <Container style={{margin:"20px"}}>
      <Typography variant="h4" gutterBottom>Vendors</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>UPI</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors.map(vendor => (
              <TableRow key={vendor.email}>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.upi}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      setVendorToDelete(vendor);
                      setOpenConfirmDialog(true);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSelectedVendor(vendor)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedVendor && (
        <EditVendorDialog
          vendor={selectedVendor}
          onClose={() => setSelectedVendor(null)}
          onUpdate={handleUpdate}
        />
      )}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <MuiTypography>Are you sure you want to delete the vendor {vendorToDelete?.name}?</MuiTypography>
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
