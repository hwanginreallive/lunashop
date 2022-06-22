import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux/es/exports';
import { store } from './redux/store';
import Layout from './components/Layout';
import '~/sass/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Layout></Layout>
    </Provider>,
);

reportWebVitals();
