import React, { Fragment } from 'react';
import styles from './BreadCrumb.scss';
import className from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '@mui/material';

const cx = className.bind(styles);

// store about breadcrumbs path information
// show the current stage for the user who uses the website

const breadcrumbData = [
    { path: '/', name: 'Home' },
    { path: '/my-account', name: 'My Account' },
    { path: '/my-wishlist', name: 'Wish List' },
    {
        path: '/checkout',
        name: 'Checkout',
    },
    { path: '/signin', name: 'Đăng nhập' },
    { path: '/register-account', name: 'Đăng ký tài khoản' },
    { path: '/shop', name: 'Shop' },
    { path: '/blog', name: 'Blog' },
    { path: '/contact', name: 'Contact Us' },
    { path: '/policy', name: 'Policy' },
    { path: '/recover-password', name: 'Recover Password' },
    { path: '/profile', name: 'Thông tin cá nhân' },
    { path: '/404', name: 'Page Not Found' },
];

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.485398611676!2d106.76933281022632!3d10.850637657776673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1697929063371!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>




function Breadcrumbs({ currentStepName }) {
    // get the current location
    const location = useLocation();
    const navigate = useNavigate();

    // Thêm một biến boolean để kiểm tra xem có phải là trang checkout hay không
    // const isCheckoutPage = location.pathname.startsWith('/checkout');
    // Gets a list of current breadcrumbs based on the current position of the page.
    const getCurrentBreadcrumbs = () => {
        const currentPath = location.pathname;
        const breadcrumbs = [];

        // Not the Home Page --> show Icon Home and Home Name
        // If the current path is Home Page --> hide both of them
        if (currentPath !== '/') {
            breadcrumbs.push(breadcrumbData[0]);
        }

        let path = '';
        const pathSegments = currentPath
            .split('/')
            // remove empty elements
            .filter((segment) => segment !== '');

        // loop each path segment
        for (let i = 0; i < pathSegments.length; i++) {
            // concatenate into the path variable
            //and then find the corresponding breadcrumb
            path += `/${pathSegments[i]}`;
            const breadcrumb = breadcrumbData.find(
                (item) => item.path === path,
            );
            // breadcrumb is true --> push into breadcrumbs array
            if (breadcrumb) {
                breadcrumbs.push(breadcrumb);
            }
        }

        return breadcrumbs;
    };

    const getBreadcrumbs = getCurrentBreadcrumbs();

    return (
        // need change Box --> Container
        <Box
            sx={{
                fontSize: '16px',
                display: 'flex',
                mt: 2,
                ml: 3,
                justifyContent: 'flex-start',
                alignItems: 'center',
                cursor: 'pointer',
            }}
        >
            {location.pathname !== '/' && (
                <HomeIcon
                    fontSize="16px"
                    color="action"
                    onClick={() => navigate('/')}
                />
            )}

            {/* Home > Path */}
            {getBreadcrumbs.map((breadcrumb, index) => (
                <Fragment key={index}>
                    <Link
                        to={breadcrumb.path}
                        className={
                            // location.pathname === breadcrumb.path
                            // ? 'breadcrumb-active'
                            cx('breadcrumb-active')
                        }
                    >
                        {breadcrumb.name}
                    </Link>
                    {/* for  2 steps of Menu: 
                            Home > Shop > GiayNam
                            */}
                   

                    {/* Determines whether the current element 
                        is the last element in the breadcrumb list */}
                    {index !== getBreadcrumbs.length - 1 && (
                        <ArrowForwardIosIcon
                            fontSize="12px"
                            color="action"
                            sx={{ mx: 1 }}
                        />
                    )}
                </Fragment>
            ))}
        </Box>
    );
}

export default Breadcrumbs;


