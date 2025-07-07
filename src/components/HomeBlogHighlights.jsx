import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';

const blogPosts = [
  {
    title: 'Sustainable Rice Farming: Our Approach',
    excerpt: 'Discover how Timoya Farms is leading the way in sustainable rice farming and supporting local communities.',
    link: '/blog',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    author: 'Admin',
    date: '2024-05-01',
  },
  {
    title: 'Meet the Farmers Behind Timoya',
    excerpt: 'Get to know the passionate people who grow and process your rice with care and dedication.',
    link: '/about',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    author: 'Ama Boateng',
    date: '2024-04-20',
  },
];

const HomeBlogHighlights = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#f5f5f5' }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
      From Our Blog
    </Typography>
    <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', overflowX: 'auto', pb: 2, flexWrap: { xs: 'nowrap', md: 'wrap' } }}>
      {blogPosts.map((post, idx) => (
        <Card key={idx} sx={{ minWidth: 260, maxWidth: 320, flex: '0 0 auto', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 2, borderRadius: 2, background: '#fff' }}>
          <CardMedia
            component="img"
            height={180}
            image={post.image}
            alt={post.title}
            loading="lazy"
            sx={{ height: 140, objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>{post.title}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{post.excerpt}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              By {post.author} • {new Date(post.date).toLocaleDateString()}
            </Typography>
            <Button component={Link} to={post.link} variant="outlined" color="primary" size="small">
              Read More
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Button component={Link} to="/blog" variant="contained" color="secondary" size="large" sx={{ fontWeight: 'bold', px: 6, py: 1.5, borderRadius: 3, letterSpacing: 1, boxShadow: 2, textTransform: 'uppercase' }}>
        View All Blog Posts
      </Button>
    </Box>
  </Box>
);

export default HomeBlogHighlights;
