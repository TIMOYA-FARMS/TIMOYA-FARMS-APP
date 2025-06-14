import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Orders = () => {
  // Placeholder: In a real app, fetch order history from backend or local storage
  const orders = [];
  const isLoggedIn = false; // Replace with real auth logic

  if (!isLoggedIn) {
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
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>My Orders</Typography>
      {orders.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#555' }}>You have not placed any orders yet.</Typography>
        </Paper>
      ) : (
        orders.map((order, idx) => (
          <Paper key={idx} sx={{ mb: 2, p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>Order #{order.id}</Typography>
            {/* Add more order details here */}
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Orders;
