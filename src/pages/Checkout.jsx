import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Divider, Paper, Alert } from '@mui/material';
import CartContext from '../Store/CartContext';
import usePaystack from '../hooks/usePaystack';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { guestCheckout } from '../Store/guestCartApi';
import { clearGuestId } from '../utils/guestId';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { showSuccess, showError, showInfo } = useNotification();
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
      showError('Please enter a valid email address.', 'Invalid Email');
      return;
    } else {
      setEmailError('');
    }
    if (cart.length === 0) {
      setError('Your cart is empty.');
      showError('Your cart is empty.', 'Empty Cart');
      return;
    }
    // Generate a unique reference for Paystack and order
    const reference = `TIMFARM-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    setPaymentRef(reference);
    setLoading(true);
    showInfo('Processing your payment...', 'Payment in Progress');

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
            if (isAuthenticated) {
              // Authenticated user order
              await axios.post(`${baseUrl}/checkout`, {
                shippingAddress: { email: form.email },
                products: cart.map(item => ({ product: item.id, quantity: item.qty })),
                paymentRef: reference,
                amount: totalAmount,
              });
            } else {
              // Guest order
              await guestCheckout({
                shippingAddress: { email: form.email },
                products: cart.map(item => ({ product: item.id, quantity: item.qty })),
                paymentRef: reference,
                amount: totalAmount,
              });
            }
            // 2. Verify payment
            await axios.get(`${baseUrl}/payment/verify/${reference}`);
            if (typeof window !== 'undefined') {
              const event = new Event('orders-updated');
              window.dispatchEvent(event);
            }
            setOrderPlaced(true);
            clearCart();
            if (!isAuthenticated) clearGuestId();
            showSuccess('Order placed successfully! Check your email for confirmation.', 'Order Confirmed');
          } catch (err) {
            const errorMessage = err.response?.data?.message || 'Order creation or payment verification failed. Please contact support.';
            setError(errorMessage);
            showError(errorMessage, 'Order Failed');
          } finally {
            setLoading(false);
          }
        })();
      },
      onClose: function() {
        setLoading(false);
        showInfo('Payment was cancelled. You can try again.', 'Payment Cancelled');
      },
    });
  };

  if (orderPlaced) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 3, textAlign: 'center' }}>
        <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>Thank you for your order!</Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>A confirmation has been sent to {form.email}.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: { xs: 1, md: 3 } }}>
      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, background: 'linear-gradient(135deg, #e0ffe7 0%, #fffde4 100%)', boxShadow: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
          <ShoppingCartCheckoutIcon sx={{ fontSize: 36, color: 'primary.main', mr: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 0, letterSpacing: 1, textAlign: 'center' }}>Checkout</Typography>
        </Box>
        <Paper sx={{ mb: 3, p: 2, borderRadius: 3, background: 'linear-gradient(90deg, #fffde4 60%, #e0ffe7 100%)', boxShadow: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>Order Summary</Typography>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={<span style={{ fontWeight: 600 }}>{item.title} x{item.qty}</span>}
                  secondary={<span style={{ color: '#219653', fontWeight: 700 }}>₵{(item.price * item.qty).toFixed(2)}</span>}
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
            sx={{ mb: 2, background: '#fff', borderRadius: 2 }}
            disabled={loading}
          />
          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2, background: '#fff', borderRadius: 2 }}
            disabled={loading}
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
            sx={{ mb: 2, background: '#fff', borderRadius: 2 }}
            disabled={loading}
          />
          {emailError && <Alert severity="error" sx={{ mb: 2 }}>{emailError}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={cart.length === 0 || loading}
            sx={{ py: 1.5, fontWeight: 700, fontSize: '1.1rem', borderRadius: 2, boxShadow: 2, letterSpacing: 1, textTransform: 'uppercase', mt: 1 }}
          >
            {loading ? 'Processing...' : 'Pay & Place Order'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Checkout;
