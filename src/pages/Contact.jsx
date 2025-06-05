import React from 'react';
import { Box, Typography, Grid, IconButton, TextField, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, Email, Phone, LocationOn } from '@mui/icons-material';
import Map from '../components/Map'; // Assuming you have a Map component

const Contact = () => {
    return (
        <Box sx={{ py: 4, px: 2, backgroundColor: '#f9f9f9' }}>

            <Box sx={{
                display: 'flex',
                // alignItems: 'center',
                justifyContent: 'space-around',

            }}>
                {/* Follow Us Section */}
                <Box sx={{
                    borderRadius: 4,
                    mb: 4,
                    textAlign: 'center',
                    boxShadow: 3,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: 5,
                    },
                }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Follow Us
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'start'
                    }}>
                        <IconButton color="primary" href="https://facebook.com" target="_blank">
                            <Facebook /> Facebook
                        </IconButton>
                        <IconButton color="primary" href="https://twitter.com" target="_blank">
                            <Twitter />  Tweeter
                        </IconButton>
                        <IconButton color="primary" href="https://instagram.com" target="_blank">
                            <Instagram /> Instagram
                        </IconButton>
                    </Box>
                </Box>

                {/* Get in Touch Section */}
                <Box sx={{borderRadius: 4, mb: 4, textAlign: 'center', boxShadow: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 5,
                }, }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Get in Touch
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Phone sx={{ mr: 1 }} /> +123 456 7890
                        </Typography>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Email sx={{ mr: 1 }} /> contact@example.com
                        </Typography>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOn sx={{ mr: 1 }} /> 123 Main Street, City, Country
                        </Typography>
                    </Box>
                </Box>

                {/* Contact Form */}
                <Box sx={{borderRadius: 4, mb: 4, boxShadow: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 5,
                }, }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                        Send Us a Message
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            maxWidth: 600,
                            mx: 'auto',
                            // backgroundColor: '#fff',
                            p: 3,
                            borderRadius: 2,
                            // boxShadow: 2,
                        }}
                    >
                        <TextField label="Name" fullWidth />
                        <TextField label="Email" fullWidth />
                        <TextField label="Message" fullWidth multiline rows={4} />
                        <Button variant="contained" color="primary" type="submit">
                            Send Message
                        </Button>
                    </Box>
                </Box>


            </Box>
            {/* Map Section */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Find Us
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 800,
                        mx: 'auto',
                        height: 400,
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}
                >
                    {/* Replace the iframe with your Map component or API integration */}
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
