import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Divider, Paper, Alert } from '@mui/material';
import CartContext from '../Store/CartContext';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({ name: '', address: '', email: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [emailError, setEmailError] = useState('');

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 3, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Thank you for your order!</Typography>
        <Typography variant="body1">A confirmation has been sent to {form.email}.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3 }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Paper sx={{ mb: 3, p: 2 }}>
        <Typography variant="h6">Order Summary</Typography>
        <List>
          {cart.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={`${item.title} x${item.qty}`}
                secondary={`$${(item.price * item.qty).toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="h6" sx={{ mt: 2 }}>Total: ${totalAmount.toFixed(2)}</Typography>
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
        />
        <TextField
          label="Address"
          name="address"
          value={form.address}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
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
        />
        {emailError && <Alert severity="error" sx={{ mb: 2 }}>{emailError}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={cart.length === 0}
        >
          Place Order
        </Button>
      </form>
    </Box>
  );
};

export default Checkout;
