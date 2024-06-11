import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import AppContextProvider from './context/AppContext';
import AppRoutes from './routes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <ChakraProvider
      toastOptions={{
        defaultOptions: { isClosable: true, position: 'bottom-right' },
      }}
    >
      <AppRoutes />
    </ChakraProvider>
  </AppContextProvider>
);
