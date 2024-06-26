import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Navbar from './components/Navbar';
import { Spinner } from '@chakra-ui/react';

const AdminOutlet = lazy(() => import('./pages/admin/AdminOutlet'));
const AuthOutlet = lazy(() => import('./pages/auth/AuthOutlet'));
const ChartsAdmin = lazy(() => import('./pages/admin/Charts'));
const Home = lazy(() => import('./pages/Home'));
const HomeAdmin = lazy(() => import('./pages/admin/Home'));
const ShortnersAdmin = lazy(() => import('./pages/admin/Shortners'));
const SignIn = lazy(() => import('./pages/auth/SignIn'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const Users = lazy(() => import('./pages/Users'));

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route
        element={
          <>
            <Navbar />

            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </>
        }
      >
        <Route element={<Home />} path='/' />

        <Route element={<AuthOutlet />} path='auth'>
          <Route element={<SignIn />} path='signin' />
          <Route element={<SignUp />} path='signup' />
        </Route>

        <Route element={<AdminOutlet />} path='admin'>
          <Route element={<HomeAdmin />} index />
          <Route element={<ChartsAdmin />} path='charts' />
          <Route element={<ShortnersAdmin />} path='shortners' />
        </Route>

        <Route element={<Users />} path='/users' />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
