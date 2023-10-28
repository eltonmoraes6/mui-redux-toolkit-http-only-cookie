import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

// export const apiSlice = createApi({
//   //   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_API,
//     prepareHeaders(headers) {
//       return headers;
//     },
//     credentials: 'include',
//   }),
//   endpoints: (builder) => ({}),
// });

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const getStateData = getState();
    const token = localStorage.getItem('accessToken');
    console.log(' token =====> ', token);
    console.log(' getStateData =====> ', getStateData);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token');
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      // const user = api.getState().auth.user
      // store the new token
      // api.dispatch(setCredentials({ ...refreshResult.data, user }))
      localStorage.setItem('accessToken', refreshResult.data.accessToken);
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(logOut())
      localStorage.clear();
      window.location.href = '/login';
    }
  }

  if (result.error?.data) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { credentials: 'include', url: '/auth/refresh' },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          // api.dispatch(logOut())
          localStorage.clear();
          window.location.href = '/login';
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

export { baseQueryWithReauth };
