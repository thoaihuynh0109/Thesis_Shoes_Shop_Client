import { useState, useEffect } from 'react';
import usePagination from '~/pages/Shop/Pagination/PaginationManagement';
// import shopData from '../shop.json';
import shopData from '~/pages/Shop/Pagination/shop.json';
import productService from '~/services/productServices';
import { useNavigate } from 'react-router-dom';

const UseProductFilter = () => {
    const [listAllProducts, setListAllProducts] = useState([]);
    const [products, setProducts] = useState(listAllProducts);
    const [searchVal, setSearchVal] = useState('');
    const [storeValue, setStoreValue] = useState([]);
    const [getValue, setGetValue] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    // initial state for hasProducts
    // const [hasProducts, setHasProducts] = useState(false);
    const [hasProducts, setHasProducts] = useState(true);
    const [brandFilteredProducts, setBrandFilteredProducts] = useState([]);
    let [page, setPage] = useState(1);

    const PER_PAGE = 8; // have 8 products in one page
    const count = Math.ceil(products.length / PER_PAGE);
    const _DATA = usePagination(products, PER_PAGE);
    const [sorting, setSorting] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const navigate = useNavigate();

    // call api
    useEffect(() => {
        const fetchData = async () => {
            const listAllProducts = await productService.getAllProduct();
            setListAllProducts(listAllProducts);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setCurrentImages(Array.from({ length: _DATA.length }, (_, index) => index));
    }, []);

    useEffect(() => {
        // Filter products based on selected brands
        const brandFiltered = listAllProducts.filter(
            (product) => selectedBrands.length === 0 || selectedBrands.includes(product.brand),
        );
        setBrandFilteredProducts(brandFiltered);
        setHasProducts(brandFiltered.length > 0);
    }, [selectedBrands, listAllProducts]);

    useEffect(() => {
        // Filter products based on selected price range
        const priceFiltered = brandFilteredProducts.filter((product) => {
            // const priceNumber = parseFloat(product.price.replace(/,/g, '').replace('đ', ''));
            const priceNumber = parseFloat(product.price);

            return (
                selectedPriceRange.length === 0 ||
                selectedPriceRange.some((range) => {
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

    const handleSearchClickPagination = () => {
        if (!searchVal.trim()) {
            setProducts(listAllProducts);
            setGetValue(false);
            setPage(1);
            return;
        }

        const filteredProducts = listAllProducts.filter((item) =>
            item.title.toLowerCase().includes(searchVal.toLowerCase()),
        );

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
            updatedSelectedPriceRange = updatedSelectedPriceRange.filter(
                (price) => price !== selectedPrice,
            );
        } else {
            updatedSelectedPriceRange.push(selectedPrice);
        }

        setSelectedPriceRange(updatedSelectedPriceRange);
    };

    const handleSortChange = (event) => {
        const selectedSorting = event.target.value;
        setSorting(selectedSorting);
    };

    return {
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
        handleChange,
        navigate,
        handleSearchClickPagination,
        handleBrandFilter,
        handlePriceFilter,
        handleSortChange,
    };
};

export default UseProductFilter;
