import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Adminhome from './pages/admin-home';
import Login from './pages/login';
import Navbar from './pages/navbar';
import AddUsers from './pages/add-users';
import ForgotPassword from './pages/forgot-password';
import Getusers from './pages/get-users';
import UpdateUser from './pages/update-profile';
import ProtectedRoute from './pages/protectedRoute';
import AddMovie from './pages/add-movies';
import GetMovies from './pages/get-movies';
import UpdateMovie from './pages/update-movies';
import GetSuperMovies from './pages/super-movies';
import MovieDetails from './pages/movie-details'; 
import { ToastContainer } from 'react-toastify';
import SuperUpdate from './pages/super-update';
import 'react-toastify/dist/ReactToastify.css';


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
  },
  {
    path: '/movies',
    element: (
      <ProtectedRoute>
        <>
          <Navbar />
          <GetMovies />
        </>
      </ProtectedRoute>
    )
  },

 
  {
    path: '/movie/:id',
    element: (
      <ProtectedRoute>
        <>
          <Navbar />
          <MovieDetails />
        </>
      </ProtectedRoute>
    )
  },

  {
    path: '/update-movie/:movieId',
    element: (
      <ProtectedRoute>
        <>
          <Navbar />
          <UpdateMovie />
        </>
      </ProtectedRoute>
    )
  },
  {
    path: '/all-movies',
    element: (
      <ProtectedRoute adminOnly={true}>
        <>
          <Navbar />
          <GetSuperMovies />
        </>
      </ProtectedRoute>
    )
  },
  {
    path: '/update-super/:userId',
    element: (
      <ProtectedRoute adminOnly={true}>
        <>
          <Navbar />
          <SuperUpdate />
        </>
      </ProtectedRoute>
    )
  }
]);

function App() {
  return(
    <>
    <RouterProvider router={router} />;
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  ) 
}

export default App;