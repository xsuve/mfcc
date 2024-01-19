import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import {
  Home,
  Admin,
  CreateFlight,
  EditFlight,
  CreateCompany,
  EditCompany,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/admin/create-flight',
    element: <CreateFlight />,
  },
  {
    path: '/admin/edit-flight',
    element: <Navigate to='/admin' />,
  },
  {
    path: '/admin/edit-flight/:id',
    element: <EditFlight />,
  },
  {
    path: '/admin/create-company',
    element: <CreateCompany />,
  },
  {
    path: '/admin/edit-company/:id',
    element: <EditCompany />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
