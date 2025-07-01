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


    return (
        <Box sx={{ width: { xs: '100%', sm: '90%', md: '500px' }, maxWidth: '100%', mx: 'auto', my: 2 }}>
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {props.productName || props.title || 'Product Name Not Available'}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary', mt: 2 }}
                    >
                        ₵{props.price}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary', mt: 1 }}
                    >
                        Qty: {props.qty}
                    
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="increase quantity" onClick={qtyIncrementHandler}>
                        <AddIcon />
                    </IconButton>

                    <IconButton aria-label="decrease quantity" onClick={qtyDecrementHandler}>
                        <RemoveIcon />
                    </IconButton>

                    <IconButton aria-label="remove from cart" color="error" onClick={() => {
                        removeFromCart(props.id, props.cartItemId);
                    }} sx={{ ml: 2 }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151, padding: 2 }}
                image={props.image}
                alt="image of an item"
            />
        </Card>
        </Box>
    );
}

export default CartItem;
