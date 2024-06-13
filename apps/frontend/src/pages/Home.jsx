import { useState } from 'react';
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import fetcher from '../services/api';
import env from '../utils/env';

export default function Simple() {
  const [error, setError] = useState(false);
  const [link, setLink] = useState('');
  const [state, setState] = useState('');
  const [shortner, setShortner] = useState();
  const toast = useToast();

  const handleSubmit = async () => {
    const response = await fetcher.post('/api/shortner', {
      url: link,
    });

    toast({
      title: 'Success',
      description: 'Your link was created',
    });

    setShortner(response.data);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Container
        maxW={'lg'}
        bg={useColorModeValue('white', 'whiteAlpha.100')}
        boxShadow={'xl'}
        rounded={'lg'}
        p={6}
        direction={'column'}
      >
        <Heading
          as={'h2'}
          fontSize={{ base: 'xl', sm: '2xl' }}
          textAlign={'center'}
          mb={5}
        >
          Pitang Shortner
        </Heading>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          as={'form'}
          spacing={'12px'}
          onSubmit={(e) => {
            e.preventDefault();
            setError(false);
            setState('submitting');

            // remove this code and implement your submit logic right here
            setTimeout(() => {
              if (link === 'fail@example.com') {
                setError(true);
                setState('initial');
                return;
              }

              setState('success');
            }, 1000);
          }}
        >
          <FormControl>
            <Input
              variant={'solid'}
              borderWidth={1}
              color={'gray.800'}
              _placeholder={{
                color: 'gray.400',
              }}
              borderColor={useColorModeValue('gray.300', 'gray.700')}
              id={'link'}
              type='text'
              required
              placeholder={'Your Link'}
              aria-label={'Your Link'}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </FormControl>
          <FormControl w={{ base: '100%', md: '40%' }}>
            <Button
              onClick={handleSubmit}
              colorScheme={state === 'success' ? 'green' : 'blue'}
              isLoading={state === 'submitting'}
              w='100%'
              type={state === 'success' ? 'button' : 'submit'}
            >
              {state === 'success' ? <CheckIcon /> : 'Submit'}
            </Button>
          </FormControl>
        </Stack>
        <Text
          mt={2}
          textAlign={'center'}
          color={error ? 'red.500' : 'gray.500'}
        >
          {shortner && (
            <>
              Here is your shortened link:{' '}
              <a
                target='_blank'
                href={`${env.VITE_BACKEND_URL}/${shortner.hash}`}
              >{`${env.VITE_BACKEND_URL}/${shortner.hash}`}</a>
              ! ✌️
            </>
          )}
        </Text>
      </Container>
    </Flex>
  );
}
