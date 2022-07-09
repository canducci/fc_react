import React from "react";
import { Link, Outlet, ReactLocation, Route, Router } from "react-location";
import Admin from "./components/admin";
import Home from "./components/home";
import Login from "./components/login";
import { useAuth } from "./lib/login";

type CustomRoute = {
  label: string;
  admin?: boolean;
} & Route;

const routes: CustomRoute[] = [
  {
    path: "/",
    element: <Home />,
    label: "Home",
  },
  {
    path: "/admin",
    element: <Admin />,
    label: "Admin",
    admin:true
  },
];

const location = new ReactLocation();

function App() {
  const auth = useAuth();

  if (!auth.user) return <Login />;

  return (
      <Router routes={routes} location={location}>
        {routes.filter(((route) => !route.admin || auth.user!.role === "admin" )).map((route) => (
          <Link key={route.path} to={route.path}>{route.label}</Link>
        ))}
        <Link to="/" onClick={auth.logout}>Logout</Link>
        <Outlet />
      </Router>
  );
}

export default App;
