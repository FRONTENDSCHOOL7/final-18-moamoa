import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Router/AppRoutes';
import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalStyle />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}
export default App;