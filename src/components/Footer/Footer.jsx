import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 3,
      px: 2,
      mt: 'auto',
      backgroundColor: (theme) =>
        theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      textAlign: 'center',
    }}
  >
    <Typography variant="body1">© 2025 Timoya~Farms</Typography>
    <Typography variant="body2" color="text.secondary">
      All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
