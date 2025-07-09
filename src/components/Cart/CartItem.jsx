import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext } from 'react';
import CartContext from '../../Store/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { Chip, Stack, Divider } from '@mui/material';


const CartItem = (props) => {

    const {updateCartItemQty, removeFromCart} = useContext(CartContext);

    // const [productQty, setProductQty] = useState(props.qty || 1);

    const qtyIncrementHandler = () => {
        const newQty = props.qty + 1;
        updateCartItemQty(props.id, newQty, props.cartId);
    }

    const qtyDecrementHandler = () => {
        const newQty = props.qty - 1;
        if (newQty > 0) {
            updateCartItemQty(props.id, newQty, props.cartId);
        }
    }

    const handleRemoveFromCart = () => {
        removeFromCart(props.id, props.cartItemId);
    }

    return (
        <Card sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.05)',
            overflow: 'hidden',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                transform: 'translateY(-2px)'
            }
        }}>
            {/* Product Image */}
            <CardMedia
                component="img"
                sx={{ 
                    width: { xs: '100%', sm: 140, md: 160 },
                    height: { xs: 200, sm: 140, md: 160 },
                    objectFit: 'cover'
                }}
                image={props.image}
                alt={props.productName || props.title || 'Product image'}
                loading="lazy"
            />
            
            {/* Product Details */}
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                flex: 1,
                minWidth: 0 // Prevents flex item from overflowing
            }}>
                <CardContent sx={{ 
                    flex: '1 0 auto',
                    p: { xs: 2, sm: 3 },
                    '&:last-child': { pb: { xs: 2, sm: 3 } }
                }}>
                    <Typography 
                        component="div" 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 600,
                            color: 'text.primary',
                            mb: 1,
                            fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            lineHeight: 1.3
                        }}
                    >
                        {props.productName || props.title || 'Product Name Not Available'}
                    </Typography>
                    
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ 
                                color: 'primary.main',
                                fontWeight: 700,
                                fontSize: { xs: '1.1rem', sm: '1.25rem' }
                            }}
                        >
                            ₵{props.price}
                        </Typography>
                        
                        <Chip 
                            label={`Qty: ${props.qty}`}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ fontWeight: 500 }}
                        />
                        
                        <Typography
                            variant="body2"
                            component="div"
                            sx={{ 
                                color: 'text.secondary',
                                fontWeight: 500
                            }}
                        >
                            Total: ₵{(props.price * props.qty).toFixed(2)}
                        </Typography>
                    </Stack>
                </CardContent>
                
                {/* Action Buttons */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                    p: { xs: 2, sm: 3 },
                    pt: 0,
                    gap: 1,
                    flexWrap: 'wrap'
                }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton 
                            aria-label="decrease quantity" 
                            onClick={qtyDecrementHandler}
                            sx={{ 
                                bgcolor: 'grey.100',
                                '&:hover': { bgcolor: 'grey.200' }
                            }}
                        >
                            <RemoveIcon />
                        </IconButton>
                        
                        <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 20, textAlign: 'center' }}>
                            {props.qty}
                        </Typography>
                        
                        <IconButton 
                            aria-label="increase quantity" 
                            onClick={qtyIncrementHandler}
                            sx={{ 
                                bgcolor: 'grey.100',
                                '&:hover': { bgcolor: 'grey.200' }
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Stack>
                    
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                    
                    <IconButton 
                        aria-label="remove from cart" 
                        color="error" 
                        onClick={handleRemoveFromCart}
                        sx={{ 
                            bgcolor: 'error.light',
                            color: 'error.contrastText',
                            '&:hover': { 
                                bgcolor: 'error.main',
                                transform: 'scale(1.05)'
                            },
                            transition: 'all 0.2s ease-in-out'
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
}

export default CartItem;
