import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './apiSlice';

export const notesSlice = createApi({
  reducerPath: 'notes',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Notes'],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: '/notes',
        method: 'GET',
        credentials: 'include',
      }),
      invalidatesTags: ['Notes'],
    }),
    addNewNote: builder.mutation({
      query: (payload) => ({
        url: '/notes',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Notes'],
    }),
    updateNote: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/notes/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Notes'],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notes'],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesSlice;
