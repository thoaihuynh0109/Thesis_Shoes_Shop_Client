import React from 'react';
import {
    Box,
    FormHelperText,
    Paper,
    Typography,
    InputAdornment,
    Grid,
    MenuItem,
    Button,
    Stack,
    OutlinedInput,
    InputLabel,
    FormControl,
    Select,
    Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';
import { useNavigate, useParams } from 'react-router-dom';
import productService from '~/services/productServices';
import categoryService from '~/services/categoryServices';
import ToastMessage from '~/components/ToastMessage/ToastMessage';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { useDropzone } from 'react-dropzone';
import brandService from '~/services/brandServices';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const listColors = ['Trắng', 'Đen', 'Đỏ', 'Xanh lá', 'Vàng'];

function EditProduct() {
    const [name, setName] = React.useState({
        value: '',
        message: '',
    });

    const [description, setDescription] = React.useState({
        value: '',
        message: '',
    });

    const [price, setPrice] = React.useState({
        value: 0,
        message: '',
    });
    const [priceSale, setPriceSale] = React.useState({
        value: 0,
        message: '',
    });
    const [sizes, setSizes] = React.useState([35, 36, 37, 38, 39, 40, 41, 42, 43]);
    const [colors, setColors] = React.useState([]);
    const [imgData, setImgData] = React.useState({});
    const [imageUrl, setImageUrl] = React.useState('');
    const [categories, setCategories] = React.useState([]);
    const [subCategories, setSubCategories] = React.useState([]);

    const [selectedBrandId, setSelectedBrandId] = React.useState({});
    const [selectedCategoryId, setSelectedCategoryId] = React.useState({});
    const [selectedSubCategoryId, setSelectedSubCategoryId] = React.useState({});
    const [brands, setBrands] = React.useState([]);

    const [message, setMessage] = React.useState('');
    const [typeMessage, setTypeMessage] = React.useState('');

    const theme = useTheme();

    const { id } = useParams();

    const fetchAllParentCategory = async () => {
        const listCategory = await categoryService.getAllParentCategory();
        setCategories(listCategory);
    };
    const fetchCategoryByParentId = async (id) => {
        const listCategory = await categoryService.getChildCategoryByPId(id);
        setSubCategories(listCategory);
    };

    // const fetchAllCategory = async () => {
    //     const listCategory = await categoryService.getAllCategory();
    //     setCategories(listCategory);
    // };
    const fetchAllBrand = async () => {
        const listBrand = await brandService.getAllBrand();
        setBrands(listBrand);
    };

    React.useEffect(() => {
        fetchCategoryByParentId(selectedCategoryId);
    }, [selectedCategoryId]);

    React.useEffect(() => {
        async function fetchProduct() {
            const product = await productService.getProductById(id);
            console.log(product);
            setName({ value: product.name, message: '' });
            setDescription({ value: product.description, message: '' });
            setPrice({ value: product.price, message: '' });
            setPriceSale({ value: product.priceSale, message: '' });
            setColors(product.colors);
            setSelectedBrandId(product.brand);
            setSelectedCategoryId(
                product.parentCategoryId ? product.parentCategoryId : product.category,
            );
            setSelectedSubCategoryId(product.parentCategoryId ? product.category : null);
            setImageUrl(product.images);
        }
        fetchAllParentCategory();
        fetchProduct();
        fetchAllBrand();
        // fetchAllCategory();
    }, []);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setColors(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const onDrop = (acceptedFiles) => {
        setImgData(acceptedFiles[0]);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const result = fileReader.result;
            setImageUrl(result);
        };
        fileReader.readAsDataURL(acceptedFiles[0]);
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const navigate = useNavigate();

    const handleSelectedBrand = (e) => {
        setSelectedBrandId(e.target.value);
    };
    const handleSelectedCategory = (e) => {
        setSelectedCategoryId(e.target.value);
    };
    const handleSelectedSubCategory = (e) => {
        setSelectedSubCategoryId(e.target.value);
    };
    const validateName = () => {
        if (name.value.trim() === '') {
            setName({
                ...name,
                message: 'Vui lòng nhập first name',
            });
        }
        setName({ ...name, message: '' });
    };

    const checkError = () => {
        if (name.message !== '') {
            return true;
        }
        return false;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!checkError()) {
            const data = {
                name: name.value,
                description: description.value,
                price: price.value,
                priceSale: priceSale.value,
                images: imgData,
                sizes: sizes,
                colors: colors,
                brand: selectedBrandId,
                categoryId: selectedSubCategoryId ? selectedSubCategoryId : selectedCategoryId,
            };
            const respone = await productService.updateProduct(id, data);

            // call api to update product
            if (respone.status === 200) {
                setMessage('Update product thành công');
                setTypeMessage('success');
            } else {
                setMessage('Update product thất bại');
                setTypeMessage('error');
            }
        } else {
            setMessage('Vui lòng kiểm tra các trường đã nhập');
            setTypeMessage('error');
        }
        setTimeout(() => {
            setMessage('');
            setTypeMessage('');
        }, 3000);
    };
    const handleBack = () => {
        navigate('/manage-product');
        // window.history.back(); // Quay trở lại trang trước
    };

    return (
        <Box>
            <CustomizeButton
                startIcon={<ArrowBackIosNewIcon />}
                sx={{ display: 'inline-flex', padding: '10px 30px 10px 0px', mb: '16px' }}
                onClick={handleBack}
            >
                Back
            </CustomizeButton>
            <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>Update Product</Typography>

            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                <Box sx={{ flexGrow: 1, width: '100%' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex' }}>
                            <Paper
                                sx={{
                                    ml: 2,
                                    mt: 4,
                                    mb: 4,
                                    padding: 3,
                                    borderRadius: 4,
                                    flexGrow: 1,
                                }}
                            >
                                <CustomTypography sx={{ fontSize: '1.6rem', mb: 2, ml: 2 }}>
                                    Add Image
                                </CustomTypography>
                                <Box
                                    {...getRootProps()}
                                    sx={{
                                        padding: 1.5,
                                        borderRadius: 4,
                                        width: '90%',
                                        minHeight: '300px',

                                        textAlign: 'center',
                                        border: '1px dashed grey',
                                        backgroundImage: 'url()',
                                        backgroundSize: '300px',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '0 auto', // Set margin to 'auto' to center the Box horizontally
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="Uploaded"
                                            style={{ width: '100%' }}
                                        />
                                    ) : isDragActive ? (
                                        <Typography>Thả tệp vào đây...</Typography>
                                    ) : (
                                        <Grid
                                            container
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={{
                                                position: 'absolute', // Add this to make the Grid position absolute
                                                bottom: 0, // Position the Grid at the bottom of the Box
                                                left: 0, // Position the Grid at the left of the Box
                                                width: '100%', // Set the width of the Grid to 100% of the Box
                                                padding: '16px', // Add padding to the Grid
                                            }}
                                        >
                                            <Button variant="contained">
                                                Kéo và thả ảnh vào đây hoặc click để upload
                                            </Button>
                                        </Grid>
                                    )}
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex' }}>
                            <Paper
                                sx={{
                                    mr: 2,
                                    mt: 4,
                                    mb: 4,
                                    padding: 3,
                                    borderRadius: 4,
                                    flexGrow: 1,
                                }}
                            >
                                <form onSubmit={handleUpdate}>
                                    <ToastMessage message={message} type={typeMessage} />

                                    <Box>
                                        <CustomizeTextField
                                            label="Product Name"
                                            required
                                            value={name.value}
                                            error={name.message ? true : false}
                                            variant="outlined"
                                            placeholder="Enter Product Name"
                                            sx={{ width: '100%', mr: 2 }}
                                            onBlur={validateName}
                                            onChange={(e) =>
                                                setName({
                                                    ...name,
                                                    value: e.target.value,
                                                })
                                            }
                                        />
                                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                                            {name.message}
                                        </FormHelperText>
                                    </Box>
                                    <Stack direction="row" sx={{ mb: 2 }}>
                                        <Box sx={{ width: '50%', mr: 2 }}>
                                            <CustomizeTextField
                                                label="Price"
                                                type="number"
                                                sx={{
                                                    mt: 2,
                                                }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Typography
                                                                sx={{ fontSize: '1.2rem', mr: 1 }}
                                                            >
                                                                VND
                                                            </Typography>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                value={price.value}
                                                onChange={(e) =>
                                                    setPrice({
                                                        ...price,
                                                        value: e.target.value,
                                                    })
                                                }
                                            />
                                        </Box>
                                        <Box sx={{ width: '50%' }}>
                                            <CustomizeTextField
                                                label="Price Sales"
                                                type="number"
                                                sx={{
                                                    mt: 2,
                                                }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Typography
                                                                sx={{ fontSize: '1.2rem', mr: 1 }}
                                                            >
                                                                VND
                                                            </Typography>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                value={priceSale.value}
                                                onChange={(e) =>
                                                    setPriceSale({
                                                        ...priceSale,
                                                        value: e.target.value,
                                                    })
                                                }
                                            />
                                        </Box>
                                    </Stack>
                                    <Box sx={{ mb: 2 }}>
                                        <CustomizeTextField
                                            id="validation-outlined-input"
                                            label="Description"
                                            value={description.value}
                                            error={description.message ? true : false}
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Enter Description"
                                            onChange={(e) =>
                                                setDescription({
                                                    ...description,
                                                    value: e.target.value,
                                                })
                                            }
                                        />
                                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                                            {description.message}
                                        </FormHelperText>
                                    </Box>

                                    <FormControl sx={{ mb: 2, width: 300 }}>
                                        <InputLabel sx={{ fontSize: '1.6rem' }}>
                                            Select Color
                                        </InputLabel>
                                        <Select
                                            sx={{ fontSize: '1.6rem' }}
                                            multiple
                                            value={colors}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Select Color" />}
                                            renderValue={(selected) => (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {listColors.map((color) => (
                                                <MenuItem
                                                    key={color}
                                                    value={color}
                                                    sx={{ fontSize: '1.4rem' }}
                                                >
                                                    {color}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {brands?.length > 0 && (
                                        <CustomizeTextField
                                            select
                                            value={selectedBrandId}
                                            onChange={handleSelectedBrand}
                                            label="Select Brand"
                                            sx={{ width: '100%', fontSize: '1.4rem', mb: 2 }}
                                        >
                                            {brands.map((brand) => (
                                                <MenuItem
                                                    key={brand._id}
                                                    value={brand._id}
                                                    sx={{ fontSize: '1.4rem' }}
                                                >
                                                    {brand.name}
                                                </MenuItem>
                                            ))}
                                        </CustomizeTextField>
                                    )}

                                    {categories?.length > 0 && (
                                        <CustomizeTextField
                                            select
                                            value={selectedCategoryId}
                                            onChange={handleSelectedCategory}
                                            label="Select Category"
                                            sx={{ width: '100%', fontSize: '1.4rem', mb: 2 }}
                                        >
                                            {categories.map((category) => (
                                                <MenuItem
                                                    key={category._id}
                                                    value={category._id}
                                                    sx={{ fontSize: '1.4rem' }}
                                                >
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </CustomizeTextField>
                                    )}
                                    {subCategories?.length > 0 && (
                                        <CustomizeTextField
                                            select
                                            value={selectedSubCategoryId}
                                            onChange={handleSelectedSubCategory}
                                            label="Select Sub Category"
                                            sx={{ width: '100%', fontSize: '14px', mb: 2 }}
                                        >
                                            {subCategories.map((category) => (
                                                <MenuItem
                                                    key={category._id}
                                                    value={category._id}
                                                    sx={{ fontSize: '14px' }}
                                                >
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </CustomizeTextField>
                                    )}

                                    <CustomizeButton type="submit">Update Product</CustomizeButton>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}

export default EditProduct;
