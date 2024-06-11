import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/auth/SignIn';
import Users from './pages/Users';
import SignUp from './pages/auth/SignUp';
import AuthOutlet from './pages/auth/AuthOutlet';
import ChartsAdmin from './pages/admin/Charts';
import HomeAdmin from './pages/admin/Home';
import ShortnersAdmin from './pages/admin/Shortners';
import AdminOutlet from './pages/admin/AdminOutlet';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
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
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
