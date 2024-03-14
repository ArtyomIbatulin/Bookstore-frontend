import type { Like } from "../types/likeType"
import { api } from "./api"

export const likeApi = api.injectEndpoints({
  endpoints: builder => ({
    likeBook: builder.mutation<Like, { bookId: string }>({
      query: body => ({
        url: "/likes",
        method: "POST",
        body,
      }),
    }),
    unlikeBook: builder.mutation<void, string>({
      query: bookId => ({
        url: `/likes/${bookId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useLikeBookMutation, useUnlikeBookMutation } = likeApi

export const {
  endpoints: { likeBook, unlikeBook },
} = likeApi
