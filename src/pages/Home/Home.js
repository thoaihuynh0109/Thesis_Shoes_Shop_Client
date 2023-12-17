import React from 'react';
import { Container, Box } from '@mui/material';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import TabProducts from './TabProducts/TabProducts';
import NewArrivals from './NewArrivals/NewArrivals';
import SuggestCollection from './SuggestCollection/SuggestCollection';
import SlideShowImageShop from './SlideShowImage/SlideShowImageShop';
import MostProductsViewed from './MostProductsViewed/MostProductsViewed';
import FlashSaleProducts from './FlashSaleProducts/FlashSaleProducts';
import Loading from './Loading/Loading';
const cx = classNames.bind(styles);

function Home() {
    console.log(JSON.parse(localStorage.getItem('user')));
    return (
        // <Box sx={{ height: '100%', minHeight: '450vh' }}>
        <Box sx={{ height: '100%', minHeight: '850vh' }}>
            <SlideShowImageShop />
            <TabProducts />
            {/* New Products Arrivals */}
            <NewArrivals />
            {/* Suggest Some Products */}
            <SuggestCollection />
            {/* Banner sale or something else */}
            <FlashSaleProducts />
            {/* Most Products Viewed */}
            <MostProductsViewed />
            {/* <Loading /> */}
        </Box>
    );
}

export default Home;
