import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const FarmerDashboard = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main', letterSpacing: 1 }}>
        Welcome, Farmer!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocalShippingIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Deliveries</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>5</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <MonetizationOnIcon color="secondary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Pending Payments</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>$200.00</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Opportunities</Typography>
            <Button variant="contained" color="secondary" sx={{ ml: 2 }}>View</Button>
          </Paper>
        </Grid>
      </Grid>
      {/* Add more widgets: Recent Deliveries, Quick Actions, etc. */}
    </Box>
  );
};

export default FarmerDashboard;
