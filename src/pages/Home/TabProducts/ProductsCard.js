import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardActions,
    CardMedia,
    Button,
    Typography,
    Zoom,
    IconButton,
    CircularProgress,
    styled,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import Rating from '@mui/material/Rating';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';

// import default layout
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';

export const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} placement="top" />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: 'var(--icon-hover)',
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'var(--icon-hover)',
        fontSize: 14,
    },
}));

const products = [
    {
        id: 1,
        img: 'https://www.bike-discount.de/media/image/6f/89/4b/adidas_Terrex-Free-Hiker-2-Low-GTX-Wanderschuhe_IG5459_2.jpg',
        title: 'Jordan',
        price: '3,600,000',
        rating: 4,
        label: true,
        // label: false,
    },
    {
        id: 2,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698215220/Gimme-shoes-images/Adidas/adidas-rapidmove-trainers_udkzcn.jpg',
        title: 'RAPIDMOVE TRAINER',
        price: '3,200,000',
        rating: 3,
        label: false,
    },
    {
        id: 3,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698216174/Gimme-shoes-images/Adidas/if2649_wht_01_vkqpnt.jpg',
        title: 'FORUM LOW SHOES',
        price: '2,600,000',
        rating: 4,
        label: false,
    },
    {
        id: 4,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698222786/Gimme-shoes-images/Puma/Suede%20Brand%20Love.jpg',
        title: 'Suede Brand Love',
        price: '2,350,000',
        rating: 4,
        label: true,
    },
];

function Test({ image, title, price, rating, label, labelNew }) {
    const navigate = useNavigate();
    const [hoverCard, setHoverCard] = useState(false);
    const [checkAddToWishList, setCheckAddToWishList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [valueRating, setValueRating] = useState(rating);

    // mouse enter and leave event handlers
    const handleHover = () => {
        setHoverCard(true);
    };

    const handleUnhover = () => {
        setHoverCard(false);
    };

    // handle adding product to the wish list
    const handleAddProductToWishList = () => {
        setIsLoading(true);
        setTimeout(() => {
            setCheckAddToWishList(true);
            setIsLoading(false);
        }, 2000);
    };

    // handle navigating to the wishlist page
    const handleNavigateToWishlist = () => {
        navigate('/my-wishlist');
    };

    return (
        <Box>
            <Card
                sx={{
                    minWidth: 270,
                    maxHeight: 290,
                    cursor: 'pointer',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transform: 'rotateY(0deg)',
                    transition: 'transform 0.3s ease-in-out',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
                    mr: 2,
                }}
                onMouseEnter={handleHover}
                onMouseLeave={handleUnhover}
            >
                {label && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            transform: 'translate(30%, -10%) rotate(45deg)',
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '4px 16px',
                            fontWeight: 'bold',
                        }}
                    >
                        {/* {label} */}
                        Sale
                    </Box>
                )}

                {labelNew && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '0',
                            left: '50%',
                            transform: 'translate(30%, -10%) rotate(45deg)',
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '4px 16px',
                            fontWeight: 'bold',
                        }}
                    >
                        {/* {label} */}
                        New
                    </Box>
                )}

                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt="Product Image"
                    style={{ objectFit: 'contain', width: '95%', margin: '0 auto' }}
                />

                <CardActions disableSpacing sx={{ display: 'block' }}>
                    <Zoom in={hoverCard}>
                        <Box>
                            <Button fullWidth variant="contained">
                                <AddShoppingCartIcon sx={{ mr: 2, fontSize: '20px' }} />
                                <Typography sx={{ fontSize: '16px' }}>Add to Cart</Typography>
                            </Button>
                        </Box>
                    </Zoom>
                    <Zoom in={hoverCard} style={{ transitionDelay: hoverCard ? '500ms' : '0ms' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                mt: '8px',
                                mb: '2px',
                            }}
                            onClick={handleAddProductToWishList}
                        >
                            {isLoading ? (
                                <CircularProgress size={20} />
                            ) : checkAddToWishList ? (
                                <IconButton
                                    aria-label="added to favorites"
                                    onClick={handleNavigateToWishlist}
                                >
                                    <CustomTooltip title="Browse WishList">
                                        <CheckIcon
                                            sx={{
                                                fontSize: '20px',
                                                '&:hover': {
                                                    color: 'var( --icon-hover)',
                                                },
                                            }}
                                        />
                                    </CustomTooltip>
                                </IconButton>
                            ) : (
                                <IconButton aria-label="add to favorites">
                                    <CustomTooltip title="Add to Wish List">
                                        <FavoriteIcon
                                            sx={{
                                                fontSize: '20px',
                                                '&:hover': {
                                                    color: 'var( --icon-hover)',
                                                },
                                            }}
                                        />
                                    </CustomTooltip>
                                </IconButton>
                            )}
                            <IconButton
                                aria-label="Quick View"
                                onClick={() => navigate('/detail-product')}
                            >
                                <CustomTooltip title="Quick View">
                                    <VisibilityIcon
                                        sx={{
                                            fontSize: '20px',
                                            '&:hover': {
                                                color: 'var( --icon-hover)',
                                            },
                                        }}
                                    />
                                </CustomTooltip>
                            </IconButton>
                        </Box>
                    </Zoom>
                </CardActions>
            </Card>
            <Box maxWidth={'270px'} sx={{ textAlign: 'center', mt: 1 }}>
                <Typography sx={{ fontSize: '15px' }}>{title}</Typography>
                <Typography sx={{ fontSize: '15px' }}>
                    <strong>{price}</strong>
                </Typography>
                <Rating name="read-only" value={valueRating} readOnly size="large" />
            </Box>

            {/* More items button */}
        </Box>
    );
}

export default function RecipeReviewCard() {
    const navigate = useNavigate();

    const handleNavigateToShop = () => {
        navigate('/shop');
    };
    return (
        // hard code data
        // <Box display="flex" sx={{ justifyContent: 'space-between' }}>
        //     <Test
        //         image="https://www.bike-discount.de/media/image/6f/89/4b/adidas_Terrex-Free-Hiker-2-Low-GTX-Wanderschuhe_IG5459_2.jpg"
        //         title="Jordan"
        //         price="3,600,000 VND"
        //         rating="4"
        //         sx={{ margin: '0 20px' }}
        //     />
        //     <Test
        //         image="https://res.cloudinary.com/dd4gcajeh/image/upload/v1698215220/Gimme-shoes-images/Adidas/adidas-rapidmove-trainers_udkzcn.jpg"
        //         title="RAPIDMOVE TRAINER"
        //         price="3,200,000 VND"
        //         rating="3"
        //         sx={{ margin: '0 20px' }}
        //     />
        //     <Test
        //         image="https://www.bike-discount.de/media/image/6f/89/4b/adidas_Terrex-Free-Hiker-2-Low-GTX-Wanderschuhe_IG5459_2.jpg"
        //         title="Jordan"
        //         price="3,600,000 VND"
        //         rating="4"
        //         sx={{ margin: '0 10px' }}
        //     />

        //     <Test
        //         image="https://www.bike-discount.de/media/image/6f/89/4b/adidas_Terrex-Free-Hiker-2-Low-GTX-Wanderschuhe_IG5459_2.jpg"
        //         title="Jordan"
        //         price="3,600,000 VND"
        //         rating="4"
        //         sx={{ margin: '0 10px', position: 'relative' }}
        //         label
        //     ></Test>
        // </Box>

        // use map
        <Box>
            <Box display="flex" sx={{ justifyContent: 'space-between' }}>
                {products.map((product) => (
                    <Test
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
            {/* <Button
                variant="contained"
                sx={{
                    margin: '0 auto',
                    display: 'flex',
                    fontSize: '15px',
                    p: '10px 50px 10px 50px',
                    mt: 4,
                    fontWeight: 'bold',
                    // bgcolor:'#fff',
                }}
                onClick = {handleNavigateToShop}
            >
                More Items
            </Button> */}

            {/* define this button in default layout */}
            <CustomizeButton variant="contained" onClick={handleNavigateToShop}>
                More Items
            </CustomizeButton>
        </Box>
    );
}

{
    /* <Button>More Items</Button> */
}
