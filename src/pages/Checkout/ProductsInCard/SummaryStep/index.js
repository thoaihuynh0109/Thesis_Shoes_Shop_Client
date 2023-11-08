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
import { Container } from '@mui/material';

const calculateTotalPrice = () => {
    let totalPrice = 0;
    var quantity = 4;
    rowsTest.forEach((row) => {
        // Tính tổng giá trị cho từng sản phẩm
        totalPrice += row.unitPrice * quantity;
    });
    return totalPrice;
};

const cx = classNames.bind(styles);

function SummaryStep() {
    return (
        <Container>
            <ProductsTable />
            <TestLastRows />
        </Container>
    );
}

export default SummaryStep;
