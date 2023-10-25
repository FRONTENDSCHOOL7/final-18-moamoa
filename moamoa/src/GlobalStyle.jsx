import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset};

:root{
    
}
html{ font-size: 62.5%;

 }
 
body{
	font-family: 'Pretendard', sans-serif;
}
a{
	text-decoration:none;
}
`;
export default GlobalStyle;
