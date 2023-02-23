import { apiSlice } from '../base-query';

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: '/order',
                method: 'POST',
                body: { ...data },
            }),
        }),
        getOrderById: builder.query({
            query: (data) => ({
                url: `/order/${data.id}`,
                method: 'GET',
            }),
        }),
        getOrderByUser: builder.query({
            query: (data) => ({
                url: `/order/user/${data.id}`,
                method: 'GET',
            }),
        }),
        getListOrder: builder.query({
            query: (data) => ({
                url: `/cart`,
                method: 'GET',
            }),
        }),
        updateOder: builder.mutation({
            query: (data) => ({
                url: `/order/${data.id}`,
                method: 'PATCH',
                body: { ...data },
            }),
        }),
        deleteOrder: builder.mutation({
            query: (data) => ({
                url: `/order/${data.id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetListOrderQuery,
    useGetOrderByIdQuery,
    useGetOrderByUserQuery,
    useUpdateOderMutation,
    useDeleteOrderMutation,
} = orderApi;
