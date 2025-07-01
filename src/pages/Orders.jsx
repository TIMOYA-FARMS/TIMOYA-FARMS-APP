import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Orders = () => {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${baseUrl}/orders`);
        setOrders(res.data.orders || res.data);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
    // Listen for order updates
    const handler = () => fetchOrders();
    window.addEventListener('orders-updated', handler);
    return () => window.removeEventListener('orders-updated', handler);
  }, [isAuthenticated]);

  const statusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'paid': return 'success';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'delivered': return 'secondary';
      case 'cancelled': return 'error';
      case 'refunded': return 'warning';
      default: return 'default';
    }
  };

  // Order summary calculations
  const totalOrders = orders.length;
  const paidOrders = orders.filter(o => (o.status || '').toLowerCase() === 'paid').length;
  const pendingOrders = orders.filter(o => (o.status || '').toLowerCase() === 'pending').length;
  const totalSpent = orders.reduce((sum, o) => sum + (typeof o.totalPrice === 'number' ? o.totalPrice : parseFloat(o.totalPrice) || 0), 0);

  const downloadInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Order Invoice', 14, 18);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id || order.id}`, 14, 28);
    doc.text(`Date: ${order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}`, 14, 36);
    doc.text(`Status: ${order.status || 'Pending'}`, 14, 44);
    doc.text(`Total: ₵${order.totalPrice ? Number(order.totalPrice).toFixed(2) : '0.00'}`, 14, 52);
    doc.text(`Payment Ref: ${order.paymentRef || 'N/A'}`, 14, 60);
    doc.text(`Shipping Address: ${order.shippingAddress ? `${order.shippingAddress.street || ''}, ${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''} (${order.shippingAddress.phone || ''})` : 'N/A'}`, 14, 68);
    doc.autoTable({
      startY: 76,
      head: [['Product', 'Qty', 'Price']],
      body: (order.products || []).map(item => [
        item.product?.name || item.product?.title || 'Product',
        item.quantity,
        `₵${Number(item.price).toFixed(2)}`
      ]),
    });
    doc.save(`Invoice_${order._id || order.id}.pdf`);
  };

  if (authLoading || loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  }

  if (!isAuthenticated) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          My Orders
        </Typography>
        <Typography variant="body1" sx={{ color: 'error.main', mb: 3 }}>
          You must <a href="/login" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 700 }}>Login</a> or <a href="/register" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 700 }}>Register</a> to view your orders.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 5, p: 3 }}>
      {/* Order Summary */}
      <Paper sx={{ mb: 3, p: 2, background: '#f7f7f7' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>Order Summary</Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>Total Orders: <b>{totalOrders}</b></Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>Paid Orders: <b>{paidOrders}</b></Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>Pending Orders: <b>{pendingOrders}</b></Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>Total Spent: <b>₵{totalSpent.toFixed(2)}</b></Typography>
      </Paper>
      {/* Orders List */}
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      {orders.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#555' }}>You have not placed any orders yet.</Typography>
        </Paper>
      ) : (
        orders.map((order, idx) => (
          <Accordion key={idx} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Order #{order._id || order.id}
                </Typography>
                <Chip
                  label={order.status || 'Pending'}
                  color={statusColor(order.status)}
                  size="small"
                  sx={{ ml: 2, textTransform: 'capitalize' }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', ml: 2, display: 'inline' }}>
                  {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                <b>Total:</b> ₵{order.totalPrice ? Number(order.totalPrice).toFixed(2) : '0.00'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                <b>Payment Ref:</b> {order.paymentRef || 'N/A'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                <b>Shipping Address:</b> {order.shippingAddress ? `${order.shippingAddress.street || ''}, ${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''} (${order.shippingAddress.phone || ''})` : 'N/A'}
              </Typography>
              {order.trackingNumber && (
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  <b>Tracking Number:</b> {order.trackingNumber}
                </Typography>
              )}
              {order.notes && (
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  <b>Notes:</b> {order.notes}
                </Typography>
              )}
              {order.cancelReason && (
                <Typography variant="body2" sx={{ color: 'error.main', mb: 1 }}>
                  <b>Cancel Reason:</b> {order.cancelReason}
                </Typography>
              )}
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                <b>Products:</b>
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {(order.products || []).map((item, i) => (
                  <li key={i}>
                    {item.product?.name || item.product?.title || 'Product'} x{item.quantity} (₵{Number(item.price).toFixed(2)})
                  </li>
                ))}
              </ul>
              <Box sx={{ mt: 2 }}>
                <Chip
                  label="Download Invoice"
                  color="primary"
                  variant="outlined"
                  onClick={() => downloadInvoice(order)}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
};

export default Orders;

