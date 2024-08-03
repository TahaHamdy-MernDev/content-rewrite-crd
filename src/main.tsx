import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import theme from './theme.ts';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} toastOptions={{
      defaultOptions: {
        position: 'top-right',
        duration: 4000,
        isClosable: true,
        variant: 'top-accent'
      }
    }}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
);