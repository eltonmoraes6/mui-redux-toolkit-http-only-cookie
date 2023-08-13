import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const notesSlice = createApi({
  reducerPath: 'notes',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API,
    withCredentials: true,
  }),
  tagTypes: ['Notes'],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => '/note',
      providesTags: ['Note'],
    }),
    addNewNote: builder.mutation({
      query: (payload) => ({
        url: '/note',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Note'],
    }),
    updateNote: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/note/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Note'],
    }),

    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/note/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Note'],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesSlice;
