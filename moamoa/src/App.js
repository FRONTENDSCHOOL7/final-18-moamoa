import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Router/AppRoutes';
// import Profile from './Pages/Profile';
import GlobalStyle from './GlobalStyle';
import { RecoilEnv } from 'recoil';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalStyle />
        {/* <Profile /> */}

        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}
export default App;
