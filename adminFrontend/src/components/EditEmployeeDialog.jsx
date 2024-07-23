import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

export default function EditEmployeeDialog({ employee, onClose, onUpdate }) {
  const [name, setName] = useState(employee.name);
  const [designation, setDesignation] = useState(employee.designation);
  const [ctc, setCtc] = useState(employee.ctc);

  const handleUpdate = () => {
    const updatedEmployee = {
      ...employee,
      name,
      designation,
      ctc,
    };
    onUpdate(updatedEmployee);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Employee</DialogTitle>
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
          label="Designation"
          fullWidth
          variant="outlined"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <TextField
          margin="dense"
          label="CTC"
          fullWidth
          variant="outlined"
          type="number"
          value={ctc}
          onChange={(e) => setCtc(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleUpdate} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
}
