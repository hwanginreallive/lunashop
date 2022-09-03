import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Routes from '../../routes/Routes';
import ScrollToTop from '../../Hooks/ScrollToTop';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

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
