import React, { useState } from 'react';
import { Box, Typography, Paper, Collapse } from '@mui/material';
import RecyclingIcon from '@mui/icons-material/Recycling';
import FemaleIcon from '@mui/icons-material/Female';
import HandshakeIcon from '@mui/icons-material/Handshake';
import InventoryIcon from '@mui/icons-material/Inventory';

const impacts = [
  {
    title: 'Eco-Friendly Processing',
    desc: 'Our circular parboiling system reduces energy use and water waste, making rice processing more sustainable.',
    icon: <RecyclingIcon sx={{ fontSize: 48, color: 'white', mb: 1 }} />,
    gradient: 'linear-gradient(135deg, #219653 0%, #27ae60 100%)',
  },
  {
    title: 'Women Empowerment',
    desc: 'Women lead the parboiling process in Saboba, gaining skills, income, and leadership opportunities.',
    icon: <FemaleIcon sx={{ fontSize: 48, color: 'white', mb: 1 }} />,
    gradient: 'linear-gradient(135deg, #f39c12 0%, #f1c40f 100%)',
  },
  {
    title: 'Farmer Partnerships',
    desc: 'We partner with over 100 local farmers, providing fair compensation, training, and market access.',
    icon: <HandshakeIcon sx={{ fontSize: 48, color: 'white', mb: 1 }} />,
    gradient: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
  },
  {
    title: 'Reduced Post-Harvest Losses',
    desc: 'Innovative storage and processing methods help minimize losses and maximize farmer profits.',
    icon: <InventoryIcon sx={{ fontSize: 48, color: 'white', mb: 1 }} />,
    gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
  },
];

const stats = [
  { label: 'Local Farmers Supported', value: '100+' },
  { label: 'Women Empowered', value: '50+' },
  { label: 'Processing Time Reduced', value: '66%' },
  { label: 'Eco-Friendly Packages Used', value: '10,000+' },
];

const SustainabilityImpact = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 }, backgroundColor: '#f8f9fa' }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 6, color: 'primary.main' }}>
        Sustainability & Impact
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4, justifyContent: 'center' }}>
        {impacts.map((impact, idx) => (
          <Paper
            key={idx}
            sx={{ 
              flex: 1, 
              minWidth: 0, 
              p: 4, 
              borderRadius: 4, 
              textAlign: 'center', 
              height: '100%', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              boxShadow: openIdx === idx ? 12 : 4,
              background: impact.gradient,
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: 16,
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
            elevation={openIdx === idx ? 8 : 4}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mb: 2,
                '& .MuiSvgIcon-root': {
                  color: 'rgba(255,255,255,0.9) !important',
                }
              }}>
                {impact.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>{impact.title}</Typography>
              <Collapse in={openIdx === idx}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', mt: 2, lineHeight: 1.6 }}>{impact.desc}</Typography>
              </Collapse>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', mt: 2, display: 'block' }}>
                {openIdx === idx ? 'Click to collapse' : 'Click to expand'}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      {/* <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, justifyContent: 'center' }}>
        {stats.map((stat, idx) => (
          <Paper key={idx} sx={{ flex: 1, minWidth: 0, p: 2, borderRadius: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }} elevation={0}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{stat.value}</Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>{stat.label}</Typography>
          </Paper>
        ))}
      </Box> */}
    </Box>
  );
};

export default SustainabilityImpact;
