import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PageNotFound from './pages/NotFound/PageNotFound';

function App() {
    return (
        <PayPalScriptProvider options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
            <Router>
                <Routes>
                    {/* for guest --> not to login into system*/}
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout || DefaultLayout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* for admin and authenticated  */}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout || DefaultLayout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* any path is not defined will be changed to /404 */}
                    <Route path="/*" element={<Navigate to="/404" />} />
                    <Route
                        path="/404"
                        element={
                            <DefaultLayout>
                                <PageNotFound />
                            </DefaultLayout>
                        }
                    />
                </Routes>
            </Router>
        </PayPalScriptProvider>
    );
}

export default App;
