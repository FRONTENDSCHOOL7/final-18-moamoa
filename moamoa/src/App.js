import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Router/AppRoutes';
// import Profile from './Pages/Profile';
import GlobalStyle from './GlobalStyle';
// 스플래쉬 화면 구현을 위해 폰트 추가하고, reset.css 적용하려고 GlobalStyle 수정합니다.
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
