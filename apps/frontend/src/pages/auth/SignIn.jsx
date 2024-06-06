import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          to enjoy all of our cool{' '}
          <ChakraLink color={'blue.400'}>features</ChakraLink> ✌️
        </Text>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
      >
        <Stack spacing={4}>
          <FormControl id='email'>
            <FormLabel>Email address</FormLabel>
            <Input type='email' />
          </FormControl>
          <FormControl id='password'>
            <FormLabel>Password</FormLabel>
            <Input type='password' />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            >
              <Checkbox>Remember me</Checkbox>
              <ChakraLink color={'blue.400'}>Forgot password?</ChakraLink>
            </Stack>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Sign in
            </Button>

            <ChakraLink as={Link} to='/auth/signup' color={'blue.400'}>
              Create an account
            </ChakraLink>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default SignIn;
