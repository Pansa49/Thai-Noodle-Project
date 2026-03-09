import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { LoginPage } from "./page/LoginPage";
import { SelectedTable } from "./page/SelectTablePage";
import { Body } from "./page/Body";
import { ProtectedRoute } from "./components/protectedRoute";


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
    path: "/selected_table",
    element: (
      <ProtectedRoute>
        <Body />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <SelectedTable />
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
