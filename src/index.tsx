import * as React from "react";
import { Suspense } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { RouterConfig } from "./routes/RouterConfig";
import Loader from "./ui/loader/Loader";

//Сейчас мы будем выбирать правильный адрес для сайта в зависимости от того,
//где он работает: у меня на компе или в интернете

const basename =
  process.env.NODE_ENV === "production" // где мы сейчас работаем, в интернете?
    ? "/Weather" // если в инете, для GitHub Pages
    : "/"; // для локальной разработки(для дома)

const router = createBrowserRouter(RouterConfig, {
  basename: basename,
});

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  </React.StrictMode>
);
