// import SlideShowBranchStore from '~/components/SlideShowImage'; // chỉnh lại thành của react
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer/Footer';
import GimmeMenu from './GimmeMenu/GimmeMenu';
import HeaderDesign from './Header/HeaderComponent';
import SubHeader from './SubHeader/SubHeader';
import NewHeaderDesign from './Header/NewHeaderDesign';
import ScrollButtonToTop from '~/components/BackToTop';

function DefaultLayout({ children }) {
    const [displayHeader, setDisplayHeader] = useState(true);

    const handleSignIn = () => {
        setDisplayHeader(false);
    };

    const location = useLocation();
    const shouldDisplayHeaderAndFooter = location.pathname !== '/404';

    return (
        <>
            <HeaderDesign></HeaderDesign>
            <SubHeader></SubHeader>
            <GimmeMenu></GimmeMenu>
            {children}
            {/* <SlideShowBranchStore></SlideShowBranchStore> */}
            <ScrollButtonToTop />
            <Footer></Footer>
        </>
    );
}

export default DefaultLayout;
