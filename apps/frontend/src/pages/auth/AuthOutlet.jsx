import { Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const AuthOutlet = () => {
  const context = useContext(AppContext);
  const [emailAddress, setEmailAddress] = useState('');

  if (context.loggedUser) {
    return <Navigate replace to='/admin' />;
  }

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing='8' mx='auto' maxW='lg' py='12' px='6'>
        <Outlet
          context={{
            ...context,
            emailAddress,
            setEmailAddress,
          }}
        />
      </Stack>
    </Flex>
  );
};

export default AuthOutlet;
