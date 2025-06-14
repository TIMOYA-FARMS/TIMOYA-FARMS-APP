import React from 'react'
import { Box, Typography, Button } from '@mui/material';

const BlogBanner = () => {
  const isLoggedIn = false; // Replace with real auth logic
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
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              Blogs!
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '20px' }}>
              Check out what we have been up to!
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button variant="contained" color="primary" size="large">
                Shop Now
              </Button>
              {!isLoggedIn && (
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  href="/login"
                  sx={{
                    fontWeight: 700,
                    borderRadius: 3,
                    textTransform: 'uppercase',
                    borderWidth: 2,
                    borderColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  Login
                </Button>
              )}
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
              alt="About us Banner Image"
              style={{
                width: '100%',
                height: 'auto', // Maintain aspect ratio
                maxHeight: '300px', // Set maximum height for the image
                borderRadius: '8px',
                objectFit: 'cover', // Ensures the image fills its container without distortion
              }}
            />
          </Box>
        </Box>
  );
};

export default BlogBanner
