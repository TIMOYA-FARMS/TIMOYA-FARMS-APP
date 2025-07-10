import { Grid, Typography, Button, Container, Stack, Chip } from '@mui/material';
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
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const Cart = () => {
    const { cart } = useContext(CartContext);
    const { isAuthenticated } = useAuth();
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = totalAmount.toFixed(2);
    const totalItemsText = totalItems === 1 ? 'item' : 'items';
    const cartEmpty = cart.length === 0;

    return (
        <Box sx={{ 
            background: 'linear-gradient(135deg, #f9f9f9 0%, #e8f5e8 100%)', 
            minHeight: '100vh',
            py: { xs: 2, sm: 3, md: 4 }
        }}>
            <Container maxWidth="xl">
                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ 
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                }}>
                    {/* Cart Items Section */}
                    <Grid item xs={12} lg={8} xl={9}>
                        <Paper elevation={4} sx={{ 
                            p: { xs: 2, sm: 3, md: 4 }, 
                            borderRadius: 3, 
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)', 
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                mb: { xs: 2, sm: 3 }, 
                                justifyContent: 'center',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 1
                            }}>
                                <ShoppingCartIcon sx={{ 
                                    fontSize: { xs: 28, sm: 32, md: 36 }, 
                                    color: 'primary.main' 
                                }} />
                                <Typography variant="h4" sx={{ 
                                    fontWeight: 'bold', 
                                    color: 'primary.main', 
                                    letterSpacing: 1, 
                                    textAlign: 'center',
                                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                                }}>
                                    Cart Items
                                </Typography>
                                {!cartEmpty && (
                                    <Chip 
                                        label={`${totalItems} ${totalItemsText}`}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        sx={{ ml: { xs: 0, sm: 1 } }}
                                    />
                                )}
                            </Box>
                            
                            {cart.length === 0 ? (
                                <Box sx={{ 
                                    textAlign: 'center', 
                                    py: { xs: 4, sm: 6, md: 8 },
                                    px: 2
                                }}>
                                    <ShoppingCartIcon sx={{ 
                                        fontSize: 64, 
                                        color: 'grey.400', 
                                        mb: 2 
                                    }} />
                                    <Typography variant="h6" sx={{ 
                                        color: 'text.secondary', 
                                        fontWeight: 500,
                                        mb: 1
                                    }}>
                                        Your cart is empty
                                    </Typography>
                                    <Typography variant="body2" sx={{ 
                                        color: 'text.secondary',
                                        mb: 3
                                    }}>
                                        Add some products to get started
                                    </Typography>
                                    <Button
                                        component={Link}
                                        to="/products"
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<LocalOfferIcon />}
                                        sx={{ borderRadius: 2 }}
                                    >
                                        Browse Products
                                    </Button>
                                </Box>
                            ) : (
                                <Stack spacing={2}>
                                    {cart.map((item, index) => (
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
                                                <Divider sx={{ my: 1 }} />
                                            )}
                                        </Box>
                                    ))}
                                </Stack>
                            )}
                        </Paper>
                    </Grid>
                    
                    {/* Order Summary Section */}
                    <Grid item xs={12} lg={4} xl={3}>
                        <Paper elevation={6} sx={{ 
                            p: { xs: 3, sm: 4 }, 
                            borderRadius: 3, 
                            background: 'linear-gradient(135deg, #fff8e1 0%, #fff3e0 100%)', 
                            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            position: { lg: 'sticky' },
                            top: { lg: 20 }
                        }}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                mb: 3, 
                                justifyContent: 'center',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 1
                            }}>
                                <ShoppingCartCheckoutIcon sx={{ 
                                    fontSize: { xs: 28, sm: 32 }, 
                                    color: 'primary.main' 
                                }} />
                                <Typography variant="h5" sx={{ 
                                    fontWeight: 'bold', 
                                    color: 'primary.main', 
                                    letterSpacing: 1, 
                                    textAlign: 'center',
                                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                                }}>
                                    Order Summary
                                </Typography>
                            </Box>
                            
                            <Stack spacing={2} sx={{ mb: 3 }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    p: 2,
                                    bgcolor: 'rgba(255,255,255,0.5)',
                                    borderRadius: 2
                                }}>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        Total Items:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                        {totalItems} {totalItemsText}
                                    </Typography>
                                </Box>
                                
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    p: 2,
                                    bgcolor: 'rgba(255,255,255,0.5)',
                                    borderRadius: 2
                                }}>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        Total Amount:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                        ₵{totalAmount}
                                    </Typography>
                                </Box>
                                
                                <Divider />
                                
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    p: 2,
                                    bgcolor: 'primary.light',
                                    borderRadius: 2,
                                    color: 'black'
                                }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Total Price:
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        ₵{totalPrice}
                                    </Typography>
                                </Box>
                            </Stack>
                            
                            <Typography variant="body2" sx={{ 
                                fontWeight: 500, 
                                mb: 3, 
                                textAlign: 'center',
                                p: 2,
                                bgcolor: cartEmpty ? 'error.light' : 'success.light',
                                borderRadius: 2,
                                color: cartEmpty ? 'error.dark' : 'white'
                            }}>
                                {cartEmpty ? 'Your cart is empty' : 'Ready to checkout!'}
                            </Typography>
                            
                            <Button
                                component={Link}
                                to="/checkout"
                                variant="contained"
                                color="primary"
                                disabled={cartEmpty}
                                fullWidth
                                size="large"
                                sx={{
                                    py: 1.5,
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    letterSpacing: 0.5,
                                    textTransform: 'uppercase',
                                    '&:hover': {
                                        boxShadow: 6,
                                        transform: 'translateY(-1px)'
                                    },
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                {cartEmpty ? 'Checkout Disabled' : 'Proceed to Checkout'}
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Cart
