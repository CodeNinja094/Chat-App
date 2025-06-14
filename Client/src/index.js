import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import Support from './pages/Support';
import Auth from './pages/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
let allRoutes = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />
    },
    {
      path: 'blog',
      element: <Blog />
    },
    {
      path: 'about',
      element: <About />
    },
    {
      path: 'support',
      element: <Support />
    },
    {
      path: 'auth',
      element: <Auth />
    },
    {
      path: '*',
      element: <div>404 Not Found</div>
    }
  ]
)

root.render(
  <React.StrictMode>
    <RouterProvider router={allRoutes} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
