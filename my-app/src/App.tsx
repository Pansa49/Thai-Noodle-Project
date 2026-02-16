import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useCartContext } from "./hook/use-cart-context.tsx"

import { MenuPage } from "./pages/menu/MenuPage.tsx"
import { menuLoader } from "./pages/menu/menuLoader.ts"
import { ListPage } from "./pages/list/ListPage.tsx"
import { listLoader } from "./pages/list/listLoader.ts"
import { BillPage } from "./pages/bill/BillPage.tsx"
import { billLoader } from "./pages/bill/billLoader.ts"

import Root from "./pages/Root"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Navigate to="/menu" replace />,
      },
      {
        path: "menu",
        element: <MenuPage />,
        loader: menuLoader,
      },
      {
        path: "list",
        element: <ListPage />,
        loader: listLoader,
      },
      {
        path: "bill",
        element: <BillPage />,
        loader: billLoader,
      },
    ]
  }
])

function App() {


  return (
    <div className="inset-0 bg-black/10">
      <RouterProvider router={router} />
    </div>

  )
}

export default App
