import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const ContactConnect = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, background: 'linear-gradient(90deg, #fffde4 0%, #e0ffe7 100%)', textAlign: 'center', borderRadius: 4 }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
      Let's Connect
    </Typography>
    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
      Have questions, want to partner, or just want to say hello? We'd love to hear from you!
    </Typography>
    <Button
      variant="contained"
      color="primary"
      size="large"
      startIcon={<EmailIcon />}
      href="mailto:info@timoyafarms.com"
      sx={{ px: 6, py: 1.5, fontWeight: 'bold', borderRadius: 3, fontSize: '1.1rem', boxShadow: 2, textTransform: 'uppercase' }}
    >
      Contact Us
    </Button>
  </Box>
);

export default ContactConnect; 