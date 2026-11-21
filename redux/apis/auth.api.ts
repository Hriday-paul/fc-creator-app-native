import { IApiResponse, IAuthResponse } from "../types";
import { baseApi } from "./base.api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    register: builder.mutation<IApiResponse<{ otpToken: string }>, { name: string; email: string; phone?: string; password: string }>({
      query: (body) => ({ url: '/auth/create', method: 'POST', body }),
    }),

    // Sign-up flow returns IAuthResponse; forgot-password flow returns { resetToken }
    verifyOtp: builder.mutation<IApiResponse<Partial<IAuthResponse> & { resetToken?: string }>, { otp: string; token: string }>({
      query: ({ otp, token }) => ({ url: '/auth/verify-otp', method: 'POST', headers: { token }, body: { otp } }),
    }),

    resendOtp: builder.mutation<IApiResponse<{ otpToken: string }>, { email: string }>({
      query: (body) => ({ url: '/auth/resend-otp', method: 'POST', body }),
    }),

    login: builder.mutation<IApiResponse<IAuthResponse>, { email: string; password: string }>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),

    forgotPassword: builder.mutation<IApiResponse<{ token: string }>, { email: string }>({
      query: (body) => ({ url: '/auth/forgot-password', method: 'POST', body }),
    }),

    resetPassword: builder.mutation<IApiResponse<unknown>, { token: string; newPassword: string; confirmPassword: string }>({
      query: ({ token, ...body }) => ({ url: '/auth/reset-password', method: 'PATCH', headers: { token }, body }),
    }),

    changePassword: builder.mutation<IApiResponse<{ accessToken: string; refreshToken: string }>, { oldPassword: string; newPassword: string; confirmPassword: string }>({
      query: (body) => ({ url: '/auth/change-password', method: 'PATCH', body }),
    }),

  }),
});

export const {
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
