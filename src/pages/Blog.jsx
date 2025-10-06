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
  Alert,
  InputAdornment,
  ListItemButton
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
import SearchIcon from '@mui/icons-material/Search';

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
      setModalBlog(res.data.blog || res.data);
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

  const filteredBlogs = blogs
    .filter(blog =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const breadcrumbLinks = [
    {href: '/', label: 'Home', icon: <HomeIcon sx={{mr:0.5}} fontSize='small' />},
    {href: '/blog', label: 'Blogs'},
  ];

  return (
    <Box sx={{ background: '#f9f9f9', minHeight: '100vh', position: 'relative' }}>
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
      {/* Reduce side margins to ~1.5rem and use full width */}
      <Box sx={{ maxWidth: '100%', mx: 'auto', px: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <TextField
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search blogs..."
            variant="outlined"
            size="small"
            sx={{ width: { xs: '100%', sm: 400 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* Keep layout from centering when no results */}
        <Grid container spacing={3} justifyContent="space-between" alignItems="flex-start">
          <Grid item xs={12} md={8}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            ) : filteredBlogs.length === 0 ? (
              <Typography sx={{ color: 'text.secondary', mt: 2 }}>No blogs found.</Typography>
            ) : (
              filteredBlogs.map((post, index) => (
                <Card
                  key={post._id || index}
                  sx={{
                    display: 'flex',
                    alignItems: 'stretch',
                    mb: 2.5,
                    boxShadow: 0,
                    borderRadius: 3,
                    minHeight: 200,
                    background: '#fff',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.015)',
                      boxShadow: 4,
                    },
                    cursor: 'pointer'
                  }}
                  onClick={() => handleOpenModal(post._id)}
                >
                  {post.imageUrl && (
                    <CardMedia
                      component="img"
                      image={post.imageUrl}
                      alt={post.title}
                      loading="lazy"
                      sx={{ width: 190, height: 180, objectFit: 'cover', borderRadius: '12px 0 0 12px' }}
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
                        sx={{ mt: 1, fontWeight: 'bold', color: 'orange', mb: 1 }}
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
                      onClick={(e) => { e.stopPropagation(); handleOpenModal(post._id); }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 24, width: '100%' }}>
              <Box sx={{ mb: 3, boxShadow: 1, p: 3, backgroundColor: '#fff', borderRadius: 2, ml: { md: 2 } }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.light', mb: 2 }}>
                  Recent Blogs
                </Typography>
                <List>
                  {recentBlogs.map((blog, index) => (
                    <ListItemButton 
                      key={blog._id || index} 
                      alignItems="flex-start"
                      sx={{ borderRadius: 1, mb: 1.5, p: 0.5 }}
                      onClick={() => handleOpenModal(blog._id)}
                    >
                      {blog.imageUrl && (
                        <Box sx={{ minWidth: 60, minHeight: 60, maxWidth: 60, maxHeight: 60, mr: 2, borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
                          <img src={blog.imageUrl} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                        </Box>
                      )}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 0.5, lineHeight: 1.2 }}>
                          {blog.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}
                        </Typography>
                      </Box>
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* Newsletter Subscription */}
      <Box sx={{ mt: 5, p: 4, textAlign: 'center', background: 'linear-gradient(90deg, #fffde4 0%, #e0ffe7 100%)', boxShadow: 0, borderRadius: 3, maxWidth: '100%', mx: 'auto', px: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Subscribe to Our Newsletter
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter your email"
          sx={{ mt: 2, maxWidth: 400, background: '#fff', borderRadius: 1, mx: 'auto' }}
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
          ) : modalBlog && (modalBlog.content || modalBlog.imageUrl) ? (
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
          ) : (
            <Typography align="center" sx={{ color: 'text.secondary', my: 4 }}>
              No content found for this blog post.
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Blog;
