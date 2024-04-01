import type { RoleEnum, User } from "../types/userType"
import { api } from "./api"

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
      { token: string },
      { login: string; password: string; role: RoleEnum } //check
    >({
      query: userData => ({
        url: "/sign-in",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation<
      { login: string; password: string; role: RoleEnum },
      { login: string; password: string; role: RoleEnum }
    >({
      query: userData => ({
        url: "/sign-up",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query<User, void>({
      query: () => ({
        url: "/current-user",
        method: "GET",
      }),
    }),
    getUserById: builder.query<User, string>({
      query: id => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
    editUser: builder.mutation<User, { userData: FormData; id: string }>({
      query: ({ userData, id }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useEditUserMutation,
} = userApi

export const {
  endpoints: { login, register, current, getUserById, editUser },
} = userApi
