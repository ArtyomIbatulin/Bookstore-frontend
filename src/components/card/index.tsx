import { CardHeader, Card as NextUICard } from "@nextui-org/react"
import {
  useLikeBookMutation,
  useUnlikeBookMutation,
} from "../../app/services/likeApi"
import {
  useDeleteBookMutation,
  useLazyFindBookQuery,
  useLazyFindBooksQuery,
} from "../../app/services/booksApi"
import { useDeleteCommentMutation } from "../../app/services/commentsApi"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectCurrent } from "../../features/user/userSlice"
import { User } from "../user"
import { formatDate } from "../../utils/format-date"

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
  likedByUser?: boolean
}

export const Card: React.FC<Props> = ({
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commentId = "",
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = "",
  cardFor = "book",
  likedByUser = false,
}) => {
  const [likeBook] = useLikeBookMutation()
  const [unlikeBook] = useUnlikeBookMutation()
  const [triggerGetAllBooks] = useLazyFindBooksQuery()
  const [triggerGetBookById] = useLazyFindBookQuery()
  const [deleteBook, deleteBookStatus] = useDeleteBookMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const currentUser = useAppSelector(selectCurrent)

  return (
    <NextUICard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibold leading-non text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatDate(createdAt)}
          />
        </Link>
      </CardHeader>
    </NextUICard>
  )
}
