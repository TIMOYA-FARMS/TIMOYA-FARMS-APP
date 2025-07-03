import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button, Collapse } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const cardStyle = {
  borderRadius: 4,
  boxShadow: 6,
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.03)',
    boxShadow: 12,
    borderColor: 'primary.main',
  },
};

const CARD_HEIGHT = 360;
const AVATAR_SIZE = 72;
const CARD_WIDTH = 300;
const CARD_MIN_HEIGHT = 340;

const OurTeam = () => {
    const teamData = {
        founders: [
            {
                name: 'Moses Tiborgnan',
                title: 'Co-Founder',
                bio: `The Right Rice Guy!
                
                Moses Tiborgnan, our extraordinary co-founder, knows rice farming like the back of his hand—after all, he grew up surrounded by endless rice fields and the laughter of his seven siblings. But Moses isn't your typical farmer. He's a fifth-year medical student with a passion for sustainable agribusiness and a knack for adding a touch of fun to everything he does!
                
                At Timoya Farms, we're all about healthy, whole grain, parboiled rice that's packed with goodness. And Moses? Well, he's the mastermind behind it all. He's taken his deep-rooted connection to the land and transformed it into a vibrant venture that marries innovation with eco-consciousness.
                
                But it's not just about the rice—it's about the package! Moses has waved goodbye to boring plastic and embraced eco-friendly bags that keep the planet smiling. He's got a green thumb and a big heart, and it shows in everything we do.
                
                Now, here's the real secret sauce: Moses believes that teamwork makes the dream work! He's formed partnerships with local farmers, providing them with fair compensation and the training they need to succeed. Together, we're sowing the seeds of a sustainable farming ecosystem that thrives on camaraderie and growth.`,
                image: 'https://res.cloudinary.com/dbyeirmqw/image/upload/v1748955040/founder_Tim4_zkb2pf.jpg',
            },
            {
                name: 'Tampuori Marijanata Angsingmwini',
                title: 'Co-Founder',
                bio: `The Foodie Photographer with a Green Thumb!
                
                Tampuori Marijanata Angsingmwini, our extraordinary co-founder, is a master of capturing deliciousness and sustainability through her lens.As a Doctor of Medical Laboratory Science student, Tampuori's passion for good food, a better environment, and her incredible photography and content marketing skills bring a delightful twist to Timoya Farms.
                
                With a click of her camera, Tampuori captures the vibrant colors and mouthwatering textures of our farm- fresh produce.Her photographs are so tantalizing, they make you want to reach through the screen and savor the flavors! But that's not all—Tampuori's creativity extends beyond visuals.
                Through her captivating content, she whisks you away into our flavorful world, sharing the story of our commitment to quality, sustainability, and, of course, the perfect rice dish.`,
                image: 'https://timoyafarms.com/wp-content/uploads/2023/10/photo_1_2023-10-22_18-42-50.jpg',
            },
        ],
        members: [
            {
                name: 'Womol Job',
                title: 'Productions Officer',
                image: 'https://timoyafarms.com/wp-content/uploads/2023/10/photo_2_2023-10-22_18-42-50-3.jpg',
            },
            {
                name: 'Nana Kwabena Asare',
                title: 'Financial Officer',
                image: 'https://timoyafarms.com/wp-content/uploads/2023/11/744-757.jpg',
            },
            {
                name: 'Abdallah Salia',
                title: 'Marketing Officer',
                image: 'https://timoyafarms.com/wp-content/uploads/2023/10/photo_2_2023-10-22_19-23-31.jpg',
            },
            {
                name: 'Braimah Isaac',
                title: 'Technical Officer',
                image: 'https://timoyafarms.com/wp-content/uploads/2023/10/Isaac-cropped.jpg',
            },
        ],
    };

    const [expanded, setExpanded] = useState({});

    const toggleExpand = (index) => {
        setExpanded((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <Box sx={{ py: 5, px: 2, background: 'linear-gradient(135deg, #e0ffe7 0%, #fffde4 100%)' }}>
            <Typography variant="h3" textAlign="center" sx={{ mb: 4, fontWeight: 'bold', color: '#2c3e50' }}>
                Meet Our Team
            </Typography>

            {/* Founders Section */}
            <Box sx={{ mb: 5 }}>
                <Typography variant="h4" textAlign="center" sx={{ mb: 3, color: '#34495e' }}>
                    Founders
                </Typography>
                <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                    {teamData.founders.map((founder, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ position: 'relative', width: CARD_WIDTH, my: 2 }}>
                                {/* Avatar Overlapping Card */}
                                <Avatar
                                    src={founder.image}
                                    alt={founder.name + ' - Founder'}
                                    sx={{
                                        width: { xs: 56, sm: AVATAR_SIZE },
                                        height: { xs: 56, sm: AVATAR_SIZE },
                                        border: '2.5px solid #fff',
                                        boxShadow: 2,
                                        background: '#fff',
                                        position: 'absolute',
                                        top: -24,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        zIndex: 2,
                                    }}
                                />
                                <Card sx={{
                                    width: '100%',
                                    mt: 3,
                                    pt: 3,
                                    pb: 2,
                                    px: 2,
                                    borderRadius: 4,
                                    boxShadow: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    background: '#fff',
                                    minHeight: 220,
                                }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 0.5, textAlign: 'center' }}>
                                        {founder.name}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5, textAlign: 'center' }}>
                                        {founder.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
                                        <Tooltip title="LinkedIn">
                                            <IconButton color="primary" href="#" target="_blank" size="small">
                                                <LinkedInIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Twitter">
                                            <IconButton color="primary" href="#" target="_blank" size="small">
                                                <TwitterIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                                        <Typography variant="body2" sx={{ mt: 1, textAlign: 'justify', color: '#555' }}>
                                            {founder.bio}
                                        </Typography>
                                    </Collapse>
                                    <Button
                                        variant="text"
                                        onClick={() => toggleExpand(index)}
                                        sx={{ mt: 0.5, textTransform: 'none', color: '#2c3e50', fontSize: '0.95rem', fontWeight: 500 }}
                                    >
                                        {expanded[index] ? 'Read Less' : 'Read More'}
                                    </Button>
                                </Card>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Team Members Section */}
            <Box>
                <Typography variant="h4" textAlign="center" sx={{ mb: 3, color: '#34495e' }}>
                    Our Team Members
                </Typography>
                <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                    {teamData.members.map((member, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ position: 'relative', width: CARD_WIDTH, my: 2 }}>
                                {/* Avatar Overlapping Card */}
                                <Avatar
                                    src={member.image}
                                    alt={member.name + ' - Team Member'}
                                    sx={{
                                        width: { xs: 56, sm: AVATAR_SIZE },
                                        height: { xs: 56, sm: AVATAR_SIZE },
                                        border: '2.5px solid #fff',
                                        boxShadow: 2,
                                        background: '#fff',
                                        position: 'absolute',
                                        top: -24,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        zIndex: 2,
                                    }}
                                />
                                <Card sx={{
                                    width: '100%',
                                    mt: 3,
                                    pt: 3,
                                    pb: 2,
                                    px: 2,
                                    borderRadius: 4,
                                    boxShadow: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    background: '#fff',
                                    minHeight: 180,
                                }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 0.5, textAlign: 'center' }}>
                                        {member.name}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5, textAlign: 'center' }}>
                                        {member.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
                                        <Tooltip title="LinkedIn">
                                            <IconButton color="primary" href="#" target="_blank" size="small">
                                                <LinkedInIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Twitter">
                                            <IconButton color="primary" href="#" target="_blank" size="small">
                                                <TwitterIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Typography variant="body2" sx={{ color: '#888', fontStyle: 'italic', fontSize: '0.97rem', textAlign: 'center', mt: 0.5 }}>
                                        Passionate about sustainable agriculture and teamwork.
                                    </Typography>
                                </Card>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default OurTeam;
