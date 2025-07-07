import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { can } from '../../utils/permissions';

const roles = [
  { value: 'User', label: 'User' },
  { value: 'Farmer', label: 'Farmer' },
  { value: 'Admin', label: 'Admin' },
];

const Users = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', role: 'User' });
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (user?.role !== 'Admin') return;
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${baseUrl}/users`);
      setUsers(res.data.users || res.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch users.';
      setError(errorMessage);
      showError(errorMessage, 'Fetch Error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (user = null) => {
    setSelectedUser(user);
    if (user) {
      // Filter out sensitive fields that shouldn't be editable
      const { avatar, _id, __v, createdAt, updatedAt, password, resetPasswordToken, resetPasswordExpires, ...editableFields } = user;
      setForm(editableFields);
    } else {
      setForm({ firstName: '', lastName: '', email: '', phone: '', address: '', role: 'User' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setForm({ firstName: '', lastName: '', email: '', phone: '', address: '', role: 'User' });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      // Only send fields that are allowed by the backend validator
      const updateData = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        address: form.address || '',
        phone: form.phone || '',
        role: form.role
      };
      
      await axios.patch(`${baseUrl}/users/update`, updateData);
      await fetchUsers();
      handleCloseDialog();
      showSuccess(`User ${form.firstName} ${form.lastName} updated successfully!`, 'User Updated');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update user.';
      setError(errorMessage);
      showError(errorMessage, 'Update Error');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'Admin') {
    return <Box sx={{ p: 4, textAlign: 'center' }}><Typography variant="h6" color="error">Access denied. Admins only.</Typography></Box>;
  }

  const columns = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleOpenDialog(params.row)}><EditIcon /></IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: { xs: '100%', md: 1100 }, mx: 'auto', mt: 5, p: { xs: 1, md: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>User Management</Typography>
      <Paper sx={{ mb: 3, p: 2 }}>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Box sx={{ width: '100%', overflowX: { xs: 'auto', md: 'visible' } }}>
          <div style={{ minWidth: 600 }}>
            {loading ? <CircularProgress /> : (
              <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row._id || row.id}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                disableSelectionOnClick
                autoHeight
              />
            )}
          </div>
        </Box>
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Email" name="email" value={form.email} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} required type="email" disabled />
          <TextField label="Phone" name="phone" value={form.phone} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Address" name="address" value={form.address} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} />
          <TextField select label="Role" name="role" value={form.role} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} required>
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users; 