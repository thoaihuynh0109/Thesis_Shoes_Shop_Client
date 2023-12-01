import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function App() {
    return (
        <PayPalScriptProvider options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
            <Router>
                <div>
                    <Routes>
                        {/* for guest and authenticated */}
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = route.layout || DefaultLayout;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                ></Route>
                            );
                        })}

                        {/* for admin */}
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = route.layout || DefaultLayout;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                ></Route>
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </PayPalScriptProvider>
    );
}

export default App;
