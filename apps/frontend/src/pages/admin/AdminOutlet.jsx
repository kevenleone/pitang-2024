import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const AdminOutlet = () => {
  const context = useContext(AppContext);

  if (!context.loggedUser) {
    return <div>Unauthorized...</div>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminOutlet;
