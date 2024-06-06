import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import AppRoutes from './routes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <AppRoutes />
  </ChakraProvider>
);
