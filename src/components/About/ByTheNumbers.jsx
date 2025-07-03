import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import StoreIcon from '@mui/icons-material/Store';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const stats = [
  {
    label: 'Farmers Supported',
    value: '100+',
    icon: <GroupsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    label: 'Customers Served',
    value: '3,000+',
    icon: <StoreIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
  },
  {
    label: 'Processing Facilities',
    value: '2',
    icon: <RiceBowlIcon sx={{ fontSize: 40, color: 'success.main' }} />,
  },
  {
    label: 'Years in Business',
    value: '4+',
    icon: <CalendarMonthIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
  },
];

const ByTheNumbers = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, background: 'linear-gradient(90deg, #e0ffe7 0%, #fffde4 100%)' }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
      By the Numbers
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {stats.map((stat, idx) => (
        <Grid item xs={6} sm={3} key={idx}>
          <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center', boxShadow: 3, background: '#fff' }}>
            {stat.icon}
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mt: 1 }}>{stat.value}</Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 500 }}>{stat.label}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default ByTheNumbers; 