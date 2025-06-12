import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const AboutCallToAction = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
      Get Involved with Timoya Farms
    </Typography>
    <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
      Join our mission to empower farmers, promote sustainability, and deliver quality rice. Stay connected, partner with us, or become part of our growing community!
    </Typography>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
      <Button component={Link} to="/contact" variant="contained" color="primary" size="large">
        Contact Us
      </Button>
      <Button component={Link} to="/blog" variant="outlined" color="secondary" size="large">
        Read Our Blog
      </Button>
    </Stack>
  </Box>
);

export default AboutCallToAction;
