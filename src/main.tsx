import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { NextUIProvider } from "@nextui-org/react"
// import { createBrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"

// const router = createBrowserRouter([
//   {
//     path: "/auth",
//     element: <h1>Auth</h1>,
//   },
//   {
//     path: "/",
//     element: <h1>Layout</h1>,
//   },
// ])

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error("Root element with ID 'root' was not found in the document.")
}
