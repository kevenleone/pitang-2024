import { Flex, Stack, useColorModeValue } from '@chakra-ui/react';

const AuthLayout = ({ children }) => (
  <Flex
    align={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}
    justify={'center'}
    minH={'100vh'}
  >
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      {children}
    </Stack>
  </Flex>
);

export default AuthLayout;
