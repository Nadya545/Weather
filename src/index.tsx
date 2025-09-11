import * as React from "react";
import { Suspense } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { RouterConfig } from "./routes/RouterConfig";
import Loader from "./ui/loader/Loader";

const router = createBrowserRouter(RouterConfig);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  /*<React.StrictMode>
    <Suspense fallback={<Loader />}>*/

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

  /* </Suspense>
  </React.StrictMode>*/
);
