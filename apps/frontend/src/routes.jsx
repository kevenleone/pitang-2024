import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/auth/SignIn';
import Users from './pages/Users';
import SignUp from './pages/auth/SignUp';
import AuthOutlet from './pages/auth/AuthOutlet';

const AppRoutes = () => {
  console.log('App Routes');

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/' />

        <Route element={<AuthOutlet />} path='auth'>
          <Route element={<SignIn />} path='signin' />
          <Route element={<SignUp />} path='signup' />
        </Route>

        <Route element={<Users />} path='/users' />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
