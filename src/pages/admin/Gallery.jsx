import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Button, TextField, CircularProgress, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getGallery, addGalleryImage, deleteGalleryImage } from '../../Store/galleryApi';
import { getAllCategories } from '../../Store/categoryApi';
import { useAuth } from '../../contexts/AuthContext';
import DialogActions from '@mui/material/DialogActions';

const AdminGallery = () => {
  const { token } = useAuth();
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await getGallery();
      if (Array.isArray(res.data)) {
        setGallery(res.data);
      } else if (Array.isArray(res.data.images)) {
        setGallery(res.data.images);
      } else {
        setGallery([]);
      }
    } catch (err) {
      setError('Failed to load gallery.');
      setGallery([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      if (Array.isArray(res.data)) {
        setCategories(res.data.filter(cat => cat.isActive !== false));
      } else if (Array.isArray(res.data.categories)) {
        setCategories(res.data.categories.filter(cat => cat.isActive !== false));
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchGallery();
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please select an image.');
      return;
    }
    setUploading(true);
    setError('');
    try {
      await addGalleryImage({ image, title, category, token });
      setSuccess('Image uploaded successfully!');
      setImage(null);
      setTitle('');
      setCategory('');
      fetchGallery();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
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
      await deleteGalleryImage({ id: deleteTargetId, token });
      setSuccess('Image deleted.');
      fetchGallery();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete image.');
    } finally {
      setLoading(false);
      setDeleteTargetId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteTargetId(null);
  };

  // Lightbox handlers
  const handleOpenLightbox = (img) => {
    setLightboxImg(img);
    setLightboxOpen(true);
  };
  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setLightboxImg(null);
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>Admin Gallery Management</Typography>
      <Paper sx={{ p: 3, mb: 4, borderRadius: 4 }}>
        <form onSubmit={handleUpload} style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ mr: 2 }}
          >
            Select Image
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>
          <TextField
            label="Title (optional)"
            value={title}
            onChange={e => setTitle(e.target.value)}
            sx={{ minWidth: 200, mr: 2 }}
          />
          <FormControl sx={{ minWidth: 200, mr: 2 }}>
            <InputLabel>Category (optional)</InputLabel>
            <Select
              value={category}
              label="Category (optional)"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">
                <em>No Category</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={uploading}
            sx={{ minWidth: 120 }}
          >
            {uploading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
          {image && <Typography variant="body2" sx={{ ml: 2 }}>{image.name}</Typography>}
        </form>
      </Paper>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Snackbar open autoHideDuration={3000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>{success}</Alert>
      </Snackbar>}
      <Paper sx={{ p: 2,  backgroundColor: 'inherit' }} elevation={0}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Gallery Images</Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
        ) : Array.isArray(gallery) && gallery.length > 0 ? (
          <Grid container spacing={3}>
            {gallery.map(img => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={img._id}>
                <Paper sx={{ p: 2, borderRadius: 2, position: 'relative', height: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleOpenLightbox(img)}>
                  <img src={img.url} alt={img.title || 'Gallery Image'} style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 8, marginBottom: 12 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>{img.title || 'Untitled'}</Typography>
                  {img.category && (
                    <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 500, mb: 1 }}>
                      {categories.find(cat => cat._id === img.category)?.name || 'Category'}
                    </Typography>
                  )}
                  <IconButton aria-label="delete" color="error" onClick={e => { e.stopPropagation(); handleDeleteClick(img._id); }} sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>Uploaded: {new Date(img.createdAt).toLocaleString()}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No images found.</Typography>
        )}
      </Paper>
      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onClose={handleCloseLightbox} maxWidth="md" fullWidth>
        <DialogTitle>{lightboxImg?.title || 'Gallery Image'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0 }}>
          {lightboxImg && (
            <img
              src={lightboxImg.url}
              alt={lightboxImg.title || 'Gallery Image'}
              style={{
                width: '100%',
                maxWidth: '900px',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: 8,
                margin: 'auto',
                display: 'block',
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLightbox} color="primary" variant="outlined">Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Image?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this image? This action cannot be undone.
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

export default AdminGallery; 