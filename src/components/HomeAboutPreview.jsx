import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomeAboutPreview = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
      About Timoya Farms
    </Typography>
    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', maxWidth: 700, mx: 'auto' }}>
      Timoya Farms is dedicated to providing fresh, healthy, and sustainably grown rice and produce. Our mission is to bridge the gap between local farmers and consumers, empower communities, and promote eco-friendly practices. Discover our story and meet the passionate team behind Timoya Farms.
    </Typography>
    <Button
      component={Link}
      to="/about"
      variant="contained"
      color="primary"
      sx={{ fontWeight: 'bold', px: 4, py: 1.2, borderRadius: 3 }}
    >
      Learn More
    </Button>
  </Box>
);

export default HomeAboutPreview;
