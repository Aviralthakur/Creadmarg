import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

export default function EditVendorDialog({ vendor, onClose, onUpdate }) {
  const [name, setName] = useState(vendor.name);
  const [upi, setUpi] = useState(vendor.upi);

  const handleUpdate = () => {
    const updatedVendor = {
      ...vendor,
      name,
      upi,
    };
    onUpdate(updatedVendor);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Vendor</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="UPI"
          fullWidth
          variant="outlined"
          value={upi}
          onChange={(e) => setUpi(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleUpdate} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
}
