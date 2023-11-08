import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Import custom CSS file if needed
import { Button, Grid, Box, Container } from '@mui/material';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CarouselImage = () => {
    const images = [
        'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698226172/Gimme-shoes-images/Converse/Chuck_70_AT-CX_Rugged_Basics_High_Top_v2vqpi.jpg',
        'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698226177/Gimme-shoes-images/Converse/Chuck_70_Marquis_Sportswear_High_Top_oqpl3a.jpg',
        'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698245965/Gimme-shoes-images/Adidas/Female/17588947_36598235_600_acrqah.jpg',
    ];

    const [currentImage, setCurrentImage] = useState(0);

    const handleGoToNextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    const handleGoToPrevImage = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
    };

    useEffect(() => {
        // Chuyển đến hình ảnh tiếp theo sau mỗi 3 giây
        const interval = setInterval(handleGoToNextImage, 3000); 

        return () => {
            // Xóa interval khi component unmount
            clearInterval(interval); 
        };
    }, []);

    return (
        <Box>
            <div className="carousel-container">
                <Button onClick={handleGoToPrevImage} sx={{ mt: '-75%' }}>
                    <ArrowBackIosIcon />
                </Button>
                <img
                    className="carousel-image"
                    src={images[currentImage]}
                    alt={`Slide ${currentImage + 1}`}
                />

                <Button onClick={handleGoToNextImage} sx={{ mt: '-75%' }}>
                    <ArrowForwardIos />
                </Button>
            </div>
            <Button variant="Outlined" sx={{ mt: -4, fontSize: '16px', color: '#0d6efd' }}>
                Shop Now
            </Button>
        </Box>
    );
};

export default CarouselImage;
