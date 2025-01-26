import { createRoot } from 'react-dom/client'
import App from './screens/App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './screens/Layout.jsx'
import Auth from './screens/Auth.jsx'
import Blog from './screens/Blog.jsx'
import Clientregister from './screens/Clientregister.jsx'
import Loandetails from './screens/Loandetails.jsx'
import Clientlogin from './screens/Clientlogin.jsx'
import Clientpasswordchange from './screens/Clientpasswordchange.jsx'
import Dashboard from './screens/Dashboard.jsx'
import AdminDashboard from './screens/Adminpanel.jsx'

const router = createBrowserRouter([{
  path: "/",
  element: <Layout />,
  children: [{
    path: "",
    element: <App />
  }, {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/blog",
    element: <Blog />
  },
  {
    path: "/clientregister",
    element: <Clientregister />
  },
  {
    path: "/loanforms",
    element: <Loandetails />
  },
  {
    path: "/clientlogin",
    element: <Clientlogin />
  },
  {
    path: "/clientpasswordchange",
    element: <Clientpasswordchange />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },{
    path:'/admin',
    element:<AdminDashboard/>
  }
  ]
}])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
