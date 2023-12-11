import React, { useState, useEffect, useRef } from 'react';
// import { Container, Row, Col, Image } from 'react-bootstrap';
import { Box, Container } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './slideshow.scss';
const cx = classNames.bind(styles);
const logoBranch = [
    {
        id: 1,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1702201033/Gimme-shoes-images/Logo/Nike-mobile-removebg-preview_p1ab0u.png',
        title: 'Nike',
    },
    {
        id: 2,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1702201116/Gimme-shoes-images/Logo/adidas-logo-removebg-preview_t6nrdg.png',
        title: 'Adidas',
    },
    {
        id: 3,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698743643/Gimme-shoes-images/Logo/nb-logo.png',
        title: 'New Balance',
    },
    {
        id: 4,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1699350639/Gimme-shoes-images/Logo/vans-logo.png',
        title: 'Vans',
    },
    {
        id: 5,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1699350721/Gimme-shoes-images/Logo/converse-logo.png',
        title: 'Converse',
    },
    {
        id: 6,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1699362373/Gimme-shoes-images/Logo/mlb-logo.png',
        title: 'MLB',
    },
    {
        id: 7,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1699350872/Gimme-shoes-images/Logo/puma-logo.png',
        title: 'Puma',
    },
];
export function InfiniteSliderTrack() {
    const combinedLogos = [...logoBranch, ...logoBranch]; // Duplicate logos to create an infinite loop
    return (
        <Box className={cx('slider')} sx={{ mb: 1 }}>
            <Box className={cx('slider-track')}>
                {combinedLogos.map((logo) => (
                    <Box className={cx('slide')} key={logo.id}>
                        <img src={logo.img} alt={logo.title} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
