import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = (props) => {
    return (
        <Card sx={{
            width: 320,
            minWidth: 280,
            maxWidth: 340,
            mt: 5,
            borderRadius: 4,
            boxShadow: 4,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
                transform: 'translateY(-4px) scale(1.03)',
                boxShadow: 6,
                borderColor: 'primary.main',
            },
        }}>
            <CardMedia
                sx={{ height: 180, minHeight: 180, backgroundSize: 'contain', backgroundColor: '#FAFAFA' }}
                image={props.image}
            />
            <CardContent sx={{ flexGrow: 1, minHeight: 170, maxHeight: 170, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', overflow: 'hidden' }}>
                <Typography gutterBottom variant='h6' component='div' sx={{ fontWeight: 700, color: 'primary.main', minHeight: 40 }}>
                    {props.productName}
                </Typography>
                <Typography gutterBottom variant='h5' component='div' sx={{ color: 'secondary.main', fontWeight: 900 }}>
                    ₵{props.price}
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary', minHeight: 40, maxHeight: 40, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {props.description && props.description.substring(0, 60)}{props.description && props.description.length > 60 && '...'}
                </Typography>
                <Typography variant='body2' sx={{ color: props.stockStatus === 'In Stock' ? 'green' : 'red', fontWeight: 600, mt: 0, mb: 1, pt: 1}}>
                    {props.stockStatus}
                </Typography>
            </CardContent>
            <CardActions sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button component={Link} to={`/products/${props.id}`} variant='outlined' color='secondary' size='small' sx={{ borderRadius: 2, fontWeight: 600, color: 'primary.main', textTransform: 'uppercase', transition: 'all 0.3s', '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}>
                    View
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    size='medium'
                    sx={{ borderRadius: 2, fontWeight: 700, px: 3, boxShadow: '0 2px 8px rgba(255,184,0,0.12)', textTransform: 'uppercase', transition: 'all 0.3s', '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}
                    onClick={() => props.onAddToCart && props.onAddToCart(props.product)}
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard
