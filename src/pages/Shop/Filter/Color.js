// import React, { useState, useEffect } from 'react';
// import { Box, Typography } from '@mui/material';
// import Checkbox from '@mui/material/Checkbox';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import CheckIcon from '@mui/icons-material/Check';
// import CircularProgress from '@mui/material/CircularProgress';
// import { CustomTypography } from '~/Layouts/DefaultLayout';
// import PaletteIcon from '@mui/icons-material/Palette';
// function Color() {
//     return (
//         <Box>
//             {/* <DesignIconCheckboxes /> */}
//             <Box sx={{display:'flex', alignItems:'center', ml: '16px'}}>
//                 <PaletteIcon fontSize='large'/>
//                 <CustomTypography sx={{padding:'8px 16px', fontWeight: 'bold' }}>
//                     Color
//                 </CustomTypography>
//             </Box>

//             <Box sx={{ display: 'flex', alignItems: 'center', pl: '16px' }}>
//                 <CircleColorWithCheck colorName={'Yellow'} color="yellow" />
//                 <CircleColorWithCheck colorName={'White'} color="" />
//                 <CircleColorWithCheck color="black" colorName={'Black'} />
//             </Box>
//         </Box>
//     );
// }

// export default Color;

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// function DesignIconCheckboxes() {
//     return (
//         <div>
//             <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
//             <Checkbox {...label} icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} />
//         </div>
//     );
// }

// function CircleColorWithCheck({ color, colorName }) {
//     const [isLoading, setIsLoading] = useState(false);
//     const [showCheck, setShowCheck] = useState(false);

//     // re-check. Sau khi check --> tiếp tục check
//     const handleClick = () => {
//         if (showCheck) {
//             setShowCheck(false); // false --> hide check icon
//         } else {
//             // show check = false

//             setIsLoading(true); // start loading
//             setTimeout(() => {
//                 // after 2seconds
//                 setIsLoading(false); // set stop loading
//                 setShowCheck(true); // show check icon
//             }, 2000);
//         }
//     };

//     return (
//         <Box sx={{ margin: '0 12px 0 12px' }}>
//             <div
//                 style={{
//                     width: '28px',
//                     height: '28px',
//                     borderRadius: '50%',
//                     backgroundColor: color,
//                     border: '1px solid #333',
//                     position: 'relative',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     overflow: 'hidden',
//                 }}
//             >
//                 <button
//                     style={{
//                         width: '100%',
//                         height: '100%',
//                         backgroundColor: 'transparent',
//                         border: 'none',
//                         cursor: 'pointer',
//                         position: 'relative',
//                     }}
//                     onClick={handleClick}
//                     //   disabled={isLoading}
//                 >
//                     {isLoading ? (
//                         // start loading
//                         <div
//                             style={{
//                                 position: 'absolute',
//                                 top: '50%',
//                                 left: '50%',
//                                 transform: 'translate(-50%, -50%)',
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                             }}
//                         >
//                             <CircularProgress size={20} color="primary" />
//                         </div>
//                     ) : (
//                         // stop loading
//                         showCheck && (
//                             <span
//                                 style={{
//                                     position: 'absolute',
//                                     top: '50%',
//                                     left: '50%',
//                                     transform: 'translate(-50%, -50%)',
//                                     fontWeight: 'bold',
//                                 }}
//                             >
//                                 <CheckIcon sx={{ fontWeight: 'bold', color: '#fff' }} />
//                             </span>
//                         )
//                     )}
//                 </button>
//             </div>
//             <Typography sx={{ fontSize: '12px', mt: 1 }}>{colorName}</Typography>
//         </Box>
//     );
// }
