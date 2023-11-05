import Footer from './Footer/Footer';
import Header from './Header/Header';

function DefaultLayout({ children }) {
    return (
        <>
            <Header></Header>
            {children}
            <Footer></Footer>
        </>
    );
}

export default DefaultLayout;
