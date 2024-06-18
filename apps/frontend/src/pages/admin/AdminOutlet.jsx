import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';
import { Container } from '@chakra-ui/react';

const AdminOutlet = () => {
  const context = useContext(AppContext);

  if (!context.loggedUser) {
    return <Navigate replace to='/auth/signin' />;
  }

  return (
    <Container maxW='4xl' mt={8}>
      <Outlet />
    </Container>
  );
};

export default AdminOutlet;
