import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

const HomeNewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
    setEmail('');
  };

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#fff', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
        Stay Updated
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
        Subscribe to our newsletter for the latest news, recipes, and special offers from Timoya Farms.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: 'center', gap: 2, maxWidth: 500, mx: 'auto' }}>
        <TextField
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          required
          error={!!error}
          helperText={error}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ px: 4, py: 1, fontWeight: 'bold', borderRadius: 3 }}>
          Subscribe
        </Button>
      </Box>
      {submitted && <Alert severity="success" sx={{ mt: 2 }}>Thank you for subscribing!</Alert>}
    </Box>
  );
};

export default HomeNewsletterSignup;
