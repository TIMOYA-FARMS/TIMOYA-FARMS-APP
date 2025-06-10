import { Box, Typography } from '@mui/material';
import React from 'react';

const OurStory = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4,
        mt: 4,
        px: { xs: 1, sm: 4, md: 8 },
      }}
    >
      {/* Video Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: 4,
            width: '100%',
            maxWidth: '600px',
          }}
        >
          <video
            src="https://timoyafarms.com/wp-content/uploads/2023/10/video_2023-10-20_14-41-29.mp4"
            controls
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Box>
      </Box>

      {/* Story Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' },
          p: 3,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            color: '#2c3e50',
          }}
        >
          Our Story
        </Typography>
        <Typography
          variant="body1"
          sx={{
            lineHeight: 2,
            textAlign: 'justify',
            color: '#555',
          }}
        >
          Timoya operates in the agricultural industry with a primary focus on rice processing, specializing in parboiled rice. Our mission is to bridge the gap between local farmers and consumers while extending our services to smallholder farmers and cooperatives.

          Our facilities in Saboba and Tamale enable comprehensive processing, from boiling and milling to packaging. Women in Saboba handle the parboiling process, while manual sorting and grading take place in Tamale. To centralize operations, we plan to establish a factory in Saboba.

          By leveraging innovative technologies and eco-friendly practices, we aim to improve the rice value chain's quality and sustainability. We address critical challenges such as climate change, poor market access, and post-harvest losses while empowering farmers through value addition and knowledge sharing.

          One of our key innovations includes a circular parboiling system designed to reduce boiling time from 72 hours to just 24 hours, significantly enhancing the quality of the rice and reducing processing time.
        </Typography>
      </Box>
    </Box>
  );
};

export default OurStory;
