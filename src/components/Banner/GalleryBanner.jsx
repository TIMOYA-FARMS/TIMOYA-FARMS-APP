import React from 'react';
import { Box, Typography } from '@mui/material';

const GalleryBanner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          textAlign: { xs: 'center', md: 'left' },
          mb: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, color: 'primary.main', letterSpacing: 1 }}>
          Gallery
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary', fontWeight: 400 }}>
          Explore our farm, team, and products in pictures and videos!
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="https://timoyafarms.com/wp-content/uploads/2023/10/photo_23_2023-10-19_19-45-24-1.jpg"
          alt="Gallery Banner"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '300px',
            borderRadius: '8px',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
};

export default GalleryBanner;
