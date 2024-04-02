import { useFindBooksQuery } from "../../app/services/booksApi"
import { CreateBook } from "../../components/create-book"

export const MainPage = () => {
  const { data } = useFindBooksQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreateBook />
      </div>
    </>
  )
}
