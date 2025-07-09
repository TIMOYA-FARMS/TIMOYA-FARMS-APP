import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const BlogBanner = () => {
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
        <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: '10px', color: 'primary.main' }}>
          Dive Into Our Stories
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: '20px', color: 'text.secondary', fontWeight: 400 }}>
          Inspiration, tips, and the latest from the heart of Timoya Farms.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <Button 
            component={Link} 
            to="/products"
            variant="contained" 
            color="primary" 
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
                backgroundColor: 'secondary.main',
                color: 'white',
              },
            }}
          >
            Shop Now
          </Button>
        </Box>
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
          alt="Blog Banner"
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

export default BlogBanner;
