import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Divider, Button, CircularProgress } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const adminNav = [
  { label: 'Users', icon: <GroupIcon />, path: '/dashboard/admin/users' },
  { label: 'Products', icon: <StoreIcon />, path: '/dashboard/admin/products' },
  { label: 'Orders', icon: <ShoppingCartIcon />, path: '/dashboard/admin/orders' },
  { label: 'Farmers', icon: <GroupIcon />, path: '/dashboard/admin/farmers' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [stats, setStats] = useState({ users: 0, farmers: 0, orders: 0, sales: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch users and orders from backend endpoints
        const usersRes = await axios.get(`${baseUrl}/users`);
        const ordersRes = await axios.get(`${baseUrl}/orders`);
        const users = usersRes.data.users || usersRes.data;
        const orders = ordersRes.data.orders || ordersRes.data;
        setStats({
          users: users.filter(u => u.role === 'User').length,
          farmers: users.filter(u => u.role === 'Farmer').length,
          orders: orders.length,
          sales: orders.filter(o => (o.status || '').toLowerCase() === 'paid')
            .reduce((sum, o) => sum + (typeof o.totalPrice === 'number' ? o.totalPrice : parseFloat(o.totalPrice) || 0), 0),
        });
      } catch (err) {
        setStats({ users: 0, farmers: 0, orders: 0, sales: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [baseUrl]);

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main', letterSpacing: 1 }}>
        Welcome, Admin!
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
              <GroupIcon color="primary" sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="subtitle1">Users</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{stats.users}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
              <StoreIcon color="secondary" sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="subtitle1">Farmers</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{stats.farmers}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
              <ShoppingCartIcon color="success" sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="subtitle1">Orders</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{stats.orders}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
              <BarChartIcon color="info" sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="subtitle1">Sales</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>₵{Number(stats.sales).toFixed(2)}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>Quick Management</Typography>
      <Grid container spacing={2}>
        {adminNav.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{ borderRadius: 2, fontWeight: 600, mb: { xs: 1, md: 0 } }}
            >
              Manage {item.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
