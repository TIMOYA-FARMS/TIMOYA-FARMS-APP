import React, { useEffect, useState } from 'react';
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
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import BlogBanner from '../components/Banner/BlogBanner';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { getBlogs } from '../Store/blogApi';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getBlog } from '../Store/blogApi';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [openBlogId, setOpenBlogId] = useState(null);
  const [modalBlog, setModalBlog] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');

  const handleOpenModal = async (blogId) => {
    setOpenBlogId(blogId);
    setModalLoading(true);
    setModalError('');
    setModalBlog(null);
    try {
      const res = await getBlog(blogId);
      setModalBlog(res.data);
    } catch (err) {
      setModalError('Failed to load blog post.');
    } finally {
      setModalLoading(false);
    }
  };
  const handleCloseModal = () => {
    setOpenBlogId(null);
    setModalBlog(null);
    setModalError('');
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getBlogs();
        if (Array.isArray(res.data)) {
          setBlogs(res.data);
        } else if (Array.isArray(res.data.blogs)) {
          setBlogs(res.data.blogs);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        setError('Failed to load blogs.');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
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

      <Grid container spacing={4} justifyContent="center" sx={{mt: 4}}>
        {/* Main Blog Section */}
        <Grid item xs={12} md={8}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          ) : filteredBlogs.length === 0 ? (
            <Typography align="center" sx={{ color: 'text.secondary', mt: 4 }}>No blogs found.</Typography>
          ) : (
            filteredBlogs.map((post, index) => (
              <Card
                key={post._id || index}
                sx={{
                  display: 'flex',
                  alignItems: 'stretch',
                  mb: 3,
                  boxShadow: 2,
                  borderRadius: 3,
                  minHeight: 200,
                  background: '#fff',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.015)',
                    boxShadow: 4,
                  },
                }}
              >
                {post.imageUrl && (
                  <CardMedia
                    component="img"
                    image={post.imageUrl}
                    alt={post.title}
                    loading="lazy"
                    sx={{ width: 180, height: 180, objectFit: 'cover', borderRadius: '12px 0 0 12px' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: '#888', fontStyle: 'italic' }}
                    >
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''} • {post.author?.name || post.author?.firstName || 'Admin'}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ mt: 1, fontWeight: 'bold', color: 'primary.main', mb: 1 }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, textAlign: 'justify', color: '#555', minHeight: 48 }}
                    >
                      {post.content?.slice(0, 180) || post.description}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    sx={{
                      mt: 2,
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      alignSelf: 'flex-start',
                      '&:hover': { backgroundColor: 'primary.main', color: '#fff', borderColor: 'primary.main' },
                    }}
                    onClick={() => handleOpenModal(post._id)}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Search Blog */}
          <Box sx={{ mb: 4, boxShadow: 2, p: 3, backgroundColor: '#fff', borderRadius: 2 }}>
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
          <Box sx={{ mb: 4, boxShadow: 2, p: 3, backgroundColor: '#fff', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
              Recent Blogs
            </Typography>
            <List>
              {blogs.slice(0, 5).map((blog, index) => (
                <ListItem key={blog._id || index} button component="a" href={"/blog/" + (blog._id || index)} sx={{ borderRadius: 1, mb: 1, '&:hover': { background: '#f0f4f8' } }}>
                  <ListItemText
                    primary={blog.title}
                    secondary={blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>

      {/* Newsletter Subscription */}
      <Box sx={{ mt: 5, p: 4, textAlign: 'center', background: 'linear-gradient(90deg, #fffde4 0%, #e0ffe7 100%)', boxShadow: 2, borderRadius: 3, maxWidth: 700, mx: 'auto' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Subscribe to Our Newsletter
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter your email"
          sx={{ mt: 2, maxWidth: 400, background: '#fff', borderRadius: 1 }}
        />
        <br />
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#2c3e50',
            color: '#fff',
            fontWeight: 'bold',
            px: 4,
            borderRadius: 2,
            '&:hover': { backgroundColor: '#34495e' },
          }}
        >
          Subscribe
        </Button>
      </Box>
      <Dialog open={!!openBlogId} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
          {modalBlog ? modalBlog.title : 'Blog Post'}
          <IconButton onClick={handleCloseModal} size="large"><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 4 } }}>
          {modalLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
          ) : modalError ? (
            <Alert severity="error">{modalError}</Alert>
          ) : modalBlog && (
            <Box>
              {modalBlog.imageUrl && (
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <img src={modalBlog.imageUrl} alt={modalBlog.title} style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 12, objectFit: 'cover', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }} />
                </Box>
              )}
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 3 }}>
                By {modalBlog.author?.name || modalBlog.author?.firstName || 'Admin'} • {modalBlog.createdAt ? new Date(modalBlog.createdAt).toLocaleDateString() : ''}
              </Typography>
              <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8, mb: 2, whiteSpace: 'pre-line' }}>
                {modalBlog.content}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Blog;
