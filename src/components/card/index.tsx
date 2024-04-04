import { Card as NextUICard } from "@nextui-org/react"

type Props = {
  avatarUrl?: string
  name: string
  authorId: string
  content?: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createdAt: Date
  id?: string
  cardFor: "comment" | "book" | "current-book"
  likedByUser: boolean
}

export const Card: React.FC<Props> = () => {
  return <NextUICard></NextUICard>
}
