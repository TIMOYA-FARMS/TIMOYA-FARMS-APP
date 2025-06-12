import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const galleryImages = [
  'https://timoyafarms.com/wp-content/uploads/2023/10/photo_1_2023-10-22_18-42-50.jpg',
  'https://timoyafarms.com/wp-content/uploads/2023/10/photo_2_2023-10-22_18-42-50-3.jpg',
  'https://timoyafarms.com/wp-content/uploads/2023/11/744-757.jpg',
  'https://timoyafarms.com/wp-content/uploads/2023/10/photo_2_2023-10-22_19-23-31.jpg',
];

const HomeGalleryPreview = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#fff' }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
      Gallery Preview
    </Typography>
    <Grid container spacing={2} justifyContent="center">
      {galleryImages.map((img, idx) => (
        <Grid item xs={6} sm={3} key={idx}>
          <Card sx={{ boxShadow: 2, borderRadius: 2, overflow: 'hidden', height: 140 }}>
            <CardMedia
              component="img"
              image={img}
              alt={`Gallery Preview ${idx + 1}`}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
    <Box sx={{ textAlign: 'center', mt: 3 }}>
      <Button component={Link} to="/gallery" variant="outlined" color="primary" sx={{ fontWeight: 'bold', px: 4, py: 1 }}>
        View Full Gallery
      </Button>
    </Box>
  </Box>
);

export default HomeGalleryPreview;
