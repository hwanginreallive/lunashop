import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import Layout from './components/Layout';
import '~/sass/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Layout></Layout>);

reportWebVitals();
