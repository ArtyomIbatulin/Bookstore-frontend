import { Outlet, useNavigate } from "react-router-dom"
import { Container } from "../container"
import { Header } from "../header"
import { Navbar } from "../navbar"
import {
  selectIsAuthenticated,
  selectUser,
} from "../../features/user/userSlice"
import { useAppSelector } from "../../app/hooks"
import { useEffect } from "react"

export const Layout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated) //useAppSelector
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [isAuthenticated, navigate]) // deps

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Navbar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </Container>
    </>
  )
}
