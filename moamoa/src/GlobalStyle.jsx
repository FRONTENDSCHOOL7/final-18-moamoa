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
	/* a태그가 리셋이 안되어있어 수정하였습니다 10-26 재웅 */
}
`;
export default GlobalStyle;
