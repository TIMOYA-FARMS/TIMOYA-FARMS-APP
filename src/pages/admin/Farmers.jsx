import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { can } from '../../utils/permissions';

const Farmers = () => {
  const { user } = useAuth();
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' | 'edit'
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '' });
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (user?.role !== 'Admin') return;
    fetchFarmers();
  }, [user]);

  const fetchFarmers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${baseUrl}/admin/farmers`);
      setFarmers(res.data.farmers || res.data);
    } catch (err) {
      setError('Failed to fetch farmers.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (mode, farmer = null) => {
    setDialogMode(mode);
    setSelectedFarmer(farmer);
    setForm(farmer ? { ...farmer } : { firstName: '', lastName: '', email: '', phone: '', address: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFarmer(null);
    setForm({ firstName: '', lastName: '', email: '', phone: '', address: '' });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      if (dialogMode === 'add') {
        await axios.post(`${baseUrl}/admin/farmers`, form);
      } else if (dialogMode === 'edit' && selectedFarmer) {
        await axios.put(`${baseUrl}/admin/farmers/${selectedFarmer._id || selectedFarmer.id}`, form);
      }
      fetchFarmers();
      handleCloseDialog();
    } catch (err) {
      setError('Failed to save farmer.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this farmer?')) return;
    setLoading(true);
    setError('');
    try {
      await axios.delete(`${baseUrl}/admin/farmers/${id}`);
      fetchFarmers();
    } catch (err) {
      setError('Failed to delete farmer.');
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
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleOpenDialog('edit', params.row)}><EditIcon /></IconButton>
          {can(user, 'deleteUser') && (
            <IconButton color="error" onClick={() => handleDelete(params.row._id || params.row.id)}><DeleteIcon /></IconButton>
          )}
        </>
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: { xs: '100%', md: 1100 }, mx: 'auto', mt: 5, p: { xs: 1, md: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>Farmer Management</Typography>
      <Paper sx={{ mb: 3, p: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog('add')} sx={{ mb: 2 }}>Add Farmer</Button>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Box sx={{ width: '100%', overflowX: { xs: 'auto', md: 'visible' } }}>
          <div style={{ minWidth: 600 }}>
            {loading ? <CircularProgress /> : (
              <DataGrid
                rows={farmers}
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
        <DialogTitle>{dialogMode === 'add' ? 'Add Farmer' : 'Edit Farmer'}</DialogTitle>
        <DialogContent>
          <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Email" name="email" value={form.email} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} required type="email" />
          <TextField label="Phone" name="phone" value={form.phone} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Address" name="address" value={form.address} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Farmers; 