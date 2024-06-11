import { Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const AuthOutlet = () => {
  const [emailAddress, setEmailAddress] = useState('');

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing='8' mx='auto' maxW='lg' py='12' px='6'>
        <Outlet context={{ emailAddress, setEmailAddress }} />
      </Stack>
    </Flex>
  );
};

export default AuthOutlet;
