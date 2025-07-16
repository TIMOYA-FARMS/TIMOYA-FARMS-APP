import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const HomeAboutPreview = () => {
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 }, backgroundColor: '#f9f9f9' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 4, md: 6 },
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        {/* Image Section - Hidden on small screens */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            flex: '0 0 50%',
            maxWidth: '50%',
          }}
        >
          <Paper 
            elevation={1} 
            sx={{ 
              borderRadius: 2, 
              overflow: 'hidden',
              position: 'relative',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.3s ease-in-out',
              }
            }}
          >
            <Box
              sx={{
                height: 400,
                backgroundImage: 'url(https://timoyafarms.com/wp-content/uploads/2023/10/photo_23_2023-10-19_19-45-24-1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(33,150,83,0.1) 0%, rgba(34,43,69,0.1) 100%)',
                  zIndex: 1,
                }
              }}
            />
            
          </Paper>
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', md: '0 0 50%' },
            maxWidth: { xs: '100%', md: '50%' },
            textAlign: { xs: 'center', md: 'left' },
            pl: { md: 2 },
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 900, 
              mb: 3, 
              color: 'primary.main',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              lineHeight: 1.2,
            }}
          >
            Timoya Farms
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 3, 
              color: 'secondary.main',
              fontWeight: 600,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
            }}
          >
            Your Trusted Partner in Fresh, Sustainable Agriculture
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4, 
              color: 'text.secondary', 
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.8,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Timoya Farms is a Ghanaian agribusiness transforming the rice value chain through clean energy, circular processing, and smallholder farmer empowerment. We produce premium-quality parboiled rice while improving farmer incomes, advancing climate-smart agriculture, and promoting local sustainability.
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', md: 'flex-start' }
          }}>
            <Button
              component={Link}
              to="/about"
              variant="contained"
              color="primary"
              size="large"
              sx={{ 
                fontWeight: 700, 
                px: 4, 
                py: 1.5, 
                borderRadius: 3,
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease',
                }
              }}
            >
              Learn More
            </Button>
            
            <Button
              component={Link}
              to="/products"
              variant="outlined"
              color="primary"
              size="large"
              sx={{ 
                fontWeight: 700, 
                px: 4, 
                py: 1.5, 
                borderRadius: 3,
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease',
                }
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeAboutPreview;
