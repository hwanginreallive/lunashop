import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Router from '~/router/Router';
import ScrollToTop from '../../Hooks/ScrollToTop';
import Chatbot from '../chatBot/ChatBot';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SpeedDialog from '../SpeedDial/SpeedDialog';
const Layout = () => {
    const layoutConfig = useSelector((state) => state.setLayout.layout);

    const [isChatBotOpen, setIsChatBotOpen] = useState(false);
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
                <SpeedDialog setIsChatBotOpen={setIsChatBotOpen} />
                {layoutConfig.footer && <Footer />}
                <ToastContainer />
                {isChatBotOpen && <Chatbot setIsChatBotOpen={setIsChatBotOpen} />}
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default Layout;
