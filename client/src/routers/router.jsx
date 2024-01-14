import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";

import SingleBook from "../shop/SingleBook";

import DashboardLayout from "../dashboard/DashboardLayout";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";
import CategoryWise from "../components/CategoryWise";
import Cart from "../cart/Cart";

import 'react-toastify/dist/ReactToastify.css';
import Success from "../purchase/Success";
import Cancel from "../purchase/Cancel";

const router = createBrowserRouter(
  [
  
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
         
            <Cart/>
          </PrivateRoute>
        ),
        
      },
      
      {
        path: "/category",
        element: <CategoryWise />,
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
           
            <SingleBook />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/book/${params.id}`),
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <PrivateRoute>
           
            <ManageBooks/>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadBook />,
      },
      
      {
        path: "/admin/dashboard/edit-books/:id",
        element: <EditBooks />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/book/${params.id}`),
      },
    ],
  },
  {
    path: "sign-up",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path:"/success",
    element:<Success/>
  },
  {
    path:"/cancel",
    element:<Cancel/>
  },
]);

export default router;