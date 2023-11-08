import React, { useState } from 'react';
import styles from './FlashSaleProducts.module.scss';
import classNames from 'classnames/bind';
import { Avatar, Box, IconButton, Typography, Zoom, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

const cx = classNames.bind(styles);

function FlashSaleProducts() {
    return (
        <Box sx={{ mt: 5 }}>
            <CustomTypography sx={{ fontWeight: 'bold', fontSize: '24px', mb: 2 }}>
                FLASH SALE
            </CustomTypography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}
            >
                <CustomFlashSaleProduct topPosition="40%" leftPosition={'44%'} />
                <CustomFlashSaleProduct
                    topPosition="40%"
                    leftPosition={'44%'}
                    imgSrc={
                        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/shoes-flash-sale-design-template-1175b5ee5ef28e1270927651c6d3e010_screen.jpg?ts=1663231305'
                    }
                />
            </Box>

            <CustomFlashSaleProduct
                imgSrc={
                    'https://s.yimg.com/ny/api/res/1.2/qgqP4dNUr9lBnIuqVIwK4w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/hearst_womens_health_52/e28a86725943f53af75942de9fb65db7'
                }
                ml={24}
                mt={2}
                imgHeight="300px"
                imgWidth="85%"
            />
        </Box>
    );
}

export default FlashSaleProducts;

function CustomFlashSaleProduct({
    imgHeight,
    imgWidth,
    ml,
    mt,
    imgSrc,
    topPosition,
    leftPosition,
}) {
    const [hovered, setHovered] = useState(false);

    // mouse enter and leave event handlers
    const handleHover = () => {
        setHovered(true);
    };

    const handleUnhover = () => {
        setHovered(false);
    };

    // define style Position object
    const iconPosition = {
        top: topPosition || '50%',
        left: leftPosition || '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <Container
            sx={{ position: 'relative' }}
            onMouseEnter={handleHover}
            onMouseLeave={handleUnhover}
        >
            <Box sx={{ marginLeft: ml || '0px', mt: mt || '0px', position: 'relative' }}>
                <img
                    className={cx('image-flash-sale')}
                    src={
                        imgSrc ||
                        'https://people.com/thmb/uRU9d4kiEP2xUX8--dgPExGO1-0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/pefs-cariuma-tout-14827c81d8e3498ebea35307e84ad10b.jpg'
                    }
                    alt="Flash Sale Product"
                    objectFit="contain"
                    width={imgWidth || '500px'}
                    height={imgHeight || '300px'}
                />
            </Box>
            <Zoom in={hovered} style={{ transitionDelay: hovered ? '200ms' : '0ms' }}>
                <Box sx={{ position: 'absolute', ...iconPosition }}>
                    <Avatar>
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </Avatar>
                </Box>
            </Zoom>
        </Container>
    );
}
