import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, CircularProgress, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { can } from '../../utils/permissions';

const Products = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' | 'edit'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const stockStatusOptions = ['In Stock', 'Out of Stock', 'Pre-order'];
  const [form, setForm] = useState({ productName: '', price: '', stock: '', description: '', image: null, quantity: '', stockStatus: 'In Stock' });
  const fileInputRef = useRef();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (user?.role !== 'Admin') return;
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${baseUrl}/products`);
      console.log('Fetched products:', res.data.products || res.data);
      setProducts(res.data.products || res.data);
    } catch (err) {
      setError('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (mode, product = null) => {
    setDialogMode(mode);
    setSelectedProduct(product);
    setForm(product ? {
      ...product,
      image: null,
      stockStatus: product.stockStatus || 'In Stock',
      quantity: product.quantity || '',
    } : { productName: '', price: '', stock: '', description: '', image: null, quantity: '', stockStatus: 'In Stock' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setForm({ productName: '', price: '', stock: '', description: '', image: null, quantity: '', stockStatus: 'In Stock' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('productName', form.productName);
      formData.append('price', Number(form.price));
      formData.append('stock', form.stock);
      formData.append('description', form.description);
      formData.append('quantity', form.quantity);
      formData.append('stockStatus', form.stockStatus);
      if (form.image) formData.append('image', form.image);
      if (dialogMode === 'add') {
        await axios.post(`${baseUrl}/products`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else if (dialogMode === 'edit' && selectedProduct) {
        await axios.patch(`${baseUrl}/products/${selectedProduct._id || selectedProduct.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      fetchProducts();
      handleCloseDialog();
    } catch (err) {
      setError('Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setLoading(true);
    setError('');
    try {
      await axios.delete(`${baseUrl}/products/${id}`);
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product.');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'Admin') {
    return <Box sx={{ p: 4, textAlign: 'center' }}><Typography variant="h6" color="error">Access denied. Admins only.</Typography></Box>;
  }

  const columns = [
    { field: 'productName', headerName: 'Product Name', flex: 1 },
    { field: 'price', headerName: 'Price (₵)', flex: 1, valueFormatter: (params) => `₵${Number(params.value || 0).toFixed(2)}` },
    { field: 'stock', headerName: 'Stock', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleOpenDialog('edit', params.row)}><EditIcon /></IconButton>
          {can(user, 'deleteProduct') && (
            <IconButton color="error" onClick={() => handleDelete(params.row._id || params.row.id)}><DeleteIcon /></IconButton>
          )}
        </>
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: { xs: '100%', md: 1100 }, mx: 'auto', mt: 5, p: { xs: 1, md: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>Product Management</Typography>
      <Paper sx={{ mb: 3, p: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('add')}
          sx={{ mb: 2 }}
          disabled={!can(user, 'createProduct')}
          style={{ display: can(user, 'createProduct') ? 'inline-flex' : 'none' }}
        >
          Add Product
        </Button>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Box sx={{ width: '100%', overflowX: { xs: 'auto', md: 'visible' } }}>
          <div style={{ minWidth: 700 }}>
            {loading ? <CircularProgress /> : (
              <DataGrid
                rows={products}
                columns={columns}
                getRowId={(row) => row.id || row._id}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                disableSelectionOnClick
                autoHeight
              />
            )}
          </div>
        </Box>
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{dialogMode === 'add' ? 'Add Product' : 'Edit Product'}</DialogTitle>
        <DialogContent>
          <TextField label="Product Name" name="productName" value={form.productName} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Price (₵)" name="price" value={form.price} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} required type="number" />
          <TextField label="Stock" name="stock" value={form.stock} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} required type="number" />
          <TextField label="Quantity" name="quantity" value={form.quantity} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} required type="number" />
          <TextField select label="Stock Status" name="stockStatus" value={form.stockStatus} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} required>
            {stockStatusOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField label="Description" name="description" value={form.description} onChange={handleFormChange} fullWidth sx={{ mb: 2 }} multiline rows={2} />
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFormChange}
            style={{ marginTop: 16, marginBottom: 8 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products; 