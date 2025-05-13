import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import StoreProvider from './redux'; // Make sure this path is correct

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* 👈 should wrap everything inside */}
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>
);
