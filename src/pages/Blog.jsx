import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Icon,
  Paper
} from '@mui/material';
import BlogBanner from '../components/Banner/BlogBanner';
import HomeIcon from '@mui/icons-material/Home'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Blog = () => {
  const allBlogs = [
    {
      title: 'Sustainable Farming Practices',
      description: 'Discover how sustainable farming is changing the world one step at a time.',
      image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      link: '#',
      date: 'May 20, 2025',
      author: 'Admin',
    },
    {
      title: 'The Art of Growing Rice',
      description: 'Learn the secrets behind cultivating the perfect rice harvest.',
      image: 'https://images.unsplash.com/photo-1512997052393-4a22852e4082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      link: '#',
      date: 'May 15, 2025',
      author: 'Admin',
    },
    {
      title: 'Eco-Friendly Packaging',
      description: 'Explore innovative eco-friendly packaging solutions for your farm produce.',
      image: 'https://images.unsplash.com/photo-1518972559570-8f262c164d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      link: '#',
      date: 'May 10, 2025',
      author: 'Admin',
    },
  ];

  const recentComments = [
    { name: 'Jane Doe', comment: 'Great insights on eco-friendly packaging!' },
    { name: 'John Smith', comment: 'I loved the post on growing rice. Keep it up!' },
    { name: 'Emily Brown', comment: 'The sustainable farming tips are really helpful.' },
  ];

  const [search, setSearch] = useState('');
  const filteredBlogs = allBlogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  const breadcrumbLinks = [
    {href: '/', label: 'Home', icon: <HomeIcon sx={{mr:0.5}} fontSize='small' />},
    {href: '/blog', label: 'Blogs'},
  ];

  return (
    <Box sx={{ background: '#f9f9f9', minHeight: '100vh', position: 'relative', }}>
      <BlogBanner />
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
        <Breadcrumb links={breadcrumbLinks} />
      </Box>

      <Grid container spacing={8} justifyContent="center" sx={{mt: 8}}>
        {/* Main Blog Section */}
        <Grid item xs={12} md={9}>
          {filteredBlogs.map((post, index) => (
            <Card
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'stretch',
                mb: 3,
                boxShadow: 3,
                borderRadius: 3,
                minHeight: 220,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 5,
                },
              }}
            >
              <CardMedia
                component="img"
                image={post.image}
                alt={post.title}
                sx={{ width: 220, height: 220, objectFit: 'cover', borderRadius: '12px 0 0 12px' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  sx={{ color: '#888', fontStyle: 'italic' }}
                >
                  {post.date} • {post.author}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mt: 1, fontWeight: 'bold', color: 'primary.main', mb: 1 }}
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, textAlign: 'justify', color: '#555' }}
                >
                  {post.description}
                </Typography>
                <Button
                  variant="outlined"
                  href={post.link}
                  sx={{
                    mt: 2,
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: 'primary.main', color: '#fff', borderColor: 'primary.main' },
                  }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          {/* Search Blog */}
          <Box sx={{ mb: 4, boxShadow: 2, p: 2, backgroundColor: '#fff' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
              Search Blog
            </Typography>
            <TextField
              fullWidth
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Box>

          {/* Recent Blogs */}
          <Box sx={{ mb: 4, boxShadow: 2, p: 2, backgroundColor: '#fff' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
              Recent Blogs
            </Typography>
            <List>
              {allBlogs.map((blog, index) => (
                <ListItem key={index} button component="a" href={blog.link}>
                  <ListItemText
                    primary={blog.title}
                    secondary={blog.date}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Recent Comments */}
          <Box sx={{ boxShadow: 2, p: 2, backgroundColor: '#fff' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
              Recent Comments
            </Typography>
            <List>
              {recentComments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={comment.name}
                    secondary={comment.comment}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>

      {/* Newsletter Subscription */}
      <Box sx={{ mt: 5, p: 3, textAlign: 'center', backgroundColor: '#fff', boxShadow: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Subscribe to Our Newsletter
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter your email"
          sx={{ mt: 2, maxWidth: 400 }}
        />
        <br></br>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#2c3e50',
            color: '#fff',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#34495e' },
          }}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};

export default Blog;
