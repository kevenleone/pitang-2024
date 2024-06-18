import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link as ChakraLink,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import fetcher from '../../services/api';

const signUpSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  password: z.string().min(4),
});

const SignUp = () => {
  const context = useOutletContext();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();
  const toast = useToast();

  const onSignUp = async (form) => {
    try {
      await fetcher.post('/api/user', form);

      toast({
        status: 'success',
        title: 'Success!',
        description: 'Account created',
      });

      context.setEmailAddress(form.email);

      navigate('/auth/signin', { replace: true });
    } catch (error) {
      toast({
        status: 'error',
        title: 'Something went wrong...',
        description: error.cause || error.message,
      });
    }
  };

  return (
    <>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
          Sign up
        </Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          to enjoy all of our cool features ✌️
        </Text>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
      >
        <Stack as='form' onSubmit={handleSubmit(onSignUp)} spacing={4}>
          <HStack>
            <Box>
              <FormControl
                id='firstName'
                isInvalid={!!formState.errors.firstName}
              >
                <FormLabel>First Name</FormLabel>
                <Input type='text' {...register('firstName')} />
                <FormErrorMessage>
                  {formState.errors.firstName?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box>
              <FormControl
                id='lastName'
                isInvalid={!!formState.errors.lastName}
              >
                <FormLabel>Last Name</FormLabel>
                <Input type='text' {...register('lastName')} />
                <FormErrorMessage>
                  {formState.errors.lastName?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </HStack>

          <FormControl id='email' isInvalid={!!formState.errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input type='email' {...register('email')} />
            <FormErrorMessage>
              {formState.errors.email?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl id='password' isInvalid={!!formState.errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {formState.errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          <Stack spacing={10} pt={2}>
            <Button
              isLoading={formState.isSubmitting}
              isDisabled={!formState.isValid}
              type='submit'
              loadingText='Submitting'
              size='lg'
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Sign up
            </Button>
          </Stack>

          <Stack pt={6}>
            <Text align={'center'}>
              Already a user?{' '}
              <ChakraLink as={Link} to='/auth/signin' color={'blue.400'}>
                Login
              </ChakraLink>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default SignUp;
