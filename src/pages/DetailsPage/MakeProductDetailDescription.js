import React, { useState } from 'react';
import { Avatar, Box, IconButton, Grid } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { images } from './constantValue';
import ProductInformation from './ProductInformation';

export default function MakeProductDetailDescription() {
    // initial image is the first item in array
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageClick = (image, index) => {
        setSelectedImage(image);
        setCurrentImageIndex(index);
    };

    const handleNextImage = () => {
        const nextIndex = (currentImageIndex + 1) % images.length;
        setSelectedImage(images[nextIndex]);
        setCurrentImageIndex(nextIndex);
    };

    const handlePreviousImage = () => {
        const previousIndex = (currentImageIndex - 1 + images.length) % images.length;
        setSelectedImage(images[previousIndex]);
        setCurrentImageIndex(previousIndex);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {/* <Item>xs=6 md=8</Item> */}
                    {/* image on the left side
                information on the right side
            */}
                    {/* image */}
                    <Box
                        sx={{
                            maxHeight: '550px',
                            maxWidth: '720px',
                            bgcolor: '#f1f1f1',
                            borderRadius: '10px',
                            // ml: 4,
                            display: 'flex',
                            position: 'relative', // Thêm thuộc tính position để có thể căn chỉnh nút
                        }}
                    >
                        {/* quick view image in many aspects */}
                        <Box
                            sx={{
                                maxHeight: '550px',
                                minWidth: '60px',
                                // bgcolor: 'green',
                                mr: 4,
                                ml: 2,
                            }}
                        >
                            {images.map((image, index) => (
                                <img
                                    key={image.id}
                                    src={image.url}
                                    alt={`Image ${image.id}`}
                                    className={selectedImage === image ? 'active' : ''}
                                    onClick={() => handleImageClick(image, index)}
                                    width="80px"
                                    height="80px"
                                    style={{ borderRadius: '20px' }} // Add the borderRadius style here
                                />
                            ))}
                        </Box>
                        <Box sx={{ minHeight: '600px', minWidth: '540px' }}>
                            {/* show image */}
                            {selectedImage && (
                                <img
                                    src={selectedImage.url}
                                    alt={`Image ${selectedImage.id}`}
                                    width="75%"
                                    height="65%"
                                    style={{ borderRadius: '12px', marginTop: '12px' }}
                                />
                            )}
                        </Box>

                        {/* Thêm nút Previous */}
                        <IconButton
                            sx={{ position: 'absolute', bottom: '10px', right: '10px' }}
                            onClick={handleNextImage}
                            disabled={images.length <= 1}
                        >
                            <Avatar>
                                <NavigateNextIcon />
                            </Avatar>
                        </IconButton>
                        {/* Thêm nút Next */}
                        <IconButton
                            sx={{ position: 'absolute', bottom: '10px', right: '50px' }}
                            onClick={handlePreviousImage}
                            disabled={images.length <= 1}
                        >
                            <Avatar>
                                <NavigateBeforeIcon />
                            </Avatar>
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ProductInformation flashSale={true} />
                    {/* <Item>xs=6 md=4</Item> */}
                </Grid>
            </Grid>
        </Box>
    );
}
