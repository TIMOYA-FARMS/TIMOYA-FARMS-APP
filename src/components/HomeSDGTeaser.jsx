import React from 'react';
import { Box, Typography, Button, Stack, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

const SDG_ICONS = [
  'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg',
  'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-02.jpg',
  'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-05.jpg',
  'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-07.jpg',
  'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-13.jpg',
  'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-17.jpg',
];

const HomeSDGTeaser = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, background: 'linear-gradient(90deg, #e0ffe7 0%, #fffde4 100%)', borderRadius: 1, my: 0, textAlign: 'center', boxShadow: 0 }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary' }}>
      Advancing the UN Sustainable Development Goals
    </Typography>
    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
      Timoya Farms is proud to support 11 key SDGs through our inclusive, climate-smart, and clean energy-powered rice value chain.
    </Typography>
    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 3, flexWrap: 'wrap' }}>
      {SDG_ICONS.map((icon, idx) => (
        <Avatar key={idx} src={icon} alt={`SDG Icon ${idx + 1}`} sx={{ width: 48, height: 48, border: '2px solid #fff', boxShadow: 2, bgcolor: '#fff' }} />
      ))}
    </Stack>
    <Button
      component={Link}
      to="/about#sdgs"
      variant="contained"
      color="secondary"
      size="large"
      sx={{ fontWeight: 'bold', borderRadius: 3, px: 5 }}
    >
      Learn More
    </Button>
  </Box>
);

export default HomeSDGTeaser; 