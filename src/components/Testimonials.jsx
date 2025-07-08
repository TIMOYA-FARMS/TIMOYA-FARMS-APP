import React from 'react';
import { Box, Typography, Avatar, Paper, useMediaQuery, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const testimonials = [
  {
    name: 'Ama Boateng',
    feedback: 'Timoya Farms rice is the best I have ever tasted! The quality and freshness are unmatched. I love supporting local farmers.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Kwame Mensah',
    feedback: 'I switched to Timoya rice for my restaurant and my customers noticed the difference immediately. Highly recommended!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Efua Sarpong',
    feedback: 'The eco-friendly packaging and the taste of the rice make Timoya Farms my go-to brand. Great job, team!',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

const Testimonials = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box sx={{ py: 6, mr: 2, ml: 2, px: { xs: 2, md: 8 } }}>
      {/* background: 'linear-gradient(135deg, #e0ffe7 0%, #fffde4 100%)' */}
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
        What Our Happy Customers Say
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
          justifyContent: 'center',
          gap: 4,
          width: '100%',
          maxWidth: '100%',
        }}
      >
        {testimonials.map((t, idx) => (
          <Paper
            key={idx}
            elevation={3}
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 33%' },
              minWidth: { xs: '0', md: '300px' },
              maxWidth: { xs: '100%', md: '400px' },
              p: 4,
              borderRadius: 3,
              textAlign: 'center',
              height: '100%',
              width: { xs: '100%', md: '100%' },
              mx: { xs: 'auto', md: 0 },
              background: 'rgba(255,255,255,0.95)',
            }}
          >
            <Avatar src={t.avatar} alt={t.name} sx={{ width: 64, height: 64, mx: 'auto', mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic', color: 'text.secondary' }}>
              "{t.feedback}"
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} sx={{ color: '#FFD600', fontSize: 22, opacity: 0.9 }} />
              ))}
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {t.name}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Testimonials;
