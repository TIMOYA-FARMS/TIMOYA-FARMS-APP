import React, { useState, useEffect } from 'react';
import { Box, Toolbar, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 220;

const adminNav = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Users', icon: <PeopleIcon />, path: '/dashboard/admin/users' },
  { label: 'Products', icon: <StoreIcon />, path: '/dashboard/admin/products' },
  { label: 'Orders', icon: <ShoppingBagIcon />, path: '/dashboard/admin/orders' },
  { label: 'Farmers', icon: <AgricultureIcon />, path: '/dashboard/admin/farmers' },
];

const customerNav = [
  { label: 'Overview', icon: <DashboardIcon />, path: '/dashboard/customer' },
  { label: 'Orders', icon: <ReceiptLongIcon />, path: '/dashboard/customer/orders' },
  { label: 'Cart', icon: <ShoppingCartCheckoutIcon />, path: '/dashboard/customer/cart' },
  { label: 'Checkout', icon: <LocalOfferIcon />, path: '/dashboard/customer/checkout' },
];

const farmerNav = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard/farmer' },
  { label: 'Deliveries', icon: <LocalShippingIcon />, path: '/dashboard/farmer/deliveries' },
  { label: 'Payments', icon: <MonetizationOnIcon />, path: '/dashboard/farmer/payments' },
];

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!loading && user) {
      const isAdminRoute = window.location.pathname.startsWith('/dashboard/admin') || window.location.pathname === '/dashboard';
      if (isAdminRoute && user.role !== 'Admin') {
        if (user.role === 'Farmer') navigate('/dashboard/farmer', { replace: true });
        else if (user.role === 'User') navigate('/dashboard/customer', { replace: true });
        else navigate('/', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  const isCustomerRoute = location.pathname.startsWith('/dashboard/customer');
  const isAdminRoute = location.pathname.startsWith('/dashboard/admin') || location.pathname === '/dashboard';
  const isFarmerRoute = location.pathname.startsWith('/dashboard/farmer');

  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {(isAdminRoute ? adminNav : isCustomerRoute ? customerNav : isFarmerRoute ? farmerNav : []).map((item) => (
            <ListItem
              button
              key={item.label}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2, 
                display: { 
                  xs: (isAdminRoute || isCustomerRoute || isFarmerRoute) ? 'flex' : 'none', 
                  md: 'none' 
                } 
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {isAdminRoute ? 'Admin Dashboard' : isCustomerRoute ? 'User Dashboard' : isFarmerRoute ? 'Farmer Dashboard' : 'Dashboard'}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ ml: 2 }}
          >
            Go to Homepage
          </Button>
        </Toolbar>
      </AppBar>
      {/* Permanent drawer for md+ screens (for admin, customer, and farmer) */}
      {(isAdminRoute || isCustomerRoute || isFarmerRoute) && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: { xs: 'none', md: 'block' },
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
      {/* Temporary drawer for mobile (for admin, customer, and farmer) */}
      {(isAdminRoute || isCustomerRoute || isFarmerRoute) && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          {drawer}
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, md: 3 }, width: { xs: '100%', md: (isAdminRoute || isCustomerRoute || isFarmerRoute) ? `calc(100% - ${drawerWidth}px)` : '100%' }, minHeight: '100vh', background: '#f9f9f9' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout; 