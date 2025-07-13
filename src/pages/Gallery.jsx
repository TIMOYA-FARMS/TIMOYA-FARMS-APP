import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip } from '@mui/material';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import GalleryBanner from '../components/Banner/GalleryBanner';
import { getGallery } from '../Store/galleryApi';
import { getAllCategories } from '../Store/categoryApi';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [galleryRes, categoriesRes] = await Promise.all([
          getGallery(),
          getAllCategories()
        ]);
        
        if (Array.isArray(galleryRes.data)) {
          setImages(galleryRes.data);
        } else if (Array.isArray(galleryRes.data.images)) {
          setImages(galleryRes.data.images);
        } else {
          setImages([]);
        }

        if (Array.isArray(categoriesRes.data)) {
          setCategories(categoriesRes.data.filter(cat => cat.isActive !== false));
        } else if (Array.isArray(categoriesRes.data.categories)) {
          setCategories(categoriesRes.data.categories.filter(cat => cat.isActive !== false));
        } else {
          setCategories([]);
        }
      } catch (err) {
        setError('Failed to load gallery images.');
        setImages([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenLightbox = (img) => {
    setLightboxImg(img);
    setLightboxOpen(true);
  };
  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setLightboxImg(null);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const filteredImages = selectedCategory 
    ? images.filter(img => {
        // Handle both category object and category ID
        const imgCategoryId = typeof img.category === 'object' && img.category ? img.category._id : img.category;
        return imgCategoryId === selectedCategory;
      })
    : images;

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
      
      {/* Category Filters */}
      {categories.length > 0 && (
        <Box sx={{ mb: 4, px: 2 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2, color: 'text.secondary' }}>
            Filter by Category
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label="All Images"
              onClick={() => handleCategoryClick(null)}
              color={selectedCategory === null ? 'primary' : 'default'}
              variant={selectedCategory === null ? 'filled' : 'outlined'}
              sx={{ fontWeight: 'bold' }}
            />
            {categories.map((category) => (
              <Chip
                key={category._id}
                label={category.name}
                onClick={() => handleCategoryClick(category._id)}
                color={selectedCategory === category._id ? 'primary' : 'default'}
                variant={selectedCategory === category._id ? 'filled' : 'outlined'}
                sx={{ fontWeight: 'bold' }}
              />
            ))}
          </Box>
        </Box>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : filteredImages.length === 0 ? (
        <Typography align="center" sx={{ color: 'text.secondary', mt: 4 }}>
          {selectedCategory 
            ? 'No images found in this category.' 
            : 'No images found.'
          }
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center" sx={{mb: 2}}>
          {filteredImages.map((img, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={img._id || idx}>
              <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: 'hidden', height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleOpenLightbox(img)}>
                <CardMedia
                  component="img"
                  height={250}
                  image={img.url.replace('/upload/', '/upload/w_600,h_500,c_fill,q_auto,f_auto/')}
                  srcSet={`
                    ${img.url.replace('/upload/', '/upload/w_400,h_350,c_fill,q_auto,f_auto/')} 400w,
                    ${img.url.replace('/upload/', '/upload/w_600,h_500,c_fill,q_auto,f_auto/')} 600w,
                    ${img.url.replace('/upload/', '/upload/w_800,h_650,c_fill,q_auto,f_auto/')} 800w
                  `}
                  sizes="(max-width: 600px) 400px, (max-width: 900px) 600px, 800px"
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
    </Box>
  );
};

export default Gallery;
