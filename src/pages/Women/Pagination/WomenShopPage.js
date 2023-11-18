import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    IconButton,
    TextField,
    Typography,
    Pagination,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmptyCard from '~/pages/Checkout/EmptyCard/EmptyCard';

import usePagination from '~/pages/Shop/Pagination/PaginationManagement';
import shopData from '../shop.json';
import SearchIcon from '@mui/icons-material/Search';
import BrandFilterInformation from '~/pages/Shop/Pagination/BrandFilterInformation';
import PriceFilterInformation from '~/pages/Shop/Pagination/PriceFilterInformation';
import SortingSection from '~/pages/Shop/Pagination/SortingSection';
import RenderProductForGender from './RenderProductForGender';
import useProductFilter from '../Filter/MakeUseProductFilter';

// export default function TestProductPagination() {
//     const [products, setProducts] = useState(shopData);
//     const [searchVal, setSearchVal] = useState('');
//     const [storeValue, setStoreValue] = useState([]);
//     const [getValue, setGetValue] = useState(false);
//     const [currentImages, setCurrentImages] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [hasProducts, setHasProducts] = useState(false);
//     const [brandFilteredProducts, setBrandFilteredProducts] = useState([]);
//     let [page, setPage] = useState(1);

//     const PER_PAGE = 8; // have 8 products in one page
//     const count = Math.ceil(products.length / PER_PAGE);
//     const _DATA = usePagination(products, PER_PAGE);
//     const [sorting, setSorting] = useState('');
//     const [selectedPriceRange, setSelectedPriceRange] = useState('');
//     const [selectedBrands, setSelectedBrands] = useState([]);

//     useEffect(() => {
//         setCurrentImages(Array.from({ length: _DATA.length }, (_, index) => index));
//     }, []);

//     useEffect(() => {
//         // Filter products based on selected brands
//         const brandFiltered = shopData.filter((product) => {
//             return selectedBrands.length === 0 || selectedBrands.includes(product.brand);
//         });
//         setBrandFilteredProducts(brandFiltered);
//     }, [selectedBrands, shopData]);

//     // make filter

//     useEffect(() => {
//         // Filter products based on selected price range
//         const priceFiltered = brandFilteredProducts.filter((product) => {
//             const priceNumber = parseFloat(product.price.replace(/,/g, '').replace('đ', ''));

//             return (
//                 selectedPriceRange.length === 0 ||
//                 selectedPriceRange.some((range) => {
//                     // selectedPriceRange.every((range) => {
//                     switch (range) {
//                         case 'Dưới 1,000,000đ':
//                             return priceNumber < 1000000;
//                         case '1,000,000đ - 2,000,000đ':
//                             return priceNumber >= 1000000 && priceNumber <= 2000000;
//                         case '2,000,000đ - 3,000,000đ':
//                             return priceNumber >= 2000000 && priceNumber <= 3000000;
//                         case 'Trên 3,000,000đ':
//                             return priceNumber > 3000000;
//                         default:
//                             return false;
//                     }
//                 })
//             );
//         });

//         setFilteredProducts(priceFiltered);

//         // Kiểm tra danh sách sản phẩm lọc có rỗng không
//         setHasProducts(priceFiltered.length > 0);
//     }, [selectedPriceRange, brandFilteredProducts]);

//     const handleChange = (e, p) => {
//         setPage(p);
//         _DATA.jump(p);
//     };

//     const navigate = useNavigate();

//     function handleSearchClickPagination() {
//         if (!searchVal.trim()) {
//             setProducts(shopData);
//             setGetValue(false);
//             setPage(1);
//             return;
//         }

//         const filteredProducts = shopData.filter((item) =>
//             item.title.toLowerCase().includes(searchVal.toLowerCase()),
//         );

//         setStoreValue(filteredProducts);
//         setGetValue(true);
//         setPage(1);
//     }

//     const handleBrandFilter = (selectedBrand) => {
//         let updatedSelectedBrands = [...selectedBrands];

//         if (updatedSelectedBrands.includes(selectedBrand)) {
//             updatedSelectedBrands = updatedSelectedBrands.filter(
//                 (brand) => brand !== selectedBrand,
//             );
//         } else {
//             updatedSelectedBrands.push(selectedBrand);
//         }

//         setSelectedBrands(updatedSelectedBrands);
//     };

//     const handlePriceFilter = (selectedPrice) => {
//         let updatedSelectedPriceRange = [...selectedPriceRange];

//         if (updatedSelectedPriceRange.includes(selectedPrice)) {
//             // If the price is already selected, remove it from the list
//             updatedSelectedPriceRange = updatedSelectedPriceRange.filter(
//                 (price) => price !== selectedPrice,
//             );
//         } else {
//             // If the price is not selected, add it to the list
//             updatedSelectedPriceRange.push(selectedPrice);
//         }

//         setSelectedPriceRange(updatedSelectedPriceRange);
//     };

//     const handleSortChange = (event) => {
//         const selectedSorting = event.target.value;
//         setSorting(selectedSorting);
//     };

//     return (
//         <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 4 }}>
//             <Grid container spacing={2}>
//                 <Grid item xs={3}>
//                     {/* this box for category, filter products */}
//                     <Box sx={{ border: '1px solid #333', mr: 6, ml: 3 }}>
//                         <Typography
//                             sx={{
//                                 fontSize: '14px',
//                                 fontWeight: 'bold',
//                                 textAlign: 'center',
//                                 p: 2,
//                             }}
//                         >
//                             All Categories
//                         </Typography>
//                         <Divider sx={{ ml: 4, mr: 4 }} />
//                         <FilterBrand
//                             handleBrandFilter={handleBrandFilter}
//                             selectedBrands={selectedBrands}
//                         />
//                         <PriceFilterInformation
//                             handlePriceFilter={handlePriceFilter}
//                             selectedPriceRange={selectedPriceRange}
//                         />
//                     </Box>
//                 </Grid>

//                 {/* display 8 products for 1 page */}
//                 <Grid item xs={9}>
//                     {/* Product Grid */}
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             justifyContent: 'flex-end',
//                             alignItems: 'flex-end',
//                             ml: 6,
//                             mr: 6,
//                             mb: 2,
//                         }}
//                     >
//                         {/* searching chưa hoàn thành
//                             khi search xong thì không thể sorting hoặc filtering
//                         */}
//                         <TextField
//                             onChange={(e) => setSearchVal(e.target.value)}
//                             label="Searching..."
//                             variant="outlined"
//                         />
//                         <IconButton
//                             onClick={handleSearchClickPagination}
//                             sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                         >
//                             <SearchIcon />
//                         </IconButton>
//                         <SortingSection sorting={sorting} handleSortChange={handleSortChange} />
//                     </Box>

//                     {/* this component is used to manage render product for gender */}
//                     <ProductGridForWomen
//                         getValue={getValue}
//                         page={page}
//                         PER_PAGE={PER_PAGE}
//                         _DATA={_DATA}
//                         storeValue={storeValue}
//                         filteredProducts={filteredProducts}
//                         brandFilteredProducts={brandFilteredProducts}
//                         sorting={sorting}
//                         hasProducts={hasProducts}
//                         navigate={navigate}
//                         selectedGender={'Female'}
//                     />

//                     <Box>
//                         <Pagination
//                             count={count}
//                             size="large"
//                             page={page}
//                             variant="outlined"
//                             shape="rounded"
//                             onChange={handleChange}
//                         />
//                     </Box>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// }

export default function TestProductPagination() {
    const {
        products,
        searchVal,
        storeValue,
        getValue,
        currentImages,
        filteredProducts,
        hasProducts,
        brandFilteredProducts,
        page,
        PER_PAGE,
        count,
        _DATA,
        sorting,
        selectedPriceRange,
        selectedBrands,
        setSearchVal,
        handleChange,
        handleSearchClickPagination,
        handleBrandFilter,
        handlePriceFilter,
        handleSortChange,
    } = useProductFilter();

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    {/* this box for category, filter products */}
                    <Box sx={{ border: '1px solid #333', mr: 6, ml: 3 }}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                p: 2,
                            }}
                        >
                            All Categories
                        </Typography>
                        <Divider sx={{ ml: 4, mr: 4 }} />
                        <BrandFilterInformation
                            handleBrandFilter={handleBrandFilter}
                            selectedBrands={selectedBrands}
                        />
                        <PriceFilterInformation
                            handlePriceFilter={handlePriceFilter}
                            selectedPriceRange={selectedPriceRange}
                        />
                    </Box>
                </Grid>

                {/* display 8 products for 1 page */}
                <Grid item xs={9}>
                    {/* Product Grid */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            ml: 6,
                            mr: 6,
                            mb: 2,
                        }}
                    >
                        <TextField
                            onChange={(e) => setSearchVal(e.target.value)}
                            label="Searching..."
                            variant="outlined"
                        />
                        <IconButton
                            onClick={handleSearchClickPagination}
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <SearchIcon />
                        </IconButton>
                        <SortingSection sorting={sorting} handleSortChange={handleSortChange} />
                    </Box>
                    {/* <RenderProductForGender
                        getValue={getValue}
                        page={page}
                        PER_PAGE={PER_PAGE}
                        _DATA={_DATA}
                        storeValue={storeValue}
                        filteredProducts={filteredProducts}
                        brandFilteredProducts={brandFilteredProducts}
                        sorting={sorting}
                        hasProducts={hasProducts}
                        navigate={navigate}
                        selectedGender={'Female'}
                    />
                    <Box>
                        <Pagination
                            count={count}
                            size="large"
                            page={page}
                            variant="outlined"
                            shape="rounded"
                            onChange={handleChange}
                        />
                    </Box> */}
                    {hasProducts ? (
                        <>
                            <RenderProductForGender
                                getValue={getValue}
                                page={page}
                                PER_PAGE={PER_PAGE}
                                _DATA={_DATA}
                                storeValue={storeValue}
                                filteredProducts={filteredProducts}
                                brandFilteredProducts={brandFilteredProducts}
                                sorting={sorting}
                                hasProducts={hasProducts}
                                navigate={navigate}
                                selectedGender={'Female'}
                            />

                            <Box>
                                <Pagination
                                    count={count}
                                    size="large"
                                    page={page}
                                    variant="outlined"
                                    shape="rounded"
                                    onChange={handleChange}
                                />
                            </Box>
                        </>
                    ) : (
                        <EmptyCard message={'Không có sản phẩm phù hợp'} />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}
