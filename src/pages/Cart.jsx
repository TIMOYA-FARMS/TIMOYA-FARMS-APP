import { Grid, Typography, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import CartItem from '../components/Cart/CartItem';
import { useContext } from 'react';
import CartContext from '../Store/CartContext';
import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useAuth } from '../contexts/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Cart = () => {
    const { cart } = useContext(CartContext);
    console.log('Cart contents:', cart);
    const { isAuthenticated } = useAuth();
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = totalAmount.toFixed(2);
    const totalItemsText = totalItems === 1 ? 'item' : 'items';
    const cartEmpty = cart.length === 0;

    return (
        <div>
            <Grid container spacing={4} sx={{ mt: 4, px: { xs: 1, md: 4 } }}>
                {/* Cart Items Section */}
                <Grid item xs={12} md={8}>

                    <Paper elevation={4} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 4, background: 'linear-gradient(135deg, #e0ffe7 0%, #b2f7ef 100%)', boxShadow: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
                          <ShoppingCartIcon sx={{ fontSize: 36, color: 'primary.main', mr: 1 }} />
                          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', letterSpacing: 1, textAlign: 'center' }}>
                            Cart Items
                          </Typography>
                        </Box>
                        {cart.length === 0 ? (
                            <Typography variant="h6" sx={{ color: 'error.main', textAlign: 'center', py: 6, fontWeight: 600 }}>
                                Your cart is empty
                            </Typography>
                        ) : (
                            cart.map((item, index) => (
                                <Box key={index}>
                                    <CartItem
                                        id={item.id}
                                        cartItemId={item.cartItemId}
                                        productName={item.productName}
                                        title={item.title}
                                        image={item.image}
                                        price={item.price}
                                        description={item.description}
                                        qty={item.qty}
                                        totalPrice={item.price * item.qty}
                                    />
                                    {index !== cart.length - 1 && (
                                        <Divider sx={{ my: 2 }} />
                                    )}
                                </Box>
                            ))
                        )}
                    </Paper>
                </Grid>
                {/* Order Summary Section */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={6} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, background: 'linear-gradient(135deg, #fffde4 0%, #f7e8b2 100%)', minWidth: 260, boxShadow: 8 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
                          <ShoppingCartCheckoutIcon sx={{ fontSize: 32, color: 'secondary.main', mr: 1 }} />
                          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'secondary.main', letterSpacing: 1, textAlign: 'center' }}>
                            Order Details
                          </Typography>
                        </Box>
                        {!isAuthenticated && (
                            <Typography variant="body2" sx={{ color: 'error.main', mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                                Please <a href="/login" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 700 }}>Login</a> or <a href="/register" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 700 }}>Register</a> to proceed to checkout.
                            </Typography>
                        )}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant='h6' sx={{ color: '#555', mb: 1 }}>
                                Total Amount: <span style={{ fontWeight: 700, color: '#222B45' }}>₵{totalAmount}</span>
                            </Typography>
                            <Typography variant='h6' sx={{ color: '#555', mb: 1 }}>
                                Total Items: <span style={{ fontWeight: 700, color: '#222B45' }}>{totalItems} {totalItemsText}</span>
                            </Typography>
                            <Typography variant='h6' sx={{ color: '#555', mb: 1 }}>
                                Total Price: <span style={{ fontWeight: 700, color: '#219653' }}>₵{totalPrice}</span>
                            </Typography>
                        </Box>
                        <Typography variant='h6' sx={{ color: cartEmpty ? 'error.main' : 'primary.main', fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                            {cartEmpty ? 'Your cart is empty' : 'Thank you for your order!'}
                        </Typography>
                        <Button
                            component={Link}
                            to="/checkout"
                            variant='contained'
                            color='primary'
                            disabled={cartEmpty || !isAuthenticated}
                            sx={{
                                mt: 2,
                                width: '100%',
                                py: 1.5,
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                borderRadius: 2,
                                boxShadow: 2,
                                letterSpacing: 1,
                                textTransform: 'uppercase',
                            }}
                        >
                            {cartEmpty ? 'Checkout Disabled' : !isAuthenticated ? 'Login to Checkout' : 'Checkout'}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cart
