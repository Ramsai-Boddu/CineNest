import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Adminhome from './pages/admin-home';
import Login from './pages/login';
import Navbar from './pages/navbar';
import AddUsers from './pages/add-users';
import ForgotPassword from './pages/forgot-password';
import Getusers from './pages/get-users';
import UpdateUser from './pages/update-profile';
import ProtectedRoute from './pages/protectedRoute';
import AddMovie from './pages/add-movies';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <>
          <Navbar />
          <Adminhome />
        </>
      </ProtectedRoute>
    )
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/add-user',
    element: (
      <ProtectedRoute adminOnly={true}>
        <>
          <Navbar />
          <AddUsers />
        </>
      </ProtectedRoute>
    )
  },
  {
    path: '/get-users',
    element: (
      <ProtectedRoute adminOnly={true}>
        <>
          <Navbar />
          <Getusers />
        </>
      </ProtectedRoute>
    )
  },
  {
    path: '/update/:userId',
    element: (
      <ProtectedRoute>
        <>
          <Navbar />
          <UpdateUser />
        </>
      </ProtectedRoute>
    )
  },
  {
    path: '/add-movie',
    element: (
      <ProtectedRoute>
        <>
          <Navbar />
          <AddMovie />
        </>
      </ProtectedRoute>
    )
  }

]);

function App() {

  return (
    <>
      <RouterProvider router={router} /> 
    </>
  )
}

export default App
