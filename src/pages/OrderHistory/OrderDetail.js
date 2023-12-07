// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Button, Paper } from '@mui/material';
// import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
// import orderService from '~/services/orderServices';

// const OrderDetail = () => {
//     const [displayedProducts, setDisplayedProducts] = useState(2);
//     const [purchasedProducts, setPurchasedProducts] = useState([]);

//     const loadMoreProducts = () => {
//         setDisplayedProducts((prev) => prev + 2);
//     };

//     useEffect(() => {
//         const fetchOrderHistory = async () => {
//             try {
//                 const orders = await orderService.getAllOrder();
//                 const products = orders.flatMap((order) => {
//                     return order.items.map((item) => ({
//                         orderId: order._id,
//                         createdAt: order.createdAt, // Assuming orderDate is a property in your order object
//                         images: item.images,
//                         name: item.name,
//                         price: item.price, // Assuming each item has its own price
//                         quantity: item.quantity,
//                         shipping: order.shipping, // Adjust this based on your actual structure
//                         // Include other shipping details as needed
//                     }));
//                 });
//                 setPurchasedProducts(products);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchOrderHistory();
//     }, []);

//     return (
//         <Box>
//             <CustomTypography sx={{ fontWeight: 'bold', fontSize: '24px' }}>
//                 Order Details
//             </CustomTypography>
//             <Box>
//                 {purchasedProducts.slice(0, displayedProducts).map((product, index) => (
//                     <Paper
//                         key={index}
//                         elevation={3}
//                         sx={{ my: 2, p: 2, display: 'flex', alignItems: 'center' }}
//                     >
//                         <Box sx={{ flex: 1 }}>
//                             <img
//                                 src={product.images}
//                                 alt={`Product: ${product.name}`}
//                                 style={{ height: '100px', width: '100px', objectFit: 'cover' }}
//                             />
//                         </Box>
//                         <Box sx={{ flex: 3, ml: 2 }}>
//                             <CustomTypography>{product.name}</CustomTypography>
//                             <CustomTypography sx={{ mt: 1 }}>
//                                 Quantity: {product.quantity}
//                             </CustomTypography>
//                             {/* Display shipping details */}
//                             <CustomTypography sx={{ mt: 1 }}>
//                                 Shipping: {product.shipping}{' '}
//                                 {/* Adjust this based on your actual structure */}
//                             </CustomTypography>
//                             {/* Display order date */}
//                             <CustomTypography sx={{ mt: 1 }}>
//                                 Order Date: {new Date(product.createdAt).toLocaleString()}
//                             </CustomTypography>
//                             {/* Include other shipping details as needed */}
//                         </Box>
//                         <Box sx={{ flex: 1 }}>
//                             <CustomTypography>Gia: ${product.price}</CustomTypography>
//                         </Box>
//                     </Paper>
//                 ))}
//             </Box>

//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
//                 {displayedProducts < purchasedProducts.length && (
//                     <Button variant="contained" onClick={loadMoreProducts}>
//                         <CustomTypography>Load More</CustomTypography>
//                     </Button>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default OrderDetail;

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import orderService from '~/services/orderServices';

const OrderDetail = () => {
    const [displayedProducts, setDisplayedProducts] = useState(2);
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const [filterDate, setFilterDate] = useState(null);

    const loadMoreProducts = () => {
        setDisplayedProducts((prev) => prev + 2);
    };

    const handleFilterDate = (date) => {
        setFilterDate(date);
    };

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const orders = await orderService.getAllOrder();
                const groupedProducts = groupProductsByCreatedAt(orders);
                setPurchasedProducts(groupedProducts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrderHistory();
    }, []);

    // Function to group products by createdAt
    const groupProductsByCreatedAt = (orders) => {
        const groupedProducts = [];

        orders.forEach((order) => {
            const productsInOrder = order.items.map((item) => ({
                orderId: order._id,
                createdAt: order.createdAt,
                images: item.images,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                shipping: order.shipping,
            }));

            groupedProducts.push(...productsInOrder);
        });

        return groupedProducts;
    };

    // Filter products based on filterDate
    const filteredProducts =
        filterDate === null
            ? purchasedProducts
            : purchasedProducts.filter(
                  (product) =>
                      new Date(product.createdAt).toLocaleDateString() ===
                      new Date(filterDate).toLocaleDateString(),
              );

    return (
        <Box>
            <CustomTypography sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                Order Details
            </CustomTypography>
            {/* Add date filter buttons or date picker here */}
            {/* Example with buttons: */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button onClick={() => handleFilterDate(null)}>All</Button>
                <Button onClick={() => handleFilterDate(new Date())}>Today</Button>
                {/* Add more buttons as needed */}
            </Box>
            {filteredProducts.slice(0, displayedProducts).map((product, index) => (
                <Box
                    key={index}
                    elevation={3}
                    sx={{
                        my: 2,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #c9c9c9',
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <img
                            src={product.images}
                            alt={`Product: ${product.name}`}
                            style={{ height: '100px', width: '100px', objectFit: 'cover' }}
                        />
                    </Box>
                    <Box sx={{ flex: 3, ml: 2 }}>
                        <CustomTypography>{product.name}</CustomTypography>
                        <CustomTypography sx={{ mt: 1 }}>
                            Quantity: {product.quantity}
                        </CustomTypography>
                        {/* Display shipping details */}
                        <CustomTypography sx={{ mt: 1 }}>
                            Shipping: {product.shipping}{' '}
                            {/* Adjust this based on your actual structure */}
                        </CustomTypography>
                        {/* Display order date */}
                        <CustomTypography sx={{ mt: 1 }}>
                            Order Date: {new Date(product.createdAt).toLocaleString()}
                        </CustomTypography>
                        {/* Include other shipping details as needed */}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <CustomTypography>Gia: ${product.price}</CustomTypography>
                    </Box>
                </Box>
            ))}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                {displayedProducts < filteredProducts.length && (
                    <Button variant="contained" onClick={loadMoreProducts}>
                        <CustomTypography>Load More</CustomTypography>
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default OrderDetail;
