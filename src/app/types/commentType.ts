import type { User } from "./userType"

export type Comment = {
  id: string
  text: string
  date: Date
  user: User
  // user userId book bookId
}
