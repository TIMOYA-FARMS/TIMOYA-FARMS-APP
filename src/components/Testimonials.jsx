import React from 'react';
import { Box, Typography, Avatar, Paper, useMediaQuery, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const testimonials = [
  {
    name: 'Ruth Ayabah, Tamale',
    feedback: 'Aviella Rice has completely changed how my family enjoys rice. It’s clean, flavorful, and cooks evenly every time. Knowing it’s locally produced makes it even better.',
    avatar: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Brown',
  },
  {
    name: 'Mr Yakil, Smallholder Farmer – Saboba',
    feedback: 'Before joining Timoya Farms, I struggled to sell my paddy at fair prices. Now, I earn more and have access to better training and equipment.',
    avatar: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=BeardMedium&facialHairColor=Black&clotheType=CollarSweater&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Brown',
  },
  {
    name: 'Bishe Nelson, Community leader–Saboba, Northern Region',
    feedback: 'Timoya Farms is transforming our community. They’ve empowered women through training and helped make rice farming sustainable again.',
    avatar: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=BeardMedium&facialHairColor=Black&clotheType=CollarSweater&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Brown',
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
            elevation={1}
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
