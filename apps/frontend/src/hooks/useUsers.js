import useSWR from 'swr';

export const useUsers = () => useSWR('/api/user');
