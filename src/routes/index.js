import AdminLayout from '~/layouts/AdminLayout/AdminLayout';
import Category from '~/pages/AdminPages/Category';
import Dashboard from '~/pages/AdminPages/Dashboard';
import Order from '~/pages/AdminPages/Order';
import Product from '~/pages/AdminPages/Product';
import User from '~/pages/AdminPages/User';
import Home from '~/pages/HomePage/HomePage';

// Route khong can dang nhap
const publicRoutes = [{ path: '/', component: Home }];

// Route can dang nhap
const privateRoutes = [
    { path: '/dashboard', component: Dashboard, layout: AdminLayout },
    { path: '/manage-product', component: Product, layout: AdminLayout },
    { path: '/manage-user', component: User, layout: AdminLayout },
    { path: '/manage-order', component: Order, layout: AdminLayout },
    { path: '/manage-category', component: Category, layout: AdminLayout },
];

export { publicRoutes, privateRoutes };
