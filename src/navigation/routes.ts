import { lazy } from "react";

const Home = lazy(() => import("../containers/Home"));

const PUBLIC_ROUTES = [
  {
    exact: true,
    title: "Home",
    path: "/",
    component: Home,
  },
];

export { PUBLIC_ROUTES };
