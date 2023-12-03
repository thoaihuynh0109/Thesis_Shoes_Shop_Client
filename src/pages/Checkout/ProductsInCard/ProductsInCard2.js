import React, { useState, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Stepper,
    Step,
    StepButton,
    Button,
    Typography,
    Container,
    Snackbar,
} from '@mui/material';
import { styled } from '@mui/system';
import classNames from 'classnames/bind';
import styles from './ProductsInCard.module.scss';
import SummaryStep from './SummaryStep';
import AddressStep from './AddressStep/AddressStep';
import ShippingStep from './ShippingStep';
import PaymentStep from './Payment';
import SignIn from '~/components/SignIn';

function ProductsInCard2() {
    return (
        <Box>
            <SummaryStep />
        </Box>
    );
}

export default ProductsInCard2;
