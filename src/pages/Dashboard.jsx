import * as React from 'react';
import { Button, Box, Stack } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import { RoleProvider, useRole } from '../contexts/RoleContext';
import CustomerDashboard from './dashboard/CustomerDashboard';
import FarmerDashboard from './dashboard/FarmerDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import { useAuth } from '../contexts/AuthContext';
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
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>You must be logged in to view the dashboard.</div>;
  if (user.role === 'Admin') return <AdminDashboard />;
  if (user.role === 'Farmer') return <FarmerDashboard />;
  if (user.role === 'User') return <CustomerDashboard />;
  return <div>Unknown role.</div>;
};

// Wrap with RoleProvider for context
const DashboardWithProvider = (props) => (
  <RoleProvider>
    <Dashboard {...props} />
  </RoleProvider>
);

export default DashboardWithProvider;