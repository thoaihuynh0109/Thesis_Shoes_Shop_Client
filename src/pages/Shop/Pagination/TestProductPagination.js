import React, { useState, useEffect, useMemo } from 'react';
import { Box, Grid, IconButton, TextField, Typography, Pagination, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import usePagination from './PaginationManagement';
import shopData from './shop.json';
import SearchIcon from '@mui/icons-material/Search';
import FilterBrand from './BrandFilterInformation';
import PriceFilterInformation from './PriceFilterInformation';
import SortingSection from './SortingSection';
import ProductGrid from './ProductGrid';
import EmptyCard from '~/pages/Checkout/EmptyCard/EmptyCard';
import SearchAppBar from '~/layouts/DefaultLayout/GimmeMenu/SearchDesgin';
import categoryService from '~/services/categoryServices';
import productService from '~/services/productServices';
import brandService from '~/services/brandServices';

// export default function TestProductPagination() {
//     // call api
//     const [listAllProducts, setListAllProducts] = useState([]);

//     // const [products, setProducts] = useState(listAllProducts);
//     const [searchVal, setSearchVal] = useState('');
//     const [storeValue, setStoreValue] = useState([]);
//     const [getValue, setGetValue] = useState(false);
//     const [currentImages, setCurrentImages] = useState([]);
//     // những brand được chọn và có sản phẩm tương ứng
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [hasProducts, setHasProducts] = useState(false);
//     const [brandFilteredProducts, setBrandFilteredProducts] = useState([]);
//     const [selectedPriceRange, setSelectedPriceRange] = useState('');
//     const [selectedBrands, setSelectedBrands] = useState([]);

//     // phân trang
//     let [page, setPage] = useState(1);
//     const PER_PAGE = 8; // have 8 products in one page
//     const count = Math.ceil(listAllProducts.length / PER_PAGE);
//     const _DATA = usePagination(listAllProducts, PER_PAGE);

//     // sorting
//     const [sorting, setSorting] = useState('');

//     // list brands
//     const [listBrands, setListBrands] = useState([]);

//     // API
//     // call api all brands
//     useEffect(() => {
//         const fetchBrandsData = async () => {
//             const listProductBrands = await brandService.getAllBrand();
//             console.log('listProductBrands.name: ', listProductBrands.name);
//             setListBrands(listProductBrands);
//         };
//         fetchBrandsData();
//     }, []);

//     // call api get all product from database
//     useEffect(() => {
//         const fetchProductData = async () => {
//             const listAllProducts = await productService.getAllProduct();
//             setListAllProducts(listAllProducts);
//         };
//         fetchProductData();
//     }, []);

//     // useEffect(() => {
//     //     setCurrentImages(Array.from({ length: _DATA.length }, (_, index) => index));
//     // }, []);
//     // _DATA.length;

//     // filter product by brands
//     // useEffect(() => {
//     //     // Filter by brand
//     //     const brandFiltered = listAllProducts.filter((product) => {
//     //         console.log('product.brand:', product.brand);
//     //         console.log('product name is chose:', product.brand);
//     //         return selectedBrands.length === 0 || selectedBrands.includes(product.brand);
//     //     });

//     //     setBrandFilteredProducts(brandFiltered);
//     //     setHasProducts(brandFiltered.length > 0);
//     // }, [selectedPriceRange, selectedBrands, listAllProducts]);

//     // filter product by brands
//     useEffect(() => {
//         // Check if there are products before filtering
//         if (listAllProducts.length === 0) {
//             return;
//         }

//         // Filter by brand
//         const brandFiltered = listAllProducts.filter((product) => {
//             console.log('product.brand:', product.brand);
//             console.log('product name is chose:', product.brand);
//             return selectedBrands.length === 0 || selectedBrands.includes(product.brand);
//         });

//         setBrandFilteredProducts(brandFiltered);
//         setHasProducts(brandFiltered.length > 0);
//     }, [selectedPriceRange, selectedBrands, listAllProducts]);

//     // make filter
//     // filter by price
//     useEffect(() => {
//         // Filter products based on selected price range
//         const priceFiltered = brandFilteredProducts.filter((product) => {
//             // const priceNumber = parseFloat(product.price.replace(/,/g, '').replace('đ', ''));
//             const priceNumber = parseFloat(product.price);

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
//     // const handleSearchInputChange = (e) => {
//     //     setSearchVal(e.target.value);
//     // };

//     // search product
//     const handleSearchInputChange = (e) => {
//         // const searchTerm = e.target.value.toLowerCase();
//         const searchTerm = e.target.value;

//         // Update the search value in the state
//         setSearchVal(searchTerm);

//         // Filter products based on the search term
//         const filteredProducts = listAllProducts.filter(
//             (item) => item.name.toLowerCase().includes(searchTerm),
//             // item.title.toLowerCase().includes(searchTerm),
//         );

//         // Update the state with the filtered products
//         // setProducts(filteredProducts);
//         setListAllProducts(filteredProducts);
//         setStoreValue(filteredProducts);
//         setGetValue(true);
//         setPage(1);

//         // Update the state to reflect whether there are products or not
//         setHasProducts(filteredProducts.length > 0);
//     };

//     const handleSearchClickPagination = () => {
//         if (!searchVal.trim()) {
//             // If the search input is empty, reset the products to the original list
//             // setProducts(products);
//             setListAllProducts(listAllProducts);
//             setGetValue(false);
//             setPage(1);
//             return;
//         }

//         // Filter products based on the search term
//         const searchTermLower = searchVal;
//         // const searchTermLower = searchVal.toLowerCase();
//         const filteredProducts = listAllProducts.filter(
//             (item) => item.title.includes(searchTermLower),
//             // item.title.toLowerCase().includes(searchTermLower),
//         );

//         // Update the state to reflect whether there are products or not
//         setHasProducts(filteredProducts.length > 0);

//         // setProducts(filteredProducts);
//         setListAllProducts(filteredProducts);
//         setStoreValue(filteredProducts);
//         setGetValue(true);
//         setPage(1);
//     };

//     // filter sản phẩm sau khi chọn các thương hiệu sản phẩm
//     // Trong hàm handleBrandFilter

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
//                     <Box sx={{ border: '1px solid #333', mr: 6 }}>
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
//                         <SortingSection sorting={sorting} handleSortChange={handleSortChange} />

//                         {/* done for this function */}
//                         {/* <TextField
//                             label="Search"
//                             variant="outlined"
//                             size="small"
//                             value={searchVal}
//                             onChange={handleSearchInputChange}
//                         />
//                         <IconButton onClick={handleSearchClickPagination}>
//                             <SearchIcon />
//                         </IconButton> */}
//                     </Box>

//                     {hasProducts ? (
//                         <ProductGrid
//                             getValue={getValue}
//                             page={page}
//                             PER_PAGE={PER_PAGE}
//                             _DATA={_DATA}
//                             storeValue={storeValue}
//                             filteredProducts={filteredProducts}
//                             brandFilteredProducts={brandFilteredProducts}
//                             sorting={sorting}
//                             hasProducts={hasProducts}
//                             navigate={navigate}
//                         />
//                     ) : (
//                         <EmptyCard message={'Không có sản phẩm '} />
//                     )}

//                     <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
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
    const [listAllProducts, setListAllProducts] = useState([]); // call api
    const [products, setProducts] = useState(listAllProducts);
    const [searchVal, setSearchVal] = useState('');
    const [storeValue, setStoreValue] = useState([]);
    const [getValue, setGetValue] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [hasProducts, setHasProducts] = useState(false);

    const [brandFilteredProducts, setBrandFilteredProducts] = useState([]);
    let [page, setPage] = useState(1);

    const PER_PAGE = 8; // have 8 products in one page
    const count = Math.ceil(products.length / PER_PAGE);
    const _DATA = usePagination(products, PER_PAGE);
    const [sorting, setSorting] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [selectedBrands, setSelectedBrands] = useState([]);
    //     // list brands
    const [listBrands, setListBrands] = useState([]);
    // call api
    useEffect(() => {
        const fetchProductData = async () => {
            const listAllProducts = await productService.getAllProduct();
            console.log('listAllProducts', listAllProducts);
            setListAllProducts(listAllProducts);
        };
        fetchProductData();
    }, []);

    useEffect(() => {
        const fetchBrandsData = async () => {
            const listProductBrands = await brandService.getAllBrand();
            console.log('listProductBrands.name: ', listProductBrands.name);
            setListBrands(listProductBrands);
        };
        fetchBrandsData();
    }, []);

    useEffect(() => {
        setCurrentImages(Array.from({ length: _DATA.length }, (_, index) => index));
    }, []);
    // _DATA.length

    useEffect(() => {
        // Filter products based on selected brands
        const brandFiltered = listAllProducts.filter((product) => {
            return selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        });
        setBrandFilteredProducts(brandFiltered);
    }, [selectedBrands, listAllProducts]);

    // make filter

    useEffect(() => {
        // Filter products based on selected price range
        const priceFiltered = brandFilteredProducts.filter((product) => {
            // const priceNumber = parseFloat(product.price.replace(/,/g, '').replace('đ', ''));
            const priceNumber = parseFloat(product.price);

            return (
                selectedPriceRange.length === 0 ||
                selectedPriceRange.some((range) => {
                    // selectedPriceRange.every((range) => {
                    switch (range) {
                        case 'Dưới 1,000,000đ':
                            return priceNumber < 1000000;
                        case '1,000,000đ - 2,000,000đ':
                            return priceNumber >= 1000000 && priceNumber <= 2000000;
                        case '2,000,000đ - 3,000,000đ':
                            return priceNumber >= 2000000 && priceNumber <= 3000000;
                        case 'Trên 3,000,000đ':
                            return priceNumber > 3000000;
                        default:
                            return false;
                    }
                })
            );
        });

        setFilteredProducts(priceFiltered);

        // Kiểm tra danh sách sản phẩm lọc có rỗng không
        setHasProducts(priceFiltered.length > 0);
    }, [selectedPriceRange, brandFilteredProducts]);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    const navigate = useNavigate();
    // const handleSearchInputChange = (e) => {
    //     setSearchVal(e.target.value);
    // };

    const handleSearchInputChange = (e) => {
        // const searchTerm = e.target.value.toLowerCase();
        const searchTerm = e.target.value;

        // Update the search value in the state
        setSearchVal(searchTerm);

        // Filter products based on the search term
        const filteredProducts = listAllProducts.filter(
            (item) => item.title,
            // item.title.toLowerCase().includes(searchTerm),
        );

        // Update the state with the filtered products
        setProducts(filteredProducts);
        setStoreValue(filteredProducts);
        setGetValue(true);
        setPage(1);

        // Update the state to reflect whether there are products or not
        setHasProducts(filteredProducts.length > 0);
    };

    const handleSearchClickPagination = () => {
        if (!searchVal.trim()) {
            // If the search input is empty, reset the products to the original list
            setProducts(listAllProducts);
            setGetValue(false);
            setPage(1);
            return;
        }

        // Filter products based on the search term
        const searchTermLower = searchVal;
        // const searchTermLower = searchVal.toLowerCase();
        const filteredProducts = listAllProducts.filter(
            (item) => item.title.includes(searchTermLower),
            // item.title.toLowerCase().includes(searchTermLower),
        );

        // Update the state to reflect whether there are products or not
        setHasProducts(filteredProducts.length > 0);

        setProducts(filteredProducts);
        setStoreValue(filteredProducts);
        setGetValue(true);
        setPage(1);
    };

    const handleBrandFilter = (selectedBrand) => {
        let updatedSelectedBrands = [...selectedBrands];

        if (updatedSelectedBrands.includes(selectedBrand)) {
            updatedSelectedBrands = updatedSelectedBrands.filter(
                (brand) => brand !== selectedBrand,
            );
        } else {
            updatedSelectedBrands.push(selectedBrand);
        }

        setSelectedBrands(updatedSelectedBrands);
    };

    const handlePriceFilter = (selectedPrice) => {
        let updatedSelectedPriceRange = [...selectedPriceRange];

        if (updatedSelectedPriceRange.includes(selectedPrice)) {
            // If the price is already selected, remove it from the list
            updatedSelectedPriceRange = updatedSelectedPriceRange.filter(
                (price) => price !== selectedPrice,
            );
        } else {
            // If the price is not selected, add it to the list
            updatedSelectedPriceRange.push(selectedPrice);
        }

        setSelectedPriceRange(updatedSelectedPriceRange);
    };

    const handleSortChange = (event) => {
        const selectedSorting = event.target.value;
        setSorting(selectedSorting);
    };

    return (
        <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    {/* this box for category, filter products */}
                    <Box sx={{ border: '1px solid #333', mr: 6 }}>
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
                        <FilterBrand
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
                        <SortingSection sorting={sorting} handleSortChange={handleSortChange} />

                        {/* done for this function */}
                        {/* <TextField
                            label="Search"
                            variant="outlined"
                            size="small"
                            value={searchVal}
                            onChange={handleSearchInputChange}
                        />
                        <IconButton onClick={handleSearchClickPagination}>
                            <SearchIcon />
                        </IconButton> */}
                    </Box>

                    {hasProducts ? (
                        <ProductGrid
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
                        />
                    ) : (
                        <EmptyCard message={'Không có sản phẩm '} />
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                        <Pagination
                            count={count}
                            size="large"
                            page={page}
                            variant="outlined"
                            shape="rounded"
                            onChange={handleChange}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
