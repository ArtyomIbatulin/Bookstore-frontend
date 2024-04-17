import type { Comment } from "./commentType"

export type Book = {
  id: string
  name: string
  price: string //number
  description: string
  img: string
  comments: Comment[]
  // likes, authors
}
