import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
    <Box sx={{ py: 6, px: { xs: 2, md: 8 }, background: 'linear-gradient(135deg, #e0ffe7 0%, #fffde4 100%)', textAlign: 'center', borderRadius: 4 }}>
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
          sx={{ background: '#fff', borderRadius: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ px: 6, py: 2, fontWeight: 'bold', borderRadius: 3, fontSize: '1.1rem', boxShadow: 2, textTransform: 'uppercase', minWidth: 160 }}>
          Subscribe
        </Button>
      </Box>
      {submitted && (
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'pop 0.7s' }}>
          <CheckCircleIcon sx={{ color: 'success.main', fontSize: 48, mb: 1 }} />
          <Alert severity="success" sx={{ fontWeight: 'bold', fontSize: '1.1rem', background: '#e0ffe7', color: 'success.main', borderRadius: 2 }}>Thank you for subscribing!</Alert>
          <style>{`
            @keyframes pop {
              0% { transform: scale(0.7); opacity: 0; }
              60% { transform: scale(1.15); opacity: 1; }
              100% { transform: scale(1); }
            }
          `}</style>
        </Box>
      )}
    </Box>
  );
};

export default HomeNewsletterSignup;
