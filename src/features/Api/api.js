import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000'
  }),
  reducerPath: 'api',
  endpoints: builder => ({

    getContacts: builder.query({
      query: (args) => {
        const { name } = args;
        const query = { url: '/contacts' };
        if(name !== '') {
          query.params = { name }
        }
        return query;
      },
      providesTags: (result = []) => [
        ...result.map(({id}) => ({type: 'Contact', id})),
        { type: 'Contacts', id: 'LIST'},
      ],
    }),

    getContactById: builder.query({
      query: (id) => `/contacts/${id}`,
      // Tags tell RTK when/how to invalidate cache when results match existing tags
      providesTags: (result, error, arg) => [{type: 'Contact', id: arg}]
    }),

  }),
});

export const { useGetContactsQuery, useGetContactByIdQuery } = apiSlice;