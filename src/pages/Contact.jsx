import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, Button, Paper, Tooltip, Alert } from '@mui/material';
import { Facebook, Twitter, Instagram, Email, Phone, LocationOn } from '@mui/icons-material';
import ContactBanner from '../components/Banner/ContactBanner';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Contact = () => {
    // Form state and handlers
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setFormError('');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation
        if (!form.name || !form.email || !form.message) {
            setFormError('All fields are required.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setFormError('Please enter a valid email address.');
            return;
        }
        setFormSuccess(true);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <Box sx={{ position: 'relative', py: 0, px: 0, backgroundColor: '#f9f9f9' }}>
            <ContactBanner />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: { xs: 2, md: 3 },
                    mb: { xs: 2, md: 4 },
                    width: '100%',
                }}
            >
                <Breadcrumb
                    links={[
                        { label: 'Home', href: '/' },
                        { label: 'Contact', href: '/contact' }
                    ]}
                />
            </Box>
            <Box sx={{ py: 4, px: { xs: 2, sm: 4, md: 8 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: 'flex-start', justifyContent: 'space-around' }}>
                {/* Follow Us Section */}
                <Paper elevation={3} sx={{
                    minWidth: 0, mb: 4, p: 3, borderRadius: 4,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    background: 'linear-gradient(135deg, #f0f4ff 60%, #e0f7fa 100%)',
                }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main', letterSpacing: 1, textAlign: 'center' }}>
                        Follow Us
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'center', mb: 1 }}>
                        <Tooltip title="Facebook" arrow>
                            <Box sx={{ background: '#1976d2', borderRadius: '50%', p: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton color="inherit" href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" sx={{ color: '#fff' }}>
                                    <Facebook fontSize="large" />
                                </IconButton>
                            </Box>
                        </Tooltip>
                        <Tooltip title="Twitter" arrow>
                            <Box sx={{ background: '#1da1f2', borderRadius: '50%', p: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton color="inherit" href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" sx={{ color: '#fff' }}>
                                    <Twitter fontSize="large" />
                                </IconButton>
                            </Box>
                        </Tooltip>
                        <Tooltip title="Instagram" arrow>
                            <Box sx={{ background: 'radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)', borderRadius: '50%', p: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton color="inherit" href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" sx={{ color: '#fff' }}>
                                    <Instagram fontSize="large" />
                                </IconButton>
                            </Box>
                        </Tooltip>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#555', mt: 2, textAlign: 'center' }}>
                        Stay connected with us on social media!
                    </Typography>
                </Paper>

                {/* Get in Touch Section */}
                <Paper elevation={3} sx={{
                    minWidth: 0, mb: 4, p: 3, borderRadius: 4,
                    textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center',
                    background: 'linear-gradient(135deg, #f9fbe7 60%, #e0f2f1 100%)',
                }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main', letterSpacing: 1, textAlign: 'center' }}>
                        Get in Touch
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Box sx={{ background: '#1976d2', borderRadius: '50%', p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Phone sx={{ color: '#fff' }} />
                            </Box>
                            <a href="tel:+1234567890" style={{ color: '#555', textDecoration: 'none', fontWeight: 500 }}>+123 456 7890</a>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Box sx={{ background: '#d32f2f', borderRadius: '50%', p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Email sx={{ color: '#fff' }} />
                            </Box>
                            <a href="mailto:contact@example.com" style={{ color: '#555', textDecoration: 'none', fontWeight: 500 }}>contact@example.com</a>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ background: '#388e3c', borderRadius: '50%', p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <LocationOn sx={{ color: '#fff' }} />
                            </Box>
                            <span style={{ color: '#555', fontWeight: 500 }}>123 Main Street, City, Country</span>
                        </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#555', mt: 2, textAlign: 'center' }}>
                        We’re available during business hours for your inquiries.
                    </Typography>
                </Paper>

                {/* Contact Form */}
                <Paper elevation={3} sx={{ minWidth: 0, maxWidth: 420, width: '100%', mb: 4, p: 3, borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: 'primary.main', letterSpacing: 1 }}>
                        Send Us a Message
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555', mb: 2, textAlign: 'center' }}>
                        We’d love to hear from you! Fill out the form and our team will get back to you soon.
                    </Typography>
                    {formSuccess && <Alert severity="success" sx={{ mb: 2 }}>Thank you for reaching out! We will get back to you soon.</Alert>}
                    {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
                    <Box
                        component="form"
                        aria-label="Contact form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: '100%',
                            maxWidth: 400,
                            mx: 'auto',
                            p: 1,
                            borderRadius: 2,
                        }}
                    >
                        <TextField label="Name" name="name" value={form.name} onChange={handleInputChange} fullWidth required />
                        <TextField label="Email" name="email" value={form.email} onChange={handleInputChange} fullWidth required type="email" />
                        <TextField label="Message" name="message" value={form.message} onChange={handleInputChange} fullWidth required multiline rows={4} />
                        <Button type="submit" variant="contained" color="secondary" sx={{ fontWeight: 'bold', borderRadius: 3, py: 1.2, fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(255,184,0,0.12)', textTransform: 'uppercase', transition: 'all 0.3s', '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}>
                            Submit
                        </Button>
                    </Box>
                </Paper>
            </Box>
            {/* Map Section */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                    Find Us
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 1200,
                        mx: 'auto',
                        height: 300,
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: 3,
                    }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.796799759824!2d-0.2011212846830943!3d5.547079395972612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfe31a3cf2e62fd0b%3A0xf31e4e40a63b8d68!2sBlack%20Star%20Square!5e0!3m2!1sen!2sgh!4v1684576985290!5m2!1sen!2sgh"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Maps Location"
                    ></iframe>
                </Box>
            </Box>
        </Box>
    );
};

export default Contact;
