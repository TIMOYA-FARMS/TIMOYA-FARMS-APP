import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    title: 'Sustainable Rice Farming: Our Approach',
    excerpt: 'Discover how Timoya Farms is leading the way in sustainable rice farming and supporting local communities.',
    link: '/blog',
  },
  {
    title: 'Meet the Farmers Behind Timoya',
    excerpt: 'Get to know the passionate people who grow and process your rice with care and dedication.',
    link: '/about',
  },
];

const HomeBlogHighlights = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#f5f5f5' }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
      From Our Blog
    </Typography>
    <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', overflowX: 'auto', pb: 2 }}>
      {blogPosts.map((post, idx) => (
        <Card key={idx} sx={{ minWidth: 260, maxWidth: 320, flex: '0 0 auto', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 2, borderRadius: 2 }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>{post.title}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{post.excerpt}</Typography>
            <Button component={Link} to={post.link} variant="outlined" color="primary" size="small">
              Read More
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
);

export default HomeBlogHighlights;
