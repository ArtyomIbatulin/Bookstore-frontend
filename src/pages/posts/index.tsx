import React from "react"
import { useGetAllPostsQuery } from "../../app/services/postApi"
import { CreatePost } from "../../components/create-post"
import { Card } from "../../components/card"

export const Posts = () => {
  const { data } = useGetAllPostsQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>

      {data && data.length > 0
        ? data.map(
            ({
              id,
              author,
              authorId,
              comments,
              content,
              likes,
              likedByUser,
              createdAt,
            }) => (
              <Card
                key={id}
                id={id}
                cardFor="post"
                name={author.name ?? ""}
                authorId={authorId}
                avatarUrl={author.avatarUrl ?? ""}
                commentsCount={comments.length}
                likesCount={likes.length}
                content={content}
                likedByUser={likedByUser}
                createdAt={createdAt}
              />
            ),
          )
        : null}
    </>
  )
}
