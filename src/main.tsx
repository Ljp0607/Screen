import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import Preview from "./pages/dataV/Preview/index.tsx";
import Create from "./pages/dataV/Create/index.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dataV/preview",
    element: <Preview />,
  },
  {
    path: "/dataV/create",
    element: <Create />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
