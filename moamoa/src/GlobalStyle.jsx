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
	color:inherit;
}
input,button{
	border:none;
	background-color:inherit;
}
button{
	cursor:pointer;
}
`;
export default GlobalStyle;
