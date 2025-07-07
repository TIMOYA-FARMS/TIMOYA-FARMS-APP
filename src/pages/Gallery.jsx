import React from 'react';
import { Box, Typography, Grid, Card, CardMedia } from '@mui/material';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import GalleryBanner from '../components/Banner/GalleryBanner';

const images = [
  'https://timoyafarms.com/wp-content/uploads/2023/10/photo_1_2023-10-22_18-42-50.jpg',
  'https://timoyafarms.com/wp-content/uploads/2023/10/photo_2_2023-10-22_18-42-50-3.jpg',
  'https://timoyafarms.com/wp-content/uploads/2023/11/744-757.jpg',
  'https://timoyafarms.com/wp-content/uploads/2023/10/photo_2_2023-10-22_19-23-31.jpg',
  'https://timoyafarms.com/wp-content/uploads/2023/10/Isaac-cropped.jpg',
  'https://res.cloudinary.com/dbyeirmqw/image/upload/v1748955040/founder_Tim4_zkb2pf.jpg',
  'https://timoyafarms.com/wp-content/uploads/2023/10/video_2023-10-20_14-41-29.mp4', // video as a placeholder
];

const Gallery = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', py: 0 }}>
      <Box sx={{ position: 'relative', backgroundColor: '#f9f9f9', py: 0, px: 0 }}>
        <GalleryBanner />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 0,
            mb: { xs: 2, md: 4 },
            width: '100%',
          }}
        >
          <Breadcrumb
            links={[
              { label: 'Home', href: '/' },
              { label: 'Gallery', href: '/gallery' }
            ]}
          />
        </Box>
      </Box>
      <Typography variant="h3" align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Gallery
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {images.map((img, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: 'hidden', height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {img.endsWith('.mp4') ? (
                <video src={img} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <CardMedia
                  component="img"
                  height={250}
                  image={img.replace('/upload/', '/upload/w_320,h_250,c_fill/')}
                  srcSet={`
                    ${img.replace('/upload/', '/upload/w_320,h_250,c_fill/')} 320w,
                    ${img.replace('/upload/', '/upload/w_640,h_500,c_fill/')} 640w
                  `}
                  sizes="(max-width: 600px) 320px, 640px"
                  alt={`Gallery ${idx + 1}`}
                  loading="lazy"
                  fetchpriority={idx === 0 ? 'high' : undefined}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Gallery;
