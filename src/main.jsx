import { createRoot } from 'react-dom/client'
import App from './screens/App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './screens/Layout.jsx'
import Auth from './screens/Auth.jsx'

const router = createBrowserRouter([{
  path: "/",
  element: <Layout />,
  children: [{
    path: "",
    element: <App />
  }, {
    path: "/auth",
    element: <Auth />
  }]
}])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
