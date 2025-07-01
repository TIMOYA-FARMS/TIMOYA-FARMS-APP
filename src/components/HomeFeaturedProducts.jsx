import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const featured = [
  {
    title: 'Premium Parboiled Rice',
    image: 'https://timoyafarms.com/wp-content/uploads/2023/10/photo_23_2023-10-19_19-45-24-1.jpg',
    desc: 'Our best-selling, nutritious, and delicious parboiled rice, grown and processed sustainably.',
  },
  {
    title: 'Eco-Friendly Packaging',
    image: 'https://timoyafarms.com/wp-content/uploads/2023/10/IMG-20230222-WA0006.jpg',
    desc: 'We use biodegradable, planet-friendly packaging for all our products.',
  },
  {
    title: 'Farmer Partnerships',
    image: 'https://images.unsplash.com/photo-1655102713930-ed68081e6b7d?q=80&w=2083&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    desc: 'We empower local farmers with fair compensation, training, and support.',
  },
];

const HomeFeaturedProducts = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#fff' }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
      Featured Highlights
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {featured.map((item, idx) => (
        <Grid item xs={12} sm={6} md={4} key={idx}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 3 }}>
            <CardMedia
              component="img"
              image={item.image}
              alt={item.title}
              sx={{ height: 180, objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>{item.title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{item.desc}</Typography>
              <Button 
                component={Link} 
                to="/products" 
                variant="contained" 
                color="secondary" 
                size="medium"
                sx={{
                  fontWeight: 700,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(255,184,0,0.15)',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                Shop Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default HomeFeaturedProducts;
