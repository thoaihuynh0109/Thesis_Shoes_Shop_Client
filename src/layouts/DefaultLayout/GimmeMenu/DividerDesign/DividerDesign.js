import React from 'react';
import classNames from 'classnames/bind';
import styles from './DividerDesign.module.scss';

//MUI v5
import { Box, Container } from '@mui/material';

const cx = classNames.bind(styles);
function DividerDesign() {
    return (
        <Box>
            <Box
                sx={{ borderTop: '1px dashed', borderColor: 'gray' }}
                className={cx('m-border-bottom')}
            />
            <Box sx={{ borderTop: '1px dashed', borderColor: 'gray' }} />
        </Box>
    );
}

export default DividerDesign;
