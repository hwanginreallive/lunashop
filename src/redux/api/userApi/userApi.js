import { apiSlice } from '../base-query';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (data) => ({
                url: '/user',
                method: 'POST',
                body: { ...data },
            }),
        }),
        getListUsers: builder.query({
            query: () => ({
                url: '/user',
                method: 'GET',
            }),
        }),
        getUserById: builder.query({
            query: (data) => ({
                url: `/user/${data.id}`,
                method: 'GET',
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `/user/${data.id}`,
                method: 'PATCH',
                body: { ...data },
            }),
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `/user/${data.id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateUserMutation,
    useGetUserByIdQuery,
    useDeleteUserMutation,
    useGetListUsersQuery,
    useUpdateUserMutation,
} = userApi;
