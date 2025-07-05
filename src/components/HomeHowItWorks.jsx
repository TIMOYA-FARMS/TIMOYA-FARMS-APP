import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinearProgress from '@mui/material/LinearProgress';

const steps = [
  {
    icon: <AgricultureIcon color="primary" sx={{ fontSize: 48 }} />,
    title: 'Grown with Care',
    desc: 'Our rice is cultivated by local farmers using sustainable and eco-friendly methods.'
  },
  {
    icon: <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />,
    title: 'Processed Sustainably',
    desc: 'We use innovative, energy-efficient, and safe processing techniques for the best quality.'
  },
  {
    icon: <LocalShippingIcon color="primary" sx={{ fontSize: 48 }} />,
    title: 'Delivered Fresh',
    desc: 'Our products are packaged and delivered quickly to ensure maximum freshness.'
  },
];

const HomeHowItWorks = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '' }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
      How It Works
    </Typography>
    <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', overflowX: 'auto', pb: 2 }}>
      {steps.map((step, idx) => (
        <Paper key={idx} sx={{ minWidth: 260, maxWidth: 320, flex: '0 0 auto', p: 4, borderRadius: 3, textAlign: 'center', height: '100%' }} elevation={2}>
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
          <Typography key={idx} variant="caption" sx={{ color: 'primary.main', fontWeight: 700 }}>{step.title.split(' ')[0]}</Typography>
        ))}
      </Box>
    </Box>
  </Box>
);

export default HomeHowItWorks;
