import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import RecipeReviewCard from './ProductsCard';
// call some components are defined
// import { products } from '~/components/MakeProductCards/MakeProductCards';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
import { products } from './MakeProductsCardItem';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';

function Featured() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleNavigateToShop = () => {
        navigate('/shop');
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Box display="flex" sx={{ justifyContent: 'space-between' }}>
                {products.map((product) => (
                    <MakeProductsCard
                        key={product.id}
                        image={product.img}
                        title={product.title}
                        price={product.price}
                        rating={product.rating}
                        label={product.label}
                        labelNew={product.labelNew}
                        sx={{ margin: '0 20px' }}
                        showToast={showToast}
                        setShowToast={setShowToast}
                        // show suitable toast message
                        toastMessage={toastMessage}
                        setToastMessage={setToastMessage}
                    />
                ))}
            </Box>
            <ToastMessage2
                // message="Product added to cart!"
                message={toastMessage}
                type="success"
                showToast={showToast}
                setShowToast={setShowToast}
            />
            <CustomizeButton variant="contained" onClick={handleNavigateToShop}>
                More Items
            </CustomizeButton>
        </Box>
    );
}

export default Featured;
