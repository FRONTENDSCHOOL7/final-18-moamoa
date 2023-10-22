import './App.css';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
`;

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
    </div>
  );
}

export default App;
