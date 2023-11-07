import React, { useState, useEffect, useRef } from 'react';
// import { Container, Row, Col, Image } from 'react-bootstrap';
import { Box, Container } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './slideshow.scss';
const cx = classNames.bind(styles);
const logoBranch = [
    {
        id: 1,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698743364/Gimme-shoes-images/Logo/nike-logo.jpg',
        title: 'Nike',
    },
    {
        id: 2,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698743738/Gimme-shoes-images/Logo/adidas-logo.jpg',
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
    return (
        <Box className={cx('slider')}>
            <Box className={cx('slider-track')}>
                <Box className={cx('slide')}>
                    {logoBranch.map((logo) => (
                        <img
                            src={logo.img}
                            key={logo.id}
                            alt={logo.title}
                            // style={((width = '50px'), (height = '50px'))}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
