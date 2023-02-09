import { configureStore } from '@reduxjs/toolkit';

import productModalReducer from '../slices/product-modal/productModalSlice';

import cartItemsReducer from '../slices/shopping-cart/cartItemsSlide';

import layoutConfigReducer from '../slices/layout/layoutConfigSlice';

import authReducer from '../api/auth/authSlice';
import { apiSlice } from '../api/base-query';
export const store = configureStore({
    reducer: {
        productModal: productModalReducer,
        cartItems: cartItemsReducer,
        setLayout: layoutConfigReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});
