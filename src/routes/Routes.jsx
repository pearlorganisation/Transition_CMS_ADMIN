import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Dashboard from "../pages/Dashboard/Dashboard";
import News from "../pages/News/News";
import Team from "../pages/Team/Team";
import AddNews from "../pages/News/AddNews";
import EditNews from "../pages/News/EditNews";
import AddTeam from "../pages/Team/AddTeam";
import EditTeam from "../pages/Team/EditTeam";
import ViewNews from "../pages/News/ViewNews";
import Viewteam from "../pages/Team/ViewTeam";
import { path } from "framer-motion/client";
import CoInvester from "../pages/CoInvester/CoInvester"
import CoInvestorView from "../pages/CoInvester/viewInvester";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/news/add-news",
        element: <AddNews />,
      },
      {
        path: "/news/view-news/:id",
        element: <ViewNews />,
      },
      {
        path: "/news/edit-news/:id",
        element: <EditNews />,
      },
      {
        path: "/team",
        element: <Team />,
      },

      {
        path: "/team/add-team",
        element: <AddTeam />,
      },
      {
        path: "/team/edit-team/:id",
        element: <EditTeam />,
      },
      {
        path: "/team/view-team/:id",
        element: <Viewteam />,
      },

      {
        path:"/co-invester",
        element:<CoInvester/>
      },
      {
        path:"/Co-InvestorView",
        element:<CoInvestorView/>
      }
    ],
  },
]);

export default Routes;
