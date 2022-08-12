import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import Routes from '../routes/Routes';
import ScrollToTop from './ScrollToTop';

import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Route>
                    <Header />
                    <div className="container">
                        <div className="main">
                            <Routes />
                        </div>
                    </div>
                    <Footer />
                </Route>
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default Layout;
