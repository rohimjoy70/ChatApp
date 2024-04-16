import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { Main } from "./pages/main";

const router = createBrowserRouter([
  {
    path: "/login",
    element: < Login />,
    loader: () => {
      if(localStorage.getItem("username")){
        return redirect("/") 
      }
      return null
    }
  },
  {
    path: "/",
    element: < Main />,
    loader: () => {
      if(!localStorage.getItem("username")){
        return redirect("/login") 
      }
      return null
    }
  },
]);

export default router
