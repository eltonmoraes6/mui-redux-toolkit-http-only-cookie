import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './apiSlice';

export const usersSlice = createApi({
  reducerPath: 'users',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/user/all',
        method: 'GET',
        credentials: 'include',
      }),
      invalidatesTags: ['Users'],
    }),
    getUser: builder.query({
      query: () => ({
        url: '/user/email',
        method: 'GET',
        credentials: 'include',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = usersSlice;
