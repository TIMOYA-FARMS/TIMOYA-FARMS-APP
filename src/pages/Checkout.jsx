import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Divider, Paper, Alert } from '@mui/material';
import CartContext from '../Store/CartContext';
import usePaystack from '../hooks/usePaystack';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({ name: '', address: '', email: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, user } = useAuth();
  const payWithPaystack = usePaystack();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [paymentRef, setPaymentRef] = useState('');

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }
    if (!isAuthenticated) {
      setError('You must be logged in to checkout.');
      return;
    }
    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    // Generate a unique reference for Paystack and order
    const reference = `TIMFARM-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    setPaymentRef(reference);
    setLoading(true);
    payWithPaystack({
      email: form.email,
      amount: totalAmount,
      reference,
      metadata: {
        name: form.name,
        address: form.address,
        cart: cart.map(item => ({
          product: item.id,
          quantity: item.qty,
        })),
      },
      callback: function(response) {
        (async () => {
          try {
            // 1. Create the order with paymentRef
            const orderRes = await axios.post(`${baseUrl}/checkout`, {
              name: form.name,
              address: form.address,
              email: form.email,
              products: cart.map(item => ({ product: item.id, quantity: item.qty })),
              paymentRef: reference, // Always set paymentRef
              amount: totalAmount,
            });
            // 2. Verify payment
            const verifyRes = await axios.get(`${baseUrl}/payment/verify/${reference}`);
            // 3. Refetch orders if possible (optional, for immediate UI update)
            if (typeof window !== 'undefined') {
              const event = new Event('orders-updated');
              window.dispatchEvent(event);
            }
            setOrderPlaced(true);
            clearCart();
          } catch (err) {
            setError('Order creation or payment verification failed. Please contact support.');
          } finally {
            setLoading(false);
          }
        })();
      },
      onClose: function() {
        setLoading(false);
      },
    });
  };

  if (orderPlaced) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>Thank you for your order!</Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>A confirmation has been sent to {form.email}.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>Checkout</Typography>
      {!isAuthenticated && (
        <Typography variant="body2" sx={{ color: 'error.main', mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          Please <a href="/login" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 700 }}>Login</a> or <a href="/register" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 700 }}>Register</a> to place your order.
        </Typography>
      )}
      <Paper sx={{ mb: 3, p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>Order Summary</Typography>
        <List>
          {cart.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={`${item.title} x${item.qty}`}
                secondary={`₵${(item.price * item.qty).toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main' }}>Total: ₵{totalAmount.toFixed(2)}</Typography>
      </Paper>
      <form onSubmit={handlePlaceOrder}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          disabled={!isAuthenticated || loading}
        />
        <TextField
          label="Address"
          name="address"
          value={form.address}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          disabled={!isAuthenticated || loading}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!emailError}
          helperText={emailError}
          sx={{ mb: 2 }}
          disabled={!isAuthenticated || loading}
        />
        {emailError && <Alert severity="error" sx={{ mb: 2 }}>{emailError}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={cart.length === 0 || !isAuthenticated || loading}
        >
          {loading ? 'Processing...' : 'Pay & Place Order'}
        </Button>
      </form>
    </Box>
  );
};

export default Checkout;
