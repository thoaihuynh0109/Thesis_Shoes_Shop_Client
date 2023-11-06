import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import SignIn from '~/components/SignIn';
import AdminLayout from '~/layouts/AdminLayout/AdminLayout';
import Category from '~/pages/AdminPages/Category';
import Dashboard from '~/pages/AdminPages/Dashboard';
import Order from '~/pages/AdminPages/Order';
import Product from '~/pages/AdminPages/Product';
import User from '~/pages/AdminPages/User';
import Checkout from '~/pages/Checkout/Checkout';
import ChangePassword from '~/pages/ClientPages/ChangePassword';
import PersonalAccount from '~/pages/ClientPages/Profile/PersonalAccount';
import WishList from '~/pages/ClientPages/WishList/WishList';
import ContactUs from '~/pages/ContactUs/Contact';
import DetailsPage from '~/pages/DetailsPage/DetailsPage';
import Home from '~/pages/Home/Home';
import PageNotFound from '~/pages/NotFound/PageNotFound';
import RecoverPassword from '~/pages/RecoverPassword/RecoverPassword';
import RegisterAccount from '~/pages/RegisterAccount/RegisterAccount';
import Shop from '~/pages/Shop/Shop';

// Route khong can dang nhap
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/shop',
        component: Shop,
    },
    {
        path: '/contact',
        component: ContactUs,
    },
    {
        path: '/product-details',
        component: DetailsPage,
    },
    // product-detail
    {
        path: '/my-wishlist',
        component: WishList,
    },
    {
        path: '/checkout',
        component: Checkout,
    },
    {
        path: '/checkout',
        component: Checkout,
    },
    {
        path: '/signin',
        component: SignIn,
    },
    {
        path: '/register-account',
        component: RegisterAccount,
    },

    // for authenticated
    {
        path: '/profile',
        component: PersonalAccount,
    },
    {
        path: '/change-password',
        component: ChangePassword,
    },
    {
        path: '/recover-password',
        component: RecoverPassword,
    },

    // not found page
    {
        path: '/*',
        component: PageNotFound,
    },
    // <Route path="/404" element={<PageNotFound />} />
    //             <Route path="*" element={<Navigate to="/404" />} />
];

// Route can dang nhap
const privateRoutes = [
    { path: '/dashboard', component: Dashboard, layout: AdminLayout },
    { path: '/manage-product', component: Product, layout: AdminLayout },
    { path: '/manage-user', component: User, layout: AdminLayout },
    { path: '/manage-order', component: Order, layout: AdminLayout },
    { path: '/manage-category', component: Category, layout: AdminLayout },
];

export { publicRoutes, privateRoutes };
