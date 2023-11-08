import { Typography, styled } from '@mui/material';

const CustomTypography = styled(Typography)(({ fontSize, fontWeight }) => ({
    fontSize: fontSize || '14px',
    fontWeight: fontWeight || 'normal',
}));

export default CustomTypography;
