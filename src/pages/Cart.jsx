import { Grid, Typography, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import CartItem from '../components/Cart/CartItem';
import { useContext } from 'react';
import CartContext from '../Store/CartContext';
import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Cart = () => {

    const { cart } = useContext(CartContext);
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = totalAmount.toFixed(2);
    const totalItemsText = totalItems === 1 ? 'item' : 'items';
    const cartEmpty = cart.length === 0;

    // if (cartEmpty) {
    //     return (
    //         <div>
    //             <h2>Your cart is empty</h2>
    //         </div>
    //     );
    // }

    const isLoggedIn = false; // Replace with real auth logic
    return (
        <div>
            <Grid container spacing={4} sx={{ mt: 4, px: { xs: 1, md: 4 } }}>
                {/* Cart Items Section */}
                <Grid item xs={12} md={8}>

                    <Paper elevation={2} sx={{ p: { xs: 1, sm: 2, md: 3 }, borderRadius: 3, background: '#fafafa' }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3, letterSpacing: 1, textAlign: 'center' }}>
                        Cart Items
                    </Typography>
                        {cart.length === 0 ? (
                            <Typography variant="h6" sx={{ color: 'error.main', textAlign: 'center', py: 6, fontWeight: 600 }}>
                                Your cart is empty
                            </Typography>
                        ) : (
                            cart.map((item, index) => (
                                <Box key={index}>
                                    <CartItem
                                        id={item.id}
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
                    <Paper elevation={4} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, background: '#fff', minWidth: 260 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2, letterSpacing: 1, textAlign: 'center' }}>
                            Order Details
                        </Typography>
                        {!isLoggedIn && (
                            <Typography variant="body2" sx={{ color: 'error.main', mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                                Please <a href="/login" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 700 }}>Login</a> or <a href="/register" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 700 }}>Register</a> to proceed to checkout.
                            </Typography>
                        )}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant='h6' sx={{ color: '#555', mb: 1 }}>
                                Total Amount: <span style={{ fontWeight: 700, color: '#222B45' }}>${totalAmount}</span>
                            </Typography>
                            <Typography variant='h6' sx={{ color: '#555', mb: 1 }}>
                                Total Items: <span style={{ fontWeight: 700, color: '#222B45' }}>{totalItems} {totalItemsText}</span>
                            </Typography>
                            <Typography variant='h6' sx={{ color: '#555', mb: 1 }}>
                                Total Price: <span style={{ fontWeight: 700, color: '#219653' }}>${totalPrice}</span>
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
                            disabled={cartEmpty || !isLoggedIn}
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
                            {cartEmpty ? 'Checkout Disabled' : !isLoggedIn ? 'Login to Checkout' : 'Checkout'}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>

            //     </Grid>
            // </Grid>
        // </div>
    )
}

export default Cart
