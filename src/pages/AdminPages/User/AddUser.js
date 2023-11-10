import { Box, Button, Paper, Stack, TextField, Typography, styled } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import './User.scss';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';

const ValidationTextField = styled(CustomizeTextField)({
    '& input:valid + fieldset': {
        borderColor: '#E0E3E7',
        borderWidth: 1,
    },
    '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 1,
    },
    '& input:valid:focus + fieldset': {
        borderLeftWidth: 2,
        padding: '4px !important', // override inline-style
    },
});

function AddUser() {
    const handleCreate = () => {
        // call api to create new user
        console.log('ok');
    };
    const handleBack = () => {
        window.history.back(); // Quay trở lại trang trước
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
            <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>New Customers</Typography>
            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }} className="new-user">
                <div className="new-user-container">
                    <Stack direction="row">
                        <ValidationTextField
                            id="validation-outlined-input"
                            label="First Name"
                            required
                            sx={{ width: '50%', mr: 2 }}
                            variant="outlined"
                            placeholder="Enter First Name"
                        />
                        <ValidationTextField
                            id="validation-outlined-input"
                            label="Last Name"
                            required
                            sx={{ width: '50%' }}
                            variant="outlined"
                            placeholder="Enter Last Name"
                        />
                    </Stack>

                    <ValidationTextField
                        id="validation-outlined-input"
                        label="Email"
                        fullWidth
                        required
                        variant="outlined"
                        placeholder="Enter email"
                    />
                    <Stack direction="row">
                        <ValidationTextField
                            id="validation-outlined-input"
                            label="Password"
                            required
                            sx={{ width: '50%', mr: 2 }}
                            variant="outlined"
                            placeholder="Enter Password"
                        />
                        <ValidationTextField
                            id="validation-outlined-input"
                            label="Re-password"
                            required
                            sx={{ width: '50%' }}
                            variant="outlined"
                            placeholder="Enter Re-Password"
                        />
                    </Stack>

                    <ValidationTextField
                        id="validation-outlined-input"
                        label="Address"
                        fullWidth
                        variant="outlined"
                        placeholder="Enter Address"
                    />
                    <CustomizeButton onClick={handleCreate}>Create User</CustomizeButton>
                </div>
            </Paper>
        </Box>
    );
}

export default AddUser;
