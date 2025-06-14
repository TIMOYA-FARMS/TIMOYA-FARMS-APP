import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';

const AdminDashboard = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main', letterSpacing: 1 }}>
        Welcome, Admin!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <GroupIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Customers</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>30</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <StoreIcon color="secondary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Farmers</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>10</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <ShoppingCartIcon color="success" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Orders</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>50</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <BarChartIcon color="info" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Sales</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>$5,000</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/* Add more widgets: Analytics, Management Links, etc. */}
    </Box>
  );
};

export default AdminDashboard;
