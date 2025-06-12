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
    icon: <RecyclingIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />,
  },
  {
    title: 'Women Empowerment',
    desc: 'Women lead the parboiling process in Saboba, gaining skills, income, and leadership opportunities.',
    icon: <FemaleIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />,
  },
  {
    title: 'Farmer Partnerships',
    desc: 'We partner with over 100 local farmers, providing fair compensation, training, and market access.',
    icon: <HandshakeIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />,
  },
  {
    title: 'Reduced Post-Harvest Losses',
    desc: 'Innovative storage and processing methods help minimize losses and maximize farmer profits.',
    icon: <InventoryIcon sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />,
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
    <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#fff' }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
        Sustainability & Impact
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4, justifyContent: 'center' }}>
        {impacts.map((impact, idx) => (
          <Paper
            key={idx}
            sx={{ flex: 1, minWidth: 0, p: 3, borderRadius: 2, textAlign: 'center', height: '100%', cursor: 'pointer', transition: 'box-shadow 0.2s', boxShadow: openIdx === idx ? 8 : 1 }}
            elevation={openIdx === idx ? 4 : 1}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            {impact.icon}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>{impact.title}</Typography>
            <Collapse in={openIdx === idx}>
              <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>{impact.desc}</Typography>
            </Collapse>
          </Paper>
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, justifyContent: 'center' }}>
        {stats.map((stat, idx) => (
          <Paper key={idx} sx={{ flex: 1, minWidth: 0, p: 2, borderRadius: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }} elevation={0}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{stat.value}</Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>{stat.label}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default SustainabilityImpact;
