import { Box, Link } from '@chakra-ui/react';

import dayjs from '../utils/dayjs';
import env from '../utils/env';
import CustomAvatar from './Avatar';

export default function Shortner({ createdAt, hash, url, user }) {
  return (
    <Box bg='#dadada' p={4} mb={4} borderRadius={4}>
      <Link
        color='blue'
        href={`${env.VITE_BACKEND_URL}/${hash}`}
      >{`${env.VITE_BACKEND_URL}/${hash}`}</Link>
      <p>
        <CustomAvatar name={user?.firstName} />
        {dayjs(createdAt).fromNow()} {` • `}
        <Link href={url}>{url}</Link>
      </p>
    </Box>
  );
}
