import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Orders = () => {
  // Placeholder: In a real app, fetch order history from backend or local storage
  const orders = [];

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 5, p: 3 }}>
      <Typography variant="h4" gutterBottom>My Orders</Typography>
      {orders.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">You have not placed any orders yet.</Typography>
        </Paper>
      ) : (
        orders.map((order, idx) => (
          <Paper key={idx} sx={{ mb: 2, p: 2 }}>
            <Typography variant="h6">Order #{order.id}</Typography>
            {/* Add more order details here */}
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Orders;
