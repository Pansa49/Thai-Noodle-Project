import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { LoginPage } from "./page/LoginPage";
import { SelectedTable } from "./page/CashierPage";
import { RolePage } from "./page/RolePage";

import Body from "./page/Body";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/role",
    element: <RolePage />
  },
  {
    path: "/role",
    element: <Body />,
    children: [
      {
        path: "/cashier",
        element: <SelectedTable />,
      },
      {
        path: "/manager",
        //element: <ManagerPage />,
      },
      {
        path: "/waiter",
        //element: <WaiterPage />,
      },
    ]
  },
]);

function App() {
  return (
    <div className="inset-0 bg-black/10">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
