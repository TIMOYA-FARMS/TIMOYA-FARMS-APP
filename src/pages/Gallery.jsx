import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CircularProgress, Alert } from '@mui/material';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import GalleryBanner from '../components/Banner/GalleryBanner';
import { getGallery } from '../Store/galleryApi';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getGallery();
        if (Array.isArray(res.data)) {
          setImages(res.data);
        } else if (Array.isArray(res.data.images)) {
          setImages(res.data.images);
        } else {
          setImages([]);
        }
      } catch (err) {
        setError('Failed to load gallery images.');
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

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
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : images.length === 0 ? (
        <Typography align="center" sx={{ color: 'text.secondary', mt: 4 }}>No images found.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {images.map((img, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={img._id || idx}>
              <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: 'hidden', height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardMedia
                  component="img"
                  height={250}
                  image={img.url.replace('/upload/', '/upload/w_320,h_250,c_fill,f_webp/')}
                  srcSet={`
                    ${img.url.replace('/upload/', '/upload/w_160,h_125,c_fill,f_webp/')} 160w,
                    ${img.url.replace('/upload/', '/upload/w_320,h_250,c_fill,f_webp/')} 320w,
                    ${img.url.replace('/upload/', '/upload/w_640,h_500,c_fill,f_webp/')} 640w
                  `}
                  sizes="(max-width: 600px) 160px, (max-width: 900px) 320px, 640px"
                  alt={img.title || `Gallery ${idx + 1}`}
                  loading="lazy"
                  fetchpriority={idx === 0 ? 'high' : undefined}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Gallery;
