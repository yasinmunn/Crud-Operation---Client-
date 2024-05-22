import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import JobDetails from "../Pages/JobDetails";
import AddJob from "../Pages/AddJob";
import ErrorPage from "../Pages/ErrorPage";
import MyPostedJobs from "../Pages/MyPostedJobs";
import UpdateJob from "../Pages/UpdateJob";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/registration',
                element: <Register></Register>,
            },
            {
                path: '/job/:id',
                element:<JobDetails></JobDetails>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
            },
            {
                path: '/update/:id',
                element:<UpdateJob></UpdateJob>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
            },
            {
                path:'/add-job',
                element: <AddJob></AddJob>
            },
            {
                path:'/my-posted-jobs',
                element: <MyPostedJobs></MyPostedJobs>
            }
        ],
    },

]);

export default router;