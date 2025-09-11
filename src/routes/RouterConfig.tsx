import { RouteObject } from "react-router-dom";
import Auth from "./Auth";
import App from "../App";
import WeatherForm from "../components/layouts/weather/WeatherForm";
import ProtectedRoute from "./ProtectedRoute";
import React from "react";
import RouterErrorElement from "./RouterErrorElement";
import PublicRoute from "./PublicRoute";

export const RouterConfig: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <RouterErrorElement />,
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <Auth />
          </PublicRoute>
        ),
      },
      {
        path: "weather",
        element: (
          <ProtectedRoute>
            <WeatherForm />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
