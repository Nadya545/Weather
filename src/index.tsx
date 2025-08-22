import * as React from "react";
import { Suspense } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./routes/Auth";
import App from "./App";
import WeatherForm from "./сomponents/layouts/weather/WeatherForm";
import { store } from "./store/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Ошибка загрузки</div>,
    children: [
      {
        index: true,
        element: <Auth />,
      },
      {
        path: "weather",
        element: <WeatherForm />,
      },
    ],
  },
]);
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  </React.StrictMode>
);
