import { Post } from "./postType"
import type { User } from "./userType"

export type Comment = {
  id: string
  content: string
  user: User
  userId: string
  post: Post
  postId: string
}
