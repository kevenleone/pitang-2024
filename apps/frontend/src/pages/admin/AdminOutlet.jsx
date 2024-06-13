import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';

const AdminOutlet = () => {
  const context = useContext(AppContext);

  if (!context.loggedUser) {
    return <Navigate replace to='/auth/signin' />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminOutlet;
