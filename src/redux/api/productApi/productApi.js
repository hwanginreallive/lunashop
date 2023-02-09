import { apiSlice } from '../base-query';

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (data) => ({
                url: '/product',
                method: 'POST',
                body: { ...data },
            }),
        }),
        getListProducts: builder.query({
            query: () => ({
                url: '/product',
                method: 'GET',
            }),
        }),
        getProductById: builder.query({
            query: (data) => ({
                url: `/product/${data.id}`,
                method: 'GET',
            }),
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/product/${data.id}`,
                method: 'PATCH',
                body: { ...data },
            }),
        }),
        deleteProduct: builder.mutation({
            query: (data) => ({
                url: `/product/${data.id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateProductMutation,
    useGetListProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
