import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { NextUIProvider } from "@nextui-org/react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { AuthPage } from "./pages/auth-page"
import { Layout } from "./components/layout"
import { MainPage } from "./pages/main-page"
import { BookPage } from "./pages/book-page"
import { UserProfilePage } from "./pages/user-profile-page"
import { WishlistPage } from "./pages/wishlist-page"
import { OrderPage } from "./pages/order-page"
import { Auth } from "./features/user/auth"

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "books/:id",
        element: <BookPage />,
      },
      {
        path: "users/:id",
        element: <UserProfilePage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
    ],
  },
])

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvider>
            <Auth>
              <RouterProvider router={router} />
            </Auth>
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error("Root element with ID 'root' was not found in the document.")
}

// for test commit
