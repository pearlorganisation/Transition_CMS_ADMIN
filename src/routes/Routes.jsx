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
import Press from "../pages/Insights/Press/Press";
import Podcast from "../pages/Insights/Podcast/Podcast";
import Articles from "../pages/Insights/Articles/Articles";
import AddArticle from "../pages/Insights/Articles/AddArticle";
import AddPress from "../pages/Insights/Press/AddPress";
import AddPodcast from "../pages/Insights/Podcast/AddPodcast";


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
        path: "/press",
        element: <Press />,
      },
      {
        path: "/podcast",
        element: <Podcast />,
      },
      {
        path: "/articles",
        element: <Articles />,
      },
      {
        path: "/add_article",
        element: <AddArticle />,
      },
      {
        path: "/add_podcast",
        element: <AddPodcast />,
      },
      {
        path: "/add_press",
        element: <AddPress />,
      },
      
    ],
  },
]);

export default Routes;
