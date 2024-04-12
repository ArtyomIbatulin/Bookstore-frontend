import type { Comment } from "./commentType"

export type Book = {
  id: string
  name: string
  price: number
  description: string
  img: string
  comments: Comment[]
  // likes, authors
}
