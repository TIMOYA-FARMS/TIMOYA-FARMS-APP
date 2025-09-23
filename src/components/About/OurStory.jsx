import { Box, Typography, Button, Collapse } from '@mui/material';
import React, { useState } from 'react';

const OurStory = () => {
  const [expanded, setExpanded] = useState(false);
  const shortText = `Timoya Farms is a Ghanaian agribusiness transforming the rice value chain through clean energy, circular processing, and smallholder farmer empowerment. We produce premium-quality parboiled rice while improving farmer incomes, advancing climate-smart agriculture, and promoting local sustainability`;
  const fullText = `Timoya Farms was founded by Moses Tiborgnan, a rice farmer and entrepreneur from Saboba, Northern Ghana. Raised in a smallholder farming household, Moses experienced firsthand the hardships rural farmers face — poor market access, low yields, and minimal support. When he entered farming himself, these challenges became even more real.
  Rather than giving in, he turned that experience into a mission to transform the system from within.
  Timoya Farms was born out of a commitment to empower smallholder farmers — particularly women and youth — through sustainable innovation, clean energy processing, and inclusive agricultural development.
  We believe that by investing in local farmers, modernizing rice processing, and building market trust, we can grow a stronger, more equitable food system.`;

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 }, backgroundColor: '#f8f9fa' }}>
      <Typography
            variant="h4"
            sx={{
              mb: 3,
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            Our Story
          </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 4,
          maxWidth: 1200,
          mx: 'auto',
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
              boxShadow: 8,
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
            p: 4,
            // backgroundColor: '#ffffff',
            borderRadius: 4,
            boxShadow: 4,
          }}
        >
          
          <Typography
            variant="body1"
            sx={{
              lineHeight: 2,
              textAlign: 'justify',
              color: '',
            }}
          >
            {shortText}
          </Typography>
          <Collapse in={expanded}>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 2,
                textAlign: 'justify',
                color: '#555',
                mt: 2,
              }}
            >
              {fullText.replace(shortText, '').trim()}
            </Typography>
          </Collapse>
          <Button
            variant="outlined"
            onClick={() => setExpanded((prev) => !prev)}
            sx={{ mt: 2, textTransform: 'none', color: '#2c3e50', fontWeight: 600 }}
          >
            {expanded ? 'Read Less' : 'Read More'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OurStory;
