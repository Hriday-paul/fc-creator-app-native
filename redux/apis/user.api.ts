import { IApiResponse, IUser } from "../types";
import { baseApi } from "./base.api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    myProfile: builder.query<IApiResponse<IUser>, void>({
      query: () => '/users/my-profile',
      providesTags: ['Profile'],
    }),

    // multipart: `picture` file + `data` = JSON string of { name, phone }
    updateProfile: builder.mutation<IApiResponse<IUser>, FormData>({
      query: (body) => ({ url: '/users/update-my-profile', method: 'PATCH', body }),
      invalidatesTags: ['Profile'],
    }),

    deleteAccount: builder.mutation<IApiResponse<unknown>, { password: string }>({
      query: (body) => ({ url: '/users/delete-my-account', method: 'DELETE', body }),
    }),

  }),
});

export const { useMyProfileQuery, useUpdateProfileMutation, useDeleteAccountMutation } = userApi;
