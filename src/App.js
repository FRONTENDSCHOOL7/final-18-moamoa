import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Router/AppRoutes';
// import Profile from './Pages/Profile';
import GlobalStyle from './GlobalStyle';
// eslint 오류('GlobalStyle is not defined')로 주석 처리 해제했습니다.
import { RecoilEnv } from 'recoil';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

function App() {
  return (
    <div>
      {/* eslint-disable-next-line */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <GlobalStyle />
        {/* <Profile /> */}

        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}
export default App;
