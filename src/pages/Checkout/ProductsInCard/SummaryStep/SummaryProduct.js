import React from 'react';
import classNames from 'classnames/bind';
import '~/components/GlobalStyles';
import styles from './SummaryStep.module.scss';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { TestLastRows } from './SummaryStepData/PriceDetails';
import ProductsTable from './SummaryStepData/ProductsTable';
import { rowsTest } from './SummaryStepData/ProductsTableData';

// MUI v5
import { Container, Box } from '@mui/material';

const cx = classNames.bind(styles);

function SummaryStep() {
    return (
        <Box>
            <ProductsTable />
        </Box>
    );
}

export default SummaryStep;
