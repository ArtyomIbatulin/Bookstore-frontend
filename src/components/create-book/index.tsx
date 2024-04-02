import { Controller, useForm } from "react-hook-form"
import {
  useCreateBookMutation,
  useLazyFindBooksQuery,
} from "../../app/services/booksApi"
import { Button, Textarea } from "@nextui-org/react"
import { ErrorMessage } from "../error-message"
import { IoMdCreate } from "react-icons/io"

export const CreateBook = () => {
  const [createBook] = useCreateBookMutation()
  const [triggerAllBooks] = useLazyFindBooksQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const error = errors?.book?.message as string

  const onSubmit = handleSubmit(async data => {
    try {
      await createBook({ name: data.book }).unwrap()
      setValue("book", "")
      await triggerAllBooks().unwrap()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="book"
        control={control}
        defaultValue=""
        rules={{
          required: "Обязательное поле",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Напишите"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}{" "}
      {/* Так же и в других формах с errors */}
      <Button
        color="success"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Добавить книгу
      </Button>
    </form>
  )
}
