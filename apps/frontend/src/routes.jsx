import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import AdminOutlet from './pages/admin/AdminOutlet';
import AuthOutlet from './pages/auth/AuthOutlet';
import ChartsAdmin from './pages/admin/Charts';
import Home from './pages/Home';
import HomeAdmin from './pages/admin/Home';
import Navbar from './components/Navbar';
import ShortnersAdmin from './pages/admin/Shortners';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Users from './pages/Users';

const AppRoutes = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <>
              <Navbar />

              <Outlet />
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
  </>
);

export default AppRoutes;
