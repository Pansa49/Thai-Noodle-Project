import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./pages/Root"
import { MenuPage } from "./pages/menu/MenuPage.tsx"
import { ListPage } from "./pages/list/ListPage.tsx"
import { BillPage } from "./pages/bill/BillPage.tsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <MenuPage />,
        //loader: menuLoader,
      },
      {
        path: "/list",
        element: <ListPage />,
        //loader: listLoader,
      },
      {
        path: "/bill",
        element: <BillPage />,
        //loader: billPage,
      },
    ]
  }
])

function App() {
  return (
    <div className="fixed inset-0 bg-black/10">
      <RouterProvider router={router} />
    </div>

  )
}

export default App
