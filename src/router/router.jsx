import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Todo from "../pages/Todo";

const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children: [
            {
                index:true,
                element:<Login/>,
            },
            {
                path:"register",
                element:<Register/>,
            },
            {
                path:"todo",
                element:<Todo/>,
            }
        ]
}
])

export default router