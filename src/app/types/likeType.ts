import { Post } from "./postType"
import { User } from "./userType"

export type Like = {
  id: string
  user: User
  userId: string
  post: Post
  postId: string
}
