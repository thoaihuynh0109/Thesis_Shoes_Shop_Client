import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import RecipeReviewCard from './ProductsCard';
// call some components are defined
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import productService from '~/services/productServices';
export const products = [
    {
        id: 1,
        img: 'https://www.bike-discount.de/media/image/6f/89/4b/adidas_Terrex-Free-Hiker-2-Low-GTX-Wanderschuhe_IG5459_2.jpg',
        title: 'Jordan',
        price: '3,600,000',
        rating: 4,
        label: false,
        labelNew: true,
    },
    {
        id: 2,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375580/Gimme-shoes-images/Adidas/Female/jd_HP3294_a_d4r8th_ak3gpn.png',
        title: 'RAPIDMOVE TRAINER',
        price: '3,200,000',
        rating: 3,
        label: false,
    },
    {
        id: 3,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700364891/Gimme-shoes-images/Adidas/tyle_running_trang_hp2757_01_standard_d50cb46326c3436682610a2d02b21c1d_464ae878e179491c97840eebfda414dc_grande_nanuat_tcwspk.png',
        title: 'FORUM LOW SHOES',
        price: '2,600,000',
        rating: 4,
        label: false,
    },
    {
        id: 4,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375101/Gimme-shoes-images/Puma/Suede_Brand_Love_k1wihf.png',
        title: 'Suede Brand Love',
        price: '2,350,000',
        rating: 4,
        label: true,
    },
];
function MakeProductsCardItem() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [listLastest, setListLastest] = useState([]);

    // call api
    useEffect(() => {
        const fetchData = async () => {
            const listProduct = await productService.getLastestProduct();
            setListLastest(listProduct);
        };
        fetchData();
    }, []);

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
                                    price={product.price}
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

export default MakeProductsCardItem;
