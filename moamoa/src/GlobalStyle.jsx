import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset};
:root{
    
}
html{ 
	font-size: 62.5%;
}
body{
	background-color:#fff9e4;
	/* 바디에 배경색 */
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
li{
	list-style: none;
}
p{
	color: #000;
}
Link{
	color: inherit;
	&:visited{
		color: inherit;
	}
}
button{
	padding: 0;
	border: none;
	background: transparent;
}
.a11y-hidden {
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
}
`;
export default GlobalStyle;
