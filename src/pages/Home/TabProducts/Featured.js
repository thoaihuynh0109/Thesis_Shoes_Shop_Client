import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import RecipeReviewCard from './ProductsCard';
// call some components are defined
// import { products } from '~/components/MakeProductCards/MakeProductCards';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
import { products } from './LastesProduct';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import productService from '~/services/productServices';
function Featured() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // call api
    useEffect(() => {
        const fetchData = async () => {
            const listProduct = await productService.getLastestProduct();
            setListLastest(listProduct);
        };
        fetchData();
    }, []);

    const [listLastest, setListLastest] = useState([]);

    const handleNavigateToShop = () => {
        navigate('/shop');
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Box display="flex" sx={{ justifyContent: 'space-between' }}>
                {listLastest.length > 0 &&
                    listLastest.map((product, index) => {
                        if (index < 4) {
                            return (
                                <MakeProductsCard
                                    key={product._id}
                                    _id={product._id}
                                    images={product.images}
                                    name={product.name}
                                    price={product.price.toLocaleString()}
                                    rating={product.rating}
                                    label={product.priceSale}
                                    // labelNew={product.labelNew}
                                    // labelNew={true}
                                    sx={{ margin: '0 20px' }}
                                    mr={0}
                                    showToast={showToast}
                                    setShowToast={setShowToast}
                                    // show suitable toast message
                                    toastMessage={toastMessage}
                                    setToastMessage={setToastMessage}
                                />
                            );
                        }
                    })}
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
