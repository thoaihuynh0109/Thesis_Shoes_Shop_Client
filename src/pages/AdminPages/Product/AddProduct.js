import React from 'react';
import {
    Box,
    FormHelperText,
    Paper,
    Stack,
    Typography,
    IconButton,
    InputAdornment,
    Grid,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';
import productService from '~/services/productServices';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '~/components/ToastMessage/ToastMessage';

function AddProduct() {
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

    const [category, setCategory] = React.useState({
        value: '',
        message: '',
    });

    const [message, setMessage] = React.useState('');
    const [typeMessage, setTypeMessage] = React.useState('');

    const navigate = useNavigate();

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

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!checkError()) {
            const data = {
                name: name.value,
            };
            const respone = await productService.createProduct(data);

            // call api to create new user
            if (respone.status === 201) {
                setMessage('Tạo user thành công');
                setTypeMessage('success');
                setName({ value: '', message: '' });

                // navigate('/manage-user');
            } else {
                setMessage('Tạo user thất bại');
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
            <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>New Product</Typography>

            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                <Box sx={{ flexGrow: 1, width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                                <form onSubmit={handleCreate}>
                                    <ToastMessage message={message} type={typeMessage} />
                                    <Box>
                                        <CustomizeTextField
                                            id="validation-outlined-input"
                                            label="Product namer"
                                            value={name.value}
                                            error={name.message ? true : false}
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Enter Phone Number"
                                        />
                                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                                            {name.message}
                                        </FormHelperText>
                                    </Box>

                                    <CustomizeButton type="submit">Cancel</CustomizeButton>
                                </form>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                                <form onSubmit={handleCreate}>
                                    <ToastMessage message={message} type={typeMessage} />

                                    <Box>
                                        <CustomizeTextField
                                            label="Product Name"
                                            required
                                            value={name.value}
                                            error={name.message ? true : false}
                                            variant="outlined"
                                            placeholder="Enter First Name"
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

                                    <Box>
                                        <CustomizeTextField
                                            id="validation-outlined-input"
                                            label="Price"
                                            value={price.value}
                                            error={price.message ? true : false}
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Enter Price"
                                            onChange={(e) =>
                                                setPrice({
                                                    ...price,
                                                    value: e.target.value,
                                                })
                                            }
                                        />
                                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                                            {price.message}
                                        </FormHelperText>
                                    </Box>

                                    <Box>
                                        <CustomizeTextField
                                            id="validation-outlined-input"
                                            label="Description"
                                            value={description.value}
                                            error={description.message ? true : false}
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Enter Phone Number"
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

                                    <CustomizeButton type="submit">Create User</CustomizeButton>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}

export default AddProduct;
