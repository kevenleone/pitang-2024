import useSWR from 'swr';

import { ShortnerResponse } from '../types';

export const useShortners = () => useSWR<ShortnerResponse>('/api/shortner');
