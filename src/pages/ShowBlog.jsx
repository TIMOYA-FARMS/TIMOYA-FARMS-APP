import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Paper, Button } from '@mui/material';
import { getBlog } from '../Store/blogApi';

const ShowBlog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getBlog(blogId);
        setBlog(res.data);
      } catch (err) {
        setError('Failed to load blog post.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ my: 4 }}>{error}</Alert>;
  if (!blog) return null;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 6, mb: 8, p: { xs: 1, sm: 3 } }}>
      <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, boxShadow: 3 }}>
        {blog.imageUrl && (
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <img src={blog.imageUrl} alt={blog.title} style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 12, objectFit: 'cover', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }} />
          </Box>
        )}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>{blog.title}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 3 }}>
          By {blog.author?.name || blog.author?.firstName || 'Admin'} • {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}
        </Typography>
        <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8, mb: 2, whiteSpace: 'pre-line' }}>
          {blog.content}
        </Typography>
        <Button component={Link} to="/blog" variant="outlined" sx={{ mt: 3 }}>
          Back to Blog
        </Button>
      </Paper>
    </Box>
  );
};

export default ShowBlog; 