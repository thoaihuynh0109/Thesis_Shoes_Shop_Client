import React from 'react';
import styles from './EmptyCard.module.scss';
import classNames from 'classnames/bind';

// Lib
import { Box, Typography } from '@mui/material';

const cx = classNames.bind(styles);
function EmptyCard({ message }) {
    return (
        // Don't have products in Card
        <Box className={cx('my-account-container')}>
            <Typography
                margin="0 0 10px;"
                fontWeight={'bold'}
                fontSize={'14px'}
                variant="body1"
                textAlign={'center'}
                textTransform={'capitalize'}
                className={cx('empty-card', 'empty-card-warning')}
            >
                {message}
            </Typography>
        </Box>
    );
}

export default EmptyCard;
