import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Button, TextField, CircularProgress, IconButton, Snackbar, Alert, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../../Store/blogApi';
import { useAuth } from '../../contexts/AuthContext';

const AdminBlog = () => {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    try {
      if (editMode && editId) {
        await updateBlog({ id: editId, title, content, image, token });
        setSuccess('Blog updated successfully!');
      } else {
        await createBlog({ title, content, image, token });
        setSuccess('Blog created successfully!');
      }
      setTitle('');
      setContent('');
      setImage(null);
      setEditId(null);
      setEditMode(false);
      fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save blog.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setEditId(blog._id);
    setEditMode(true);
    setImage(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteDialogOpen(false);
    if (!deleteTargetId) return;
    setLoading(true);
    setError('');
    try {
      await deleteBlog({ id: deleteTargetId, token });
      setSuccess('Blog deleted.');
      fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete blog.');
    } finally {
      setLoading(false);
      setDeleteTargetId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteTargetId(null);
  };

  const handleCancelEdit = () => {
    setTitle('');
    setContent('');
    setImage(null);
    setEditId(null);
    setEditMode(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main', textAlign: 'center' }}>Admin Blog Management</Typography>
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 4 }}>
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>{editMode ? 'Edit Blog' : 'Create New Blog'}</Typography>
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            sx={{ mb: 2, width: '50%' }}
          />
          <TextField
            label="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            multiline
            minRows={6}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            component="label"
            startIcon={<AddIcon />}
            sx={{ mb: 2, maxWidth: 220 }}
          >
            {editMode ? 'Change Image' : 'Upload Image'}
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>
          {image && <Typography variant="body2" sx={{ ml: 2 }}>{image.name}</Typography>}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained" color="primary" disabled={formLoading} sx={{ minWidth: 120 }}>
              {formLoading ? <CircularProgress size={24} /> : (editMode ? 'Update Blog' : 'Create Blog')}
            </Button>
            {editMode && (
              <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>Cancel</Button>
            )}
          </Box>
        </form>
      </Paper>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Snackbar open autoHideDuration={3000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>{success}</Alert>
      </Snackbar>}
      <Paper sx={{ p: 3, backgroundColor: 'inherit' }} elevation={0}>
        <Typography variant="h6" sx={{ color: 'primary.light', mb: 2, fontWeight: 'bold' }}>All Blogs</Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
        ) : blogs.length === 0 ? (
          <Typography>No blogs found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {blogs.map(blog => (
              <Grid item xs={12} md={6} key={blog._id}>
                <Paper sx={{ p: 2, borderRadius: 2, position: 'relative', minHeight: 220, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'stretch', gap: 2, boxShadow: 2 }}>
                  {blog.imageUrl && (
                    <Box sx={{ flex: '0 0 140px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 140, maxHeight: 180, width: 140, mr: { sm: 2, xs: 0 }, mb: { xs: 2, sm: 0 } }}>
                      <img src={blog.imageUrl} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, boxShadow: 1 }} />
                    </Box>
                  )}
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, textDecoration: 'none' }}>{blog.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, minHeight: 48 }}>{blog.content?.slice(0, 120)}...</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                      <IconButton color="primary" onClick={() => handleEdit(blog)}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleDeleteClick(blog._id)}><DeleteIcon /></IconButton>
                    </Box>
                    <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>Created: {new Date(blog.createdAt).toLocaleString()}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Blog?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this blog post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary" variant="outlined">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminBlog; 