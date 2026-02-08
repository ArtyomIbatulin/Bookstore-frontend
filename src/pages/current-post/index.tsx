import React from "react"
import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postApi"
import { Card } from "../../components/card"

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
    </>
  )
}
