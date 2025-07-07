import React from 'react'
import { Box, Typography, Button } from '@mui/material';


const ShopBanner = () => {
  const heroImg = "https://timoyafarms.com/wp-content/uploads/2023/10/photo_23_2023-10-19_19-45-24-1.jpg".replace('/upload/', '/upload/w_600,h_300,c_fill/');

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
        flexDirection: { xs: 'column', md: 'row' }, // Responsive layout
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          textAlign: { xs: 'center', md: 'left' },
          mb: { xs: 2, md: 0 }, // Margin for small screens
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, color: 'primary.main', letterSpacing: 1 }}>
          Shop Now!
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary', fontWeight: 400 }}>
          Check out our amazing products!
        </Typography>
        {/* <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            fontWeight: 700,
            px: 4,
            py: 1.5,
            borderRadius: 3,
            boxShadow: '0 2px 8px rgba(255,184,0,0.15)',
            textTransform: 'uppercase',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'white',
            },
          }}
        >
          Shop Now
        </Button> */}
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
          src={heroImg}
          alt="About us Banner Image"
          width="600"
          height="300"
          fetchpriority="high"
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

export default ShopBanner
