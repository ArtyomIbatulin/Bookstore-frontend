import { Comment } from "./commentType"
import { Follows } from "./followsType"
import { Like } from "./likeType"
import { Post } from "./postType"

export enum RoleEnum {
  user,
  admin,
}

export type User = {
  id: string
  email: string
  password: string
  role: RoleEnum
  name?: string
  avatarUrl?: string
  dateOfBirth?: Date
  createdAt: Date
  updatedAt: Date
  bio?: string
  location?: string
  posts: Post[]
  following: Follows[]
  followers: Follows[]
  likes: Like[]
  comments: Comment[]
  isFollowing?: boolean
}
