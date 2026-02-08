import { Controller, useForm } from "react-hook-form"
import { useLazyFindBookQuery } from "../../app/services/booksApi"
import { Button, Textarea } from "@nextui-org/react"
import { ErrorMessage } from "../error-message"
import { IoMdCreate } from "react-icons/io"
import { useState } from "react"
import { hasErrorField } from "../../utils/has-error-field"
import { useCreateCommentMutation } from "../../app/services/commentApi"
import { useParams } from "react-router-dom"

export const CreateComment = () => {
  const { id } = useParams<{ id: string }>()
  const [createComment] = useCreateCommentMutation()
  const [getBookById] = useLazyFindBookQuery()
  const [error, setError] = useState("")

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  // const error = errors?.book?.message as string

  const onSubmit = handleSubmit(async data => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap()
        setValue("comment", "")
        await getBookById(id).unwrap()
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  })

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        rules={{
          required: "Обязательное поле",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Напишите комментарий"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}{" "}
      {/* Так же и в других формах с errors */}
      <Button
        color="primary"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Комментарий
      </Button>
    </form>
  )
}
