import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinearProgress from '@mui/material/LinearProgress';
import InventoryIcon from '@mui/icons-material/Inventory';

const steps = [
  {
    icon: <AgricultureIcon color="secondary" sx={{ fontSize: 48 }} />,
    title: 'Grown with Care',
    desc: 'Our rice is sourced directly from local farmers who cultivate with dedication and eco-friendly practices.'
  },
  {
    icon: <CheckCircleIcon color="secondary" sx={{ fontSize: 48 }} />,
    title: 'Processed Sustainably',
    desc: 'We carefully mill and process the rice with modern, safe, and sustainable methods to ensure top quality.'
  },
  {
    icon: <InventoryIcon color="secondary" sx={{ fontSize: 48 }} />, 
    title: 'Bagged with Precision',
    desc: 'Each grain is hygienically packaged into secure, high-quality bags, ready for delivery.'
  },
  {
    icon: <LocalShippingIcon color="secondary" sx={{ fontSize: 48 }} />,
    title: 'Delivered Fresh',
    desc: 'We work around the clock to deliver promptly so you always enjoy fresh and nutritious rice.'
  },
];

const HomeHowItWorks = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '' }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
      The Timoya Way
    </Typography>
    <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', pb: 2, overflowX: { xs: 'auto', md: 'visible' } }}>
      {steps.map((step, idx) => (
        <Paper key={idx} sx={{ minWidth: 240, maxWidth: 280, flex: '0 0 auto', p: 2, borderRadius: 3, textAlign: 'center', height: '100%' }} elevation={1}>
          {step.icon}
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1, color: 'primary.main' }}>{step.title}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{step.desc}</Typography>
        </Paper>
      ))}
    </Box>
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <LinearProgress
        variant="determinate"
        value={100}
        sx={{
          height: 10,
          borderRadius: 5,
          background: '#e0ffe7',
          '& .MuiLinearProgress-bar': {
            background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
            borderRadius: 5,
            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        {steps.map((step, idx) => (
          <Typography key={idx} variant="caption" sx={{ color: 'primary.main', fontWeight: 700 }}>
            {step.title.split(' ')[0]}
            </Typography>
        ))}
      </Box>
    </Box>
  </Box>
);

export default HomeHowItWorks;
