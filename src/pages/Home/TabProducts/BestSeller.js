import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import RecipeReviewCard from './ProductsCard';
// call some components are defined
// import { products } from '~/components/MakeProductCards/MakeProductCards';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
import { products } from './MakeProductsCardItem';

// const products = [
//     {
//         id: 1,
//         img: 'https://www.bike-discount.de/media/image/6f/89/4b/adidas_Terrex-Free-Hiker-2-Low-GTX-Wanderschuhe_IG5459_2.jpg',
//         title: 'Jordan',
//         price: '3,600,000',
//         rating: 4,
//         label: false,
//         labelNew: true,
//     },
//     {
//         id: 2,
//         img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698215220/Gimme-shoes-images/Adidas/adidas-rapidmove-trainers_udkzcn.jpg',
//         title: 'RAPIDMOVE TRAINER',
//         price: '3,200,000',
//         rating: 3,
//         label: false,
//     },
//     {
//         id: 3,
//         img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698216174/Gimme-shoes-images/Adidas/if2649_wht_01_vkqpnt.jpg',
//         title: 'FORUM LOW SHOES',
//         price: '2,600,000',
//         rating: 4,
//         label: false,
//     },
//     {
//         id: 4,
//         img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698222786/Gimme-shoes-images/Puma/Suede%20Brand%20Love.jpg',
//         title: 'Suede Brand Love',
//         price: '2,350,000',
//         rating: 4,
//         label: true,
//     },
// ];

function BestSeller() {
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

export default BestSeller;
