import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';

import AppContextProvider from './context/AppContext';
import AppRoutes from './routes.jsx';
import fetcher from './services/api.js';

const CACHE_KEY = '@pitang-2024/swr';

function localStorageProvider() {
  const map = new Map(JSON.parse(localStorage.getItem(CACHE_KEY) || '[]'));

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem(CACHE_KEY, appCache);
  });

  return map;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <SWRConfig value={{ fetcher, provider: localStorageProvider }}>
    <AppContextProvider>
      <ChakraProvider
        toastOptions={{
          defaultOptions: { isClosable: true, position: 'bottom-right' },
        }}
      >
        <AppRoutes />
      </ChakraProvider>
    </AppContextProvider>
  </SWRConfig>
);
