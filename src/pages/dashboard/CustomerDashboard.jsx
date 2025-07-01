import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main', letterSpacing: 1 }}>
        Welcome, Customer!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <ShoppingCartIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Orders</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>3</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocalOfferIcon color="secondary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Total Spent</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>₵120.00</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Recommended</Typography>
            <Button 
              component={Link} 
              to="/products"
              variant="contained" 
              color="secondary" 
              sx={{ 
                ml: 2,
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(255,184,0,0.15)',
                textTransform: 'uppercase',
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              Shop Now
            </Button>
          </Paper>
        </Grid>
      </Grid>
      {/* Add more widgets: Recent Orders, Quick Actions, etc. */}
    </Box>
  );
};

export default CustomerDashboard;
