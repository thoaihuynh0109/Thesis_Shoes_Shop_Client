import React from 'react';
import styles from './EmptyCard.module.scss';
import classNames from 'classnames/bind';

// Lib
import { Box, Typography } from '@mui/material';

const cx = classNames.bind(styles);
function EmptyCard() {
    return (
        // Don't have products in Card
        <Box className={cx('my-account-container')}>
            {/* <Box className={cx('border-container')}>
            <Typography variant='body1'>
                Your shopping cart is empty.
            </Typography>
        </Box> */}
            <Typography
                margin="0 0 10px;"
                fontWeight={'bold'}
                fontSize={'14px'}
                variant="body1"
                className={cx('empty-card', 'empty-card-warning')}
            >
                Your shopping cart is empty.
            </Typography>
        </Box>
    );
}

export default EmptyCard;
