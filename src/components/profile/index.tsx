import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { useAppSelector } from "../../app/hooks"
import { selectCurrent } from "../../features/user/userSlice"
import { Link } from "react-router-dom"
import { MdAlternateEmail } from "react-icons/md"

export const Profile = () => {
  const current = useAppSelector(selectCurrent)

  if (!current) {
    return null
  }

  const { id, login } = current // name, avatar

  return (
    <Card className="py-4 w-[302px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        {/* Image for avatar */}
      </CardHeader>
      <CardBody>
        <Link to={`/users/${id}`}>
          <h4 className="font-bold text-large mb-2">{login}</h4> {/* name */}
        </Link>
        <p className="text-default-500 flex items-center gap-2">
          <MdAlternateEmail />
          {login}
        </p>
      </CardBody>
    </Card>
  )
}
