import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Router from '~/router/Router';
import ScrollToTop from '../../Hooks/ScrollToTop';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = () => {
    const layoutConfig = useSelector((state) => state.setLayout.layout);
    return (
        <BrowserRouter>
            <ScrollToTop>
                {layoutConfig.header && <Header />}
                <div className="container">
                    <div
                        className="main"
                        style={{
                            margin: !layoutConfig.header && 0,
                        }}
                    >
                        <Router />
                    </div>
                </div>
                {/* <SpeedDialog></SpeedDialog> */}
                {layoutConfig.footer && <Footer />}
                <ToastContainer />
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default Layout;
