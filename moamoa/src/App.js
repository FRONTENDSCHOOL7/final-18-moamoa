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
      <BrowserRouter basename={'https://frontendschool7.github.io/final-18-moamoa'}>
        <GlobalStyle />
        {/* <Profile /> */}

        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}
export default App;
