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
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 font-sans text-slate-800 md:p-8">
          <Body />
        </div>
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
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
