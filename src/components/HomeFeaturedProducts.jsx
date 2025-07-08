import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';

const featured = [
  {
    title: 'Premium Parboiled Rice',
    image: 'https://timoyafarms.com/wp-content/uploads/2023/10/photo_23_2023-10-19_19-45-24-1.jpg',
    desc: 'Our best-selling, nutritious, and delicious parboiled rice, grown and processed sustainably.',
    badge: 'Best Seller',
  },
  {
    title: 'Eco-Friendly Packaging',
    image: 'https://timoyafarms.com/wp-content/uploads/2023/10/IMG-20230222-WA0006.jpg',
    desc: 'We use biodegradable, planet-friendly packaging for all our products.',
    badge: 'Eco',
  },
  {
    title: 'Farmer Partnerships',
    image: 'https://images.unsplash.com/photo-1655102713930-ed68081e6b7d?q=80&w=2083&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    desc: 'We empower local farmers with fair compensation, training, and support.',
    badge: 'Community',
  },
];

const HomeFeaturedProducts = () => (
  <Box sx={{ py: 6, px: { xs: 1, sm: 2, md: 8 }, backgroundColor: '#fff' }}>
    <Typography variant="h4" align="center" component="h2" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
      Featured Highlights
    </Typography>
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: 4,
      justifyContent: 'center',
      alignItems: 'stretch',
      overflowX: { xs: 'auto', md: 'visible' },
      pb: 2,
      width: '100%',
    }}>
      {featured.map((item, idx) => (
        <Box key={idx} sx={{ minWidth: { xs: 260, sm: 300, md: 320 }, maxWidth: 340, flex: '0 0 auto', display: 'flex', alignItems: 'stretch' }}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 3,
              borderRadius: 3,
              transition: 'transform 0.25s, box-shadow 0.25s',
              '&:hover': {
                transform: 'scale(1.035) translateY(-4px)',
                boxShadow: 8,
              },
              position: 'relative',
              overflow: 'visible',
              width: '100%',
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height={180}
                image={item.image.replace('/upload/', '/upload/w_320,h_180,c_fill,f_webp/')}
                srcSet={`
                  ${item.image.replace('/upload/', '/upload/w_160,h_90,c_fill,f_webp/')} 160w,
                  ${item.image.replace('/upload/', '/upload/w_320,h_180,c_fill,f_webp/')} 320w,
                  ${item.image.replace('/upload/', '/upload/w_640,h_360,c_fill,f_webp/')} 640w
                `}
                sizes="(max-width: 600px) 160px, (max-width: 900px) 320px, 640px"
                alt={item.title}
                loading="lazy"
                fetchpriority={idx === 0 ? 'high' : undefined}
                sx={{ height: 180, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              />
              <Chip
                label={item.badge}
                color={item.badge === 'Best Seller' ? 'secondary' : item.badge === 'Eco' ? 'success' : 'primary'}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  letterSpacing: 0.5,
                  boxShadow: 2,
                  zIndex: 2,
                }}
              />
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>{item.title}</Typography>
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
        </Box>
      ))}
    </Box>
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Button component={Link} to="/products" variant="outlined" color="primary" size="large" sx={{ fontWeight: 'bold', px: 6, py: 1.5, borderRadius: 3, letterSpacing: 1 }}>
        View All Products
      </Button>
    </Box>
  </Box>
);

export default HomeFeaturedProducts;
