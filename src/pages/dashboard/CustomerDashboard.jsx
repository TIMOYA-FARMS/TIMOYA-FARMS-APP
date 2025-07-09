import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Button, CircularProgress, Chip, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab, Avatar, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import Orders from '../Orders';
import Cart from '../Cart';
import Checkout from '../Checkout';
import PaidIcon from '@mui/icons-material/Paid';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const getInitial = (user) => {
  if (!user) return '';
  if (user.firstName) return user.firstName[0].toUpperCase();
  if (user.email) return user.email[0].toUpperCase();
  return '';
};

const CustomerDashboard = () => {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
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

  // Order summary calculations
  const totalOrders = orders.length;
  const paidOrders = orders.filter(o => (o.status || '').toLowerCase() === 'paid').length;
  const pendingOrders = orders.filter(o => (o.status || '').toLowerCase() === 'pending').length;
  const totalSpent = orders.reduce((sum, o) => sum + (typeof o.totalPrice === 'number' ? o.totalPrice : parseFloat(o.totalPrice) || 0), 0);

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

  if (authLoading || loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  }

  if (!isAuthenticated) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          User Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'error.main', mb: 3 }}>
          You must <Link to="/login" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 700 }}>Login</Link> or <Link to="/register" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 700 }}>Register</Link> to view your dashboard.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      {/* Greeting with avatar */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', color: '#fff', width: 56, height: 56, fontWeight: 'bold', fontSize: 28, boxShadow: 3 }}>
          {getInitial(user)}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
            Welcome, {user?.firstName || 'User'}!
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            Here's your personalized dashboard overview.
          </Typography>
        </Box>
      </Stack>
      {/* Overview Section Only */}
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={6} sx={{
            p: 3,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            background: 'linear-gradient(135deg, #e0ffe7 0%, #b2f7ef 100%)',
            boxShadow: '0 4px 24px 0 rgba(33,150,83,0.10)',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px) scale(1.03)', boxShadow: 8 },
          }}>
            <Box sx={{ bgcolor: 'primary.main', color: '#fff', borderRadius: '50%', p: 2, boxShadow: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingCartIcon sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>Your Orders</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{totalOrders}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={6} sx={{
            p: 3,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            background: 'linear-gradient(135deg, #fffde4 0%, #f7e8b2 100%)',
            boxShadow: '0 4px 24px 0 rgba(255,214,0,0.10)',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px) scale(1.03)', boxShadow: 8 },
          }}>
            <Box sx={{ bgcolor: 'secondary.main', color: '#fff', borderRadius: '50%', p: 2, boxShadow: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PaidIcon sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700 }}>Total Spent</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>₵{Number(totalSpent).toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={6} sx={{
            p: 3,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            background: 'linear-gradient(135deg, #f7e8b2 0%, #ffe0e0 100%)',
            boxShadow: '0 4px 24px 0 rgba(255,184,0,0.10)',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px) scale(1.03)', boxShadow: 8 },
          }}>
            <Box sx={{ bgcolor: 'warning.main', color: '#fff', borderRadius: '50%', p: 2, boxShadow: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PendingActionsIcon sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: 'warning.main', fontWeight: 700 }}>Your Pending Orders</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>{pendingOrders}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/* Recent Orders */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>Your Recent Orders</Typography>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        {orders.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, background: 'linear-gradient(90deg, #f9f9f9 60%, #e0ffe7 100%)', boxShadow: 1 }}>
            <Typography variant="body1" sx={{ color: '#555' }}>You have not placed any orders yet.</Typography>
          </Paper>
        ) : (
          orders.slice(0, 3).map((order, idx) => (
            <Paper key={idx} elevation={4} sx={{ mb: 3, borderRadius: 3, p: 2, background: 'linear-gradient(90deg, #fffde4 60%, #e0ffe7 100%)', boxShadow: 2 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
                <Chip
                  label={order.status || 'Pending'}
                  color={statusColor(order.status)}
                  size="medium"
                  sx={{ fontWeight: 700, fontSize: '1rem', textTransform: 'capitalize', mb: { xs: 1, sm: 0 } }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main', flexGrow: 1 }}>
                  Order #{order._id || order.id}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', ml: 2, display: 'inline' }}>
                  {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                </Typography>
              </Stack>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  <b>Total:</b> ₵{order.totalPrice ? Number(order.totalPrice).toFixed(2) : '0.00'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  <b>Payment Ref:</b> {order.paymentRef || 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  <b>Shipping Address:</b> {order.shippingAddress ? `${order.shippingAddress.street || ''}, ${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''} (${order.shippingAddress.phone || ''})` : 'N/A'}
                </Typography>
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
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
};

export default CustomerDashboard;
