import { Comment } from "./commentType"
import { Like } from "./likeType"
import { User } from "./userType"

export type Post = {
  id: string
  content: string
  author: User
  authorId: string
  likes: Like[]
  comments: Comment[]
  likedByUser: boolean
  createdAt: Date
  updatedAt: Date
}
