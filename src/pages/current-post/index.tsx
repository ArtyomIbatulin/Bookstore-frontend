import React from "react"
import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postApi"
import { Card } from "../../components/card"
import { ArrowBack } from "../../components/arrow-back"
import { CreateComment } from "../../components/create-comment"

export const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params?.id ?? "")

  if (!data) {
    return <h2>Поста не существует!</h2>
  }

  const {
    id,
    author,
    authorId,
    comments,
    content,
    likedByUser,
    likes,
    createdAt,
  } = data

  return (
    <>
      <ArrowBack />
      <Card
        id={id}
        cardFor="current-post"
        name={author.name ?? ""}
        avatarUrl={author.avatarUrl ?? ""}
        authorId={authorId}
        content={content}
        commentsCount={comments.length}
        likesCount={likes.length}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map(comment => (
              <Card
                id={id}
                cardFor="comment"
                key={comment.id}
                name={comment.user.name ?? ""}
                authorId={comment.userId}
                avatarUrl={comment.user.avatarUrl ?? ""}
                commentId={comment.id}
                content={comment.content}
              />
            ))
          : null}
      </div>
    </>
  )
}
