import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Adminhome from './pages/admin-home';
import Login from './pages/login';
import Navbar from './pages/navbar';
import AddUsers from './pages/add-users';
import ForgotPassword from './pages/forgot-password';

const router = createBrowserRouter([
  {
    path: '/',
    element: <><Navbar /><Adminhome /></>
  },
  {
    path: '/login',
    element: <><Login /></>
  },
  {
    path: '/add-user',
    element: <><Navbar /><AddUsers /></>
  },
  {
    path: '/forgot-password',
    element: <><ForgotPassword /></>
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} /> 
    </>
  )
}

export default App
