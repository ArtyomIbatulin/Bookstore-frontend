import type { Book } from "../types/bookType"
import { api } from "./api"

export const booksApi = api.injectEndpoints({
  endpoints: builder => ({
    createBook: builder.mutation<
      Book,
      {
        name: string
        price: number
        description: string
        img: string
      }
    >({
      query: bookData => ({
        url: "/create-book",
        method: "POST",
        body: bookData,
      }),
    }),

    findBooks: builder.query<Book[], void>({
      query: () => ({
        url: "/get-books",
        method: "GET",
      }),
    }),
    findBook: builder.query<Book, string>({
      query: id => ({
        url: `/book/${id}`,
        method: "GET",
      }),
    }),

    putBook: builder.mutation<Book, { bookData: FormData; id: string }>({
      query: ({ bookData, id }) => ({
        url: `/change-book/${id}`,
        method: "PUT",
        body: bookData,
      }),
    }),

    deleteBook: builder.mutation<void, string>({
      query: id => ({
        url: `/find-book/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useCreateBookMutation,
  useFindBooksQuery,
  useLazyFindBooksQuery,
  useFindBookQuery,
  useLazyFindBookQuery,
  usePutBookMutation,
  useDeleteBookMutation,
} = booksApi

export const {
  endpoints: { createBook, findBooks, findBook, putBook, deleteBook },
} = booksApi
