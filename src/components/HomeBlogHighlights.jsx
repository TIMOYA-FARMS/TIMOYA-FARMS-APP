import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import { getBlogs } from '../Store/blogApi';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getBlog } from '../Store/blogApi';

const HomeBlogHighlights = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
        let data = Array.isArray(res.data) ? res.data : res.data.blogs;
        setBlogs(Array.isArray(data) ? data.slice(0, 2) : []);
      } catch (err) {
        setError('Failed to load blog highlights.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
        From Our Blog
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : blogs.length === 0 ? (
        <Typography align="center" sx={{ color: 'text.secondary' }}>No blog posts found.</Typography>
      ) : (
        <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', overflowX: 'auto', pb: 2, flexWrap: { xs: 'nowrap', md: 'wrap' } }}>
          {blogs.map((post, idx) => (
            <Card key={post._id || idx} sx={{ minWidth: 260, maxWidth: 320, flex: '0 0 auto', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 2, borderRadius: 2, background: '#fff' }}>
              {post.imageUrl && (
                <CardMedia
                  component="img"
                  image={post.imageUrl}
                  alt={post.title}
                  loading="lazy"
                  sx={{ width: '100%', height: 180, objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>{post.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{post.content?.slice(0, 100) || post.description}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                  By {post.author?.name || post.author?.firstName || 'Admin'} • {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
                </Typography>
                <Button variant="outlined" color="primary" size="small" onClick={() => handleOpenModal(post._id)}>
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button component={Link} to="/blog" variant="contained" color="secondary" size="large" sx={{ fontWeight: 'bold', px: 6, py: 1.5, borderRadius: 3, letterSpacing: 1, boxShadow: 2, textTransform: 'uppercase' }}>
          View All Blog Posts
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

export default HomeBlogHighlights;
