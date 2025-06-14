import * as React from 'react';
import { Button, Box, Stack } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import { RoleProvider, useRole } from '../contexts/RoleContext';
import CustomerDashboard from './dashboard/CustomerDashboard';
import FarmerDashboard from './dashboard/FarmerDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
// Icon imports for navigation (if you use NAVIGATION elsewhere)
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingBagIcon />,
  },
  {
    segment: 'cart',
    title: 'Cart',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

const Dashboard = () => {
  const { role, setRole } = useRole();

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      {/* Temporary role switcher for demo/testing */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant={role === 'customer' ? 'contained' : 'outlined'} onClick={() => setRole('customer')}>Customer</Button>
        <Button variant={role === 'farmer' ? 'contained' : 'outlined'} onClick={() => setRole('farmer')}>Farmer</Button>
        <Button variant={role === 'admin' ? 'contained' : 'outlined'} onClick={() => setRole('admin')}>Admin</Button>
      </Stack>
      {role === 'customer' && <CustomerDashboard />}
      {role === 'farmer' && <FarmerDashboard />}
      {role === 'admin' && <AdminDashboard />}
    </Box>
  );
}

// Wrap with RoleProvider for context
const DashboardWithProvider = (props) => (
  <RoleProvider>
    <Dashboard {...props} />
  </RoleProvider>
);

export default DashboardWithProvider;