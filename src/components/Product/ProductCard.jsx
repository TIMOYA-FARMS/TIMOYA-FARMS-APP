import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = (props) => {
    return (
        <Card sx={{ maxWidth: 345, mt: 5 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={props.image}
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {props.title}
                </Typography>
                <Typography gutterBottom variant='h5' component='div'>
                    {props.price}
                </Typography>
                <Typography variant='body2' sx={{color: 'text.secondary'}}>
                    {props.description && props.description.substring(0,50)}
                </Typography>
                <Typography gutterBottom variant='h5' component='div'>
                    {props.stock}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/products/${props.id}`} variant='outlined' size='small'>View</Button>
                <Button component={Link} to={`/cart/${props.id}`} variant='contained' size='small'>Add to Cart</Button>
            </CardActions>


        </Card>
    )
}

export default ProductCard
