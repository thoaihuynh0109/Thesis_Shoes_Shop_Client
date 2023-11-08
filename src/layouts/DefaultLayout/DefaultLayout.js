import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer/Footer';
import GimmeMenu from './GimmeMenu/GimmeMenu';
import HeaderDesign from './Header/HeaderComponent';
import SubHeader from './SubHeader/SubHeader';

import ScrollButtonToTop from '~/components/BackToTop';
import { InfiniteSliderTrack } from '~/components/SlideShowImage';
import PageNotFound from '~/pages/NotFound/PageNotFound';

function DefaultLayout({ children }) {
    const [displayHeader, setDisplayHeader] = useState(true);

    // const handleSignIn = () => {
    //     setDisplayHeader(false);
    // };

    const location = useLocation();
    const shouldDisplayHeaderAndFooter = location.pathname !== '/404';

    return (
        <>
            <HeaderDesign></HeaderDesign>
            <SubHeader></SubHeader>
            <GimmeMenu></GimmeMenu>

            {children}

            <ScrollButtonToTop />
            <InfiniteSliderTrack />

            <Footer />
        </>
    );
}

export default DefaultLayout;
