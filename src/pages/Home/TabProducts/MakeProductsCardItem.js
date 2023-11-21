import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import RecipeReviewCard from './ProductsCard';
// call some components are defined
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
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
                        // labelNew={true}
                        sx={{ margin: '0 20px' }}
                    />
                ))}
            </Box>
            <CustomizeButton variant="contained" onClick={handleNavigateToShop}>
                More Items
            </CustomizeButton>
        </Box>
    );
}

export default MakeProductsCardItem;
