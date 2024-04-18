import { Card, Image, useDisclosure } from "@nextui-org/react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { resetUser, selectCurrent } from "../../features/user/userSlice"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import { useEffect } from "react"
import { ArrowBack } from "../../components/arrow-back"
import { BASE_URL } from "../../constants"

export const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currenUser = useAppSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(id ?? "")
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const dispatch = useAppDispatch()

  useEffect(
    () => () => {
      dispatch(resetUser())
    },
    [dispatch],
  )

  if (!data) {
    return null
  }

  return (
    <>
      <ArrowBack />
      <div className="flex items-center gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.login} /* name */
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.login} {/* name */}
          </div>
        </Card>
      </div>
    </>
  )
}
