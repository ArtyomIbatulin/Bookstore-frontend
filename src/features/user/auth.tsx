import { Spinner } from "@nextui-org/react"
import { useCurrentQuery } from "../../app/services/userApi"

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <Spinner />
  }

  return children
}
