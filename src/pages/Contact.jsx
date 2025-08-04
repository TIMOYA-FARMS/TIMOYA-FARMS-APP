import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, Button, Paper, Tooltip, Alert, Stack, useMediaQuery } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn, WhatsApp } from '@mui/icons-material';
import ContactBanner from '../components/Banner/ContactBanner';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Contact = () => {
    // Responsive design check - improved breakpoints
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(min-width:601px) and (max-width:1024px)');
    const isDesktop = useMediaQuery('(min-width:1025px)');
    
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
                    mt: 0,
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
            
            {/* Main Content Container - Improved responsive layout */}
            <Box sx={{ 
                py: 4, 
                px: { xs: 2, sm: 3, md: 4, lg: 8 }, 
                display: 'flex', 
                flexDirection: { xs: 'column', lg: 'row' }, 
                gap: { xs: 3, sm: 4, lg: 3 }, 
                alignItems: { xs: 'center', lg: 'flex-start' }, 
                justifyContent: 'space-around',
                maxWidth: '1400px',
                mx: 'auto'
            }} className="contact-section">
                
                {/* Follow Us Section - Improved responsive design */}
                <Paper elevation={3} sx={{
                    width: { xs: '100%', sm: '100%', md: '100%', lg: '30%' },
                    minWidth: { xs: 'auto', sm: '280px' },
                    maxWidth: { xs: '100%', sm: '400px', lg: '350px' },
                    mb: { xs: 2, lg: 0 }, 
                    p: { xs: 2, sm: 3 }, 
                    borderRadius: 4,
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #f0f4ff 60%, #e0f7fa 100%)',
                }} className="contact-card">
                    <Typography variant="h5" sx={{ 
                        fontWeight: 'bold', 
                        mb: 2, 
                        color: 'primary.main', 
                        letterSpacing: 1, 
                        textAlign: 'center',
                        fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}>
                        Follow Us
                    </Typography>
                    <Stack
                        direction={isMobile ? 'column' : 'row'}
                        spacing={{ xs: 1, sm: 2 }}
                        justifyContent="center"
                        alignItems="center"
                        sx={{ flexWrap: 'wrap', gap: { xs: 1, sm: 1.5 } }}
                        className="social-icons-container"
                    >
                        <Tooltip title="Facebook">
                            <IconButton
                                component="a"
                                href="https://m.facebook.com/timoyafarms/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="social-media-icon"
                                sx={{
                                    backgroundColor: '#1877F2',
                                    color: 'white',
                                    width: { xs: 40, sm: 48 },
                                    height: { xs: 40, sm: 48 },
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        backgroundColor: '#1565C0',
                                    },
                                }}
                            >
                                <Facebook sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Instagram">
                            <IconButton
                                component="a"
                                href="https://www.instagram.com/timoyafarms/?hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="social-media-icon"
                                sx={{
                                    backgroundColor: '#E1306C',
                                    color: 'white',
                                    width: { xs: 40, sm: 48 },
                                    height: { xs: 40, sm: 48 },
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        backgroundColor: '#C2185B',
                                    },
                                }}
                            >
                                <Instagram sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="LinkedIn">
                            <IconButton
                                component="a"
                                href="https://gh.linkedin.com/company/timoya-farms"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="social-media-icon"
                                sx={{
                                    backgroundColor: '#0A66C2',
                                    color: 'white',
                                    width: { xs: 40, sm: 48 },
                                    height: { xs: 40, sm: 48 },
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        backgroundColor: '#004182',
                                    },
                                }}
                            >
                                <LinkedIn sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="X (Twitter)">
                            <IconButton
                                component="a"
                                href="https://x.com/Timoyafarms"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="social-media-icon"
                                sx={{
                                    backgroundColor: '#000',
                                    color: 'white',
                                    width: { xs: 40, sm: 48 },
                                    height: { xs: 40, sm: 48 },
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        backgroundColor: '#333',
                                    },
                                }}
                            >
                                <Twitter sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="WhatsApp">
                            <IconButton
                                component="a"
                                href="https://wa.me/233540700007"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="social-media-icon"
                                sx={{
                                    backgroundColor: '#25D366',
                                    color: 'white',
                                    width: { xs: 40, sm: 48 },
                                    height: { xs: 40, sm: 48 },
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        backgroundColor: '#128C7E',
                                    },
                                }}
                            >
                                <WhatsApp sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Typography variant="body2" sx={{ 
                        color: '#555', 
                        mt: 2, 
                        textAlign: 'center',
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        Stay connected with us on social media!
                    </Typography>
                </Paper>

                {/* Get in Touch Section - Improved responsive design */}
                <Paper elevation={3} sx={{
                    width: { xs: '100%', sm: '100%', md: '100%', lg: '35%' },
                    minWidth: { xs: 'auto', sm: '280px' },
                    maxWidth: { xs: '100%', sm: '400px', lg: '400px' },
                    mb: { xs: 2, lg: 0 }, 
                    p: { xs: 2, sm: 3 }, 
                    borderRadius: 4,
                    textAlign: 'center', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #f9fbe7 60%, #e0f2f1 100%)',
                }} className="contact-card">
                    <Typography variant="h5" sx={{ 
                        fontWeight: 'bold', 
                        mb: 2, 
                        color: 'primary.main', 
                        letterSpacing: 1, 
                        textAlign: 'center',
                        fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}>
                        Get in Touch
                    </Typography>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: { xs: 'center', sm: 'flex-start' }, 
                        width: '100%', 
                        gap: 2, 
                        ml: { xs: 0, sm: 2 },
                        px: { xs: 1, sm: 0 }
                    }}>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1, 
                            mb: 1,
                            width: '100%',
                            flexWrap: 'wrap'
                        }} className="contact-info-item">
                            <Box sx={{ 
                                background: '#1976d2', 
                                borderRadius: '50%', 
                                p: { xs: 0.8, sm: 1 }, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Phone sx={{ color: '#fff', fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />
                            </Box>
                            <a 
                                href="tel:+1234567890" 
                                className="contact-info-text"
                                style={{ 
                                    color: '#555', 
                                    textDecoration: 'none', 
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    wordBreak: 'break-word'
                                }}
                            >
                                +123 456 7890
                            </a>
                        </Box>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1, 
                            mb: 1,
                            width: '100%',
                            flexWrap: 'wrap'
                        }} className="contact-info-item">
                            <Box sx={{ 
                                background: '#d32f2f', 
                                borderRadius: '50%', 
                                p: { xs: 0.8, sm: 1 }, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Email sx={{ color: '#fff', fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />
                            </Box>
                            <a 
                                href="mailto:contact@example.com" 
                                className="contact-info-text"
                                style={{ 
                                    color: '#555', 
                                    textDecoration: 'none', 
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    wordBreak: 'break-word'
                                }}
                            >
                                contact@example.com
                            </a>
                        </Box>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            gap: 1,
                            width: '100%',
                            flexWrap: 'wrap'
                        }} className="contact-info-item">
                            <Box sx={{ 
                                background: '#388e3c', 
                                borderRadius: '50%', 
                                p: { xs: 0.8, sm: 1 }, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                flexShrink: 0,
                                mt: { xs: 0.2, sm: 0 }
                            }}>
                                <LocationOn sx={{ color: '#fff', fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />
                            </Box>
                            <span 
                                className="contact-info-text"
                                style={{ 
                                    color: '#555', 
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    wordBreak: 'break-word',
                                    lineHeight: '1.4'
                                }}
                            >
                                123 Main Street, City, Country
                            </span>
                        </Box>
                    </Box>
                    <Typography variant="body2" sx={{ 
                        color: '#555', 
                        mt: 2, 
                        textAlign: 'center',
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        We're available during business hours for your inquiries.
                    </Typography>
                </Paper>

                {/* Contact Form - Improved responsive design */}
                <Paper elevation={3} sx={{ 
                    width: { xs: '100%', sm: '100%', md: '100%', lg: '35%' },
                    minWidth: { xs: 'auto', sm: '280px' },
                    maxWidth: { xs: '100%', sm: '400px', lg: '400px' },
                    mb: { xs: 2, lg: 0 }, 
                    p: { xs: 2, sm: 3 }, 
                    borderRadius: 4, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center' 
                }} className="contact-card">
                    <Typography variant="h5" sx={{ 
                        fontWeight: 'bold', 
                        mb: 2, 
                        textAlign: 'center', 
                        color: 'primary.main', 
                        letterSpacing: 1,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}>
                        Send Us a Message
                    </Typography>
                    <Typography variant="body2" sx={{ 
                        color: '#555', 
                        mb: 2, 
                        textAlign: 'center',
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        We'd love to hear from you! Fill out the form and our team will get back to you soon.
                    </Typography>
                    {formSuccess && <Alert severity="success" sx={{ mb: 2, width: '100%' }}>Thank you for reaching out! We will get back to you soon.</Alert>}
                    {formError && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{formError}</Alert>}
                    <Box
                        component="form"
                        aria-label="Contact form"
                        onSubmit={handleSubmit}
                        className="contact-form"
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
                        <TextField 
                            label="Name" 
                            name="name" 
                            value={form.name} 
                            onChange={handleInputChange} 
                            fullWidth 
                            required 
                            size={isMobile ? "small" : "medium"}
                        />
                        <TextField 
                            label="Email" 
                            name="email" 
                            value={form.email} 
                            onChange={handleInputChange} 
                            fullWidth 
                            required 
                            type="email" 
                            size={isMobile ? "small" : "medium"}
                        />
                        <TextField 
                            label="Message" 
                            name="message" 
                            value={form.message} 
                            onChange={handleInputChange} 
                            fullWidth 
                            required 
                            multiline 
                            rows={isMobile ? 3 : 4} 
                            size={isMobile ? "small" : "medium"}
                        />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="secondary" 
                            sx={{ 
                                fontWeight: 'bold', 
                                borderRadius: 3, 
                                py: { xs: 1, sm: 1.2 }, 
                                fontSize: { xs: '0.9rem', sm: '1.1rem' }, 
                                boxShadow: '0 2px 8px rgba(255,184,0,0.12)', 
                                textTransform: 'uppercase', 
                                transition: 'all 0.3s', 
                                '&:hover': { 
                                    backgroundColor: 'primary.main', 
                                    color: 'white' 
                                } 
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Paper>
            </Box>
            
            {/* Map Section - Improved responsive design */}
            <Box sx={{ 
                textAlign: 'center', 
                mt: 4,
                px: { xs: 2, sm: 3, md: 4, lg: 0 }
            }}>
                <Typography variant="h5" sx={{ 
                    fontWeight: 'bold', 
                    mb: 2, 
                    color: 'primary.main',
                    fontSize: { xs: '1.5rem', sm: '2rem' }
                }}>
                    Find Us
                </Typography>
                <Box
                    className="contact-map"
                    sx={{
                        width: '100%',
                        maxWidth: 1200,
                        mx: 'auto',
                        height: { xs: 250, sm: 300 },
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
