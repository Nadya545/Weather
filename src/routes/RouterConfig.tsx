import { RouteObject } from "react-router-dom";
import App from "../App";
import WeatherForm from "../components/layouts/weather/WeatherForm";
import ProtectedRoute from "./ProtectedRoute";
import React from "react";
import RouterErrorElement from "./RouterErrorElement";
import PublicRoute from "./PublicRoute";
import Authorisation from "../components/layouts/auth/Authorisation";
import Registration from "../components/layouts/auth/Registration";

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
            <Authorisation />
          </PublicRoute>
        ),
      },

      {
        path: "authorisation",
        element: (
          <PublicRoute>
            <Authorisation />
          </PublicRoute>
        ),
      },
      {
        path: "registration",
        element: (
          <PublicRoute>
            <Registration />
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
