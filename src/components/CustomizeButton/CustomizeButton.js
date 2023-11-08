import { Button, styled } from '@mui/material';

export const CustomizeButton = styled(Button)(({ handleNavigateTo, fontSize, minWdith }) => ({
    variant: 'contained',
    margin: '0 auto',
    display: 'flex',
    fontSize: fontSize || '15px',
<<<<<<< HEAD
    padding: '10px 50px 10px 50px',
=======
    padding: '10px 30px 10px 30px',
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622
    marginTop: '16px',
    fontWeight: 'bold',
    // bgcolor:'#fff',
    onClick: { handleNavigateTo },
    minWidth: minWdith || '64px',
}));
