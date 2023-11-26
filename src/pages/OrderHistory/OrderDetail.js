// OrderDetail.js
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

const OrderDetail = () => {
    // Số lượng sản phẩm hiển thị mỗi lần
    const productsPerPage = 2;

    const [displayedProducts, setDisplayedProducts] = useState(productsPerPage);

    const loadMoreProducts = () => {
        setDisplayedProducts((prev) => prev + productsPerPage);
    };

    const purchasedProducts = [
        {
            img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698222886/Gimme-shoes-images/Puma/SEASONS%20Voyage%20NITRO%E2%84%A2%203.jpg',
            name: 'Sản phẩm 1',
            price: 20,
            quantity: 2,
        },
        {
            img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700366310/Gimme-shoes-images/Nike/Nike_Full_Force_Low_keuwib.png',
            name: 'Sản phẩm 2',
            price: 30,
            quantity: 1,
        },
        {
            img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698222886/Gimme-shoes-images/Puma/SEASONS%20Voyage%20NITRO%E2%84%A2%203.jpg',
            name: 'Sản phẩm 1',
            price: 20,
            quantity: 2,
        },
        {
            img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700366310/Gimme-shoes-images/Nike/Nike_Full_Force_Low_keuwib.png',
            name: 'Sản phẩm 2',
            price: 30,
            quantity: 1,
        },
        {
            img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698222886/Gimme-shoes-images/Puma/SEASONS%20Voyage%20NITRO%E2%84%A2%203.jpg',
            name: 'Sản phẩm 1',
            price: 20,
            quantity: 2,
        },
        {
            img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700366310/Gimme-shoes-images/Nike/Nike_Full_Force_Low_keuwib.png',
            name: 'Sản phẩm 2',
            price: 30,
            quantity: 1,
        },
    ];

    return (
        <Box>
            <CustomTypography sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                Order Details
            </CustomTypography>
            <Box>
                {purchasedProducts.slice(0, displayedProducts).map((product, index) => (
                    <Box sx={{ borderBottom: '1px solid #333' }}>
                        <Box
                            key={index}
                            className="product"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                margin: 2,
                            }}
                        >
                            <Box>
                                <img
                                    src={product.img}
                                    alt={`Product: ${product.name}`}
                                    style={{ height: '100px ', width: '100px ' }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    // display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    flexGrow: 2,
                                    ml: 2,
                                }}
                            >
                                <CustomTypography>{product.name}</CustomTypography>
                                <CustomTypography sx={{ mt: 1 }}>
                                    Số lượng: {product.quantity}
                                </CustomTypography>
                            </Box>
                            <Box>
                                <CustomTypography sx={{ flexGrow: 1 }}>
                                    Giá: ${product.price}
                                </CustomTypography>
                            </Box>
                        </Box>
                        {/* thành tiền: là số tiền người dùng đã mua 1 sản phẩm hoặc 1 danh sách sản phẩm */}
                        
                    </Box>
                ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                {displayedProducts < purchasedProducts.length && (
                    <Button variant="contained" onClick={loadMoreProducts}>
                        <CustomTypography>Load More</CustomTypography>
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default OrderDetail;
