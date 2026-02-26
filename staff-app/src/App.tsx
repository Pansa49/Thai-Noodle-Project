import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { LoginPage } from "./page/LoginPage";
import { SelectedTablePage } from "./page/SelectTablePage";
import { SelectRolePage } from "./page/SelectRolepage";
import { StatusPage } from "./page/StatusPage";

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
    element: <SelectRolePage />
  },
  {
    path: "/status",
    element: <StatusPage />
  },

  {
    path: "/select-table/",
    element: <SelectedTablePage />,
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
