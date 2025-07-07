import { useContext } from "react";
import { useParams } from "react-router-dom"
import CartContext from "../Store/CartContext";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import useApi from '../hooks/useApi';
import { Helmet } from 'react-helmet-async';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ShowProduct = () => {
    const { productId } = useParams();
    const cartContext = useContext(CartContext);
    const { data: productResponse, error, loading } = useApi(`${baseUrl}/products/${productId}`);
    const product = productResponse?.product;
    console.log('Fetched product:', product);

    const addToCartHandler = () => {
        if (!product) {
            return;
        }
        cartContext.addToCart({ ...product, qty: 1 });
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p style={{ color: 'red' }}>Failed to load product.</p>;
    }
    if (!product) {
        return <p>No product found.</p>;
    }

    return (
        <Box sx={{ background: '#f9f9f9', minHeight: '100vh' }}>
            <Helmet>
                <title>{product.productName} | Timoya Farms</title>
                <meta name="description" content={product.description || 'Product details at Timoya Farms.'} />
                <meta property="og:title" content={`${product.productName} | Timoya Farms`} />
                <meta property="og:description" content={product.description || 'Product details at Timoya Farms.'} />
                <meta property="og:type" content="product" />
                <meta property="og:url" content={`https://timoya-farms.com/products/${productId}`} />
                <meta property="og:image" content={product.image} />
            </Helmet>
            <Box sx={{ position: 'relative', backgroundColor: '#f9f9f9', py: 0, px: 0 }}>
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
                            { label: 'Products', href: '/products' },
                            { label: product.productName, href: `${baseUrl}/products/${productId}` }
                        ]}
                    />
                </Box>
            </Box>
            <Card sx={{ maxWidth: 350, margin: 'auto', mt: 5, p: 2 }}>
                <CardMedia
                    component="img"
                    height="350"
                    image={product.image}
                    alt={product.productName}
                    loading="lazy"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
                        {product.productName}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                        ₵{product.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555', mb: 2 }}>
                        {product.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: product.stockStatus === 'In Stock' ? 'green' : 'red', fontWeight: 600, mb: 2 }}>
                        {product.stockStatus}
                    </Typography>
                    {/* <Rating readOnly name="size-small" defaultValue={product.rating.rate} size="small" /> */}
                </CardContent>

                <CardActions>
                    <Button variant="outlined" size="small" onClick={addToCartHandler}>
                        Add to Cart
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default ShowProduct;
