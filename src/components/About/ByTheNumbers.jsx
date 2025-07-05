import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import StoreIcon from '@mui/icons-material/Store';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const stats = [
  {
    label: 'Farmers Supported',
    value: 100,
    suffix: '+',
    icon: <GroupsIcon sx={{ fontSize: 48, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #219653 0%, #27ae60 100%)',
  },
  {
    label: 'Customers Served',
    value: 3000,
    suffix: '+',
    icon: <StoreIcon sx={{ fontSize: 48, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #f39c12 0%, #f1c40f 100%)',
  },
  {
    label: 'Processing Facilities',
    value: 2,
    suffix: '',
    icon: <RiceBowlIcon sx={{ fontSize: 48, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
  },
  {
    label: 'Years in Business',
    value: 4,
    suffix: '+',
    icon: <CalendarMonthIcon sx={{ fontSize: 48, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
  },
];

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
      {count}{suffix}
    </Typography>
  );
};

const ByTheNumbers = () => (
  <Box sx={{ py: 8, px: { xs: 2, md: 8 }, background: 'linear-gradient(90deg, #fffde4 0%, #e0ffe7 100%)' }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 6, color: 'green' }}>
      By the Numbers
    </Typography>
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Grid container spacing={2} justifyContent="center">
        {stats.map((stat, idx) => (
          <Grid item xs={6} lg={3} md={3} key={idx}>
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: 4, 
                textAlign: 'center', 
                boxShadow: 8, 
                background: stat.gradient,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.05)',
                  boxShadow: 12,
                  transition: 'all 0.3s ease',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255,255,255,0.1)',
                  zIndex: 1,
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {stat.icon}
                </Box>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, lineHeight: 1.4 }}>
                  {stat.label}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
);

export default ByTheNumbers; 