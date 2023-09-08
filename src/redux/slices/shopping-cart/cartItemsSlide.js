import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const duplicate = state.value.filter(
                (e) => e.id === newItem.id && e.color === newItem.color && e.size === newItem.size,
            );
            if (duplicate.length > 0) {
                state.value = state.value.filter(
                    (e) => e.id !== newItem.id || e.color !== newItem.color || e.size !== newItem.size,
                );
                state.value.push({
                    id: duplicate[0].id,
                    color: newItem.color,
                    size: newItem.size,
                    price: newItem.price,
                    quantity: newItem.quantity + duplicate[0].quantity,
                });
            } else {
                state.value = [
                    ...state.value,
                    {
                        ...action.payload,
                    },
                ];
            }
            localStorage.setItem('cartItems', JSON.stringify(state.value));
        },
        updateItem: (state, action) => {
            const newItem = action.payload;
            const item = state.value.filter(
                (e) => e.id === newItem.id && e.color === newItem.color && e.size === newItem.size,
            );
            if (item.length > 0) {
                state.value = state.value.filter(
                    (e) => e.id !== newItem.id || e.color !== newItem.color || e.size !== newItem.size,
                );
                state.value = [
                    ...state.value,
                    {
                        id: item[0].id,
                        color: newItem.color,
                        size: newItem.size,
                        price: newItem.price,
                        quantity: newItem.quantity,
                    },
                ];
            }
            localStorage.setItem(
                'cartItems',
                JSON.stringify(state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))),
            );
        },
        removeItem: (state, action) => {
            const item = action.payload;
            state.value = state.value.filter((e) => e.id !== item.id || e.color !== item.color || e.size !== item.size);
            localStorage.setItem(
                'cartItems',
                JSON.stringify(state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))),
            );
        },
        removeAllItems: (state) => {
            state.value = [];
            localStorage.removeItem('cartItems');
        },
        addManyItems: (state, action) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItem, removeAllItems, addManyItems } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
