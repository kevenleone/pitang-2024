import { Box, Link } from '@chakra-ui/react';

import CustomAvatar from './Avatar';
import dayjs from '@pita.ng/dayjs';
import env from '../utils/env';
import { Shortner as TShortner } from '../types';

export default function Shortner({
  createdAt,
  hash,
  url,
  user,
}: TShortner) {
  return (
    <Box bg='#dadada' p={4} mb={4} borderRadius={4}>
      <Link
        color='blue'
        href={`${env.VITE_BACKEND_URL}/${hash}`}
      >{`${env.VITE_BACKEND_URL}/${hash}`}</Link>
      <Box display='flex' gap={5} mt={5}>
        <CustomAvatar name={user?.firstName} />
        {dayjs(createdAt).fromNow()} {` • `}
        <Link href={url}>{url}</Link>
      </Box>
    </Box>
  );
}
