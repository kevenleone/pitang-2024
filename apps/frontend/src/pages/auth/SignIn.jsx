import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  FormErrorMessage,
  Link as ChakraLink,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import fetcher from '../../services/api';
import { TOKEN_PATH } from '../../utils/constants';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const SignIn = () => {
  const navigate = useNavigate();
  const context = useOutletContext();
  const toast = useToast();

  const { formState, handleSubmit, register } = useForm({
    defaultValues: {
      email: context.emailAddress,
    },
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
  });

  const onSignIn = async (form) => {
    try {
      const response = await fetcher.post('/api/auth', form);

      toast({
        status: 'success',
        title: 'Success!',
        description: 'Logged in',
      });

      sessionStorage.setItem(TOKEN_PATH, response.token);

      navigate('/', { replace: true });
    } catch (error) {
      toast({
        status: 'error',
        title: 'Something went wrong...',
        description: error.cause || error.message,
      });
    }

    console.log(response);
  };

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
        <Stack spacing={4} as='form' onSubmit={handleSubmit(onSignIn)}>
          <FormControl id='email' isInvalid={!!formState.errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input type='email' {...register('email')} />
            <FormErrorMessage>
              {formState.errors.email?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl id='password' isInvalid={!!formState.errors.password}>
            <FormLabel>Password</FormLabel>
            <Input type='password' {...register('password')} />
            <FormErrorMessage>
              {formState.errors.password?.message}
            </FormErrorMessage>
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
              isLoading={formState.isSubmitting}
              isDisabled={!formState.isValid}
              type='submit'
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
