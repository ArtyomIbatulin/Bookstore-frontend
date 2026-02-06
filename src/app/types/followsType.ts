import { User } from "./userType"

export type Follows = {
  id: string
  follower: User
  followerId: string
  following: User
  followingId: string
}
