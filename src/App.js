import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { adminRoutes, privateRoutes, publicRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PageNotFound from './pages/NotFound/PageNotFound';

function App() {
    const user = useSelector((state) => state.user);
    useEffect(() => {
        console.log('user:', user.user.isAdmin);
    }, [user]);
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
                                key={route.path}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* for authenticated  */}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout || DefaultLayout;

                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    user.user ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Navigate to="/signin" />
                                    )
                                }
                            />
                        );
                    })}
                    {/* for admin  */}
                    {adminRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout || DefaultLayout;
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    user.user.isAdmin ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Navigate to="/404" />
                                    )
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
