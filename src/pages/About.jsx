import React from 'react';
import Banner from '../components/Banner/Banner';
import OurStory from '../components/About/OurStory';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OurTeam from '../components/About/OurTeam';

const About = () => {
  return (
    <Box>
      {/* Banner with Breadcrumbs */}
      <Box sx={{ position: 'relative' }}>
        <Banner />
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 2,
            px: 2,
            py: 1,
            boxShadow: 2,
          }}
        >
          <Breadcrumbs
            separator={<ArrowForwardIosIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              underline="hover"
              color="inherit"
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
              Home
            </Link>
            <Typography
              color="text.primary"
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              About Us
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Page Content */}
      <OurStory />
      <OurTeam />
    </Box>
  );
};

export default About;
