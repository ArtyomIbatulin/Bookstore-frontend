import { useParams } from "react-router-dom"
import { useFindBookQuery } from "../../app/services/booksApi"
import { CardForBook } from "../../components/card-for-book"
import { ArrowBack } from "../../components/arrow-back"
import { CreateComment } from "../../components/create-comment"

export const BookPage = () => {
  const params = useParams<{ id: string }>()
  const { data } = useFindBookQuery(params?.id ?? "")
  // data из базы данных комментариев или другая связь книга-комментарий

  if (!data) {
    return <h2>Not found books</h2>
  }

  const { id, name, description, img, price, comments } = data

  return (
    <>
      <ArrowBack />
      <CardForBook
        cardFor="current-book"
        id={id}
        name={name ?? ""}
        description={description ?? ""}
        img={img ?? ""}
        price={price}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {comments
          ? comments.map(comment => (
              <CardForBook
                cardFor="comment"
                key={comment.id}
                id={id}
                commentId={comment.id}
                content={comment.content}
                name={comment.user.name ?? ""}
                avatarUrl={comment.user.avatarUrl ?? ""}
                authorId={comment.user.id}
              />
            ))
          : null}
      </div>
    </>
  )
}
