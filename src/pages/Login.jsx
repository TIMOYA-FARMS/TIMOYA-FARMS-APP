import React, { useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, Link, Grid } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    const success = await login(form.email, form.password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <Box sx={{
      background: '#f9f9f9',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',
      p: 0,
    }}>
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Image Section (Left) */}
        <Grid item xs={12} md={6} sx={{
          backgroundImage: 'url(https://res.cloudinary.com/dgwp3bvrr/image/upload/v1760335449/photo_23_2023-10-19_19-45-24-1_nsmgjt.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: { xs: 'none', md: 'block' },
        }} />

        {/* Login Form Section (Right) */}
        <Grid item xs={12} md={6} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          px: { xs: 3, sm: 6, md: 8 },
        }}>
          <Box sx={{ width: '100%', maxWidth: 420 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2, textAlign: 'center' }}>
              Login
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', mb: 3, textAlign: 'center' }}>
              Welcome back! Please enter your credentials to sign in.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {(error || authError) && (
                <Typography variant="body2" sx={{ color: 'error.main', mt: 1, mb: 1, textAlign: 'center' }}>{error || authError}</Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mt: 2, fontWeight: 'bold', borderRadius: 3, py: 1.2, fontSize: '1.1rem', textTransform: 'uppercase' }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Box>

            <Typography variant="body2" sx={{ color: '#555', mt: 3, textAlign: 'center' }}>
              Don't have an account?{' '}
              <Link href="/register" underline="hover" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Register
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
