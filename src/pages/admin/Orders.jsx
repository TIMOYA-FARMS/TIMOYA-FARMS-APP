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
  const [hasError, setHasError] = useState(false);
  const [renderError, setRenderError] = useState(false);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (user?.role !== 'Admin') return;
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      // Try the admin-specific endpoint first
      let res;
      try {
        res = await axios.get(`${baseUrl}/orders/admin/all`);
      } catch (adminError) {
        console.log('Admin endpoint failed, trying regular orders endpoint:', adminError);
        // Fallback to regular orders endpoint
        res = await axios.get(`${baseUrl}/orders`);
      }
      
      console.log('Raw admin orders response:', res.data);
      let orders = res.data.orders || res.data;
      
      // Normalize: ensure id, totalPrice, and createdAt are present and correct
      orders = orders.map(o => {
        console.log('Processing order:', o);
        const normalized = {
          ...o,
          // Ensure we have a valid ID
          _id: o._id || o.id || `order_${Date.now()}_${Math.random()}`,
          // Handle totalPrice - it comes from the getter as a string, convert to number
          totalPrice: typeof o.totalPrice === 'string' ? parseFloat(o.totalPrice) : Number(o.totalPrice || 0),
          // Ensure date
          createdAt: o.createdAt || new Date().toISOString(),
          // Ensure status
          status: o.status || 'Pending',
          // Handle user - it might be null/undefined for guest orders
          user: o.user || null,
          // Handle products - ensure it's an array and each item has the right structure
          products: Array.isArray(o.products) ? o.products.map(item => ({
            ...item,
            quantity: Number(item.quantity || 1),
            price: Number(item.price || 0)
          })) : []
        };
        console.log('Normalized order:', normalized);
        return normalized;
      });
      
      console.log('Final orders array:', orders);
      
      // Ensure we have a valid array
      if (!Array.isArray(orders)) {
        console.error('Orders is not an array:', orders);
        setOrders([]);
        setError('Invalid data format received from server');
        return;
      }
      
      // Debug: Check the first order structure
      if (orders.length > 0) {
        console.log('First order structure:', orders[0]);
        console.log('First order fields:', {
          id: orders[0].id,
          _id: orders[0]._id,
          totalPrice: orders[0].totalPrice,
          totalPriceType: typeof orders[0].totalPrice,
          status: orders[0].status,
          createdAt: orders[0].createdAt,
          user: orders[0].user,
          products: orders[0].products
        });
        
        // Check if products are populated
        if (orders[0].products && orders[0].products.length > 0) {
          console.log('First product structure:', orders[0].products[0]);
        }
      }
      
      setOrders(orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      const errorMessage = err.response?.data?.message || 'Failed to fetch orders.';
      setError(errorMessage);
      setHasError(true); // Set hasError to true on error
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

  if (hasError || renderError) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          Something went wrong loading the orders.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => {
            setHasError(false);
            setRenderError(false);
            setError('');
            fetchOrders();
          }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  // Define columns outside the render to avoid recreation
  const columns = [
    {
      field: '_id',
      headerName: 'Order ID',
      flex: 1,
    },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 1,
      renderCell: (params) => {
        const user = params.row.user;
        if (user) {
          const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
          return name || user.email || 'N/A';
        }
        return params.row.shippingAddress?.email || 'Guest';
      },
    },
    {
      field: 'totalPrice',
      headerName: 'Total (₵)',
      flex: 1,
      renderCell: (params) => `₵${Number(params.row.totalPrice || 0).toFixed(2)}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      renderCell: (params) => params.row.createdAt ? new Date(params.row.createdAt).toLocaleString() : 'N/A',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleOpenDialog('view', params.row)}>
            <VisibilityIcon />
          </IconButton>
          {can(user, 'updateProfiles') && (
            <IconButton color="secondary" onClick={() => handleOpenDialog('edit', params.row)}>
              <EditIcon />
            </IconButton>
          )}
          {can(user, 'deleteProfile') && (
            <IconButton color="error" onClick={() => handleDelete(params.row._id || params.row.id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  // Simple fallback if there's any issue with the main render
  try {
    return (
      <Box sx={{ maxWidth: { xs: '100%', md: 1200 }, mx: 'auto', mt: 5, p: { xs: 1, md: 3 } }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>Order Management</Typography>
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Paper sx={{ mb: 3, p: 2 }}>
            <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
          </Paper>
        )}

        {!loading && !error && (
          <Paper sx={{ mb: 3, p: 2 }}>
            <Box sx={{ width: '100%', overflowX: { xs: 'auto', md: 'visible' } }}>
              <div style={{ minWidth: 700 }}>
                {orders.length === 0 ? (
                  <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                    No orders found.
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                      Showing {orders.length} orders
                    </Typography>
                    <Box sx={{ height: 400, width: '100%' }}>
                      {(() => {
                        try {
                          return (
                            <DataGrid
                              rows={orders}
                              columns={columns}
                              getRowId={(row) => row._id || row.id || `fallback_${Math.random()}`}
                              pageSize={10}
                              rowsPerPageOptions={[10, 20, 50]}
                              disableSelectionOnClick
                            />
                          );
                        } catch (error) {
                          console.error('DataGrid render error:', error);
                          return (
                            <Box sx={{ p: 2, textAlign: 'center' }}>
                              <Typography color="error" sx={{ mb: 2 }}>
                                Error rendering orders table. Showing basic view:
                              </Typography>
                              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                                {orders.map((order, index) => (
                                  <Box key={order._id || index} sx={{ p: 1, border: '1px solid #ddd', mb: 1 }}>
                                    <Typography variant="body2">
                                      <strong>Order ID:</strong> {order._id || order.id || 'N/A'} | 
                                      <strong>Customer:</strong> {order.user ? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim() || order.user.email || 'Guest' : 'Guest'} | 
                                      <strong>Total:</strong> ₵{Number(order.totalPrice || 0).toFixed(2)} | 
                                      <strong>Status:</strong> {order.status || 'Pending'}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          );
                        }
                      })()}
                    </Box>
                  </>
                )}
              </div>
            </Box>
          </Paper>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{dialogMode === 'view' ? 'Order Details' : 'Update Order Status'}</DialogTitle>
          <DialogContent>
            {selectedOrder && (
              <>
                <Typography variant="body2" sx={{ mb: 1 }}><b>Order ID:</b> {selectedOrder.id || selectedOrder._id}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Customer:</b> {
                    selectedOrder.user ? 
                      `${selectedOrder.user.firstName || ''} ${selectedOrder.user.lastName || ''}`.trim() || 
                      selectedOrder.user.email || 
                      `User ${selectedOrder.user.id}` || 
                      'N/A'
                    : 'Guest'
                  }
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}><b>Total:</b> ₵{Number(selectedOrder.totalPrice || 0).toFixed(2)}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}><b>Status:</b> {selectedOrder.status || 'Pending'}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}><b>Created At:</b> {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : 'N/A'}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}><b>Payment Ref:</b> {selectedOrder.paymentRef || 'N/A'}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Shipping Address:</b> {
                    selectedOrder.shippingAddress ? 
                      `${selectedOrder.shippingAddress.street || ''}, ${selectedOrder.shippingAddress.city || ''}, ${selectedOrder.shippingAddress.state || ''} (${selectedOrder.shippingAddress.phone || ''})` 
                      : 'N/A'
                  }
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}><b>Products:</b></Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {(selectedOrder.products || []).map((item, i) => (
                    <li key={i}>
                      {item.product?.productName || item.product?.name || item.product?.title || 'Product'} x{item.quantity} (₵{Number(item.price || 0).toFixed(2)})
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
  } catch (error) {
    console.error('Render error:', error);
    setRenderError(true);
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          Something went wrong rendering the orders.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => {
            setRenderError(false);
            window.location.reload();
          }}
        >
          Reload Page
        </Button>
      </Box>
    );
  }
};

export default Orders;