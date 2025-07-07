import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const partners = [
  { name: 'AgriCert', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Logo_of_the_United_Nations.svg/1200px-Logo_of_the_United_Nations.svg.png' },
  { name: 'Farmers Union', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/FAO_logo.svg/1200px-FAO_logo.svg.png' },
  { name: 'Eco Ghana', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/UNDP_logo.svg/1200px-UNDP_logo.svg.png' },
];

const HomePartners = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
      Our Partners & Certifications
    </Typography>
    <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4, fontWeight: 500 }}>
      Trusted by leading brands and organizations.
    </Typography>
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      {partners.map((p, idx) => (
        <Grid item xs={12} sm={4} md={3} key={idx}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: 120, justifyContent: 'center', background: '#fff' }}>
            <img src={p.logo} alt={p.name} loading="lazy" style={{ maxHeight: 60, maxWidth: '100%', marginBottom: 8, filter: 'grayscale(1)', transition: 'filter 0.3s' }} onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0)'} onMouseOut={e => e.currentTarget.style.filter = 'grayscale(1)'} />
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>{p.name}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default HomePartners;
