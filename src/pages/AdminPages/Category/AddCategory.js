import React from 'react';
import { Box, FormHelperText, Paper, Typography, MenuItem } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';
import categoryService from '~/services/categoryServices';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '~/components/ToastMessage/ToastMessage';

function AddCategory() {
    const [name, setName] = React.useState({
        value: '',
        message: '',
    });
    const [categories, setCategories] = React.useState([]);
    const [description, setDescription] = React.useState({
        value: '',
        message: '',
    });
    const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const [typeMessage, setTypeMessage] = React.useState('');
    const navigate = useNavigate();

    const fetchAllCategory = async () => {
        const listCategory = await categoryService.getAllCategory();
        setCategories(listCategory);
    };
    React.useEffect(() => {
        fetchAllCategory();
    }, []);

    const validateName = () => {
        if (name.value.trim() === '') {
            setName({
                ...name,
                message: 'Vui lòng nhập category name',
            });
        }
        setName({ ...name, message: '' });
    };

    const validateDescription = () => {
        if (description.value.trim() === '') {
            setDescription({
                ...description,
                message: 'Vui lòng nhập description',
            });
        }
        setDescription({ ...description, message: '' });
    };

    const checkError = () => {
        if (name.message !== '' || description.message !== '') {
            return true;
        }
        return false;
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!checkError()) {
            const data = {
                name: name.value,
                description: description.value,
                parentId: selectedCategoryId || null,
            };
            const respone = await categoryService.createCategory(data);

            // call api to create new user
            if (respone.status === 201) {
                setMessage('Tạo category thành công');
                setTypeMessage('success');
                setName({ value: '', message: '' });
                setDescription({ value: '', message: '' });
                setSelectedCategoryId(null);
                // navigate('/manage-category');
            } else {
                setMessage('Tạo category thất bại');
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
        navigate('/manage-category');
        // window.history.back(); // Quay trở lại trang trước
    };

    const handleSelected = (e) => {
        console.log(selectedCategoryId);
        setSelectedCategoryId(e.target.value);
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
            <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>New Category</Typography>
            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                <form onSubmit={handleCreate}>
                    <ToastMessage message={message} type={typeMessage} />

                    <Box>
                        <CustomizeTextField
                            label="Category Name"
                            required
                            fullWidth
                            value={name.value}
                            error={name.message ? true : false}
                            variant="outlined"
                            placeholder="Enter Category Name"
                            sx={{ width: '100%', mr: 2 }}
                            onBlur={validateName}
                            onChange={(e) => setName({ ...name, value: e.target.value })}
                        />
                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                            {name.message}
                        </FormHelperText>
                    </Box>
                    <Box>
                        <CustomizeTextField
                            label="Description"
                            required
                            fullWidth
                            value={description.value}
                            error={description.message ? true : false}
                            variant="outlined"
                            placeholder="Enter Description"
                            onBlur={validateDescription}
                            onChange={(e) =>
                                setDescription({ ...description, value: e.target.value })
                            }
                        />
                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                            {description.message}
                        </FormHelperText>
                    </Box>
                    {categories.length > 0 && (
                        <CustomizeTextField
                            select
                            value={selectedCategoryId}
                            onChange={handleSelected}
                            label="Select Category"
                            sx={{ minWidth: '30%' }}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </CustomizeTextField>
                    )}

                    <CustomizeButton type="submit">Create Category</CustomizeButton>
                </form>
            </Paper>
        </Box>
    );
}

export default AddCategory;
