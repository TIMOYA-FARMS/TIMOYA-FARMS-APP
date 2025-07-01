import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { can } from '../../utils/permissions';

const statusOptions = [
  'Pending', 'Processing', 'Paid', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'
];

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('view'); // 'view' | 'edit'
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState('Pending');
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (user?.role !== 'Admin') return;
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${baseUrl}/orders/admin/all`);
      setOrders(res.data.orders || res.data);
    } catch (err) {
      setError('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (mode, order = null) => {
    setDialogMode(mode);
    setSelectedOrder(order);
    setStatus(order ? order.status : 'Pending');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
    setStatus('Pending');
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    setLoading(true);
    setError('');
    try {
      await axios.put(`${baseUrl}/admin/orders/${selectedOrder._id || selectedOrder.id}/status`, { status });
      fetchOrders();
      handleCloseDialog();
    } catch (err) {
      setError('Failed to update order status.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    setLoading(true);
    setError('');
    try {
      await axios.delete(`${baseUrl}/admin/orders/${id}`);
      fetchOrders();
    } catch (err) {
      setError('Failed to delete order.');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'Admin') {
    return <Box sx={{ p: 4, textAlign: 'center' }}><Typography variant="h6" color="error">Access denied. Admins only.</Typography></Box>;
  }

  const columns = [
    { field: '_id', headerName: 'Order ID', flex: 1 },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 1,
      valueGetter: (params) =>
        params && params.row && params.row.user
          ? `${params.row.user.firstName || ''} ${params.row.user.lastName || ''}`.trim() || 'N/A'
          : 'N/A',
    },
    { field: 'totalPrice', headerName: 'Total (₵)', flex: 1, valueFormatter: (params) => `₵${Number(params.value).toFixed(2)}` },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'createdAt', headerName: 'Created At', flex: 1, valueFormatter: (params) => new Date(params.value).toLocaleString() },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleOpenDialog('view', params.row)}><VisibilityIcon /></IconButton>
          {can(user, 'updateProfiles') && (
            <IconButton color="secondary" onClick={() => handleOpenDialog('edit', params.row)}><EditIcon /></IconButton>
          )}
          {can(user, 'deleteProfile') && (
            <IconButton color="error" onClick={() => handleDelete(params.row._id || params.row.id)}><DeleteIcon /></IconButton>
          )}
        </>
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: { xs: '100%', md: 1200 }, mx: 'auto', mt: 5, p: { xs: 1, md: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>Order Management</Typography>
      <Paper sx={{ mb: 3, p: 2 }}>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Box sx={{ width: '100%', overflowX: { xs: 'auto', md: 'visible' } }}>
          <div style={{ minWidth: 700 }}>
            {loading ? <CircularProgress /> : (
              <DataGrid
                rows={orders}
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
        <DialogTitle>{dialogMode === 'view' ? 'Order Details' : 'Update Order Status'}</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}><b>Order ID:</b> {selectedOrder._id || selectedOrder.id}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}><b>Customer:</b> {selectedOrder.user?.firstName} {selectedOrder.user?.lastName}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}><b>Total:</b> ₵{Number(selectedOrder.totalPrice).toFixed(2)}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}><b>Status:</b> {selectedOrder.status}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}><b>Created At:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}><b>Payment Ref:</b> {selectedOrder.paymentRef || 'N/A'}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}><b>Shipping Address:</b> {selectedOrder.shippingAddress ? `${selectedOrder.shippingAddress.street || ''}, ${selectedOrder.shippingAddress.city || ''}, ${selectedOrder.shippingAddress.state || ''} (${selectedOrder.shippingAddress.phone || ''})` : 'N/A'}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}><b>Products:</b></Typography>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {(selectedOrder.products || []).map((item, i) => (
                  <li key={i}>
                    {item.product?.name || item.product?.title || 'Product'} x{item.quantity} (₵{Number(item.price).toFixed(2)})
                  </li>
                ))}
              </ul>
            </>
          )}
          {dialogMode === 'edit' && (
            <TextField select label="Status" value={status} onChange={handleStatusChange} fullWidth sx={{ mt: 2 }}>
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {dialogMode === 'edit' && <Button onClick={handleUpdateStatus} variant="contained">Update</Button>}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Orders; 