import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import Root from "./pages/Root"
import { MenuPage } from "./pages/menu/MenuPage.tsx"
import { ListPage } from "./pages/list/ListPage.tsx"
import { BillPage } from "./pages/bill/BillPage.tsx"
import { useEffect } from "react"
import { useCartContext } from "./hook/use-cart-context.tsx"


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
        //loader: menuLoader,
      },
      {
        path: "list",
        element: <ListPage />,
        //loader: listLoader,
      },
      {
        path: "bill",
        element: <BillPage />,
        //loader: billPage,
      },
    ]
  }
])

function App() {
  const { getItemDb } = useCartContext();

  useEffect(() => {
    getItemDb();
  }, [getItemDb])

  return (
    <div className="inset-0 bg-black/10">
      <RouterProvider router={router} />
    </div>

  )
}

export default App
