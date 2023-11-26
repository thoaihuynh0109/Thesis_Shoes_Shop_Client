import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Import custom CSS file if needed
import { useNavigate } from 'react-router-dom';
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
        'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700366310/Gimme-shoes-images/Nike/Nike_Air_Max_90_GORE-TEX_jrudlb.png',
        'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700364893/Gimme-shoes-images/Adidas/fz22287_vcbt9t_nruuqm.png',
        'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375094/Gimme-shoes-images/Puma/SEASONS_Fast-Trac_NITRO_GORE-TEX_v32hwa.png',
    ];

    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate();

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
            <Button
                variant="Outlined"
                sx={{ mt: -4, fontSize: '16px', color: '#0d6efd' }}
                onClick={() => navigate('/shop')}
            >
                Shop Now
            </Button>
        </Box>
    );
};

export default CarouselImage;
