import { useParams } from "react-router-dom"
import { useFindBookQuery } from "../../app/services/booksApi"
import { Card } from "../../components/card"
import { ArrowBack } from "../../components/arrow-back"

export const BookPage = () => {
  const params = useParams<{ id: string }>()
  const { data } = useFindBookQuery(params?.id ?? "")

  if (!data) {
    return <h2>Книги нет</h2>
  }

  const { id, name, description, img, price } = data

  return (
    <>
      <ArrowBack />
      <Card
        cardFor="current-book"
        id={id}
        name={name ?? ""}
        description={description ?? ""}
        img={img ?? ""}
        price={price}
      />
    </>
  )
}
