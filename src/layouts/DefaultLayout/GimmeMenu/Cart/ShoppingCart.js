import React, { useState } from 'react';
import { IconButton, Badge } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export function ShoppingCart() {
    const [cartItemsCount, setCartItemsCount] = useState(0);

    const handleAddToCart = () => {
        setCartItemsCount((prevCount) => prevCount + 1);
    };

    return (
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
            <Badge badgeContent={cartItemsCount} color="secondary">
                <AddShoppingCartIcon />
            </Badge>
        </IconButton>
    );
}
