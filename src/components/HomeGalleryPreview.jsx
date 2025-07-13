import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, Button, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { getGallery } from '../Store/galleryApi';

const heights = [180, 140, 220, 160];

const HomeGalleryPreview = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getGallery();
        if (Array.isArray(res.data)) {
          setImages(res.data.slice(0, 4));
        } else if (Array.isArray(res.data.images)) {
          setImages(res.data.images.slice(0, 4));
        } else {
          setImages([]);
        }
      } catch (err) {
        setError('Failed to load gallery preview.');
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleOpenLightbox = (img) => {
    setLightboxImg(img);
    setLightboxOpen(true);
  };
  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setLightboxImg(null);
  };

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#fff' }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
        Gallery Preview
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : images.length === 0 ? (
        <Typography align="center" sx={{ color: 'text.secondary', mt: 2 }}>No images found.</Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
          {images.map((img, idx) => {
            const height = heights[idx % heights.length];
            const width2x = height * 2;
            const width3x = height * 3;
            const height2x = height * 2;
            
            return (
              <Grid item xs={6} sm={3} key={img._id || idx}>
                <Card sx={{ boxShadow: 2, borderRadius: 2, overflow: 'hidden', height: height, position: 'relative', transition: 'transform 0.25s, box-shadow 0.25s', '&:hover': { transform: 'scale(1.045)', boxShadow: 6 }, cursor: 'pointer' }} onClick={() => handleOpenLightbox(img)}>
                  <CardMedia
                    component="img"
                    height={height}
                    image={img.url.replace('/upload/', `/upload/w_${width3x},h_${height2x},c_fill,q_auto,f_auto/`)}
                    srcSet={`
                      ${img.url.replace('/upload/', `/upload/w_${width2x},h_${height},c_fill,q_auto,f_auto/`)} ${width2x}w,
                      ${img.url.replace('/upload/', `/upload/w_${width3x},h_${height2x},c_fill,q_auto,f_auto/`)} ${width3x}w
                    `}
                    sizes={`(max-width: 600px) ${width2x}px, ${width3x}px`}
                    alt={img.title || `Gallery Preview ${idx + 1}`}
                    loading="lazy"
                    fetchpriority={idx === 0 ? 'high' : undefined}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', '&:hover': { transform: 'scale(1.08)' } }}
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onClose={handleCloseLightbox} maxWidth="md" fullWidth>
        <DialogTitle>{lightboxImg?.title || 'Gallery Image'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0 }}>
          {lightboxImg && (
            <img
              src={lightboxImg.url}
              alt={lightboxImg.title || 'Gallery Image'}
              style={{
                width: '100%',
                maxWidth: '900px',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: 8,
                margin: 'auto',
                display: 'block',
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLightbox} color="primary" variant="outlined">Close</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button component={Link} to="/gallery" variant="contained" color="secondary" size="large" sx={{ fontWeight: 'bold', px: 6, py: 1.5, borderRadius: 3, letterSpacing: 1, boxShadow: 2, textTransform: 'uppercase' }}>
          View Full Gallery
        </Button>
      </Box>
    </Box>
  );
};

export default HomeGalleryPreview;
