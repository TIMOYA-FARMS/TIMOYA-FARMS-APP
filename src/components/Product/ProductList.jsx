import { Box, Grid } from '@mui/material'
import React from 'react'
import ProductCard from './ProductCard'

const ProductList = (props) => {
    return (
        <Box>
            <Grid container spacing={2}>
                {
                    props.products.map((product) => {
                        return <Grid key={product.id} size={{ sm: 12, md: 6, lg: 3 }}>
                            <ProductCard
                                id={product.id}
                                key={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                                description={product.description}
                            />
                        </Grid>

                    })
                }
            </Grid>
        </Box>
    )
}

export default ProductList
