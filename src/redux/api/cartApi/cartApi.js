import { apiSlice } from '../base-query';

export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCart: builder.mutation({
            query: (data) => ({
                url: '/cart',
                method: 'POST',
                body: { ...data },
            }),
        }),
        getCartById: builder.query({
            query: (data) => ({
                url: `/cart/${data.id}`,
                method: 'GET',
            }),
        }),
        getCartByUser: builder.query({
            query: (data) => ({
                url: `/cart/user/${data.id}`,
                method: 'GET',
            }),
        }),
        getListCart: builder.query({
            query: (data) => ({
                url: `/cart`,
                method: 'GET',
            }),
        }),
        updateCart: builder.mutation({
            query: (data) => ({
                url: `/cart/${data.id}`,
                method: 'PATCH',
                body: { ...data },
            }),
        }),
        deleteCart: builder.mutation({
            query: (data) => ({
                url: `/cart/${data.id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useAddCartMutation,
    useDeleteCartMutation,
    useGetCartByIdQuery,
    useUpdateCartMutation,
    useGetListCartQuery,
    useGetCartByUserQuery,
} = cartApi;
