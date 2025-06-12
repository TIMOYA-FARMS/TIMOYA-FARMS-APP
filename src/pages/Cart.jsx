import { Grid, Typography, Button } from '@mui/material';
import CartItem from '../components/Cart/CartItem';
import { useContext } from 'react';
import CartContext from '../Store/CartContext';
import React from 'react'
import { Link } from 'react-router-dom';

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

    return (
        <div>
            <Grid container spacing={50} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={8} md={9}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                        Cart Items
                    </Typography>

                    {
                        cart.map((item, index) => {
                            return (
                                <CartItem
                                    key={index}
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    description={item.description}
                                    qty={item.qty}
                                    totalPrice={item.price * item.qty}
                                />
                            )
                        })
                    }

                </Grid>
                <Grid>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                        Order Details
                    </Typography>

                    <Typography variant='h6' sx={{ color: '#555', mb: 1 }}>
                        Total Amount :  ${totalAmount}
                    </Typography>

                    <Typography variant='h6' sx={{ color: '#555', mb: 1 }}>
                        Total Items : {totalItems} {totalItemsText}
                    </Typography>
                    <Typography variant='h6' sx={{ color: '#555', mb: 1 }}>
                        Total Price : ${totalPrice}
                    </Typography>

                    <Typography variant='h6' sx={{ color: cartEmpty ? 'error.main' : 'primary.main', fontWeight: 'bold', mb: 2 }}>
                        {cartEmpty ? 'Your cart is empty' : 'Thank you for your order!'}
                    </Typography>

                    <Button component={Link} to="/checkout" variant='contained' color='primary' disabled={cartEmpty} sx={{ mt: 2 }}>
                        {cartEmpty ? 'Checkout Disabled' : 'Checkout'}
                    </Button>

                </Grid>
            </Grid>
        </div>
    )
}

export default Cart
