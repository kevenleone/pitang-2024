import { Avatar } from '@chakra-ui/react';
import { ComponentProps } from 'react';

export default function CustomAvatar(props: ComponentProps<typeof Avatar>) {
  return <Avatar {...props} />;
}

