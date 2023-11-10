import { Button, styled } from '@mui/material';

export const CustomizeButton = styled(Button)(({ handleNavigateTo, fontSize, minWdith }) => ({
    variant: 'contained',
    margin: '0 auto',
    display: 'flex',
    fontSize: fontSize || '15px',
    padding: '10px 30px 10px 30px',
    marginTop: '16px',
    fontWeight: 'bold',
    // bgcolor:'#fff',
    onClick: { handleNavigateTo },
    minWidth: minWdith || '64px',
}));
