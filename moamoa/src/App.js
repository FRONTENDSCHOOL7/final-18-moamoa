import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Router/AppRoutes';
// import Profile from './Pages/Profile';
// import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <GlobalStyle /> */}
        {/* <Profile /> */}

        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}
export default App;
