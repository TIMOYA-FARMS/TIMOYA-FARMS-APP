import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

const galleryImages = [
  'https://timoyafarms.com/wp-content/uploads/2023/10/photo_1_2023-10-22_18-42-50.jpg',
  'https://timoyafarms.com/wp-content/uploads/2023/10/photo_2_2023-10-22_18-42-50-3.jpg',
  'https://timoyafarms.com/wp-content/uploads/2023/11/744-757.jpg',
  'https://timoyafarms.com/wp-content/uploads/2023/10/photo_2_2023-10-22_19-23-31.jpg',
];

const heights = [180, 140, 220, 160];

const HomeGalleryPreview = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#fff' }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
      Gallery Preview
    </Typography>
    <Grid container spacing={2} justifyContent="center" alignItems="stretch">
      {galleryImages.map((img, idx) => (
        <Grid item xs={6} sm={3} key={idx}>
          <Card sx={{ boxShadow: 2, borderRadius: 2, overflow: 'hidden', height: heights[idx % heights.length], position: 'relative', transition: 'transform 0.25s, box-shadow 0.25s', '&:hover': { transform: 'scale(1.045)', boxShadow: 6 } }}>
            <CardMedia
              component="img"
              height={180}
              image={img.replace('/upload/', '/upload/w_320,h_180,c_fill/')}
              srcSet={`
                ${img.replace('/upload/', '/upload/w_320,h_180,c_fill/')} 320w,
                ${img.replace('/upload/', '/upload/w_640,h_360,c_fill/')} 640w
              `}
              sizes="(max-width: 600px) 320px, 640px"
              alt={`Gallery Preview ${idx + 1}`}
              loading="lazy"
              fetchpriority={idx === 0 ? 'high' : undefined}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', '&:hover': { transform: 'scale(1.08)' } }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Button component={Link} to="/gallery" variant="contained" color="secondary" size="large" sx={{ fontWeight: 'bold', px: 6, py: 1.5, borderRadius: 3, letterSpacing: 1, boxShadow: 2, textTransform: 'uppercase' }}>
        View Full Gallery
      </Button>
    </Box>
  </Box>
);

export default HomeGalleryPreview;
