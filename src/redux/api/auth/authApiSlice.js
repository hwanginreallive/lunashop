import { apiSlice } from '../base-query';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth',
                method: 'POST',
                body: { ...data },
            }),
        }),
        createAccount: builder.mutation({
            query: (data) => ({
                url: '/auth/add',
                method: 'POST',
                body: { ...data },
            }),
        }),
        getListAccount: builder.query({
            query: () => ({
                url: '/auth/getAll',
                method: 'GET',
            }),
        }),
        getAccountById: builder.query({
            query: (data) => ({
                url: `/auth/${data.id}`,
                method: 'GET',
            }),
        }),
        deleteAccount: builder.mutation({
            query: (data) => ({
                url: `/auth/${data.id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useCreateAccountMutation,
    useGetAccountByIdQuery,
    useGetListAccountQuery,
    useDeleteAccountMutation,
} = authApiSlice;
