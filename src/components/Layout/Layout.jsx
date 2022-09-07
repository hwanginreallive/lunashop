import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Routes from '../../routes/Routes';
import ScrollToTop from '../../Hooks/ScrollToTop';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SpeedDialog from '../SpeedDial/SpeedDialog';

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
                    {/* <SpeedDialog></SpeedDialog> */}
                    <Footer />
                </Route>
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default Layout;
