import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextUICard,
  Spinner,
} from "@nextui-org/react"
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
import { RiDeleteBinLine } from "react-icons/ri"
import { Typography } from "../typography"
import { MetaInfo } from "../meta-info"
import { FcDislike } from "react-icons/fc"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { FaRegComment } from "react-icons/fa"
import { ErrorMessage } from "../error-message"
import { hasErrorField } from "../../utils/has-error-field"

type Props = {
  avatarUrl?: string
  name: string
  authorId?: string
  content?: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createdAt?: Date
  id?: string
  cardFor: "comment" | "book" | "current-book"
  likedByUser?: boolean
  img?: string
  description?: string
  price?: string //number
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
  img = "",
  description = "",
  price = "0",
}) => {
  const [likeBook] = useLikeBookMutation()
  const [unlikeBook] = useUnlikeBookMutation()
  const [triggerGetAllBooks] = useLazyFindBooksQuery()
  const [triggerGetBookById] = useLazyFindBookQuery()
  const [deleteBook, deleteBookStatus] = useDeleteBookMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  // const currentUser = useAppSelector(selectCurrent) why?

  const refetchBooks = async () => {
    switch (cardFor) {
      case "book":
        await triggerGetAllBooks().unwrap()
        break
      case "current-book":
        await triggerGetAllBooks().unwrap()
        break
      case "comment":
        await triggerGetBookById(id).unwrap()
        break
      default:
        throw new Error("Не верный cardFor")
    }
  }

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "book":
          await deleteBook(id).unwrap()
          await refetchBooks()
          break
        case "current-book":
          await deleteBook(id).unwrap()
          navigate("/")
          break
        case "comment":
          await deleteComment(commentId).unwrap()
          await refetchBooks()
          break
        default:
          throw new Error("Не верный cardFor")
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }

  const handleLike = async () => {
    try {
      likedByUser
        ? await unlikeBook(id).unwrap()
        : await likeBook({ bookId: id }).unwrap()

      if (cardFor === "current-book") {
        await triggerGetBookById(id).unwrap()
      }

      if (cardFor === "book") {
        await triggerGetAllBooks().unwrap()
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }

  return (
    <NextUICard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          {" "}
          {/* Нет такого роута ?*/}
          <User
            name={name}
            className="text-small font-semibold leading-non text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatDate(createdAt)}
          />
        </Link>
        {/* {authorId === currentUser?.id && (
          <div className="cursor-pointer">
            {deleteBookStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine onClick={handleDelete} />
            )}
          </div>
        )} */}
        {
          <div className="cursor-pointer">
            {deleteBookStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine onClick={handleDelete} />
            )}
          </div>
        }
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{`${price} руб.`}</Typography>
        <Typography>{description}</Typography>
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={handleLike}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/books/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextUICard>
  )
}
