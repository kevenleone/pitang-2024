import useSWR from 'swr';

export const useShortners = () => useSWR('/api/shortner');
