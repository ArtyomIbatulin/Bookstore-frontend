import { useFindBooksQuery } from "../../app/services/booksApi"
import { CardForBook } from "../../components/card-for-book"
import { CreateBook } from "../../components/create-book"

export const MainPage = () => {
  const { data } = useFindBooksQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreateBook />
      </div>
      {data && data.length > 0 ? (
        data.map(({ id, name, img, price, description }) => (
          <CardForBook
            key={id}
            id={id}
            cardFor="book"
            name={name ?? ""}
            img={img ?? ""}
            price={price}
            description={description ?? ""}
          />
        ))
      ) : (
        <p>Ничего нет</p>
      )}
    </>
  )
}
