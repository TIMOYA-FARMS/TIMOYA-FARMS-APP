import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomeCTABanner = () => (
  <Box
    sx={{
      py: 6,
      px: { xs: 2, md: 8 },
      background: 'linear-gradient(90deg, #219653 0%, #6dd5ed 100%)',
      borderRadius: 0,
      textAlign: 'center',
      my: 0,
      color: 'white',
      // boxShadow: 3,
    }}
  >
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
      Ready to Taste the Difference?
    </Typography>
    <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem' }}>
      Order now and enjoy fresh, healthy, and sustainably grown rice from Timoya Farms.
    </Typography>
    <Button
      component={Link}
      to="/products"
      variant="contained"
      color="secondary"
      size="large"
      sx={{ fontWeight: 'bold', px: 5, py: 1.5, borderRadius: 3, fontSize: '1.1rem' }}
    >
      Shop Now
    </Button>
  </Box>
);

export default HomeCTABanner;
