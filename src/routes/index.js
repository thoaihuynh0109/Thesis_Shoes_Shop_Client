import SignIn from '~/components/SignIn';
import AdminLayout from '~/layouts/AdminLayout/AdminLayout';
import AddCategory from '~/pages/AdminPages/Category/AddCategory';
import Category from '~/pages/AdminPages/Category/Category';
import EditCategory from '~/pages/AdminPages/Category/EditCategory';
import Dashboard from '~/pages/AdminPages/Dashboard/Dashboard';
import Order from '~/pages/AdminPages/Order/Order';
import AddProduct from '~/pages/AdminPages/Product/AddProduct';
import EditProduct from '~/pages/AdminPages/Product/EditProduct';
import Product from '~/pages/AdminPages/Product/Product';
import AddUser from '~/pages/AdminPages/User/AddUser';
import EditUser from '~/pages/AdminPages/User/EditUser';
import User from '~/pages/AdminPages/User/User';
import Checkout from '~/pages/Checkout/Checkout';
import AddNewAddress from '~/pages/Checkout/ProductsInCard/AddressStep/AddNewAddress/AddNewAddress';
import UpdateAddress from '~/pages/Checkout/ProductsInCard/AddressStep/UpdateAddress/UpdateAddress';
import ChangePassword from '~/pages/ClientPages/ChangePassword';
import PersonalAccount from '~/pages/ClientPages/Profile/PersonalAccount';
import WishList from '~/pages/ClientPages/WishList/WishList';
import ContactUs from '~/pages/ContactUs/Contact';
import DetailsPage from '~/pages/DetailsPage/DetailsPage';
import Home from '~/pages/Home/Home';
import Men from '~/pages/Men/Men';
import OrderHistory from '~/pages/OrderHistory/OrderHistory';
import RecoverPassword from '~/pages/RecoverPassword/RecoverPassword';
import RegisterAccount from '~/pages/RegisterAccount/RegisterAccount';
import TestProductPagination from '~/pages/Shop/Pagination/TestProductPagination';
import Shop from '~/pages/Shop/Shop';
import Women from '~/pages/Women/Women';
import ShippingInformation from '~/pages/Checkout/ProductsInCard/ShippingInformation';

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
        path: '/men',
        component: Men,
    },
    {
        path: '/women',
        component: Women,
    },
    {
        path: '/contact',
        component: ContactUs,
    },
    {
        path: '/blog',
        component: TestProductPagination,
    },
    {
        // path: '/product-details',
        path: '/product-details/:id',
        component: DetailsPage,
    },
    // product-detail
    {
        path: '/my-wishlist',
        component: WishList,
    },
    {
        // path: '/checkout',
        path: '/shopping-cart',
        component: Checkout,
    },
    {
        path: '/checkout-page',
        // component: AddressStep,
        component: ShippingInformation,
    },
    {
        path: '/signin',
        component: SignIn,
    },
    {
        path: '/register-account',
        component: RegisterAccount,
    },
    {
        path: '/recover-password',
        component: RecoverPassword,
    },
    // not found page
    // { path: '/*', component: PageNotFound },
];

// Route can dang nhap
const privateRoutes = [
    // for authenticated
    { path: '/profile', component: PersonalAccount },
    { path: '/change-password', component: ChangePassword },

    { path: '/add-new-address', component: AddNewAddress },
    { path: '/update-address', component: UpdateAddress },
    { path: '/order-history', component: OrderHistory },
];

const adminRoutes = [
    { path: '/dashboard', component: Dashboard, layout: AdminLayout },
    { path: '/manage-product', component: Product, layout: AdminLayout },
    { path: '/manage-product/create', component: AddProduct, layout: AdminLayout },
    { path: '/manage-product/:id/edit', component: EditProduct, layout: AdminLayout },

    { path: '/manage-user', component: User, layout: AdminLayout },
    { path: '/manage-user/create', component: AddUser, layout: AdminLayout },
    { path: '/manage-user/:id/edit', component: EditUser, layout: AdminLayout },

    { path: '/manage-order', component: Order, layout: AdminLayout },
    { path: '/manage-order/create', component: Order, layout: AdminLayout },
    { path: '/manage-order/:id/edit', component: Order, layout: AdminLayout },

    { path: '/manage-category', component: Category, layout: AdminLayout },
    { path: '/manage-category/create', component: AddCategory, layout: AdminLayout },
    { path: '/manage-category/:id/edit', component: EditCategory, layout: AdminLayout },
];

export { publicRoutes, privateRoutes, adminRoutes };
