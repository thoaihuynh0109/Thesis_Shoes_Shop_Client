import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProductPageForGender from './Pagination/ProductPageForGender';
import MakeUIForMenAndWomenPage from './Pagination/MakeUIForMenAndWomenPage';
import { Button, Container, Typography, Slider, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
function Men() {
    return (
        <Box sx={{ minHeight: '80vh', mt: 2, mb: 4 }}>
            <MakeUIForMenAndWomenPage forWomen={false} />
            {/* get product by Gender in database */}
            <ProductPageForGender selectedGender={'Nam'} />
            {/* <ProductPageForGender /> */}
            {/* <ShoeCustomization /> */}
        </Box>
    );
}
export default Men;

// const ShoeCustomization = () => {
//     const [shoeImage, setShoeImage] = useState(
//         'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375051/Gimme-shoes-images/Converse/Chuck_70_Marquis_Sportswear_High_Top_oqpl3a_gfxmbn.png',
//     );
//     const [overlayImage, setOverlayImage] = useState(null);
//     const [brightness, setBrightness] = useState(100);

//     const handleOverlayImageChange = (event) => {
//         const file = event.target.files[0];

//         if (file) {
//             const reader = new FileReader();

//             reader.onloadend = () => {
//                 setOverlayImage(reader.result);
//             };

//             reader.readAsDataURL(file);
//         }
//     };

//     const handleBrightnessChange = (event, newValue) => {
//         setBrightness(newValue);
//     };

//     const applyCustomization = () => {
//         // Logic to apply customization (e.g., combining shoe image with overlay)
//         // You can use 'overlayImage', 'shoeImage', and 'brightness' states to create the final image.
//         console.log(`Customization applied - Overlay: ${overlayImage}, Brightness: ${brightness}`);
//     };

//     return (
//         <Container maxWidth="sm">
//             <Typography variant="h4" gutterBottom>
//                 Shoe Customization
//             </Typography>
//             <div>
//                 {/* Display the customized shoe image */}
//                 <img
//                     src={shoeImage}
//                     alt="Shoe"
//                     style={{ width: '100%', marginTop: 20, filter: `brightness(${brightness}%)` }}
//                 />

//                 {/* Display the overlay image */}
//                 {overlayImage && (
//                     <img
//                         src={overlayImage}
//                         alt="Overlay"
//                         style={{ position: 'absolute', width: '50%', top: '30%', left: '25%' }}
//                     />
//                 )}
//             </div>
//             <div style={{ marginTop: 20 }}>
//                 {/* Button to allow users to change the overlay image */}
//                 <input
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     id="icon-button-file"
//                     type="file"
//                     onChange={handleOverlayImageChange}
//                 />
//                 <label htmlFor="icon-button-file">
//                     <IconButton color="primary" aria-label="upload picture" component="span">
//                         <PhotoCameraIcon />
//                     </IconButton>
//                 </label>

//                 {/* Brightness slider */}
//                 <Typography id="brightness-slider" gutterBottom style={{ marginRight: 10 }}>
//                     Brightness
//                 </Typography>
//                 <Slider
//                     value={brightness}
//                     min={0}
//                     max={200}
//                     onChange={handleBrightnessChange}
//                     aria-labelledby="brightness-slider"
//                 />

//                 {/* Apply customization button */}
//                 <Button variant="contained" color="primary" onClick={applyCustomization}>
//                     Apply Customization
//                 </Button>
//             </div>
//         </Container>
//     );
// };
