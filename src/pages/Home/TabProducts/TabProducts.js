import React, { useState } from 'react';
import { Box, Tab, Typography, styled } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BestSeller from './BestSeller';
import LastesProduct from './LastesProduct';
import Featured from './Featured';

const CustomTab = styled(Tab)(({}) => ({
    fontSize: '18px',
    color: '#333',
}));

const CustomTabPanel = styled(TabPanel)(({}) => ({
    fontSize: '16px',
    color: '#333',
}));

export default function ToastTabProducts() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
                    <TabList onChange={handleChange} aria-label="Products">
                        <CustomTab label="Lastest" value="1" />
                        <CustomTab label="Best Seller" value="2" />
                        {/* <CustomTab label="Featured" value="3" /> */}
                    </TabList>
                </Box>
                <CustomTabPanel value="1">
                    <LastesProduct />
                </CustomTabPanel>
                <CustomTabPanel value="2">
                    <BestSeller />
                </CustomTabPanel>
                {/* <CustomTabPanel value="3">
                    <Featured />
                </CustomTabPanel> */}
            </TabContext>
        </Box>
    );
}
