// // import React, { useState } from 'react';
// // import { useSelector } from 'react-redux';
// // import { Avatar, Box, IconButton, Grid } from '@mui/material';
// // import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// // import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
// // import { images } from './constantValue';
// // import ProductInformation from './ProductInformation';
// // import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

// // export default function MakeProductDetailDescription() {
// //     // initial image is the first item in array
// //     const productDetail = useSelector((state) => state.productDetail.productDetails);
// //     const [selectedImage, setSelectedImage] = useState(images[0]);
// //     const [currentImageIndex, setCurrentImageIndex] = useState(0);

// //     useEffect(() => {
// //         const fetchProductDetails = () => {
// //             // Check if product details are already stored in localStorage
// //             const storedProductDetails = localStorage.getItem('productDetails');

// //             if (storedProductDetails) {
// //                 // If stored details exist, parse and dispatch to update the state
// //                 dispatch(setProductDetails(JSON.parse(storedProductDetails)));
// //             } else {
// //                 // If not, fetch the product details and store in localStorage
// //                 // Replace the following line with your actual API call
// //                 // const productDetails = await api.fetchProductDetails(productId);
// //                 const productDetails = {
// //                     // Sample data, replace with actual product details
// //                     _id: 'yourProductId',
// //                     name: 'Product Name',
// //                     price: 100,
// //                     // ... other details
// //                 };

// //                 // Dispatch the action to update the product details in the Redux store
// //                 dispatch(setProductDetails(productDetails));

// //                 // Store the details in localStorage
// //                 localStorage.setItem('productDetails', JSON.stringify(productDetails));
// //             }
// //         };

// //         fetchProductDetails();
// //     }, [dispatch]);

// //     const handleImageClick = (image, index) => {
// //         setSelectedImage(image);
// //         setCurrentImageIndex(index);
// //     };

// //     const handleNextImage = () => {
// //         const nextIndex = (currentImageIndex + 1) % images.length;
// //         setSelectedImage(images[nextIndex]);
// //         setCurrentImageIndex(nextIndex);
// //     };

// //     const handlePreviousImage = () => {
// //         const previousIndex = (currentImageIndex - 1 + images.length) % images.length;
// //         setSelectedImage(images[previousIndex]);
// //         setCurrentImageIndex(previousIndex);
// //     };

// //     return (
// //         <Box sx={{ flexGrow: 1, mt: 2 }}>
// //             <Grid container spacing={2}>
// //                 <Grid item xs={12} md={6}>
// //                     {/* image on the left side
// //                 information on the right side
// //             */}
// //                     {/* image */}
// //                     <Box
// //                         sx={{
// //                             maxHeight: '550px',
// //                             maxWidth: '720px',
// //                             bgcolor: '#f1f1f1',
// //                             borderRadius: '10px',
// //                             // ml: 4,
// //                             display: 'flex',
// //                             position: 'relative', // Thêm thuộc tính position để có thể căn chỉnh nút
// //                         }}
// //                     >
// //                         {/* quick view image in many aspects */}
// //                         {/* Những hình ảnh nhỏ để xem thêm nhiều hình ảnh về
// //                             sản phẩm ở nhiều góc nhìn khác nhau */}
// //                         {/* <Box
// //                             sx={{
// //                                 maxHeight: '550px',
// //                                 minWidth: '60px',
// //                                 // bgcolor: 'green',
// //                                 mr: 4,
// //                                 ml: 2,
// //                             }}
// //                         >
// //                             {images.map((image, index) => (
// //                                 <img
// //                                     key={image.id}
// //                                     src={image.url}
// //                                     alt={`Image ${image.id}`}
// //                                     className={selectedImage === image ? 'active' : ''}
// //                                     onClick={() => handleImageClick(image, index)}
// //                                     width="80px"
// //                                     height="80px"
// //                                     style={{ borderRadius: '20px' }} // Add the borderRadius style here
// //                                 />
// //                             ))}
// //                         </Box> */}

// //                         <Box sx={{ minHeight: '600px', minWidth: '540px' }}>
// //                             {/* show image */}
// //                             {/* {selectedImage && (  show hình ảnh nhỏ để có thểm xem thêm*/}
// //                             <CustomTypography>{productDetail.gender}</CustomTypography>

// //                             <img
// //                                 src={`${productDetail.images}`}
// //                                 alt={`Image ${productDetail.productId}`}
// //                                 width="75%"
// //                                 height="400px"
// //                                 style={{
// //                                     // borderRadius: '12px',
// //                                     marginTop: '12px',
// //                                     margin: '58px 75px  ',
// //                                 }}
// //                             />
// //                             {/* )} */}
// //                         </Box>

// //                         {/* Thêm nút Previous */}
// //                         <IconButton
// //                             sx={{
// //                                 position: 'absolute',
// //                                 bottom: '10px',
// //                                 right: '10px',
// //                                 ml: 2,
// //                                 '&:hover': {
// //                                     background: 'transparent',
// //                                 },
// //                             }}
// //                             onClick={handleNextImage}
// //                             disabled={images.length <= 1}
// //                         >
// //                             <Avatar>
// //                                 <NavigateNextIcon
// //                                     sx={{
// //                                         fontSize: 28,
// //                                         '&:hover': {
// //                                             color: 'greenyellow',
// //                                         },
// //                                     }}
// //                                 />
// //                             </Avatar>
// //                         </IconButton>
// //                         {/* Thêm nút Next */}
// //                         <IconButton
// //                             sx={{
// //                                 position: 'absolute',
// //                                 bottom: '10px',
// //                                 right: '50px',
// //                                 mr: 2,
// //                                 '&:hover': {
// //                                     background: 'transparent',
// //                                 },
// //                             }}
// //                             onClick={handlePreviousImage}
// //                             disabled={images.length <= 1}
// //                         >
// //                             <Avatar>
// //                                 <NavigateBeforeIcon
// //                                     sx={{
// //                                         fontSize: 28,
// //                                         '&:hover': {
// //                                             color: 'greenyellow',
// //                                         },
// //                                     }}
// //                                 />
// //                             </Avatar>
// //                         </IconButton>
// //                     </Box>
// //                 </Grid>
// //                 <Grid item xs={12} md={6}>
// //                     <ProductInformation flashSale={true} />
// //                     {/* <Item>xs=6 md=4</Item> */}
// //                 </Grid>
// //             </Grid>
// //         </Box>
// //     );
// // }

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Avatar, Box, IconButton, Grid } from '@mui/material';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
// import { images } from './constantValue';
// import ProductInformation from './ProductInformation';
// import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
// import { useDispatch } from 'react-redux';
// import { setProductDetails } from '~/redux/ProductDetails/productDetailsActions';

// export default function MakeProductDetailDescription() {
//     const dispatch = useDispatch();
//     // initial image is the first item in array
//     const productDetail = useSelector((state) => state.productDetail.productDetails);
//     const [selectedImage, setSelectedImage] = useState(images[0]);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     useEffect(() => {
//         const fetchProductDetails = () => {
//             // Check if product details are already stored in localStorage
//             const storedProductDetails = localStorage.getItem('productDetails');

//             if (storedProductDetails) {
//                 // Parse the stored details
//                 const parsedStoredDetails = JSON.parse(storedProductDetails);

//                 // If the current product is different, remove the previous details
//                 if (parsedStoredDetails._id !== productDetail._id) {
//                     localStorage.removeItem('productDetails');
//                 } else {
//                     // If the current product is the same as the previous one, dispatch details
//                     dispatch(setProductDetails(parsedStoredDetails));
//                     return;
//                 }
//             }

//             // Fetch the product details and store in localStorage

//             const productDetails = {
//                 ...productDetail,
//                 _id: productDetail.productId,
//                 images: productDetail.images,
//             };

//             // Dispatch the action to update the product details in the Redux store
//             dispatch(setProductDetails(productDetails));

//             // Store the details in localStorage
//             localStorage.setItem('productDetails', JSON.stringify(productDetails));
//         };

//         fetchProductDetails();
//     }, [dispatch, productDetail._id]);

//     const handleImageClick = (image, index) => {
//         setSelectedImage(image);
//         setCurrentImageIndex(index);
//     };

//     const handleNextImage = () => {
//         const nextIndex = (currentImageIndex + 1) % images.length;
//         setSelectedImage(images[nextIndex]);
//         setCurrentImageIndex(nextIndex);
//     };

//     const handlePreviousImage = () => {
//         const previousIndex = (currentImageIndex - 1 + images.length) % images.length;
//         setSelectedImage(images[previousIndex]);
//         setCurrentImageIndex(previousIndex);
//     };

//     return (
//         <Box sx={{ flexGrow: 1, mt: 2 }}>
//             <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                     {/* image on the left side
//                 information on the right side
//             */}
//                     {/* image */}
//                     <Box
//                         sx={{
//                             maxHeight: '550px',
//                             maxWidth: '720px',
//                             bgcolor: '#f1f1f1',
//                             borderRadius: '10px',
//                             // ml: 4,
//                             display: 'flex',
//                             position: 'relative', // Thêm thuộc tính position để có thể căn chỉnh nút
//                         }}
//                     >
//                         {/* quick view image in many aspects */}
//                         {/* Những hình ảnh nhỏ để xem thêm nhiều hình ảnh về
//                             sản phẩm ở nhiều góc nhìn khác nhau */}
//                         {/* <Box
//                             sx={{
//                                 maxHeight: '550px',
//                                 minWidth: '60px',
//                                 // bgcolor: 'green',
//                                 mr: 4,
//                                 ml: 2,
//                             }}
//                         >
//                             {images.map((image, index) => (
//                                 <img
//                                     key={image.id}
//                                     src={image.url}
//                                     alt={`Image ${image.id}`}
//                                     className={selectedImage === image ? 'active' : ''}
//                                     onClick={() => handleImageClick(image, index)}
//                                     width="80px"
//                                     height="80px"
//                                     style={{ borderRadius: '20px' }} // Add the borderRadius style here
//                                 />
//                             ))}
//                         </Box> */}

//                         <Box sx={{ minHeight: '600px', minWidth: '540px' }}>
//                             {/* show image */}
//                             {/* {selectedImage && (  show hình ảnh nhỏ để có thểm xem thêm*/}
//                             <CustomTypography>{productDetail.gender}</CustomTypography>

//                             <img
//                                 src={`${productDetail.images}`}
//                                 alt={`Image ${productDetail.productId}`}
//                                 width="75%"
//                                 height="400px"
//                                 style={{
//                                     // borderRadius: '12px',
//                                     marginTop: '12px',
//                                     margin: '58px 75px  ',
//                                 }}
//                             />
//                             {/* )} */}
//                         </Box>

//                         {/* Thêm nút Previous */}
//                         <IconButton
//                             sx={{
//                                 position: 'absolute',
//                                 bottom: '10px',
//                                 right: '10px',
//                                 ml: 2,
//                                 '&:hover': {
//                                     background: 'transparent',
//                                 },
//                             }}
//                             onClick={handleNextImage}
//                             disabled={images.length <= 1}
//                         >
//                             <Avatar>
//                                 <NavigateNextIcon
//                                     sx={{
//                                         fontSize: 28,
//                                         '&:hover': {
//                                             color: 'greenyellow',
//                                         },
//                                     }}
//                                 />
//                             </Avatar>
//                         </IconButton>
//                         {/* Thêm nút Next */}
//                         <IconButton
//                             sx={{
//                                 position: 'absolute',
//                                 bottom: '10px',
//                                 right: '50px',
//                                 mr: 2,
//                                 '&:hover': {
//                                     background: 'transparent',
//                                 },
//                             }}
//                             onClick={handlePreviousImage}
//                             disabled={images.length <= 1}
//                         >
//                             <Avatar>
//                                 <NavigateBeforeIcon
//                                     sx={{
//                                         fontSize: 28,
//                                         '&:hover': {
//                                             color: 'greenyellow',
//                                         },
//                                     }}
//                                 />
//                             </Avatar>
//                         </IconButton>
//                     </Box>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <ProductInformation flashSale={true} />
//                     {/* <Item>xs=6 md=4</Item> */}
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// }

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Avatar, Box, IconButton, Grid } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ProductInformation from './ProductInformation';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { useDispatch } from 'react-redux';
import { setProductDetails } from '~/redux/ProductDetails/productDetailsActions';
import productService from '~/services/productServices';

export default function MakeProductDetailDescription() {
    const { id } = useParams();

    const [productDetail, setProductDetail] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await productService.getProductById(id);

                if (response) {
                    setProductDetail(response);
                    setSelectedImage(response.images[0]);
                    setCurrentImageIndex(0);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleImageClick = (image, index) => {
        setSelectedImage(image);
        setCurrentImageIndex(index);
    };

    const handleNextImage = () => {
        const nextIndex = (currentImageIndex + 1) % productDetail.images.length;
        setSelectedImage(productDetail.images[nextIndex]);
        setCurrentImageIndex(nextIndex);
    };

    const handlePreviousImage = () => {
        const previousIndex =
            (currentImageIndex - 1 + productDetail.images.length) % productDetail.images.length;
        setSelectedImage(productDetail.images[previousIndex]);
        setCurrentImageIndex(previousIndex);
    };

    if (!productDetail) {
        // Loading state or error handling
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ flexGrow: 1, mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            maxHeight: '550px',
                            maxWidth: '720px',
                            bgcolor: '#f1f1f1',
                            borderRadius: '10px',
                            display: 'flex',
                            position: 'relative',
                        }}
                    >
                        <Box sx={{ minHeight: '600px', minWidth: '540px' }}>
                            <CustomTypography>{productDetail.gender}</CustomTypography>

                            <img
                                // src={`${selectedImage}`}
                                src={productDetail.images}
                                alt={`Image ${productDetail.productId}`}
                                width="75%"
                                height="400px"
                                style={{
                                    marginTop: '12px',
                                    margin: '58px 75px',
                                }}
                            />
                        </Box>

                        {/* <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                ml: 2,
                                '&:hover': {
                                    background: 'transparent',
                                },
                            }}
                            onClick={handleNextImage}
                            disabled={productDetail.images.length <= 1}
                        >
                            <Avatar>
                                <NavigateNextIcon
                                    sx={{
                                        fontSize: 28,
                                        '&:hover': {
                                            color: 'greenyellow',
                                        },
                                    }}
                                />
                            </Avatar>
                        </IconButton>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '50px',
                                mr: 2,
                                '&:hover': {
                                    background: 'transparent',
                                },
                            }}
                            onClick={handlePreviousImage}
                            disabled={productDetail.images.length <= 1}
                        >
                            <Avatar>
                                <NavigateBeforeIcon
                                    sx={{
                                        fontSize: 28,
                                        '&:hover': {
                                            color: 'greenyellow',
                                        },
                                    }}
                                />
                            </Avatar>
                        </IconButton> */}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Render additional product information here */}
                    <ProductInformation product={productDetail} />
                </Grid>
            </Grid>
        </Box>
    );
}
