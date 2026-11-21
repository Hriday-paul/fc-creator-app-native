import { config } from '@/utils/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setTokens } from '../slices/auth.slice';
import type { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: config.apiUrl,
  prepareHeaders: (headers, { getState }) => {
    const auth = (getState() as RootState).auth;

    // OTP / reset-password flow token (endpoints may also pass it explicitly)
    if (auth?.authToken && !headers.has('token')) {
      headers.set('token', auth.authToken);
    }

    if (auth?.accessToken) {
      headers.set('Authorization', `Bearer ${auth.accessToken}`);
    }

    return headers;
  },
});

// On 401, refresh the access token once and retry the request
const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST", body: { refreshToken } },
      api,
      extraOptions,
    ) as { data?: { data?: { accessToken: string; refreshToken?: string } } };

    const data = refreshResult?.data?.data;
    if (data?.accessToken) {
      api.dispatch(setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken ?? refreshToken,
      }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile'],
  endpoints: () => ({}),
});
