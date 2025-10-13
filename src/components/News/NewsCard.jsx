import React from 'react'
import { Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions, Box, Chip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const NewsCard = ({ article }) => (
    <Card
        sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            },
        }}
        elevation={2}
    >
        <CardActionArea
            component="a"
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ flexGrow: 1 }}
        >
            {article.image && (
                <CardMedia
                    component="img"
                    height="180"
                    image={article.image}
                    alt={article.title}
                    sx={{ objectFit: 'cover' }}
                />
            )}
            <CardContent>
                <Box sx={{ display: 'flex', gap: 1, alighnItems: 'center', mb: 1 }}>
                    {article.category && <Chip label={article.category} size="small" color="primary" />}
                    <Typography variant='caption' color='text.secondary'>
                        {new Date(article.date).toLocaleDateString()}
                    </Typography>
                </Box>
                <Typography
                    variant='h6'
                    sx={{
                        fontWeight: '700',
                        mb: 1,
                        lineHeight: 1.3,
                    }}
                >
                    {article.title}
                </Typography>
                <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {article.summary}
                </Typography>
            </CardContent>
        </CardActionArea>

        <CardActions sx={{px: 2, pb: 2, pt: 0, mt: 'auto'}}>
            <Button
            size='small'
            component='a'
            href={article.link}
            target='_blank'
            rel='noopener noreferrer'
            endIcon={<OpenInNewIcon />}
            >
                Read Full Story
            </Button>
        </CardActions>

    </Card>
);

export default NewsCard;
