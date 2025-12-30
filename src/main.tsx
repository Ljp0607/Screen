import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd"; // 引入Antd配置组件
import { antdTheme } from "./config/antdTheme"; // 引入主题配置
import { createBrowserRouter, RouterProvider } from "react-router";
import Preview from "./pages/dataV/Preview/index.tsx";
import Create from "./pages/dataV/Create/index.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Create />,
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
    <ConfigProvider theme={antdTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>
);
